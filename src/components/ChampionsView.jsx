import React, { useState } from 'react';
import { TrendingUp, Search, Swords, Shield, Zap, Sparkles, Filter } from 'lucide-react';
import { getChampionIconUrl } from '../services/ddragon';

export const ChampionsView = ({ onSelectChampion }) => {
  const [activeRole, setActiveRole] = useState('ALL');
  const [searchChamp, setSearchChamp] = useState('');

  const championsList = [
    { name: 'Ahri', role: 'MID', tier: 'S+', winrate: '52.4%', pickrate: '14.2%', banrate: '8.5%', counter: 'Sylas' },
    { name: 'Aatrox', role: 'TOP', tier: 'S+', winrate: '51.8%', pickrate: '11.5%', banrate: '12.1%', counter: 'Fiora' },
    { name: 'LeeSin', role: 'JUNGLE', tier: 'S+', winrate: '50.9%', pickrate: '18.4%', banrate: '15.3%', counter: 'Poppy' },
    { name: 'Jinx', role: 'ADC', tier: 'S+', winrate: '52.1%', pickrate: '21.0%', banrate: '9.4%', counter: 'Twitch' },
    { name: 'Thresh', role: 'SUPPORT', tier: 'S+', winrate: '51.5%', pickrate: '16.8%', banrate: '7.2%', counter: 'Morgana' },
    { name: 'Viego', role: 'JUNGLE', tier: 'S', winrate: '51.2%', pickrate: '12.9%', banrate: '10.8%', counter: 'Rammus' },
    { name: 'Yone', role: 'MID', tier: 'S', winrate: '50.4%', pickrate: '13.5%', banrate: '14.0%', counter: 'Pantheon' },
    { name: 'Jax', role: 'TOP', tier: 'S', winrate: '51.6%', pickrate: '9.8%', banrate: '11.5%', counter: 'Garen' },
    { name: 'Kaisa', role: 'ADC', tier: 'S', winrate: '50.8%', pickrate: '24.2%', banrate: '6.1%', counter: 'Draven' },
    { name: 'Nautilus', role: 'SUPPORT', tier: 'S', winrate: '51.0%', pickrate: '14.1%', banrate: '5.8%', counter: 'Leona' },
    { name: 'Syndra', role: 'MID', tier: 'A', winrate: '50.6%', pickrate: '8.4%', banrate: '4.2%', counter: 'Fizz' },
    { name: 'Darius', role: 'TOP', tier: 'A', winrate: '51.1%', pickrate: '8.9%', banrate: '16.4%', counter: 'Vayne' },
    { name: 'Graves', role: 'JUNGLE', tier: 'A', winrate: '50.3%', pickrate: '9.5%', banrate: '6.7%', counter: 'Evelynn' },
    { name: 'Caitlyn', role: 'ADC', tier: 'A', winrate: '49.8%', pickrate: '17.2%', banrate: '8.1%', counter: 'Jhin' },
    { name: 'Lulu', role: 'SUPPORT', tier: 'A', winrate: '50.7%', pickrate: '10.3%', banrate: '3.9%', counter: 'Blitzcrank' },
  ];

  const roles = [
    { id: 'ALL', label: 'Todos' },
    { id: 'TOP', label: 'Top' },
    { id: 'JUNGLE', label: 'Jungle' },
    { id: 'MID', label: 'Mid' },
    { id: 'ADC', label: 'ADC' },
    { id: 'SUPPORT', label: 'Support' },
  ];

  const filteredChamps = championsList.filter((c) => {
    const matchesRole = activeRole === 'ALL' || c.role === activeRole;
    const matchesSearch = c.name.toLowerCase().includes(searchChamp.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <div className="view-badge">
            <TrendingUp size={14} />
            <span>META & TIER LIST PARCHE 26.16</span>
          </div>
          <h2 className="view-title">Ranking de Campeones de League of Legends</h2>
          <p className="view-subtitle">
            Estadísticas basadas en partidas clasificatorias Platino+ en todas las regiones globales
          </p>
          <p className="view-disclaimer">
            Nota: Los datos de winrate, tiers y counters de esta sección son simulados con fines de demostración técnica.
          </p>
        </div>

        <div className="view-search-box">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            placeholder="Buscar campeón..."
            value={searchChamp}
            onChange={(e) => setSearchChamp(e.target.value)}
            className="view-search-input"
          />
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="role-filters-bar">
        {roles.map((r) => (
          <button
            key={r.id}
            className={`role-tab ${activeRole === r.id ? 'active' : ''}`}
            onClick={() => setActiveRole(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Champions Tier List Table */}
      <div className="tier-table-container">
        <table className="tier-table">
          <thead>
            <tr>
              <th className="col-rank">#</th>
              <th className="col-champion">Campeón</th>
              <th className="col-tier">Tier</th>
              <th className="col-role">Rol</th>
              <th className="col-winrate">Win Rate</th>
              <th className="col-pickrate">Pick Rate</th>
              <th className="col-banrate">Ban Rate</th>
              <th className="col-counter">Peor Counter</th>
            </tr>
          </thead>
          <tbody>
            {filteredChamps.map((c, index) => (
              <tr key={c.name} className="tier-table-row">
                <td className="col-rank">{index + 1}</td>
                <td className="col-champion">
                  <div className="table-champ-cell">
                    <img
                      src={getChampionIconUrl(c.name)}
                      alt={c.name}
                      className="table-champ-img"
                    />
                    <span className="table-champ-name">{c.name}</span>
                  </div>
                </td>
                <td className="col-tier">
                  <span className={`tier-badge-pill ${c.tier.replace('+', '-plus').toLowerCase()}`}>
                    {c.tier}
                  </span>
                </td>
                <td className="col-role">
                  <span className="role-tag">{c.role}</span>
                </td>
                <td className="col-winrate">
                  <span className="highlight-winrate">{c.winrate}</span>
                </td>
                <td className="col-pickrate">{c.pickrate}</td>
                <td className="col-banrate">{c.banrate}</td>
                <td className="col-counter">
                  <div className="counter-cell">
                    <img
                      src={getChampionIconUrl(c.counter)}
                      alt={c.counter}
                      className="counter-mini-img"
                    />
                    <span>{c.counter}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
