import React, { useState, useEffect } from 'react';
import { KeyRound, X, Check, ShieldAlert, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '../services/riotApi';

export const ApiKeyModal = ({ isOpen, onClose, onApiKeySaved }) => {
  const [apiKey, setApiKey] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredApiKey());
      setSaveSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setStoredApiKey(apiKey);
    setSaveSuccess(true);
    if (onApiKeySaved) onApiKeySaved(apiKey);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setApiKey('');
    setStoredApiKey('');
    if (onApiKeySaved) onApiKeySaved('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-box">
            <KeyRound size={20} className="text-accent" />
            <h3 className="modal-title">Configuración de Riot Games API</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Explanation banner */}
          <div className="modal-info-card">
            <ShieldAlert size={18} className="text-warning flex-shrink-0" />
            <div className="modal-info-text">
              <p className="modal-info-p">
                <strong>¿Cómo funcionan las llaves de Riot Games?</strong>
              </p>
              <p className="modal-info-p text-muted">
                Las llaves de desarrollo gratuitas (RGAPI) caducan cada <strong>24 horas</strong>. Por esa razón, esta aplicación incluye un <strong>Modo Demo inteligente</strong> con perfiles profesionales (Faker, Caps, Jojopyun, etc.) para ver un ejemplo básico del funcionamiento de la página.
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="modal-form">
            <label className="modal-label">
              Riot Games API Key (Opcional para búsquedas en tiempo real):
            </label>
            <div className="modal-input-group">
              <input
                type="text"
                placeholder="RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="modal-input"
              />
            </div>

            <div className="modal-help-row">
              <a
                href="https://developer.riotgames.com/"
                target="_blank"
                rel="noreferrer"
                className="modal-ext-link"
              >
                <span>Obtener llave en Riot Developer Portal</span>
                <ExternalLink size={13} />
              </a>

              {apiKey && (
                <button
                  type="button"
                  className="modal-clear-btn"
                  onClick={handleClear}
                >
                  Limpiar / Usar Solo Demo
                </button>
              )}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="modal-btn primary"
              >
                {saveSuccess ? (
                  <>
                    <Check size={16} />
                    <span>¡Guardado!</span>
                  </>
                ) : (
                  <span>Guardar Configuración</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
