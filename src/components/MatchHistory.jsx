import React, { useState } from 'react';
import { History, Filter, PieChart, Shield } from 'lucide-react';
import { MatchCard } from './MatchCard';

export const MatchHistory = ({ matches = [], currentPuuid, onSelectSummoner }) => {
  const [filterQueue, setFilterQueue] = useState('all');

  if (!matches || matches.length === 0) {
    return (
      <div className="match-history-empty">
        <History size={32} className="text-muted" />
        <h4>No se encontraron partidas recientes</h4>
        <p>Este invocador no tiene partidas registradas en el periodo reciente.</p>
      </div>
    );
  }

  // Filter matches based on selected queue
  const filteredMatches = matches.filter((m) => {
    if (filterQueue === 'all') return true;
    if (filterQueue === 'ranked') return m.info?.queueId === 420 || m.info?.queueId === 440;
    if (filterQueue === 'solo') return m.info?.queueId === 420;
    if (filterQueue === 'flex') return m.info?.queueId === 440;
    if (filterQueue === 'aram') return m.info?.queueId === 450;
    return true;
  });

  // Calculate summary statistics
  let totalWins = 0;
  let totalLosses = 0;
  let totalKills = 0;
  let totalDeaths = 0;
  let totalAssists = 0;

  filteredMatches.forEach((m) => {
    const p = m.info?.participants?.find((part) => part.puuid === currentPuuid);
    if (p) {
      if (p.win) totalWins++;
      else totalLosses++;
      totalKills += p.kills || 0;
      totalDeaths += p.deaths || 0;
      totalAssists += p.assists || 0;
    }
  });

  const totalGames = totalWins + totalLosses;
  const winrate = totalGames > 0 ? ((totalWins / totalGames) * 100).toFixed(0) : '0';
  const avgKills = totalGames > 0 ? (totalKills / totalGames).toFixed(1) : '0';
  const avgDeaths = totalGames > 0 ? (totalDeaths / totalGames).toFixed(1) : '0';
  const avgAssists = totalGames > 0 ? (totalAssists / totalGames).toFixed(1) : '0';
  const avgKda = totalGames > 0 ? ((totalKills + totalAssists) / (totalDeaths || 1)).toFixed(2) : '0';

  return (
    <div className="match-history-container">
      {/* Queue Filter Tabs & Stats Summary Bar */}
      <div className="history-header-card">
        <div className="queue-filter-tabs">
          <button
            className={`filter-tab ${filterQueue === 'all' ? 'active' : ''}`}
            onClick={() => setFilterQueue('all')}
          >
            Todas las Colas
          </button>
          <button
            className={`filter-tab ${filterQueue === 'solo' ? 'active' : ''}`}
            onClick={() => setFilterQueue('solo')}
          >
            Solo/Dúo
          </button>
          <button
            className={`filter-tab ${filterQueue === 'flex' ? 'active' : ''}`}
            onClick={() => setFilterQueue('flex')}
          >
            Flexible
          </button>
          <button
            className={`filter-tab ${filterQueue === 'aram' ? 'active' : ''}`}
            onClick={() => setFilterQueue('aram')}
          >
            ARAM
          </button>
        </div>

        {/* 10-Game Summary Widget */}
        {totalGames > 0 && (
          <div className="history-summary-widget">
            <div className="summary-col-record">
              <span className="summary-games-label">{totalGames} Partidas</span>
              <div className="summary-wl-counts">
                <span className="text-win">{totalWins}V</span>
                <span className="text-loss">{totalLosses}D</span>
                <span className="summary-winrate-tag">({winrate}% WR)</span>
              </div>
            </div>

            <div className="summary-col-kda">
              <span className="summary-kda-label">Promedio KDA</span>
              <div className="summary-kda-nums">
                {avgKills} / <span className="text-loss">{avgDeaths}</span> / {avgAssists}
              </div>
              <span className="summary-ratio-tag">{avgKda}:1 KDA</span>
            </div>
          </div>
        )}
      </div>

      {/* List of Match Cards */}
      <div className="match-cards-list">
        {filteredMatches.map((match, idx) => (
          <MatchCard
            key={match.metadata?.matchId || idx}
            match={match}
            currentPuuid={currentPuuid}
            onSelectSummoner={onSelectSummoner}
          />
        ))}
      </div>
    </div>
  );
};
