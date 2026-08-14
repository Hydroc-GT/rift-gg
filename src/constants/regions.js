export const REGIONS = [
  { id: 'la1', label: 'LAN', continent: 'americas', name: 'Latin America North' },
  { id: 'la2', label: 'LAS', continent: 'americas', name: 'Latin America South' },
  { id: 'na1', label: 'NA', continent: 'americas', name: 'North America' },
  { id: 'euw1', label: 'EUW', continent: 'europe', name: 'Europe West' },
  { id: 'eun1', label: 'EUNE', continent: 'europe', name: 'Europe Nordic & East' },
  { id: 'kr', label: 'KR', continent: 'asia', name: 'Korea' },
  { id: 'br1', label: 'BR', continent: 'americas', name: 'Brazil' },
  { id: 'jp1', label: 'JP', continent: 'asia', name: 'Japan' },
  { id: 'oc1', label: 'OCE', continent: 'sea', name: 'Oceania' },
];

export const getRegionData = (regionId) => {
  return REGIONS.find((r) => r.id === regionId) || REGIONS[0];
};

export const getContinentForRegion = (regionId) => {
  const region = getRegionData(regionId);
  return region.continent || 'americas';
};
