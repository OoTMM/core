import { Settings, DEFAULT_SETTINGS, makeSettings } from './settings';

export type Presets = {[k: string]: Settings};

const PRESET_DEFAULT = DEFAULT_SETTINGS;

const PRESET_BLITZ = makeSettings({
  smallKeyShuffleOot: 'removed',
  smallKeyShuffleMm: 'removed',
  tingleShuffle: 'starting',
  mapCompassShuffle: 'starting',
  strayFairyShuffle: 'anywhere',
  skipZelda: true,
  dekuTreeAdult: true,
  dekuTree: 'open',
  wellAdult: true,
  fireChild: true,
  doorOfTime: 'open',
  zoraKing: 'adult',
  bossWarpPads: 'remains',
  crossWarpMm: 'full',
  crossWarpOot: true,
  csmc: 'always',
  fastBunnyHood: true,
  fillWallets: true,
  progressiveGoronLullaby: 'single',
  sharedMagicArrowFire: true,
  sharedMagicArrowIce: true,
  sharedSongEpona: true,
  sharedSongStorms: true,
  sharedSongTime: true,
  sharedMaskGoron: true,
  sharedMaskZora: true,
  sharedMaskBunny: true,
  sharedMaskTruth: true,
  sharedMaskKeaton: true,
  sharedWallets: true,
  sharedHealth: true,
  tricks: [
    'OOT_DC_JUMP',
    'OOT_DEKU_SKIP',
    'OOT_FOREST_HOOK',
    'OOT_HAMMER_WALLS',
    'OOT_HIDDEN_GROTTOS',
    'OOT_LENS',
    'OOT_MAN_ON_ROOF',
    'OOT_NIGHT_GS',
    'OOT_TUNICS',
    'OOT_VOLCANO_HOVERS',
    'MM_LENS',
    'MM_NO_SEAHORSE',
    'MM_ONE_MASK_STONE_TOWER',
  ],
  specialConds: {
    BRIDGE: {
      count: 5,
      stones: true,
      medallions: true
    },
    MOON: {
      count: 4,
      stones: true,
      remains: true
    }
  },
  startingItems: {
    OOT_SWORD_KOKIRI: 1,
    OOT_SONG_TP_LIGHT: 1,
    OOT_OCARINA: 1,
    MM_SHIELD_HERO:1,
    MM_OCARINA: 1,
    MM_SWORD: 1,
    MM_SONG_SOARING: 1,
    SHARED_SONG_TIME: 1
  },
  junkLocations: [
    'MM Deku Playground Reward 2',
    'MM Goron Race Reward',
    'MM Great Bay Great Fairy',
    'MM Great Bay Temple SF Central Room Barrel',
    'MM Great Bay Temple SF Central Room Underwater Pot',
    'MM Great Bay Temple SF Compass Room Pot',
    'MM Great Bay Temple SF Green Pipe 3 Barrel',
    'MM Great Bay Temple SF Map Room Pot',
    'MM Great Bay Temple SF Pre-Boss Above Water',
    'MM Great Bay Temple SF Pre-Boss Underwater',
    'MM Great Bay Temple SF Water Wheel Platform',
    'MM Great Bay Temple SF Water Wheel Skulltula',
    'MM Honey & Darling Reward 2',
    'MM Ikana Great Fairy',
    'MM Laboratory Zora Song',
    'MM Moon Fierce Deity Mask',
    'MM Mountain Village Frog Choir HP',
    'MM Pinnacle Rock HP',
    'MM Snowhead Great Fairy',
    'MM Snowhead Temple SF Bridge Pillar',
    'MM Snowhead Temple SF Bridge Under Platform',
    'MM Snowhead Temple SF Compass Room Crate',
    'MM Snowhead Temple SF Dinolfos 1',
    'MM Snowhead Temple SF Dinolfos 2',
    'MM Snowhead Temple SF Dual Switches',
    'MM Snowhead Temple SF Map Room',
    'MM Snowhead Temple SF Snow Room',
    'MM Stock Pot Inn Couple\'s Mask',
    'MM Swamp Archery Reward 2',
    'MM Town Archery Reward 2',
    'MM Waterfall Rapids Beaver Race 2',
    'MM Woodfall Great Fairy',
    'MM Woodfall Temple SF Entrance',
    'MM Woodfall Temple SF Main Bubble',
    'MM Woodfall Temple SF Main Deku Baba',
    'MM Woodfall Temple SF Main Pot',
    'MM Woodfall Temple SF Maze Beehive',
    'MM Woodfall Temple SF Maze Bubble',
    'MM Woodfall Temple SF Maze Skulltula',
    'MM Woodfall Temple SF Pre-Boss Bottom Right',
    'MM Woodfall Temple SF Pre-Boss Left',
    'MM Woodfall Temple SF Pre-Boss Pillar',
    'MM Woodfall Temple SF Pre-Boss Top Right',
    'MM Woodfall Temple SF Water Room Beehive',
    'OOT Skulltula House 40 Tokens',
    'OOT Skulltula House 50 Tokens'
  ]
});

const PRESET_ALLSANITY = makeSettings({
  goal: 'both',
  logic: 'beatable',
  songs: 'anywhere',
  goldSkulltulaTokens: 'all',
  housesSkulltulaTokens: 'all',
  tingleShuffle: 'anywhere',
  mapCompassShuffle: 'anywhere',
  smallKeyShuffleOot: 'anywhere',
  smallKeyShuffleHideout: 'anywhere',
  bossKeyShuffleOot: 'anywhere',
  smallKeyShuffleMm: 'anywhere',
  bossKeyShuffleMm: 'anywhere',
  townFairyShuffle: 'anywhere',
  strayFairyShuffle: 'anywhere',
  ganonBossKey: 'anywhere',
  dungeonRewardShuffle: 'anywhere',
  scrubShuffleOot: true,
  cowShuffleOot: true,
  cowShuffleMm: true,
  shopShuffleOot: 'full',
  shopShuffleMm: 'full',
  shuffleMasterSword: true,
  shuffleGerudoCard: true,
  eggShuffle: true,
  doorOfTime: 'closed',
  kakarikoGate: 'closed',
  zoraKing: 'vanilla',
  skipZelda: false,
  crossWarpOot: true,
  crossWarpMm: 'full',
  sunSongMm: true,
  csmc: 'always',
  fillWallets: true,
  progressiveShieldsOot: 'separate',
  progressiveSwordsOot: 'separate',
  progressiveShieldsMm: 'separate',
  progressiveGoronLullaby: 'single',
  childWallets: true,
  colossalWallets: true,
  fastBunnyHood: true,
  dekuTree: 'closed',
  dekuTreeAdult: true,
  wellAdult: true,
  fireChild: true,
  erBoss: 'full',
  erDungeons: 'full',
  erMinorDungeons: true,
  erSpiderHouses: true,
  erPirateFortress: true,
  erBeneathWell: true,
  erIkanaCastle: true,
  erSecretShrine: true,
  erRegions: 'full',
  erIndoors: 'full',
  erIndoorsExtra: true,
});

const PRESET_HELL = makeSettings({
  itemPool: 'minimal',
  goal: 'both',
  logic: 'beatable',
  songs: 'anywhere',
  goldSkulltulaTokens: 'all',
  housesSkulltulaTokens: 'all',
  tingleShuffle: 'anywhere',
  mapCompassShuffle: 'anywhere',
  smallKeyShuffleOot: 'anywhere',
  smallKeyShuffleMm: 'anywhere',
  smallKeyShuffleHideout: 'anywhere',
  bossKeyShuffleOot: 'anywhere',
  bossKeyShuffleMm: 'anywhere',
  townFairyShuffle: 'anywhere',
  strayFairyShuffle: 'anywhere',
  ganonBossKey: 'custom',
  majoraChild: 'custom',
  dungeonRewardShuffle: 'anywhere',
  scrubShuffleOot: true,
  cowShuffleOot: true,
  cowShuffleMm: true,
  shopShuffleOot: 'full',
  shopShuffleMm: 'full',
  shuffleMasterSword: true,
  shuffleGerudoCard: true,
  eggShuffle: true,
  doorOfTime: 'closed',
  kakarikoGate: 'closed',
  zoraKing: 'vanilla',
  skipZelda: false,
  crossWarpOot: true,
  crossWarpMm: 'full',
  sunSongMm: true,
  csmc: 'always',
  fillWallets: false,
  progressiveShieldsOot: 'separate',
  progressiveSwordsOot: 'separate',
  progressiveShieldsMm: 'separate',
  progressiveGoronLullaby: 'progressive',
  childWallets: true,
  colossalWallets: true,
  fastBunnyHood: true,
  dekuTree: 'closed',
  dekuTreeAdult: true,
  wellAdult: true,
  fireChild: true,
  erBoss: 'full',
  erDungeons: 'full',
  erMinorDungeons: true,
  erSpiderHouses: true,
  erPirateFortress: true,
  erBeneathWell: true,
  erIkanaCastle: true,
  erSecretShrine: true,
  erRegions: 'full',
  erIndoors: 'full',
  erIndoorsExtra: true,
  erGanonCastle: true,
  erGanonTower: true,
  specialConds: {
    GANON_BK: {
      count: 266,
      stones: true,
      medallions: true,
      remains: true,
      skullsGold: true,
      skullsSwamp: true,
      skullsOcean: true,
      fairiesWF: true,
      fairiesSH: true,
      fairiesGB: true,
      fairiesST: true,
      fairyTown: true,
      masksRegular: true,
      masksTransform: true,
      masksOot: true
    },
    MAJORA: {
      count: 266,
      stones: true,
      medallions: true,
      remains: true,
      skullsGold: true,
      skullsSwamp: true,
      skullsOcean: true,
      fairiesWF: true,
      fairiesSH: true,
      fairiesGB: true,
      fairiesST: true,
      fairyTown: true,
      masksRegular: true,
      masksTransform: true,
      masksOot: true
    }
  },
  dungeon: {
    DT: 'mq',
    DC: 'mq',
    JJ: 'mq',
    BotW: 'mq',
    Forest: 'mq',
    Fire: 'mq',
    Water: 'mq',
    Shadow: 'mq',
    Spirit: 'mq',
    IC: 'mq',
    GTG: 'mq',
    Ganon: 'mq'
  },
  hints: [
    { type: 'foolish', amount: 'max', extra: 2 },
  ],
  tricks: [
    'OOT_LENS',
    'OOT_TUNICS',
    'OOT_HIDDEN_GROTTOS',
    'OOT_MIDO_SKIP',
    'OOT_MAN_ON_ROOF',
    'OOT_BLIND_WASTELAND',
    'OOT_DEKU_SKIP',
    'OOT_DC_JUMP',
    'OOT_FOREST_HOOK',
    'OOT_HAMMER_WALLS',
    'OOT_VOLCANO_HOVERS',
    'OOT_NIGHT_GS',
    'OOT_CHILD_DOMAIN',
    'OOT_ADULT_DOMAIN',
    'OOT_WATER_LONGSHOT',
    'OOT_SAND_RIVER_NOTHING',
    'OOT_SHADOW_FIRE_ARROW',
    'OOT_KZ_SKIP',
    'OOT_LOST_WOODS_ADULT_GS',
    'OOT_WINDMILL_HP_NOTHING',
    'OOT_LAB_DIVE_NO_GOLD_SCALE',
    'OOT_LAB_WALL_GS',
    'OOT_PASS_COLLISION',
    'OOT_DMT_RED_ROCK_GS',
    'OOT_DEAD_HAND_STICKS',
    'OOT_BFA_MUDWALLS',
    'MM_LENS',
    'MM_PALACE_BEAN_SKIP',
    'MM_DARMANI_WALL',
    'MM_NO_SEAHORSE',
    'MM_ZORA_HALL_HUMAN',
    'MM_ICELESS_IKANA',
    'MM_ONE_MASK_STONE_TOWER',
    'MM_ISTT_EYEGORE',
    'MM_SCT_NOTHING',
    'MM_GORON_BOMB_JUMP',
    'MM_BOMBER_SKIP',
    'MM_CAPTAIN_SKIP',
    'MM_ISTT_ENTRY_JUMP',
    'MM_SHORT_HOOK_HARD',
    'MM_PFI_BOAT_HOOK',
    'MM_PALACE_GUARD_SKIP',
    'MM_SHT_FIRELESS',
	'MM_SHT_STICKS_RUN',
	'MM_SHT_PILLARLESS',
    'MM_KEG_EXPLOSIVES',
    'MM_DOG_RACE_CHEST_NOTHING',
    'MM_MAJORA_LOGIC',
    'MM_SOUTHERN_SWAMP_SCRUB_HP_GORON',
    'MM_ZORA_HALL_SCRUB_HP_NO_DEKU',
    'MM_IKANA_ROOF_PARKOUR',
    'MM_POST_OFFICE_GAME',
    'MM_WELL_HSW',
  ]
});

export const PRESETS: Presets = {
  'Default': PRESET_DEFAULT,
  'Blitz': PRESET_BLITZ,
  'Allsanity': PRESET_ALLSANITY,
  'Hell': PRESET_HELL,
};
