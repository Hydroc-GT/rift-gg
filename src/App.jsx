import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProfileHeader } from './components/ProfileHeader';
import { RankedSection } from './components/RankedSection';
import { ChampionMasterySection } from './components/ChampionMasterySection';
import { MatchHistory } from './components/MatchHistory';
import { ChampionsView } from './components/ChampionsView';
import { LeaderboardView } from './components/LeaderboardView';
import { ApiKeyModal } from './components/ApiKeyModal';
import { SkeletonLoader } from './components/SkeletonLoader';
import { initDataDragon } from './services/ddragon';
import { fetchSummonerFullProfile, getStoredApiKey } from './services/riotApi';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import './App.css';

export function App() {
  const [activeTab, setActiveTab] = useState('search'); // 'search' | 'profile' | 'champions' | 'leaderboards'
  const [currentRegion, setCurrentRegion] = useState('la1');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(!!getStoredApiKey());

  const [summonerData, setSummonerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Initialize Data Dragon and handle URL parameters + Browser History (Back / Forward)
  useEffect(() => {
    initDataDragon();

    // 1. Check initial URL query parameters on page load
    const params = new URLSearchParams(window.location.search);
    const summonerParam = params.get('summoner');
    const regionParam = params.get('region') || 'la1';
    const tabParam = params.get('tab');

    if (summonerParam) {
      handleSearch(summonerParam, regionParam, false);
    } else if (tabParam) {
      setActiveTab(tabParam);
    }

    // 2. Listen to browser Back and Forward navigation events
    const handlePopState = (event) => {
      const urlParams = new URLSearchParams(window.location.search);
      const sParam = urlParams.get('summoner');
      const rParam = urlParams.get('region') || 'la1';
      const tParam = urlParams.get('tab');

      if (sParam) {
        handleSearch(sParam, rParam, false);
      } else if (tParam) {
        setActiveTab(tParam);
        setErrorMessage(null);
      } else {
        setActiveTab('search');
        setSummonerData(null);
        setErrorMessage(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSearch = async (rawQuery, regionId = currentRegion, addToHistory = true) => {
    if (!rawQuery || !rawQuery.trim()) return;

    setErrorMessage(null);
    setIsLoading(true);
    setActiveTab('profile');
    setCurrentRegion(regionId);

    let gameName = rawQuery.trim();
    let tagLine = regionId.toUpperCase();

    // Check if user entered "Name#Tag" format
    if (rawQuery.includes('#')) {
      const parts = rawQuery.split('#');
      gameName = parts[0].trim();
      tagLine = parts[1].trim();
    } else {
      if (regionId === 'kr') tagLine = 'KR1';
      else if (regionId === 'na1') tagLine = 'NA1';
      else if (regionId === 'euw1') tagLine = 'EUW';
      else if (regionId === 'la1') tagLine = 'LAN';
      else if (regionId === 'la2') tagLine = 'LAS';
      else tagLine = '001';
    }

    const fullQuery = `${gameName}#${tagLine}`;

    // Update browser history (enables browser Back/Forward navigation)
    if (addToHistory) {
      const newUrl = `${window.location.pathname}?summoner=${encodeURIComponent(fullQuery)}&region=${encodeURIComponent(regionId)}`;
      window.history.pushState({ tab: 'profile', summoner: fullQuery, region: regionId }, '', newUrl);
    }

    try {
      const data = await fetchSummonerFullProfile(gameName, tagLine, regionId);
      setSummonerData(data);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Error al buscar el invocador.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTab = (tab, addToHistory = true) => {
    setActiveTab(tab);
    setErrorMessage(null);
    if (addToHistory) {
      const newUrl = tab === 'search' ? window.location.pathname : `${window.location.pathname}?tab=${tab}`;
      window.history.pushState({ tab }, '', newUrl);
    }
  };

  const handleSelectSummoner = (fullNameWithTag, region = currentRegion) => {
    handleSearch(fullNameWithTag, region, true);
  };

  const handleRefresh = () => {
    if (summonerData?.account) {
      const fullName = `${summonerData.account.gameName}#${summonerData.account.tagLine}`;
      handleSearch(fullName, currentRegion, false);
    }
  };

  const handleApiKeySaved = (key) => {
    setHasApiKey(!!key);
  };

  return (
    <div className="app-container">
      {/* Left Navigation Sidebar */}
      <Sidebar
        currentTab={activeTab}
        onSelectTab={handleSelectTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

      {/* Main Layout Area */}
      <div className={`main-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Header */}
        <Header
          currentRegion={currentRegion}
          onRegionChange={setCurrentRegion}
          onSearch={(query, region) => handleSearch(query, region, true)}
          showCompactSearch={activeTab === 'profile' || activeTab === 'champions'}
          isMockMode={!hasApiKey || summonerData?.isMock}
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          onResetToHome={() => handleSelectTab('search')}
        />

        {/* Dynamic Main Content */}
        <main className="content-viewport">
          {/* TAB 1: Hero Search Landing */}
          {activeTab === 'search' && (
            <HeroSection
              onSearch={(query, region) => handleSearch(query, region, true)}
              currentRegion={currentRegion}
              onRegionChange={setCurrentRegion}
              onSelectDemoProfile={(query, region) => handleSearch(query, region, true)}
              onNavigateToTab={handleSelectTab}
            />
          )}

          {/* TAB 2: Summoner Profile */}
          {activeTab === 'profile' && (
            <div className="profile-view-container">
              {/* Back to search button */}
              <div className="view-navigation-bar">
                <button
                  className="back-to-home-btn"
                  onClick={() => handleSelectTab('search')}
                >
                  <ArrowLeft size={16} />
                  <span>Volver al Buscador</span>
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="error-banner">
                  <AlertCircle size={20} className="error-icon" />
                  <div className="error-text">
                    <h4>No se pudo cargar el perfil</h4>
                    <p>{errorMessage}</p>
                  </div>
                  <button
                    className="error-action-btn"
                    onClick={() => handleSearch('Hide on bush#KR1', 'kr', true)}
                  >
                    Ver Faker (Demo)
                  </button>
                </div>
              )}

              {/* Loading State */}
              {isLoading && <SkeletonLoader />}

              {/* Summoner Content */}
              {!isLoading && summonerData && (
                <>
                  <ProfileHeader
                    account={summonerData.account}
                    summoner={summonerData.summoner}
                    league={summonerData.league}
                    regionId={currentRegion}
                    onRefresh={handleRefresh}
                    isLoading={isLoading}
                    notice={summonerData.notice}
                  />

                  <div className="profile-main-layout">
                    {/* Left Column: Ranked Info & Champion Mastery */}
                    <div className="profile-left-col">
                      <RankedSection league={summonerData.league} />
                      <ChampionMasterySection
                        masteries={summonerData.masteries}
                        matches={summonerData.matches}
                        currentPuuid={summonerData.summoner?.puuid || summonerData.account?.puuid}
                      />
                    </div>

                    {/* Right Column: Match History */}
                    <div className="profile-right-col">
                      <MatchHistory
                        matches={summonerData.matches}
                        currentPuuid={summonerData.summoner?.puuid || summonerData.account?.puuid}
                        onSelectSummoner={handleSelectSummoner}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 3: Champions Meta & Tier List */}
          {activeTab === 'champions' && (
            <ChampionsView onSelectChampion={(champ) => handleSearch(champ, currentRegion, true)} />
          )}

          {/* Legal Disclaimer Footer (Riot Games Compliance) */}
          <footer className="app-footer">
            <div className="footer-content">
              <div className="footer-brand-row">
                <span className="footer-brand-name">RIFT<span className="text-accent">.GG</span></span>
                <span className="footer-copy">© {new Date().getFullYear()} — Plataforma de análisis de League of Legends</span>
              </div>
              <p className="footer-disclaimer-text">
                RIFT.GG isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
              </p>
            </div>
          </footer>
        </main>
      </div>

      {/* Modal for Riot API Key settings */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onApiKeySaved={handleApiKeySaved}
      />
    </div>
  );
}

export default App;
