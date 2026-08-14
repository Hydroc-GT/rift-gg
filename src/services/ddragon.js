let currentPatchVersion = '14.24.1';
let championIdMap = {};

// Built-in champion ID lookup fallback
const DEFAULT_CHAMPION_ID_MAP = {
  1: 'Annie', 2: 'Olaf', 3: 'Galio', 4: 'TwistedFate', 5: 'XinZhao', 6: 'Urgot',
  7: 'Leblanc', 8: 'Vladimir', 9: 'Fiddlesticks', 10: 'Kayle', 11: 'MasterYi',
  12: 'Alistar', 13: 'Ryze', 14: 'Sion', 15: 'Sivir', 16: 'Soraka', 17: 'Teemo',
  18: 'Tristana', 19: 'Warwick', 20: 'Nunu', 21: 'MissFortune', 22: 'Ashe',
  23: 'Tryndamere', 24: 'Jax', 25: 'Morgana', 26: 'Zilean', 27: 'Singed',
  28: 'Evelynn', 29: 'Twitch', 30: 'Karthus', 31: 'Chogath', 32: 'Amumu',
  33: 'Rammus', 34: 'Anivia', 35: 'Shaco', 36: 'DrMundo', 37: 'Sona',
  38: 'Kassadin', 39: 'Irelia', 40: 'Janna', 41: 'Gangplank', 42: 'Corki',
  43: 'Karma', 44: 'Taric', 45: 'Veigar', 48: 'Trundle', 50: 'Swain',
  51: 'Caitlyn', 53: 'Blitzcrank', 54: 'Malphite', 55: 'Katarina', 56: 'Nocturne',
  57: 'Maokai', 58: 'Renekton', 59: 'JarvanIV', 60: 'Elise', 61: 'Orianna',
  62: 'MonkeyKing', 63: 'Brand', 64: 'LeeSin', 67: 'Vayne', 68: 'Rumble',
  69: 'Cassiopeia', 72: 'Skarner', 74: 'Heimerdinger', 75: 'Nasus', 76: 'Nidalee',
  77: 'Udyr', 78: 'Poppy', 79: 'Gragas', 80: 'Pantheon', 81: 'Ezreal',
  82: 'Mordekaiser', 83: 'Yorick', 84: 'Akali', 85: 'Kennen', 86: 'Garen',
  89: 'Leona', 90: 'Malzahar', 91: 'Talon', 92: 'Riven', 96: 'KogMaw',
  98: 'Shen', 99: 'Lux', 101: 'Xerath', 102: 'Shyvana', 103: 'Ahri',
  104: 'Graves', 105: 'Fizz', 106: 'Volibear', 107: 'Rengar', 110: 'Varus',
  111: 'Nautilus', 112: 'Viktor', 113: 'Sejuani', 114: 'Fiora', 115: 'Ziggs',
  117: 'Lulu', 119: 'Draven', 120: 'Hecarim', 121: 'Khazix', 122: 'Darius',
  126: 'Jayce', 127: 'Lissandra', 131: 'Diana', 133: 'Quinn', 134: 'Syndra',
  136: 'AurelionSol', 141: 'Kayn', 142: 'Zoe', 143: 'Zyra', 145: 'Kaisa',
  147: 'Seraphine', 150: 'Gnar', 154: 'Zac', 157: 'Yasuo', 161: 'Velkoz',
  163: 'Taliyah', 164: 'Camille', 166: 'Akshan', 200: 'Belveth', 201: 'Braum',
  202: 'Jhin', 203: 'Kindred', 221: 'Zeri', 222: 'Jinx', 223: 'TahmKench',
  233: 'Briar', 234: 'Viego', 235: 'Senna', 236: 'Lucian', 238: 'Zed',
  240: 'Kled', 245: 'Ekko', 246: 'Qiyana', 254: 'Vi', 266: 'Aatrox',
  267: 'Nami', 268: 'Azir', 350: 'Yuumi', 360: 'Samira', 412: 'Thresh',
  420: 'Illaoi', 421: 'RekSai', 427: 'Ivern', 429: 'Kalista', 432: 'Bard',
  497: 'Rakan', 498: 'Xayah', 516: 'Ornn', 517: 'Sylas', 518: 'Neeko',
  523: 'Aphelios', 526: 'Rell', 555: 'Pyke', 711: 'Vex', 777: 'Yone',
  875: 'Sett', 876: 'Lillia', 887: 'Gwen', 888: 'Renata', 893: 'Aurora',
  895: 'Nilah', 897: 'KSante', 901: 'Smolder', 902: 'Milio', 910: 'Hwei',
  950: 'Naafiri',
};

championIdMap = { ...DEFAULT_CHAMPION_ID_MAP };

// Fetch the latest game version and full champion mapping dynamically
export const initDataDragon = async () => {
  try {
    const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    if (res.ok) {
      const versions = await res.json();
      if (versions && versions.length > 0) {
        currentPatchVersion = versions[0];
      }
    }

    // Fetch champion data
    const champsRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${currentPatchVersion}/data/en_US/champion.json`);
    if (champsRes.ok) {
      const champsData = await champsRes.json();
      if (champsData?.data) {
        Object.values(champsData.data).forEach((champ) => {
          const keyNum = parseInt(champ.key, 10);
          if (!isNaN(keyNum)) {
            championIdMap[keyNum] = champ.id; // e.g. 103 -> "Ahri", 268 -> "Azir"
          }
        });
      }
    }
  } catch (error) {
    console.warn('Using fallback DDragon version & champ map:', currentPatchVersion, error);
  }
  return currentPatchVersion;
};

export const getChampionNameById = (champId) => {
  if (!champId) return 'Champion';
  const idNum = parseInt(champId, 10);
  return championIdMap[idNum] || DEFAULT_CHAMPION_ID_MAP[idNum] || `Champion_${champId}`;
};

export const getPatchVersion = () => currentPatchVersion;

export const getProfileIconUrl = (iconId) => {
  return `https://ddragon.leagueoflegends.com/cdn/${currentPatchVersion}/img/profileicon/${iconId || 1}.png`;
};

export const getChampionIconUrl = (championNameOrId) => {
  if (!championNameOrId) return 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/0.jpg';

  let name = championNameOrId;
  // If a number or numeric string was passed
  if (typeof championNameOrId === 'number' || !isNaN(Number(championNameOrId))) {
    name = getChampionNameById(championNameOrId);
  }

  if (typeof name === 'string') {
    if (name.toLowerCase() === 'fiddlesticks') name = 'Fiddlesticks';
    if (name.toLowerCase() === 'wukong') name = 'MonkeyKing';
  }

  return `https://ddragon.leagueoflegends.com/cdn/${currentPatchVersion}/img/champion/${name}.png`;
};

export const getChampionSplashUrl = (championName, skinNum = 0) => {
  if (!championName) return '';
  let name = championName;
  if (name.toLowerCase() === 'wukong') name = 'MonkeyKing';
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${skinNum}.jpg`;
};

export const getChampionCenteredSplashUrl = (championName) => {
  if (!championName) return '';
  let name = championName;
  if (name.toLowerCase() === 'wukong') name = 'MonkeyKing';
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/centered/${name}_0.jpg`;
};

export const getItemIconUrl = (itemId) => {
  if (!itemId || itemId === 0) return null;
  return `https://ddragon.leagueoflegends.com/cdn/${currentPatchVersion}/img/item/${itemId}.png`;
};

// Summoner spell mapping (ID to name)
const SPELL_MAP = {
  1: 'SummonerBoost', // Cleanse
  3: 'SummonerExhaust', // Exhaust
  4: 'SummonerFlash', // Flash
  6: 'SummonerHaste', // Ghost
  7: 'SummonerHeal', // Heal
  11: 'SummonerSmite', // Smite
  12: 'SummonerTeleport', // Teleport
  14: 'SummonerDot', // Ignite
  21: 'SummonerBarrier', // Barrier
  32: 'SummonerSnowball', // Mark / Snowball (ARAM)
};

export const getSummonerSpellUrl = (spellId) => {
  const spellName = SPELL_MAP[spellId] || 'SummonerFlash';
  return `https://ddragon.leagueoflegends.com/cdn/${currentPatchVersion}/img/spell/${spellName}.png`;
};

// High quality rank emblems (from CommunityDragon / Riot CDN)
export const getRankEmblemUrl = (tier) => {
  if (!tier || tier === 'UNRANKED') {
    return 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/unranked.png';
  }
  const tierLower = tier.toLowerCase();
  return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${tierLower}.png`;
};

// Rune icon URL helper
export const getRuneIconUrl = (runeId, iconPath) => {
  if (iconPath) {
    return `https://ddragon.leagueoflegends.com/cdn/img/${iconPath}`;
  }
  const runeStyleMap = {
    8000: 'perk-images/Styles/7201_Precision.png',
    8100: 'perk-images/Styles/7200_Domination.png',
    8200: 'perk-images/Styles/7202_Sorcery.png',
    8300: 'perk-images/Styles/7203_Whimsy.png',
    8400: 'perk-images/Styles/7204_Resolve.png',
    8005: 'perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png',
    8008: 'perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png',
    8021: 'perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png',
    8010: 'perk-images/Styles/Precision/Conqueror/Conqueror.png',
    8112: 'perk-images/Styles/Domination/Electrocute/Electrocute.png',
    8124: 'perk-images/Styles/Domination/Predator/Predator.png',
    8128: 'perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png',
    9923: 'perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png',
    8214: 'perk-images/Styles/Sorcery/SummonAery/SummonAery.png',
    8229: 'perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png',
    8230: 'perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png',
    8437: 'perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png',
    8439: 'perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png',
    8465: 'perk-images/Styles/Resolve/Guardian/Guardian.png',
    8351: 'perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png',
    8360: 'perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png',
    8369: 'perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png',
  };

  const path = runeStyleMap[runeId] || 'perk-images/Styles/7201_Precision.png';
  return `https://ddragon.leagueoflegends.com/cdn/img/${path}`;
};
