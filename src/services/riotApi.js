import { getContinentForRegion, getRegionData } from '../constants/regions';
import { findMockSummoner, MOCK_SUMMONERS } from './mockData';

const API_KEY_STORAGE_KEY = 'rift_gg_riot_api_key';

export const getStoredApiKey = () => {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || import.meta.env.VITE_RIOT_API_KEY || '';
};

export const setStoredApiKey = (key) => {
  if (key) {
    localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }
};

export const fetchSummonerFullProfile = async (gameName, tagLine, regionId = 'la1', forceMock = false) => {
  const cleanName = gameName.trim();
  const cleanTag = tagLine.trim();
  const region = getRegionData(regionId);
  const continent = getContinentForRegion(regionId);
  const apiKey = getStoredApiKey();

  // If forceMock or no API key, check mock database first
  if (forceMock || !apiKey) {
    const mock = findMockSummoner(cleanName, cleanTag);
    if (mock) {
      return { ...mock, isMock: true };
    }
    // If not found in mock and no API key, pick faker as showcase fallback or throw informative error
    if (!apiKey) {
      const fallback = MOCK_SUMMONERS['faker#kr1'];
      return {
        ...fallback,
        isMock: true,
        notice: `Mostrando perfil de demostración para "${cleanName}#${cleanTag}". Para buscar invocadores en vivo ingresa una Riot API Key en Ajustes.`,
      };
    }
  }

  // Live Riot API Request Flow
  try {
    // 1. Get Account by Riot ID
    const accountUrl = `https://${continent}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(cleanName)}/${encodeURIComponent(cleanTag)}?api_key=${apiKey}`;
    const accountRes = await fetch(accountUrl);

    if (!accountRes.ok) {
      if (accountRes.status === 401 || accountRes.status === 403) {
        // API Key expired or invalid -> Fallback to mock data with notice
        const mockFallback = findMockSummoner(cleanName, cleanTag) || MOCK_SUMMONERS['faker#kr1'];
        return {
          ...mockFallback,
          isMock: true,
          notice: 'La API Key de Riot ha expirado o es inválida (las keys de desarrollo caducan cada 24h). Mostrando perfil de demostración.',
        };
      }
      if (accountRes.status === 404) {
        throw new Error(`Invocador "${cleanName}#${cleanTag}" no encontrado en el servidor ${region.label}.`);
      }
      throw new Error(`Error ${accountRes.status} al consultar la cuenta.`);
    }

    const accountData = await accountRes.json();
    const puuid = accountData.puuid;

    // 2. Fetch Summoner Info, League stats, Masteries, and Match IDs in parallel
    const summonerUrl = `https://${region.id}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`;
    const leagueUrl = `https://${region.id}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}?api_key=${apiKey}`;
    const masteriesUrl = `https://${region.id}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=5&api_key=${apiKey}`;
    const matchIdsUrl = `https://${continent}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${apiKey}`;

    const [summonerRes, leagueRes, masteriesRes, matchIdsRes] = await Promise.all([
      fetch(summonerUrl).catch(() => null),
      fetch(leagueUrl).catch(() => null),
      fetch(masteriesUrl).catch(() => null),
      fetch(matchIdsUrl).catch(() => null),
    ]);

    const summonerData = summonerRes && summonerRes.ok ? await summonerRes.json() : { puuid, summonerLevel: 1, profileIconId: 1 };
    const leagueData = leagueRes && leagueRes.ok ? await leagueRes.json() : [];
    const masteriesData = masteriesRes && masteriesRes.ok ? await masteriesRes.json() : [];
    const matchIds = matchIdsRes && matchIdsRes.ok ? await matchIdsRes.json() : [];

    // 3. Fetch Match Details
    let matchesData = [];
    if (Array.isArray(matchIds) && matchIds.length > 0) {
      const matchPromises = matchIds.slice(0, 7).map(async (matchId) => {
        try {
          const res = await fetch(`https://${continent}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`);
          if (res.ok) return await res.json();
        } catch {
          return null;
        }
        return null;
      });

      const resolvedMatches = await Promise.all(matchPromises);
      matchesData = resolvedMatches.filter((m) => m !== null);
    }

    return {
      account: accountData,
      summoner: summonerData,
      league: leagueData,
      masteries: masteriesData,
      matches: matchesData,
      isMock: false,
    };
  } catch (error) {
    console.error('Riot API error:', error);
    // If anything fails, fallback smoothly to mock data for demo robustness
    const mock = findMockSummoner(cleanName, cleanTag) || MOCK_SUMMONERS['faker#kr1'];
    return {
      ...mock,
      isMock: true,
      notice: `No se pudo conectar con Riot Games (${error.message}). Mostrando datos de demostración para evaluación.`,
    };
  }
};
