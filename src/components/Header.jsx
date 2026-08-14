import React, { useState } from 'react';
import { Search, Globe, KeyRound, Sparkles, Code2, RefreshCw } from 'lucide-react';
import { REGIONS } from '../constants/regions';

export const Header = ({ 
  currentRegion, 
  onRegionChange, 
  onSearch, 
  showCompactSearch,
  isMockMode,
  onOpenApiKeyModal,
  onResetToHome
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query, currentRegion);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="mobile-brand" onClick={onResetToHome}>
          <Sparkles size={20} className="brand-icon" />
          <span className="brand-name">RIFT<span className="brand-accent">.GG</span></span>
        </button>

        {showCompactSearch && (
          <form className="compact-search-form" onSubmit={handleSubmit}>
            <div className="compact-search-box">
              <Search size={16} className="search-icon-muted" />
              <input
                type="text"
                placeholder="Buscar invocador (ej: Faker#KR1)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="compact-search-input"
              />
              <select
                value={currentRegion}
                onChange={(e) => onRegionChange(e.target.value)}
                className="compact-region-select"
              >
                {REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
              <button type="submit" className="compact-search-btn">
                Buscar
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="header-right">
        {/* API Status Badge */}
        <button 
          className={`api-status-badge ${isMockMode ? 'demo' : 'live'}`}
          onClick={onOpenApiKeyModal}
          title={isMockMode ? 'Operando en Modo Demo (100% Funcional)' : 'Operando con Riot API en vivo'}
        >
          <span className="status-dot"></span>
          <span className="status-text">{isMockMode ? 'Demo Mode' : 'Live Riot API'}</span>
          <KeyRound size={13} className="key-icon" />
        </button>

        {/* Region Selector */}
        <div className="region-selector-pill">
          <Globe size={14} className="globe-icon" />
          <select
            value={currentRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="header-region-select"
          >
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label} - {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* GitHub / CV Link */}
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer"
          className="header-icon-link"
          title="Ver Código en GitHub"
        >
          <Code2 size={18} />
        </a>
      </div>
    </header>
  );
};
