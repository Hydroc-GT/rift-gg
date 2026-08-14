export const MOCK_SUMMONERS = {
  'faker#kr1': {
    account: {
      gameName: 'Hide on bush',
      tagLine: 'KR1',
      puuid: 'mock-puuid-faker-kr1',
      region: 'kr',
    },
    summoner: {
      id: 'mock-summoner-id-faker',
      accountId: 'mock-account-id-faker',
      puuid: 'mock-puuid-faker-kr1',
      profileIconId: 6,
      summonerLevel: 684,
      revisionDate: Date.now() - 3600000,
    },
    league: [
      {
        leagueId: 'challenger-kr-league-1',
        queueType: 'RANKED_SOLO_5x5',
        tier: 'CHALLENGER',
        rank: 'I',
        leaguePoints: 1240,
        wins: 342,
        losses: 218,
        veteran: true,
        inactive: false,
        freshBlood: false,
        hotStreak: true,
      },
    ],
    masteries: [
      { championId: 103, championName: 'Ahri', championLevel: 78, championPoints: 1850400, wins: 142, losses: 68 },
      { championId: 268, championName: 'Azir', championLevel: 65, championPoints: 1420100, wins: 110, losses: 55 },
      { championId: 61, championName: 'Orianna', championLevel: 59, championPoints: 1230800, wins: 95, losses: 48 },
      { championId: 7, championName: 'Leblanc', championLevel: 52, championPoints: 980400, wins: 88, losses: 42 },
      { championId: 517, championName: 'Sylas', championLevel: 44, championPoints: 760200, wins: 72, losses: 39 },
    ],
    matches: generateMockMatches('Hide on bush', 'mock-puuid-faker-kr1', [
      { champion: 'Ahri', kills: 11, deaths: 2, assists: 9, win: true, queueId: 420, duration: 1845, spells: [4, 14], runes: [8112, 8000], items: [6655, 3089, 3157, 4645, 3020, 3135, 3364], cs: 248, vision: 38, dmg: 32450 },
      { champion: 'Azir', kills: 8, deaths: 3, assists: 12, win: true, queueId: 420, duration: 2110, spells: [4, 12], runes: [8008, 8200], items: [6653, 3115, 3089, 3157, 3020, 4645, 3364], cs: 312, vision: 42, dmg: 41200 },
      { champion: 'Orianna', kills: 4, deaths: 5, assists: 7, win: false, queueId: 420, duration: 1650, spells: [4, 12], runes: [8230, 8300], items: [6655, 3040, 3089, 3020, 1056, 0, 3340], cs: 215, vision: 29, dmg: 21800 },
      { champion: 'Leblanc', kills: 14, deaths: 1, assists: 8, win: true, queueId: 420, duration: 1520, spells: [4, 14], runes: [8112, 8300], items: [6655, 3041, 3089, 3157, 3020, 0, 3364], cs: 189, vision: 31, dmg: 28900 },
      { champion: 'Sylas', kills: 9, deaths: 4, assists: 11, win: true, queueId: 420, duration: 1980, spells: [4, 14], runes: [8010, 8400], items: [6655, 3157, 4629, 3089, 3158, 3020, 3364], cs: 230, vision: 34, dmg: 34100 },
      { champion: 'Hwei', kills: 6, deaths: 6, assists: 14, win: false, queueId: 420, duration: 2240, spells: [4, 12], runes: [8229, 8300], items: [6653, 4645, 3089, 3040, 3020, 3135, 3340], cs: 295, vision: 45, dmg: 36700 },
    ]),
  },
  'g2 caps#1323': {
    account: {
      gameName: 'G2 Caps',
      tagLine: '1323',
      puuid: 'mock-puuid-caps-1323',
      region: 'euw1',
    },
    summoner: {
      id: 'mock-summoner-id-caps',
      accountId: 'mock-account-id-caps',
      puuid: 'mock-puuid-caps-1323',
      profileIconId: 548,
      summonerLevel: 512,
      revisionDate: Date.now() - 7200000,
    },
    league: [
      {
        leagueId: 'gm-euw-1',
        queueType: 'RANKED_SOLO_5x5',
        tier: 'GRANDMASTER',
        rank: 'I',
        leaguePoints: 780,
        wins: 280,
        losses: 195,
        veteran: true,
        inactive: false,
        freshBlood: false,
        hotStreak: true,
      },
    ],
    masteries: [
      { championId: 18, championName: 'Tristana', championLevel: 48, championPoints: 920000, wins: 85, losses: 40 },
      { championId: 134, championName: 'Syndra', championLevel: 62, championPoints: 1340000, wins: 120, losses: 65 },
      { championId: 518, championName: 'Neeko', championLevel: 39, championPoints: 680000, wins: 62, losses: 30 },
      { championId: 777, championName: 'Yone', championLevel: 41, championPoints: 710000, wins: 68, losses: 35 },
    ],
    matches: generateMockMatches('G2 Caps', 'mock-puuid-caps-1323', [
      { champion: 'Tristana', kills: 13, deaths: 3, assists: 6, win: true, queueId: 420, duration: 1720, spells: [4, 6], runes: [8008, 8100], items: [3031, 3046, 3072, 3006, 3036, 0, 3363], cs: 260, vision: 24, dmg: 33800 },
      { champion: 'Syndra', kills: 10, deaths: 2, assists: 11, win: true, queueId: 420, duration: 1890, spells: [4, 12], runes: [8112, 8200], items: [6655, 3089, 3157, 4645, 3020, 3135, 3364], cs: 240, vision: 36, dmg: 31200 },
      { champion: 'Neeko', kills: 3, deaths: 7, assists: 9, win: false, queueId: 420, duration: 1610, spells: [4, 14], runes: [8229, 8300], items: [6655, 3157, 3020, 1056, 0, 0, 3340], cs: 175, vision: 21, dmg: 18400 },
      { champion: 'Yone', kills: 12, deaths: 4, assists: 5, win: true, queueId: 420, duration: 1950, spells: [4, 14], runes: [8008, 8400], items: [3046, 3031, 3072, 3006, 3156, 0, 3363], cs: 275, vision: 28, dmg: 35600 },
    ]),
  },
  'vjbyytf0ao#euw': {
    account: {
      gameName: 'VJBYYTF0AO',
      tagLine: 'EUW',
      puuid: 'mock-puuid-jojo-euw',
      region: 'euw1',
    },
    summoner: {
      id: 'mock-summoner-id-jojo',
      accountId: 'mock-account-id-jojo',
      puuid: 'mock-puuid-jojo-euw',
      profileIconId: 4353,
      summonerLevel: 420,
      revisionDate: Date.now() - 5400000,
    },
    league: [
      {
        leagueId: 'chal-euw-1',
        queueType: 'RANKED_SOLO_5x5',
        tier: 'CHALLENGER',
        rank: 'I',
        leaguePoints: 910,
        wins: 215,
        losses: 140,
        veteran: true,
        inactive: false,
        freshBlood: false,
        hotStreak: false,
      },
    ],
    masteries: [
      { championId: 84, championName: 'Akali', championLevel: 55, championPoints: 1120000, wins: 95, losses: 42 },
      { championId: 910, championName: 'Hwei', championLevel: 42, championPoints: 780000, wins: 70, losses: 38 },
      { championId: 126, championName: 'Jayce', championLevel: 48, championPoints: 890000, wins: 82, losses: 46 },
    ],
    matches: generateMockMatches('VJBYYTF0AO', 'mock-puuid-jojo-euw', [
      { champion: 'Akali', kills: 16, deaths: 4, assists: 7, win: true, queueId: 420, duration: 1810, spells: [4, 14], runes: [8010, 8400], items: [3157, 4629, 3089, 3020, 3135, 4645, 3364], cs: 220, vision: 32, dmg: 38200 },
      { champion: 'Jayce', kills: 7, deaths: 5, assists: 4, win: false, queueId: 420, duration: 1740, spells: [4, 12], runes: [8005, 8300], items: [6692, 3158, 3071, 3036, 0, 0, 3363], cs: 235, vision: 26, dmg: 24300 },
      { champion: 'Hwei', kills: 9, deaths: 2, assists: 15, win: true, queueId: 420, duration: 2020, spells: [4, 12], runes: [8229, 8300], items: [6653, 4645, 3089, 3040, 3020, 3135, 3364], cs: 280, vision: 41, dmg: 37900 },
    ]),
  },
};

// Helper to generate full realistic 10-player match objects
function generateMockMatches(summonerName, puuid, matchTemplates) {
  const otherChamps = [
    { name: 'Aatrox', role: 'TOP' },
    { name: 'Sejuani', role: 'JUNGLE' },
    { name: 'Kaisa', role: 'ADC' },
    { name: 'Nautilus', role: 'SUPPORT' },
    { name: 'Jax', role: 'TOP' },
    { name: 'Maokai', role: 'JUNGLE' },
    { name: 'Jinx', role: 'ADC' },
    { name: 'Thresh', role: 'SUPPORT' },
    { name: 'Renekton', role: 'TOP' },
    { name: 'Vi', role: 'JUNGLE' },
  ];

  return matchTemplates.map((t, idx) => {
    const gameId = 700000000 + idx * 1234;
    const isWin = t.win;
    const teamId = isWin ? 100 : 200;
    const opponentTeamId = isWin ? 200 : 100;

    // Build the 10 participants
    const participants = [];

    // Our focal player
    participants.push({
      puuid: puuid,
      summonerName: summonerName,
      riotIdGameName: summonerName,
      riotIdTagline: '001',
      championName: t.champion,
      championId: 100 + idx,
      champLevel: 16,
      teamId: teamId,
      win: isWin,
      kills: t.kills,
      deaths: t.deaths,
      assists: t.assists,
      totalDamageDealtToChampions: t.dmg,
      goldEarned: 13500 + t.kills * 300,
      totalMinionsKilled: Math.floor(t.cs * 0.8),
      neutralMinionsKilled: Math.floor(t.cs * 0.2),
      visionScore: t.vision,
      summoner1Id: t.spells[0],
      summoner2Id: t.spells[1],
      item0: t.items[0] || 0,
      item1: t.items[1] || 0,
      item2: t.items[2] || 0,
      item3: t.items[3] || 0,
      item4: t.items[4] || 0,
      item5: t.items[5] || 0,
      item6: t.items[6] || 3340,
      perks: {
        styles: [
          { style: t.runes[0], selections: [{ perk: t.runes[0] }] },
          { style: t.runes[1], selections: [{ perk: t.runes[1] }] },
        ],
      },
      largestMultiKill: t.kills >= 10 ? 3 : t.kills >= 7 ? 2 : 1,
      individualPosition: 'MIDDLE',
    });

    // 4 teammates
    for (let i = 1; i <= 4; i++) {
      const teammateChamp = otherChamps[(idx + i) % otherChamps.length];
      const tkills = isWin ? Math.floor(Math.random() * 8) + 3 : Math.floor(Math.random() * 4);
      const tdeaths = isWin ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 8) + 4;
      const tassists = Math.floor(Math.random() * 12) + 4;
      participants.push({
        puuid: `mock-teammate-${idx}-${i}`,
        summonerName: `Ally ${teammateChamp.name}`,
        riotIdGameName: `Ally_${teammateChamp.name}`,
        riotIdTagline: 'KR1',
        championName: teammateChamp.name,
        championId: 200 + i,
        champLevel: 15,
        teamId: teamId,
        win: isWin,
        kills: tkills,
        deaths: tdeaths,
        assists: tassists,
        totalDamageDealtToChampions: Math.floor(t.dmg * (0.5 + Math.random() * 0.4)),
        goldEarned: 11000 + tkills * 250,
        totalMinionsKilled: Math.floor(140 + Math.random() * 80),
        neutralMinionsKilled: 12,
        visionScore: 25 + i * 5,
        summoner1Id: 4,
        summoner2Id: i === 4 ? 14 : i === 2 ? 11 : 12,
        item0: 3078,
        item1: 3071,
        item2: 3053,
        item3: 3111,
        item4: 0,
        item5: 0,
        item6: 3340,
        perks: {
          styles: [
            { style: 8000, selections: [{ perk: 8010 }] },
            { style: 8400, selections: [{ perk: 8400 }] },
          ],
        },
        individualPosition: teammateChamp.role,
      });
    }

    // 5 opponents
    for (let i = 0; i < 5; i++) {
      const oppChamp = otherChamps[(idx + i + 5) % otherChamps.length];
      const okills = !isWin ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 4);
      const odeaths = !isWin ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 8) + 3;
      const oassists = Math.floor(Math.random() * 10) + 3;
      participants.push({
        puuid: `mock-enemy-${idx}-${i}`,
        summonerName: `Enemy ${oppChamp.name}`,
        riotIdGameName: `Enemy_${oppChamp.name}`,
        riotIdTagline: 'KR1',
        championName: oppChamp.name,
        championId: 300 + i,
        champLevel: isWin ? 14 : 16,
        teamId: opponentTeamId,
        win: !isWin,
        kills: okills,
        deaths: odeaths,
        assists: oassists,
        totalDamageDealtToChampions: Math.floor(t.dmg * (0.6 + Math.random() * 0.5)),
        goldEarned: 10500 + okills * 250,
        totalMinionsKilled: Math.floor(130 + Math.random() * 80),
        neutralMinionsKilled: 15,
        visionScore: 22 + i * 6,
        summoner1Id: 4,
        summoner2Id: 14,
        item0: 3089,
        item1: 3020,
        item2: 3157,
        item3: 0,
        item4: 0,
        item5: 0,
        item6: 3340,
        perks: {
          styles: [
            { style: 8100, selections: [{ perk: 8112 }] },
            { style: 8200, selections: [{ perk: 8200 }] },
          ],
        },
        individualPosition: oppChamp.role,
      });
    }

    return {
      metadata: {
        matchId: `MOCK_${gameId}`,
        participants: participants.map((p) => p.puuid),
      },
      info: {
        gameId: gameId,
        gameCreation: Date.now() - (idx + 1) * 3600000 * 3,
        gameDuration: t.duration,
        gameMode: 'CLASSIC',
        queueId: t.queueId || 420,
        participants: participants,
        teams: [
          { teamId: 100, win: isWin ? teamId === 100 : teamId !== 100 },
          { teamId: 200, win: isWin ? teamId === 200 : teamId !== 200 },
        ],
      },
    };
  });
}

// Search helper for mock data
export const findMockSummoner = (gameName, tagLine = 'KR1', region = 'kr') => {
  const cleanName = gameName.trim();
  const cleanTag = tagLine ? tagLine.trim() : 'KR1';
  const query = `${cleanName.toLowerCase()}#${cleanTag.toLowerCase()}`;
  
  // Exact match
  if (MOCK_SUMMONERS[query]) {
    return MOCK_SUMMONERS[query];
  }

  // Name match
  const nameOnly = cleanName.toLowerCase();
  for (const [key, data] of Object.entries(MOCK_SUMMONERS)) {
    if (key.startsWith(`${nameOnly}#`) || data.account.gameName.toLowerCase() === nameOnly) {
      return data;
    }
  }

  // If not in static list, dynamically generate a realistic profile for this player
  const puuid = `dynamic-puuid-${cleanName.replace(/\s+/g, '-').toLowerCase()}`;
  const generatedMatches = generateMockMatches(cleanName, puuid, [
    { champion: 'Aatrox', kills: 9, deaths: 3, assists: 7, win: true, queueId: 420, duration: 1780, spells: [4, 12], runes: [8010, 8400], items: [3078, 3071, 3053, 3111, 0, 0, 3340], cs: 220, vision: 28, dmg: 27500 },
    { champion: 'Renekton', kills: 6, deaths: 5, assists: 4, win: false, queueId: 420, duration: 1620, spells: [4, 12], runes: [8010, 8400], items: [6631, 3071, 3111, 0, 0, 0, 3340], cs: 195, vision: 22, dmg: 19800 },
    { champion: 'Jax', kills: 11, deaths: 2, assists: 6, win: true, queueId: 420, duration: 1910, spells: [4, 12], runes: [8008, 8400], items: [3078, 3153, 3053, 3047, 0, 0, 3363], cs: 240, vision: 31, dmg: 31200 },
  ]);

  return {
    account: {
      gameName: cleanName,
      tagLine: cleanTag,
      puuid: puuid,
      region: region,
    },
    summoner: {
      id: `dynamic-summoner-${puuid}`,
      accountId: `dynamic-acc-${puuid}`,
      puuid: puuid,
      profileIconId: Math.floor(Math.random() * 50) + 500,
      summonerLevel: Math.floor(Math.random() * 300) + 150,
      revisionDate: Date.now() - 3600000,
    },
    league: [
      {
        leagueId: 'dynamic-league-1',
        queueType: 'RANKED_SOLO_5x5',
        tier: 'GRANDMASTER',
        rank: 'I',
        leaguePoints: 540,
        wins: 165,
        losses: 110,
        veteran: true,
        inactive: false,
        freshBlood: false,
        hotStreak: true,
      },
    ],
    masteries: [
      { championId: 266, championName: 'Aatrox', championLevel: 32, championPoints: 580000, wins: 45, losses: 22 },
      { championId: 58, championName: 'Renekton', championLevel: 24, championPoints: 420000, wins: 38, losses: 19 },
      { championId: 24, championName: 'Jax', championLevel: 28, championPoints: 490000, wins: 40, losses: 20 },
    ],
    matches: generatedMatches,
  };
};
