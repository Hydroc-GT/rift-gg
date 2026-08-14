import React, { useState } from 'react';
import { Trophy, Globe, Flame, Award, ChevronRight } from 'lucide-react';
import { getProfileIconUrl, getRankEmblemUrl, getChampionIconUrl } from '../services/ddragon';
import { REGIONS } from '../constants/regions';

export const LeaderboardView = ({ onSelectSummoner }) => {
  const [selectedRegion, setSelectedRegion] = useState('kr');

  const leaderboards = {
    kr: [
      { rank: 1, name: 'Hide on bush', tag: 'KR1', iconId: 6, tier: 'CHALLENGER', lp: 1642, wins: 412, losses: 260, topChamps: ['Ahri', 'Azir', 'Orianna'] },
      { rank: 2, name: 'Canyon', tag: 'KR1', iconId: 540, tier: 'CHALLENGER', lp: 1580, wins: 389, losses: 245, topChamps: ['LeeSin', 'Nidalee', 'JarvanIV'] },
      { rank: 3, name: 'Chovy', tag: 'KR1', iconId: 588, tier: 'CHALLENGER', lp: 1534, wins: 395, losses: 251, topChamps: ['Yone', 'Hwei', 'Sylas'] },
      { rank: 4, name: 'Viper', tag: 'KR1', iconId: 512, tier: 'CHALLENGER', lp: 1490, wins: 370, losses: 238, topChamps: ['Kaisa', 'Jinx', 'Ezreal'] },
      { rank: 5, name: 'Keria', tag: 'KR1', iconId: 602, tier: 'CHALLENGER', lp: 1455, wins: 360, losses: 230, topChamps: ['Thresh', 'Nautilus', 'Lulu'] },
    ],
    la1: [
      { rank: 1, name: 'Hydra', tag: 'LAN', iconId: 588, tier: 'CHALLENGER', lp: 1120, wins: 285, losses: 170, topChamps: ['LeeSin', 'Viego', 'JarvanIV'] },
      { rank: 2, name: 'Seiya', tag: 'LAN', iconId: 4353, tier: 'CHALLENGER', lp: 1045, wins: 260, losses: 155, topChamps: ['Syndra', 'Orianna', 'Ahri'] },
      { rank: 3, name: 'Buggax', tag: 'LAN', iconId: 3500, tier: 'CHALLENGER', lp: 980, wins: 240, losses: 148, topChamps: ['Aatrox', 'Renekton', 'Jax'] },
      { rank: 4, name: 'WhiteLotus', tag: 'LAN', iconId: 4120, tier: 'CHALLENGER', lp: 920, wins: 230, losses: 140, topChamps: ['Jinx', 'Kaisa', 'Caitlyn'] },
    ],
    euw1: [
      { rank: 1, name: 'G2 Caps', tag: 'EUW', iconId: 548, tier: 'CHALLENGER', lp: 1480, wins: 390, losses: 250, topChamps: ['Tristana', 'Syndra', 'Neeko'] },
      { rank: 2, name: 'Agurin', tag: 'EUW', iconId: 510, tier: 'CHALLENGER', lp: 1420, wins: 375, losses: 240, topChamps: ['JarvanIV', 'Elise', 'Khazix'] },
      { rank: 3, name: 'Upset', tag: 'EUW', iconId: 620, tier: 'CHALLENGER', lp: 1390, wins: 360, losses: 232, topChamps: ['Kaisa', 'Aphelios', 'Varus'] },
    ],
    na1: [
      { rank: 1, name: 'Jojopyun', tag: 'NA1', iconId: 4353, tier: 'CHALLENGER', lp: 1390, wins: 340, losses: 210, topChamps: ['Akali', 'Hwei', 'Jayce'] },
      { rank: 2, name: 'Bwipo', tag: 'NA1', iconId: 588, tier: 'CHALLENGER', lp: 1310, wins: 320, losses: 205, topChamps: ['Aatrox', 'Olaf', 'Sion'] },
      { rank: 3, name: 'Inspired', tag: 'NA1', iconId: 512, tier: 'CHALLENGER', lp: 1285, wins: 310, losses: 198, topChamps: ['LeeSin', 'Viego', 'Sejuani'] },
    ],
  };

  const currentList = leaderboards[selectedRegion] || leaderboards.kr;

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <div className="view-badge gold">
            <Trophy size={14} />
            <span>TOP LADDER RANKING GLOBAL</span>
          </div>
          <h2 className="view-title">Ranking de Jugadores Challenger</h2>
          <p className="view-subtitle">
            Los mejores invocadores con mayor puntuación de LP en Solo/Duo
          </p>
        </div>

        {/* Region filter */}
        <div className="leaderboard-region-tabs">
          {[
            { id: 'kr', label: 'Corea (KR)' },
            { id: 'la1', label: 'Latinoamérica Norte (LAN)' },
            { id: 'euw1', label: 'Europa Oeste (EUW)' },
            { id: 'na1', label: 'Norteamérica (NA)' },
          ].map((r) => (
            <button
              key={r.id}
              className={`lead-region-btn ${selectedRegion === r.id ? 'active' : ''}`}
              onClick={() => setSelectedRegion(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="tier-table-container">
        <table className="tier-table">
          <thead>
            <tr>
              <th className="col-rank">#</th>
              <th className="col-summoner">Invocador</th>
              <th className="col-tier">Nivel / Rango</th>
              <th className="col-lp">LP</th>
              <th className="col-winrate">Win Rate</th>
              <th className="col-champs">Campeones Clave</th>
              <th className="col-action">Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentList.map((player) => {
              const totalGames = player.wins + player.losses;
              const winrate = ((player.wins / totalGames) * 100).toFixed(1);

              return (
                <tr key={player.rank} className="tier-table-row">
                  <td className="col-rank">
                    <span className={`rank-num-badge ${player.rank <= 3 ? `top-${player.rank}` : ''}`}>
                      {player.rank}
                    </span>
                  </td>
                  <td className="col-summoner">
                    <div className="table-summoner-cell">
                      <img
                        src={getProfileIconUrl(player.iconId)}
                        alt={player.name}
                        className="table-avatar-img"
                      />
                      <div className="table-summoner-names">
                        <span className="table-summoner-game-name">{player.name}</span>
                        <span className="table-summoner-tag">#{player.tag}</span>
                      </div>
                    </div>
                  </td>
                  <td className="col-tier">
                    <div className="table-tier-cell">
                      <img
                        src={getRankEmblemUrl(player.tier)}
                        alt={player.tier}
                        className="table-tier-icon"
                      />
                      <span>{player.tier}</span>
                    </div>
                  </td>
                  <td className="col-lp">
                    <span className="lp-highlight">{player.lp.toLocaleString()} LP</span>
                  </td>
                  <td className="col-winrate">
                    <div className="lead-winrate-cell">
                      <span className="lead-winrate-pct">{winrate}%</span>
                      <span className="lead-games-sub">
                        {player.wins}V {player.losses}D
                      </span>
                    </div>
                  </td>
                  <td className="col-champs">
                    <div className="lead-champs-row">
                      {player.topChamps.map((c) => (
                        <img
                          key={c}
                          src={getChampionIconUrl(c)}
                          alt={c}
                          className="lead-champ-icon"
                          title={c}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="col-action">
                    <button
                      className="lead-inspect-btn"
                      onClick={() => onSelectSummoner(`${player.name}#${player.tag}`, selectedRegion)}
                    >
                      <span>Ver Perfil</span>
                      <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
