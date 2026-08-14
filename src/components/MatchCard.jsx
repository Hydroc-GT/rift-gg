import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Flame, 
  Zap, 
  Swords, 
  Award 
} from 'lucide-react';
import { 
  getChampionIconUrl, 
  getItemIconUrl, 
  getSummonerSpellUrl, 
  getRuneIconUrl 
} from '../services/ddragon';
import { getQueueInfo } from '../constants/queues';
import { MatchDetails } from './MatchDetails';

export const MatchCard = ({ match, currentPuuid, onSelectSummoner }) => {
  const [expanded, setExpanded] = useState(false);

  if (!match?.info) return null;

  const info = match.info;
  const participants = info.participants || [];

  // Find our player in the participants
  const player = participants.find((p) => p.puuid === currentPuuid) || participants[0];
  if (!player) return null;

  const isWin = player.win;
  const isRemake = info.gameDuration < 300; // Less than 5 mins is remake

  const queue = getQueueInfo(info.queueId);

  // Time calculations
  const durationMin = Math.floor(info.gameDuration / 60);
  const durationSec = Math.floor(info.gameDuration % 60);
  const durationStr = `${durationMin}m ${durationSec < 10 ? '0' : ''}${durationSec}s`;

  const timeAgo = (creationTimestamp) => {
    const diffMs = Date.now() - creationTimestamp;
    const diffHours = Math.floor(diffMs / 3600000);
    if (diffHours < 1) return 'Hace unos minutos';
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    const diffDays = Math.floor(diffHours / 24);
    return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
  };

  // KDA & Stats
  const kdaRatio = ((player.kills + player.assists) / (player.deaths || 1)).toFixed(2);
  const totalCs = (player.totalMinionsKilled || 0) + (player.neutralMinionsKilled || 0);
  const csPerMin = durationMin > 0 ? (totalCs / durationMin).toFixed(1) : '0';

  // Team Kill Participation
  const teamId = player.teamId;
  const teamKills = participants
    .filter((p) => p.teamId === teamId)
    .reduce((acc, p) => acc + (p.kills || 0), 0);
  const killParticipation = teamKills > 0 
    ? Math.round(((player.kills + player.assists) / teamKills) * 100) 
    : 0;

  // Multikill badge
  const multiKillText = player.largestMultiKill === 5 ? 'PENTA KILL'
    : player.largestMultiKill === 4 ? 'QUADRA KILL'
    : player.largestMultiKill === 3 ? 'TRIPLE KILL'
    : player.largestMultiKill === 2 ? 'DOBLE ASESINATO'
    : null;

  // MVP Badge logic
  const isMvp = player.kills >= 10 && kdaRatio > 4;

  const items = [
    player.item0,
    player.item1,
    player.item2,
    player.item3,
    player.item4,
    player.item5,
  ];

  // Divide into Team 100 and Team 200 for participant column
  const blueTeam = participants.filter((p) => p.teamId === 100);
  const redTeam = participants.filter((p) => p.teamId === 200);

  const cardStatusClass = isRemake ? 'remake' : isWin ? 'victory' : 'defeat';

  return (
    <div className={`match-card-wrapper ${cardStatusClass}`}>
      <div className="match-card-main">
        {/* Left Column: Game Meta & Status */}
        <div className="match-meta-col">
          <span className="queue-badge">{queue.name}</span>
          <span className="time-ago-text">{timeAgo(info.gameCreation)}</span>
          <div className="status-divider"></div>
          <span className={`result-label ${cardStatusClass}`}>
            {isRemake ? 'Rehacer' : isWin ? 'Victoria' : 'Derrota'}
          </span>
          <span className="duration-text">{durationStr}</span>
        </div>

        {/* Center-Left: Champion & Spells & Runes */}
        <div className="match-champ-col">
          <div className="champ-avatar-box">
            <img
              src={getChampionIconUrl(player.championName)}
              alt={player.championName}
              className="champ-portrait-img"
            />
            <span className="champ-level-tag">{player.champLevel}</span>
          </div>

          <div className="spells-runes-grid">
            <img
              src={getSummonerSpellUrl(player.summoner1Id)}
              alt="Spell D"
              className="spell-rune-icon"
              title="Hechizo 1"
            />
            <img
              src={getSummonerSpellUrl(player.summoner2Id)}
              alt="Spell F"
              className="spell-rune-icon"
              title="Hechizo 2"
            />
            <img
              src={getRuneIconUrl(player.perks?.styles?.[0]?.style)}
              alt="Runa Primaria"
              className="spell-rune-icon rune"
              title="Runa Principal"
            />
            <img
              src={getRuneIconUrl(player.perks?.styles?.[1]?.style)}
              alt="Runa Secundaria"
              className="spell-rune-icon rune"
              title="Runa Secundaria"
            />
          </div>

          <div className="champ-name-box">
            <span className="champ-name-text">{player.championName}</span>
          </div>
        </div>

        {/* Center: KDA & Kill Participation */}
        <div className="match-kda-col">
          <div className="kda-numbers">
            <span className="kills">{player.kills}</span> /{' '}
            <span className="deaths">{player.deaths}</span> /{' '}
            <span className="assists">{player.assists}</span>
          </div>
          <div className="kda-ratio-line">
            <span className="ratio-badge">{kdaRatio}:1 KDA</span>
          </div>
          <div className="kp-badge">
            <span>P/Asesinatos {killParticipation}%</span>
          </div>

          {/* Special badges */}
          <div className="special-badges-row">
            {multiKillText && (
              <span className="badge-multikill">{multiKillText}</span>
            )}
            {isMvp && (
              <span className="badge-mvp">
                <Award size={11} /> MVP
              </span>
            )}
          </div>
        </div>

        {/* Center-Right: Items & CS & Vision */}
        <div className="match-items-col">
          <div className="items-grid">
            {items.map((itemId, i) => (
              <div key={i} className="item-slot">
                {itemId && itemId > 0 ? (
                  <img src={getItemIconUrl(itemId)} alt={`Item ${itemId}`} />
                ) : (
                  <div className="empty-item-slot" />
                )}
              </div>
            ))}
            <div className="item-slot trinket-slot">
              {player.item6 && player.item6 > 0 ? (
                <img src={getItemIconUrl(player.item6)} alt="Trinket" />
              ) : (
                <div className="empty-item-slot" />
              )}
            </div>
          </div>

          <div className="stats-sub-row">
            <span className="cs-text">
              CS <strong>{totalCs}</strong> ({csPerMin})
            </span>
            <span className="vision-text">
              <Eye size={12} /> {player.visionScore || 0}
            </span>
          </div>
        </div>

        {/* Right: 10 Participants List */}
        <div className="match-participants-col">
          <div className="team-col">
            {blueTeam.map((p) => {
              const isFocal = p.puuid === currentPuuid;
              const pName = p.riotIdGameName || p.summonerName;
              const pTag = p.riotIdTagline;
              const searchTarget = pTag ? `${pName}#${pTag}` : pName;
              return (
                <div 
                  key={p.puuid} 
                  className={`participant-mini ${isFocal ? 'focal-player' : ''}`}
                  onClick={() => onSelectSummoner(searchTarget)}
                  title={`${pName} (${p.championName})`}
                >
                  <img
                    src={getChampionIconUrl(p.championName)}
                    alt={p.championName}
                    className="part-champ-img"
                  />
                  <span className="part-name">{pName}</span>
                </div>
              );
            })}
          </div>

          <div className="team-col">
            {redTeam.map((p) => {
              const isFocal = p.puuid === currentPuuid;
              const pName = p.riotIdGameName || p.summonerName;
              const pTag = p.riotIdTagline;
              const searchTarget = pTag ? `${pName}#${pTag}` : pName;
              return (
                <div 
                  key={p.puuid} 
                  className={`participant-mini ${isFocal ? 'focal-player' : ''}`}
                  onClick={() => onSelectSummoner(searchTarget)}
                  title={`${pName} (${p.championName})`}
                >
                  <img
                    src={getChampionIconUrl(p.championName)}
                    alt={p.championName}
                    className="part-champ-img"
                  />
                  <span className="part-name">{pName}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expand Accordion Trigger Button */}
        <button
          className={`match-expand-btn ${cardStatusClass} ${expanded ? 'open' : ''}`}
          onClick={() => setExpanded(!expanded)}
          title={expanded ? 'Ocultar detalles' : 'Ver daño y estadísticas completas'}
        >
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Accordion Content */}
      {expanded && (
        <MatchDetails
          match={match}
          currentPuuid={currentPuuid}
          onSelectSummoner={onSelectSummoner}
        />
      )}
    </div>
  );
};
