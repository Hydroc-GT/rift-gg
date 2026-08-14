import React from 'react';
import { Flame, Info } from 'lucide-react';
import { getRankEmblemUrl } from '../services/ddragon';

export const RankedSection = ({ league = [] }) => {
  const soloDuo = Array.isArray(league) ? league.find((l) => l.queueType === 'RANKED_SOLO_5x5') : null;
  const flex = Array.isArray(league) ? league.find((l) => l.queueType === 'RANKED_FLEX_SR') : null;

  const renderRankCard = (data, title) => {
    if (!data) {
      return (
        <div className="ranked-card unranked-compact">
          <div className="unranked-compact-row">
            <div className="unranked-title-group">
              <span className="unranked-queue-name">{title}</span>
              <Info size={14} className="unranked-info-icon" />
            </div>
            <span className="unranked-status-text">Sin clasificar</span>
          </div>
        </div>
      );
    }

    const totalGames = data.wins + data.losses;
    const winrate = totalGames > 0 ? ((data.wins / totalGames) * 100).toFixed(1) : '0';
    const isMasterPlus = ['MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(data.tier);

    return (
      <div className="ranked-card">
        <div className="ranked-card-header">
          <span className="queue-title">{title}</span>
          {data.hotStreak && (
            <span className="hot-streak-badge" title="Racha de victorias activa">
              <Flame size={13} />
              <span>Racha de Victorias</span>
            </span>
          )}
        </div>

        <div className="ranked-card-body">
          <div className="ranked-emblem-wrapper">
            <img
              src={getRankEmblemUrl(data.tier)}
              alt={data.tier}
              className="ranked-emblem-img"
            />
          </div>

          <div className="ranked-details">
            <div className="tier-row">
              <h4 className="tier-name">
                {data.tier} {isMasterPlus ? '' : data.rank}
              </h4>
              <span className="league-points">{data.leaguePoints} LP</span>
            </div>

            <div className="winrate-stats-row">
              <div className="win-loss-text">
                <span className="text-wins">{data.wins}V</span>
                <span className="text-losses">{data.losses}D</span>
                <span className="text-total">({totalGames} Partidas)</span>
              </div>
              <div className="winrate-percent-badge">
                Win Rate {winrate}%
              </div>
            </div>

            {/* Visual Winrate Bar */}
            <div className="winrate-bar-track">
              <div
                className="winrate-bar-fill"
                style={{ width: `${winrate}%` }}
                title={`Victorias: ${winrate}%`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ranked-section-container">
      {renderRankCard(soloDuo, 'Clasificatoria Solo/Dúo')}
      {renderRankCard(flex, 'Clasificatoria flexible')}
    </div>
  );
};
