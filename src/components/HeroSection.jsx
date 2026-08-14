import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  Zap,
  TrendingUp,
  ChevronRight,
  Award,
  BarChart3,
  Star,
  X
} from 'lucide-react';
import { REGIONS } from '../constants/regions';

export const HeroSection = ({
  onSearch,
  currentRegion,
  onRegionChange,
  onSelectDemoProfile,
  onNavigateToTab
}) => {
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('rift_saved_favorites') || '[]');
      setFavorites(saved);
    } catch {
      setFavorites([]);
    }
  }, []);

  const handleRemoveFavorite = (favToRemove, e) => {
    e.stopPropagation();
    try {
      const updated = favorites.filter((f) => f !== favToRemove);
      setFavorites(updated);
      localStorage.setItem('rift_saved_favorites', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query, currentRegion);
  };

  const demoProfiles = [
    { name: 'Hide on bush#KR1', display: 'Faker (KR)', region: 'kr', tier: 'Challenger' },
    { name: 'G2 Caps#1323', display: 'Caps (EUW)', region: 'euw1', tier: 'Grandmaster' },
    { name: 'VJBYYTF0AO#EUW', display: 'Jojopyun (EUW)', region: 'euw1', tier: 'Challenger' },
  ];

  return (
    <div className="hero-container">
      {/* Background ambient lighting effects */}
      <div className="hero-ambient-glow"></div>
      <div className="hero-mesh-overlay"></div>

      <div className="hero-content">
        {/* Main Brand Title & Tagline */}
        <div className="hero-brand-section">
          <div className="hero-badge">
            <Sparkles size={14} className="hero-badge-icon" />
            <span>LOL ANALYTICS & SUMMONER STATS</span>
          </div>

          <h1 className="hero-title">
            RIFT<span className="hero-title-gradient">.GG</span>
          </h1>
          <p className="hero-subtitle">
            Estadísticas de invocador en tiempo real, historial de partidas, maestrías y análisis de daño
          </p>
        </div>

        {/* Central Search Bar */}
        <form className="hero-search-wrapper" onSubmit={handleSubmit}>
          <div className="hero-search-bar">
            <div className="hero-search-input-group">
              <Search size={20} className="hero-search-icon" />
              <input
                type="text"
                className="hero-search-input"
                placeholder="Busca por Invocador + Tag (ej: Faker#KR1)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>

            <div className="hero-search-actions">
              <div className="hero-region-wrapper">
                <select
                  value={currentRegion}
                  onChange={(e) => onRegionChange(e.target.value)}
                  className="hero-region-dropdown"
                >
                  {REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="hero-search-btn">
                <Search size={18} />
                <span>Buscar</span>
              </button>
            </div>
          </div>
        </form>

        {/* Saved Favorites Section (if any saved) */}
        {favorites.length > 0 && (
          <div className="hero-favorites-row">
            <div className="fav-label">
              <Star size={14} className="fav-gold-icon" fill="currentColor" />
              <span>Invocadores Guardados:</span>
            </div>
            <div className="fav-pills-list">
              {favorites.map((fav) => (
                <div key={fav} className="fav-pill-item">
                  <button
                    type="button"
                    className="fav-pill-btn"
                    onClick={() => onSearch(fav, currentRegion)}
                    title={`Abrir perfil de ${fav}`}
                  >
                    <span>{fav}</span>
                  </button>
                  <button
                    type="button"
                    className="fav-remove-btn"
                    onClick={(e) => handleRemoveFavorite(fav, e)}
                    title="Eliminar de guardados"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Demo Summoner Pills */}
        <div className="hero-quick-demos">
          <div className="demo-label">
            <Zap size={14} className="demo-zap-icon" />
            <span>Perfiles de Demostración:</span>
          </div>
          <div className="demo-pills-list">
            {demoProfiles.map((p) => (
              <button
                key={p.name}
                type="button"
                className="demo-pill"
                onClick={() => onSelectDemoProfile(p.name, p.region)}
                title={`Cargar estadísticas de ${p.display}`}
              >
                <span className="demo-pill-tier">{p.tier}</span>
                <span className="demo-pill-name">{p.display}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Feature Showcase Cards */}
        <div className="hero-feature-cards">
          <div
            className="feature-card"
            onClick={() => onNavigateToTab('champions')}
          >
            <div className="feature-card-header">
              <div className="feature-icon-badge meta">
                <TrendingUp size={20} />
              </div>
              <span className="feature-tag">PARCHE 26.16</span>
            </div>
            <h3 className="feature-card-title">Tier List de Campeones</h3>
            <p className="feature-card-desc">
              Descubre los mejores picks, winrates por línea y counters del parche actual. *(Nota: Datos simulados con fines de demostración técnica)*.
            </p>
            <div className="feature-card-link">
              <span>Explorar Meta</span>
              <ChevronRight size={16} />
            </div>
          </div>

          <div
            className="feature-card"
            onClick={() => onSelectDemoProfile('G2 Caps#1323', 'euw1')}
          >
            <div className="feature-card-header">
              <div className="feature-icon-badge leaderboards">
                <Award size={20} />
              </div>
              <span className="feature-tag gold">PRO STATS</span>
            </div>
            <h3 className="feature-card-title">Perfil de G2 Caps</h3>
            <p className="feature-card-desc">
              Consulta estadísticas de invocador profesional en EUW: Solo/Duo Grandmaster, maestrías y KDA.
            </p>
            <div className="feature-card-link">
              <span>Ver Estadísticas Caps</span>
              <ChevronRight size={16} />
            </div>
          </div>

          <div
            className="feature-card"
            onClick={() => onSelectDemoProfile('Hide on bush#KR1', 'kr')}
          >
            <div className="feature-card-header">
              <div className="feature-icon-badge damage">
                <BarChart3 size={20} />
              </div>
              <span className="feature-tag blue">ANALYTICS</span>
            </div>
            <h3 className="feature-card-title">Gráficos de Daño & KP%</h3>
            <p className="feature-card-desc">
              Desglose detallado de cada partida: daño a campeones, oro, visión, runas activas y build de items.
            </p>
            <div className="feature-card-link">
              <span>Ver Ejemplo Faker</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
