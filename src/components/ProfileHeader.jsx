import React, { useState, useEffect } from 'react';
import { RefreshCw, Star, Share2, Shield, Info, Check } from 'lucide-react';
import { getProfileIconUrl } from '../services/ddragon';
import { getRegionData } from '../constants/regions';

export const ProfileHeader = ({ 
  account, 
  summoner, 
  league, 
  regionId, 
  onRefresh, 
  isLoading,
  notice 
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  const region = getRegionData(regionId);
  const soloDuo = Array.isArray(league) ? league.find((l) => l.queueType === 'RANKED_SOLO_5x5') : null;
  const fullName = `${account?.gameName || ''}#${account?.tagLine || ''}`;

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('rift_saved_favorites') || '[]');
      setIsFavorite(favs.includes(fullName));
    } catch {
      setIsFavorite(false);
    }
  }, [fullName]);

  const toggleFavorite = () => {
    try {
      const favs = JSON.parse(localStorage.getItem('rift_saved_favorites') || '[]');
      let updated;
      if (favs.includes(fullName)) {
        updated = favs.filter((f) => f !== fullName);
        setIsFavorite(false);
      } else {
        updated = [...favs, fullName];
        setIsFavorite(true);
      }
      localStorage.setItem('rift_saved_favorites', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="profile-header-container">
      {notice && (
        <div className="profile-notice-banner">
          <Info size={16} className="notice-icon" />
          <span>{notice}</span>
        </div>
      )}

      <div className="profile-header-card">
        {/* Profile Avatar & Level Frame */}
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar-frame">
            <img
              src={getProfileIconUrl(summoner?.profileIconId)}
              alt="Icono de Invocador"
              className="profile-avatar-img"
            />
            <span className="profile-level-badge">{summoner?.summonerLevel || 1}</span>
          </div>
        </div>

        {/* Summoner Name & Information */}
        <div className="profile-info-content">
          <div className="profile-title-row">
            <h1 className="profile-name">
              {account?.gameName || 'Invocador'}
              <span className="profile-tag">#{account?.tagLine || 'LAN'}</span>
            </h1>
            <span className="profile-region-tag">{region.label}</span>
          </div>

          <div className="profile-meta-row">
            <div className="profile-ladder-rank">
              <Shield size={14} className="ladder-icon" />
              <span>
                Ladder Rank: <strong>{soloDuo ? `Top ${soloDuo.tier === 'CHALLENGER' ? '0.01%' : '1.2%'}` : 'Unranked'}</strong>
              </span>
            </div>
          </div>

          <div className="profile-actions-row">
            <button
              className="profile-action-btn primary"
              onClick={onRefresh}
              disabled={isLoading}
              title="Volver a consultar Riot API para traer las partidas y estadísticas más recientes"
            >
              <RefreshCw size={15} className={isLoading ? 'spinning' : ''} />
              <span>{isLoading ? 'Actualizando...' : 'Actualizar'}</span>
            </button>

            <button
              className={`profile-action-btn secondary ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
              title={isFavorite ? 'Eliminar de favoritos' : 'Guardar perfil en favoritos (localStorage)'}
            >
              <Star size={15} fill={isFavorite ? 'currentColor' : 'none'} />
              <span>{isFavorite ? 'Guardado' : 'Guardar'}</span>
            </button>

            <button
              className="profile-action-btn secondary"
              onClick={handleShare}
              title="Copiar enlace directo al portapapeles"
            >
              {copied ? <Check size={15} className="text-green" /> : <Share2 size={15} />}
              <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
