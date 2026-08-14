export const QUEUE_TYPES = {
  420: { name: 'Ranked Solo', short: 'Solo/Duo', category: 'ranked' },
  440: { name: 'Ranked Flex', short: 'Flex', category: 'ranked' },
  400: { name: 'Normal Draft', short: 'Normal', category: 'normal' },
  430: { name: 'Normal Blind', short: 'Blind', category: 'normal' },
  450: { name: 'ARAM', short: 'ARAM', category: 'aram' },
  1700: { name: 'Arena', short: 'Arena', category: 'arena' },
  490: { name: 'Quickplay', short: 'Quickplay', category: 'normal' },
  0: { name: 'Custom Game', short: 'Custom', category: 'custom' },
};

export const getQueueInfo = (queueId) => {
  return QUEUE_TYPES[queueId] || { name: 'Partida Normal', short: 'Normal', category: 'other' };
};
