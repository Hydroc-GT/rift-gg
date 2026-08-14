import React from 'react';
import {
  TrendingUp,
  Swords,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ currentTab, onSelectTab, isCollapsed, onToggleCollapse, onOpenApiKeyModal }) => {
  const menuItems = [
    { id: 'search', label: 'Buscador', icon: Search },
    { id: 'champions', label: 'Tier List & Campeones', icon: TrendingUp, badge: 'META' },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand" onClick={() => onSelectTab('search')}>
        <div className="brand-text-only">
          <span className="brand-name">RIFT<span className="brand-accent" align="center">.GG</span></span>
        </div>
      </div>

      <div className="sidebar-cta">
        <button
          className="plus-banner-btn"
          onClick={() => onSelectTab('champions')}
          title="Ver Meta Actual"
        >
          <Swords size={16} />
          {!isCollapsed && <span>Tier List Parche 26.16</span>}
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group-title">{!isCollapsed && 'EXPLORAR'}</div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
              title={item.label}
            >
              <Icon size={19} className="nav-icon" />
              {!isCollapsed && <span className="nav-label">{item.label}</span>}
              {!isCollapsed && item.badge && (
                <span className={`nav-badge ${item.badge.toLowerCase()}`}>{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          className="nav-item settings-item"
          onClick={onOpenApiKeyModal}
          title="Configuración de Riot API"
        >
          <Settings size={18} />
          {!isCollapsed && <span>Riot API & Modo Demo</span>}
        </button>

        <button
          className="collapse-btn"
          onClick={onToggleCollapse}
          title={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
};
