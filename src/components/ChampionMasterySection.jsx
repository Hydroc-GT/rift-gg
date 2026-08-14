import React from 'react';
import { Award, Flame } from 'lucide-react';
import { getChampionIconUrl, getChampionNameById } from '../services/ddragon';

export const ChampionMasterySection = ({ masteries = [] }) => {
  if (!masteries || masteries.length === 0) return null;

  const formatPoints = (pts) => {
    if (!pts) return '0';
    if (pts >= 1000000) return `${(pts / 1000000).toFixed(1)}M`;
    if (pts >= 1000) return `${(pts / 1000).toFixed(0)}k`;
    return pts.toLocaleString();
  };

  return (
    <div className="mastery-section-card">
      <div className="section-title-row">
        <div className="section-title-left">
          <Award size={18} className="text-accent" />
          <h3 className="section-title">Maestría de Campeones</h3>
        </div>
      </div>

      <div className="mastery-list">
        {masteries.slice(0, 5).map((m, index) => {
          const champName = m.championName || getChampionNameById(m.championId);

          return (
            <div key={m.championId || index} className="mastery-item">
              <div className="mastery-champ-col">
                <div className="mastery-icon-wrapper">
                  <img
                    src={getChampionIconUrl(m.championName || m.championId)}
                    alt={champName}
                    className="mastery-champ-img"
                  />
                  <span className="mastery-lvl-badge">{m.championLevel || 7}</span>
                </div>
                <div className="mastery-champ-info">
                  <span className="mastery-champ-name">{champName}</span>
                  <span className="mastery-points">{formatPoints(m.championPoints)} puntos</span>
                </div>
              </div>

              <div className="mastery-lvl-col">
                <span className="mastery-lvl-text">Nivel {m.championLevel || 7}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
