import React from 'react';
import { 
  getChampionIconUrl, 
  getItemIconUrl, 
  getSummonerSpellUrl, 
  getRuneIconUrl 
} from '../services/ddragon';

export const MatchDetails = ({ match, currentPuuid, onSelectSummoner }) => {
  const participants = match?.info?.participants || [];
  if (participants.length === 0) return null;

  const team100 = participants.filter((p) => p.teamId === 100);
  const team200 = participants.filter((p) => p.teamId === 200);

  const team1Win = team100[0]?.win;
  const team2Win = team200[0]?.win;

  // Find max damage in game to normalize damage bars
  const maxDamage = Math.max(...participants.map((p) => p.totalDamageDealtToChampions || 1));

  const renderTeamTable = (teamParticipants, isWin, teamName) => {
    const teamKills = teamParticipants.reduce((acc, p) => acc + (p.kills || 0), 0);
    const teamGold = teamParticipants.reduce((acc, p) => acc + (p.goldEarned || 0), 0);

    return (
      <div className={`details-team-block ${isWin ? 'win-team' : 'loss-team'}`}>
        <div className="details-team-header">
          <div className="details-team-title">
            <span className={`team-badge ${isWin ? 'win' : 'loss'}`}>
              {isWin ? 'Victoria' : 'Derrota'} ({teamName})
            </span>
            <span className="team-stats-summary">
              Asesinatos: <strong>{teamKills}</strong> • Oro: <strong>{(teamGold / 1000).toFixed(1)}k</strong>
            </span>
          </div>
        </div>

        <div className="details-table">
          <div className="details-table-head">
            <div className="col-player">Invocador</div>
            <div className="col-kda">KDA</div>
            <div className="col-damage">Daño Infligido</div>
            <div className="col-wards">Visión</div>
            <div className="col-cs">CS</div>
            <div className="col-items">Objetos</div>
          </div>

          <div className="details-table-body">
            {teamParticipants.map((p) => {
              const isCurrent = p.puuid === currentPuuid;
              const kdaRatio = ((p.kills + p.assists) / (p.deaths || 1)).toFixed(2);
              const dmgPercent = Math.min(100, Math.round((p.totalDamageDealtToChampions / maxDamage) * 100));
              const totalCs = (p.totalMinionsKilled || 0) + (p.neutralMinionsKilled || 0);

              const items = [p.item0, p.item1, p.item2, p.item3, p.item4, p.item5];

              return (
                <div key={p.puuid} className={`details-row ${isCurrent ? 'highlight-player' : ''}`}>
                  {/* Player & Champ */}
                  <div className="col-player">
                    <div className="champ-avatar-small">
                      <img
                        src={getChampionIconUrl(p.championName)}
                        alt={p.championName}
                        className="champ-img"
                      />
                      <span className="champ-lvl">{p.champLevel}</span>
                    </div>

                    <div className="spells-col-mini">
                      <img
                        src={getSummonerSpellUrl(p.summoner1Id)}
                        alt="Spell 1"
                        className="spell-icon-tiny"
                      />
                      <img
                        src={getSummonerSpellUrl(p.summoner2Id)}
                        alt="Spell 2"
                        className="spell-icon-tiny"
                      />
                    </div>

                    <div 
                      className="player-name-link"
                      onClick={() => {
                        const pName = p.riotIdGameName || p.summonerName;
                        const pTag = p.riotIdTagline;
                        onSelectSummoner(pTag ? `${pName}#${pTag}` : pName);
                      }}
                      title="Ver perfil de este invocador"
                    >
                      <span className="name-text">{p.riotIdGameName || p.summonerName}</span>
                      {isCurrent && <span className="you-badge">TÚ</span>}
                    </div>
                  </div>

                  {/* KDA */}
                  <div className="col-kda">
                    <span className="kda-nums">
                      {p.kills}/<span className="death-count">{p.deaths}</span>/{p.assists}
                    </span>
                    <span className="kda-ratio-mini">({kdaRatio})</span>
                  </div>

                  {/* Damage bar */}
                  <div className="col-damage">
                    <div className="dmg-number">
                      {p.totalDamageDealtToChampions ? p.totalDamageDealtToChampions.toLocaleString() : '0'}
                    </div>
                    <div className="dmg-bar-bg">
                      <div
                        className={`dmg-bar-fill ${isWin ? 'win-bar' : 'loss-bar'}`}
                        style={{ width: `${dmgPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Vision */}
                  <div className="col-wards">
                    <span className="vision-score">{p.visionScore || 0}</span>
                  </div>

                  {/* CS */}
                  <div className="col-cs">
                    <span className="cs-count">{totalCs}</span>
                  </div>

                  {/* Items */}
                  <div className="col-items">
                    <div className="items-row-mini">
                      {items.map((item, i) => (
                        <div key={i} className="item-slot-mini">
                          {item && item > 0 ? (
                            <img src={getItemIconUrl(item)} alt={`Item ${item}`} />
                          ) : (
                            <div className="empty-item-mini" />
                          )}
                        </div>
                      ))}
                      <div className="item-slot-mini trinket">
                        {p.item6 && p.item6 > 0 ? (
                          <img src={getItemIconUrl(p.item6)} alt="Trinket" />
                        ) : (
                          <div className="empty-item-mini" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="match-details-accordion">
      {renderTeamTable(team100, team1Win, 'Equipo Azul')}
      {renderTeamTable(team200, team2Win, 'Equipo Rojo')}
    </div>
  );
};
