import { PartialDeep } from 'type-fest';
import { Settings, DEFAULT_SETTINGS, makeSettings, TRICKS } from './settings';

export type Presets = { [k: string]: Settings };

const PRESET_DEFAULT = DEFAULT_SETTINGS;

const BLITZ_BASE: PartialDeep<Settings> = {
  hintPathBoss: true,
  hintPathEndBoss: true,
  hintPathEvents: true,
  clearStateDungeonsMm: 'both',
  tingleShuffle: 'starting',
  openMaskShop: true,
  hintImportance: true,
  cloakIceTraps: false,
  strayFairyChestShuffle: 'starting',
  mapCompassShuffle: 'starting',
  smallKeyShuffleMm: 'removed',
  smallKeyShuffleHideout: 'vanilla',
  bossKeyShuffleOot: 'ownDungeon',
  bossKeyShuffleMm: 'ownDungeon',
  shuffleMasterSword: false,
  shuffleGerudoCard: false,
  shuffleMerchantsMm: false,
  startingAge: 'random',
  ageChange: 'always',
  doorOfTime: 'open',
  dekuTree: 'closed',
  kakarikoGate: 'open',
  gerudoFortress: 'single',
  skipZelda: true,
  bossWarpPads: 'remains',
  crossAge: true,
  crossWarpOot: true,
  crossWarpMm: 'full',
  fastBunnyHood: true,
  bottleContentShuffle: true,
  blueFireArrows: true,
  sunlightArrows: true,
  progressiveGoronLullaby: 'single',
  freeScarecrowOot: true,
  freeScarecrowMm: true,
  lenientSpikes: false,
  shortHookshotMm: true,
  bombchuBehaviorOot: 'bagSeparate',
  bombchuBehaviorMm: 'bagSeparate',
  spellFireMm: true,
  spellWindMm: true,
  spellLoveMm: true,
  hammerMm: true,
  sharedBows: true,
  sharedBombBags: true,
  sharedMagic: true,
  sharedMagicArrowFire: true,
  sharedMagicArrowIce: true,
  sharedMagicArrowLight: true,
  sharedSongStorms: true,
  sharedHookshot: true,
  sharedLens: true,
  sharedMaskGoron: true,
  sharedMaskZora: true,
  sharedMaskBunny: true,
  sharedMaskKeaton: true,
  sharedMaskTruth: true,
  sharedWallets: true,
  sharedHealth: true,
  sharedShields: true,
  sharedBombchu: true,
  sharedSpellFire: true,
  sharedSpellWind: true,
  sharedSpellLove: true,
  noPlandoHints: true,
  bootsIronMm: true,
  bootsHoverMm: true,
  tunicGoronMm: true,
  tunicZoraMm: true,
  sharedBootsIron: true,
  sharedBootsHover: true,
  sharedTunicGoron: true,
  sharedTunicZora: true,
  sharedHammer: true,
  blastMaskOot: true,
  stoneMaskOot: true,
  elegyOot: true,
  sharedMaskBlast: true,
  sharedMaskStone: true,
  sharedSongElegy: true,
  agelessChildTrade: true,
  scalesMm: true,
  strengthMm: true,
  sharedScales: true,
  sharedStrength: true,
  keepItemsReset: true,
  shadowFastBoat: true,
  songOfDoubleTimeOot: true,
  mmPreActivatedOwls: {
    type: 'specific',
    values: ["clocktown"]
  },
  startingItems: {
    OOT_NUTS_10: 2,
    OOT_SHIELD_DEKU: 1,
    OOT_STICK: 10,
    MM_SONG_EPONA: 1,
    SHARED_SHIELD_HYLIAN: 1,
    MM_OCARINA: 1,
    OOT_OCARINA: 1,
    MM_SWORD: 1,
    MM_SONG_SOARING: 1
  },
  tricks: [
    "MM_LENS",
    "MM_NO_SEAHORSE",
    "MM_ONE_MASK_STONE_TOWER",
    "MM_PALACE_BEAN_SKIP",
    "MM_SOUTHERN_SWAMP_SCRUB_HP_GORON",
    "MM_ZORA_HALL_SCRUB_HP_NO_DEKU",
    "MM_EVAN_FARORE",
    "MM_TUNICS",
    "OOT_DC_JUMP",
    "OOT_DEAD_HAND_STICKS",
    "OOT_FOREST_HOOK",
    "OOT_HAMMER_WALLS",
    "OOT_HIDDEN_GROTTOS",
    "OOT_LENS",
    "OOT_MAN_ON_ROOF",
    "OOT_NIGHT_GS",
    "OOT_TUNICS",
    "OOT_VOLCANO_HOVERS",
    "OOT_WINDMILL_HP_NOTHING",
  ],
  plando: {
    locations: {
      'OOT Zora River Bean Seller': 'OOT_MAGIC_BEAN',
      'OOT Zelda\'s Letter': 'OOT_OCARINA',
      'OOT Zelda\'s Song': 'OOT_SONG_TP_LIGHT',
      'MM Initial Song of Healing': 'MM_SONG_TIME'
    }
  },
};

const makeBlitz = (input: PartialDeep<Settings>): Settings => {
  const x = Object.assign({}, BLITZ_BASE, input);
  return makeSettings(x);
};

const PRESET_BLITZ = makeBlitz({
  rainbowBridge: 'custom',
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
  junkLocations: [
    'MM Deku Playground Reward All Days',
    'MM Beneath The Graveyard Dampe Chest',
    'MM Goron Race Reward',
    'MM Great Bay Great Fairy',
    'MM Honey & Darling Reward All Days',
    'MM Ikana Great Fairy',
    'MM Laboratory Zora Song',
    'MM Moon Fierce Deity Mask',
    'MM Mountain Village Frog Choir HP',
    'MM Ocean Spider House Wallet',
    'MM Pinnacle Rock HP',
    'MM Snowhead Great Fairy',
    'MM Stock Pot Inn Couple\'s Mask',
    'MM Swamp Spider House Mask of Truth',
    'MM Town Archery Reward 2',
    'MM Waterfall Rapids Beaver Race 2',
    'MM Woodfall Great Fairy',
    'OOT Hyrule Field Ocarina of Time',
    'OOT Kakariko Song Shadow',
    'OOT Skulltula House 40 Tokens',
    'OOT Skulltula House 50 Tokens'
  ],
  hints: [
    { type: "foolish", amount: 8, extra: 1 },
    { type: "always", amount: "max", extra: 1 },
    { type: "sometimes", amount: 4, extra: 1 },
    { type: "item", amount: 1, extra: 1, item: "SHARED_SHIELD_MIRROR" },
    { type: "item", amount: 1, extra: 1, item: "MM_MASK_CAPTAIN" },
    { type: "item", amount: 1, extra: 1, item: "MM_POWDER_KEG" },
    { type: "item", amount: 1, extra: 1, item: "SHARED_ARROW_ICE" },
    { type: "playthrough", amount: 1, extra: 1 },
    { type: "woth", amount: 9, extra: 1 },
    { type: "sometimes", amount: "max", extra: 1 }
  ]
});

const PRESET_BLITZ_PRECOMPLETED = makeBlitz({
  rainbowBridge: 'custom',
  preCompletedDungeons: true,
  preCompletedDungeonsMajor: 6,
  preCompletedDungeonsStones: 2,
  preCompletedDungeonsMedallions: 2,
  preCompletedDungeonsRemains: 2,
  junkLocations: [
    "MM Beneath The Graveyard Dampe Chest",
    "MM Deku Playground Reward All Days",
    "MM Goron Race Reward",
    "MM Great Bay Great Fairy",
    "MM Honey & Darling Reward All Days",
    "MM Ikana Great Fairy",
    "MM Laboratory Zora Song",
    "MM Moon Fierce Deity Mask",
    "MM Mountain Village Frog Choir HP",
    "MM Ocean Spider House Wallet",
    "MM Pinnacle Rock HP",
    "MM Snowhead Great Fairy",
    "MM Stock Pot Inn Couple's Mask",
    "MM Swamp Spider House Mask of Truth",
    "MM Town Archery Reward 2",
    "MM Waterfall Rapids Beaver Race 2",
    "MM Woodfall Great Fairy",
    "OOT Skulltula House 40 Tokens",
    "OOT Skulltula House 50 Tokens",
  ],
  specialConds: {
    BRIDGE: {
      count: 9,
      stones: true,
      medallions: true,
      remains: false,
    },
    MOON: {
      count: 7,
      stones: true,
      medallions: false,
      remains: true,
    }
  },
  hints: [
    { type: "foolish", amount: 8, extra: 1 },
    { type: "always", amount: "max", extra: 1 },
    { type: "sometimes", amount: 4, extra: 1 },
    { type: "item", amount: 1, extra: 1, item: "SHARED_SHIELD_MIRROR" },
    { type: "item", amount: 1, extra: 1, item: "MM_MASK_CAPTAIN" },
    { type: "item", amount: 1, extra: 1, item: "MM_POWDER_KEG" },
    { type: "item", amount: 1, extra: 1, item: "SHARED_ARROW_ICE" },
    { type: "woth", amount: 9, extra: 1 },
    { type: "sometimes", amount: "max", extra: 1 }
  ]
});

const PRESET_TRIFORCE_BLITZ = makeBlitz({
  goal: "triforce3",
  strayFairyChestShuffle: "starting",
  rainbowBridge: 'custom',
  preCompletedDungeons: true,
  preCompletedDungeonsMajor: 6,
  preCompletedDungeonsStones: 2,
  preCompletedDungeonsMedallions: 2,
  preCompletedDungeonsRemains: 2,
  junkLocations: [
    "MM Beneath The Graveyard Dampe Chest",
    "MM Deku Playground Reward All Days",
    "MM Goron Race Reward",
    "MM Great Bay Great Fairy",
    "MM Honey & Darling Reward All Days",
    "MM Ikana Great Fairy",
    "MM Laboratory Zora Song",
    "MM Moon Fierce Deity Mask",
    "MM Mountain Village Frog Choir HP",
    "MM Ocean Spider House Wallet",
    "MM Pinnacle Rock HP",
    "MM Snowhead Great Fairy",
    "MM Stock Pot Inn Couple's Mask",
    "MM Swamp Spider House Mask of Truth",
    "MM Town Archery Reward 2",
    "MM Waterfall Rapids Beaver Race 2",
    "MM Woodfall Great Fairy",
    "OOT Skulltula House 40 Tokens",
    "OOT Skulltula House 50 Tokens"
  ],
  specialConds: {
    BRIDGE: {
      count: 10,
      stones: true,
      medallions: true,
      remains: true
    },
    MOON: {
      count: 0
    }
  },
  hints: [
    { type: "foolish", amount: 8, extra: 1 },
    { type: "always", amount: "max", extra: 1 },
    { type: "sometimes", amount: 4, extra: 1 },
    { type: "item", amount: 1, extra: 1, item: "MM_MASK_CAPTAIN" },
    { type: "item", amount: 1, extra: 1, item: "MM_POWDER_KEG" },
    { type: "item", amount: 1, extra: 1, item: "SHARED_SHIELD_MIRROR" },
    { type: "item", amount: 1, extra: 1, item: "SHARED_ARROW_LIGHT" },
    { type: "woth", amount: 9, extra: 1 },
    { type: "sometimes", amount: "max", extra: 1 }
  ]
})

const PRESET_ALLSANITY = makeSettings({
  goal: 'both',
  logic: 'beatable',
  extraHintRegions: true,
  hintImportance: true,
  songs: 'anywhere',
  goldSkulltulaTokens: 'all',
  housesSkulltulaTokens: 'all',
  tingleShuffle: 'anywhere',
  mapCompassShuffle: 'anywhere',
  smallKeyShuffleOot: 'anywhere',
  smallKeyShuffleHideout: 'anywhere',
  bossKeyShuffleOot: 'anywhere',
  smallKeyShuffleChestGame: 'anywhere',
  smallKeyShuffleMm: 'anywhere',
  bossKeyShuffleMm: 'anywhere',
  smallKeyRingOot: { type: 'random' },
  smallKeyRingMm: { type: 'random' },
  silverRupeeShuffle: 'anywhere',
  silverRupeePouches: { type: 'random' },
  townFairyShuffle: 'anywhere',
  strayFairyChestShuffle: 'anywhere',
  strayFairyOtherShuffle: 'anywhere',
  ganonBossKey: 'anywhere',
  dungeonRewardShuffle: 'dungeonBlueWarps',
  scrubShuffleOot: true,
  scrubShuffleMm: true,
  cowShuffleOot: true,
  cowShuffleMm: true,
  shopShuffleOot: 'full',
  shopShuffleMm: 'full',
  owlShuffle: 'anywhere',
  shufflePotsOot: 'all',
  shufflePotsMm: 'all',
  shuffleCratesOot: 'all',
  shuffleCratesMm: 'all',
  shuffleBarrelsMm: 'all',
  shuffleHivesOot: true,
  shuffleHivesMm: true,
  shuffleGrassOot: 'all',
  shuffleGrassMm: 'all',
  shuffleTFGrassMm: true,
  shuffleFreeRupeesOot: 'all',
  shuffleFreeRupeesMm: 'all',
  shuffleFreeHeartsOot: 'all',
  shuffleFreeHeartsMm: true,
  shuffleWonderItemsOot: 'all',
  shuffleWonderItemsMm: true,
  shuffleSnowballsMm: 'all',
  shuffleButterfliesOot: true,
  shuffleButterfliesMm: true,
  shuffleMasterSword: true,
  shuffleGerudoCard: true,
  shuffleMaskTrades: true,
  shuffleMerchantsMm: true,
  pondFishShuffle: true,
  divingGameRupeeShuffle: true,
  fairyFountainFairyShuffleOot: true,
  fairyFountainFairyShuffleMm: true,
  fairySpotShuffleOot: true,
  eggShuffle: true,
  priceOotShops: 'weighted',
  priceOotScrubs: 'weighted',
  priceMmShops: 'weighted',
  priceMmTingle: 'weighted',
  moonCrash: 'cycle',
  startingAge: 'random',
  swordlessAdult: true,
  timeTravelSword: false,
  doorOfTime: 'closed',
  ageChange: 'oot',
  dekuTree: 'closed',
  openDungeonsOot: {
    type: "specific",
    values: ["dekuTreeAdult", "wellAdult", "fireChild"]
  },
  beneathWell: 'remorseless',
  kakarikoGate: 'closed',
  openZdShortcut: true,
  zoraKing: 'vanilla',
  skipZelda: true,
  rainbowBridge: 'medallions',
  bossWarpPads: 'remains',
  freeScarecrowOot: true,
  freeScarecrowMm: true,
  openMaskShop: true,
  crossAge: true,
  crossWarpOot: true,
  crossWarpMm: 'full',
  crossGameFw: true,
  csmc: 'always',
  csmcHearts: true,
  csmcMapCompass: true,
  csmcSkulltula: true,
  csmcCow: true,
  blastMaskCooldown: 'short',
  autoInvert: 'firstCycle',
  keepItemsReset: true,
  fastBunnyHood: true,
  restoreBrokenActors: true,
  alterLostWoodsExits: true,
  shadowFastBoat: true,
  fillWallets: true,
  progressiveShieldsOot: 'separate',
  progressiveSwordsOot: 'separate',
  progressiveShieldsMm: 'separate',
  progressiveGoronLullaby: 'single',
  bottleContentShuffle: true,
  stoneAgonyMm: true,
  sticksNutsUpgradesMm: true,
  sunSongMm: true,
  fairyOcarinaMm: true,
  blueFireArrows: true,
  sunlightArrows: true,
  shortHookshotMm: true,
  childWallets: true,
  colossalWallets: true,
  bottomlessWallets: true,
  rupeeScaling: true,
  bombchuBehaviorOot: 'bagSeparate',
  bombchuBehaviorMm: 'bagSeparate',
  spellFireMm: true,
  spellWindMm: true,
  spellLoveMm: true,
  bootsIronMm: true,
  bootsHoverMm: true,
  tunicGoronMm: true,
  tunicZoraMm: true,
  scalesMm: true,
  strengthMm: true,
  hammerMm: true,
  spinUpgradeOot: true,
  extraChildSwordsOot: true,
  blastMaskOot: true,
  stoneMaskOot: true,
  elegyOot: true,
  ocarinaButtonsShuffleOot: true,
  ocarinaButtonsShuffleMm: true,
  soulsEnemyOot: true,
  soulsEnemyMm: true,
  soulsBossOot: true,
  soulsBossMm: true,
  soulsNpcOot: true,
  soulsNpcMm: true,
  soulsMiscOot: true,
  soulsMiscMm: true,
  trapRupoor: true,
  songOfDoubleTimeOot: true,
  sharedStoneAgony: true,
  sharedSpinUpgrade: true,
  sharedNutsSticks: true,
  sharedBows: true,
  sharedBombBags: true,
  sharedMagic: true,
  sharedMagicArrowFire: true,
  sharedMagicArrowIce: true,
  sharedMagicArrowLight: true,
  sharedSongEpona: true,
  sharedSongStorms: true,
  sharedSongTime: true,
  sharedSongSun: true,
  sharedHookshot: true,
  sharedLens: true,
  sharedMaskGoron: true,
  sharedMaskZora: true,
  sharedMaskBunny: true,
  sharedMaskKeaton: true,
  sharedMaskTruth: true,
  sharedMaskBlast: true,
  sharedMaskStone: true,
  sharedSongElegy: true,
  sharedWallets: true,
  sharedHealth: true,
  sharedSwords: true,
  sharedShields: true,
  sharedSoulsEnemy: true,
  sharedSoulsNpc: true,
  sharedSoulsMisc: true,
  sharedOcarinaButtons: true,
  sharedBombchu: true,
  sharedSpellFire: true,
  sharedSpellWind: true,
  sharedSpellLove: true,
  sharedBootsIron: true,
  sharedBootsHover: true,
  sharedTunicGoron: true,
  sharedTunicZora: true,
  sharedScales: true,
  sharedStrength: true,
  sharedHammer: true,
  erBoss: 'full',
  erDungeons: 'full',
  erGrottos: 'full',
  erNoPolarity: true,
  erSelfLoops: true,
  erMixed: 'full',
  erMixedDungeons: true,
  erMixedRegions: true,
  erMixedOverworld: true,
  erMixedIndoors: true,
  erMixedGrottos: true,
  erWallmasters: 'full',
  erSpawns: 'both',
  erMajorDungeons: true,
  erMinorDungeons: true,
  erGanonCastle: true,
  erGanonTower: true,
  erMoon: true,
  erSpiderHouses: true,
  erPirateFortress: true,
  erBeneathWell: true,
  erIkanaCastle: true,
  erSecretShrine: true,
  erRegions: 'full',
  erRegionsExtra: true,
  erRegionsShortcuts: true,
  erOverworld: 'full',
  erPiratesWorld: true,
  erIndoors: 'full',
  erIndoorsMajor: true,
  erIndoorsExtra: true,
  erIndoorsGameLinks: true,
  erWarps: 'full',
  erOneWays: 'full',
  erOneWaysMajor: true,
  erOneWaysIkana: true,
  erOneWaysSongs: true,
  erOneWaysStatues: true,
  erOneWaysOwls: true,
  erOneWaysWoods: true,
  erOneWaysWaterVoids: true,
  erOneWaysAnywhere: true,
  mqDungeons: { type: 'random' },
});

const allTricks = Object.keys(TRICKS).filter(k => !TRICKS[k].glitch);

const PRESET_HELL = makeSettings({
  goal: 'both',
  logic: 'beatable',
  itemPool: 'barren',
  extraHintRegions: true,
  hintImportance: true,
  songs: 'anywhere',
  goldSkulltulaTokens: 'all',
  housesSkulltulaTokens: 'all',
  tingleShuffle: 'anywhere',
  mapCompassShuffle: 'anywhere',
  smallKeyShuffleOot: 'anywhere',
  smallKeyShuffleMm: 'anywhere',
  smallKeyShuffleHideout: 'anywhere',
  smallKeyShuffleChestGame: 'anywhere',
  bossKeyShuffleOot: 'anywhere',
  bossKeyShuffleMm: 'anywhere',
  silverRupeeShuffle: 'anywhere',
  townFairyShuffle: 'anywhere',
  strayFairyChestShuffle: 'anywhere',
  strayFairyOtherShuffle: 'anywhere',
  ganonBossKey: 'custom',
  dungeonRewardShuffle: 'dungeonsLimited',
  scrubShuffleOot: true,
  scrubShuffleMm: true,
  cowShuffleOot: true,
  cowShuffleMm: true,
  shopShuffleOot: 'full',
  shopShuffleMm: 'full',
  owlShuffle: 'anywhere',
  shufflePotsOot: 'all',
  shufflePotsMm: 'all',
  shuffleCratesOot: 'all',
  shuffleCratesMm: 'all',
  shuffleBarrelsMm: 'all',
  shuffleHivesOot: true,
  shuffleHivesMm: true,
  shuffleGrassOot: 'all',
  shuffleGrassMm: 'all',
  shuffleTFGrassMm: true,
  shuffleFreeRupeesOot: 'all',
  shuffleFreeRupeesMm: 'all',
  shuffleFreeHeartsOot: 'all',
  shuffleFreeHeartsMm: true,
  shuffleWonderItemsOot: 'all',
  shuffleWonderItemsMm: true,
  shuffleSnowballsMm: 'all',
  shuffleButterfliesOot: true,
  shuffleButterfliesMm: true,
  shuffleMasterSword: true,
  shuffleGerudoCard: true,
  shuffleMaskTrades: true,
  shuffleMerchantsMm: true,
  pondFishShuffle: true,
  divingGameRupeeShuffle: true,
  fairyFountainFairyShuffleOot: true,
  fairyFountainFairyShuffleMm: true,
  fairySpotShuffleOot: true,
  eggShuffle: true,
  priceOotShops: 'random',
  priceOotScrubs: 'random',
  priceMmShops: 'random',
  priceMmTingle: 'random',
  ganonTrials: {type: 'all'},
  moonCrash: 'cycle',
  startingAge: 'random',
  swordlessAdult: true,
  timeTravelSword: false,
  doorOfTime: 'closed',
  ageChange: 'oot',
  dekuTree: 'closed',
  openDungeonsOot: {
    type: "specific",
    values: ["dekuTreeAdult", "wellAdult", "fireChild"]
  },
  rainbowBridge: 'medallions',
  majoraChild: 'custom',
  crossAge: true,
  crossWarpOot: true,
  crossWarpMm: 'full',
  crossGameFw: true,
  csmc: 'agony',
  csmcHearts: false,
  csmcMapCompass: false,
  blastMaskCooldown: 'verylong',
  clockSpeed: 'fast',
  restoreBrokenActors: true,
  alterLostWoodsExits: true,
  shadowFastBoat: true,
  progressiveShieldsOot: 'separate',
  progressiveSwordsOot: 'separate',
  progressiveShieldsMm: 'separate',
  progressiveGoronLullaby: 'progressive',
  progressiveClocks: 'separate',
  bottleContentShuffle: true,
  stoneAgonyMm: true,
  sticksNutsUpgradesMm: true,
  sunSongMm: true,
  fairyOcarinaMm: true,
  blueFireArrows: true,
  sunlightArrows: true,
  shortHookshotMm: true,
  childWallets: true,
  colossalWallets: true,
  bottomlessWallets: true,
  bombchuBehaviorOot: 'bagSeparate',
  bombchuBehaviorMm: 'bagSeparate',
  spellFireMm: true,
  spellWindMm: true,
  spellLoveMm: true,
  bootsIronMm: true,
  bootsHoverMm: true,
  tunicGoronMm: true,
  tunicZoraMm: true,
  scalesMm: true,
  strengthMm: true,
  hammerMm: true,
  spinUpgradeOot: true,
  extraChildSwordsOot: true,
  blastMaskOot: true,
  stoneMaskOot: true,
  elegyOot: true,
  ocarinaButtonsShuffleOot: true,
  ocarinaButtonsShuffleMm: true,
  soulsEnemyOot: true,
  soulsEnemyMm: true,
  soulsBossOot: true,
  soulsBossMm: true,
  soulsNpcOot: true,
  soulsNpcMm: true,
  soulsMiscOot: true,
  soulsMiscMm: true,
  clocks: true,
  menuNotebook: true,
  trapRupoor: true,
  songOfDoubleTimeOot: true,
  fastBunnyHood: true,
  erBoss: 'full',
  erDungeons: 'full',
  erGrottos: 'full',
  erNoPolarity: true,
  erSelfLoops: true,
  erDecoupled: true,
  erMixed: 'full',
  erMixedDungeons: true,
  erMixedRegions: true,
  erMixedOverworld: true,
  erMixedIndoors: true,
  erMixedGrottos: true,
  erWallmasters: 'full',
  erSpawns: 'both',
  erMajorDungeons: true,
  erMinorDungeons: true,
  erGanonCastle: true,
  erGanonTower: true,
  erMoon: true,
  erSpiderHouses: true,
  erPirateFortress: true,
  erBeneathWell: true,
  erIkanaCastle: true,
  erSecretShrine: true,
  erRegions: 'full',
  erRegionsExtra: true,
  erRegionsShortcuts: true,
  erOverworld: 'full',
  erPiratesWorld: true,
  erIndoors: 'full',
  erIndoorsMajor: true,
  erIndoorsExtra: true,
  erIndoorsGameLinks: true,
  erWarps: 'full',
  erOneWays: 'full',
  erOneWaysMajor: true,
  erOneWaysIkana: true,
  erOneWaysSongs: true,
  erOneWaysStatues: true,
  erOneWaysOwls: true,
  erOneWaysWoods: true,
  erOneWaysWaterVoids: true,
  erOneWaysAnywhere: true,
  mqDungeons: { type: 'random' },
  jpLayouts: { type: 'random' },
  specialConds: {
    GANON_BK: {
      count: 268,
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
      count: 268,
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
  hints: [
    { type: 'foolish', amount: 'max', extra: 2 },
  ],
  tricks: allTricks,
});

const PRESET_BEGINNER = makeSettings({
  autoInvert: 'firstCycle',
  clearStateDungeonsMm: 'both',
  hintImportance: true,
  tingleShuffle: 'starting',
  mapCompassShuffle: 'starting',
  smallKeyShuffleMm: 'removed',
  smallKeyShuffleHideout: 'vanilla',
  strayFairyChestShuffle: 'starting',
  shuffleGerudoCard: false,
  startingAge: 'random',
  doorOfTime: 'open',
  dekuTree: 'closed',
  kakarikoGate: 'open',
  gerudoFortress: 'single',
  skipZelda: true,
  rainbowBridge: 'medallions',
  bossWarpPads: 'remains',
  freeScarecrowOot: true,
  freeScarecrowMm: true,
  openMaskShop: true,
  crossWarpOot: true,
  crossWarpMm: 'full',
  bottleContentShuffle: true,
  bombchuBehaviorOot: 'bagSeparate',
  bombchuBehaviorMm: 'bagSeparate',
  sharedBows: true,
  sharedBombBags: true,
  sharedMagic: true,
  sharedMagicArrowFire: true,
  sharedMagicArrowIce: true,
  sharedMagicArrowLight: true,
  sharedSongEpona: true,
  sharedSongStorms: true,
  sharedHookshot: true,
  sharedLens: true,
  sharedMaskGoron: true,
  sharedMaskZora: true,
  sharedMaskBunny: true,
  sharedMaskKeaton: true,
  sharedMaskTruth: true,
  sharedWallets: true,
  sharedHealth: true,
  sharedShields: true,
  sharedBombchu: true,
  startingItems: {
    OOT_NUTS_10: 2,
    OOT_SHIELD_DEKU: 1,
    OOT_STICK: 10,
    SHARED_SHIELD_HYLIAN: 1,
    MM_OCARINA: 1,
    OOT_OCARINA: 1,
    MM_SWORD: 2,
    MM_SONG_SOARING: 1
  },
  junkLocations: [
    'MM Beneath The Graveyard Dampe Chest',
    'MM Deku Playground Reward All Days',
    'MM Goron Race Reward',
    'MM Great Bay Great Fairy',
    'MM Honey & Darling Reward All Days',
    'MM Ikana Great Fairy',
    'MM Laboratory Zora Song',
    'MM Moon Fierce Deity Mask',
    'MM Mountain Village Frog Choir HP',
    'MM Ocean Spider House Wallet',
    'MM Pinnacle Rock HP',
    'MM Snowhead Great Fairy',
    "MM Stock Pot Inn Couple's Mask",
    'MM Swamp Spider House Mask of Truth',
    'MM Town Archery Reward 2',
    'MM Waterfall Rapids Beaver Race 2',
    'MM Woodfall Great Fairy',
    'OOT Skulltula House 40 Tokens',
    'OOT Skulltula House 50 Tokens'
  ],
  plando: {
    locations: {
      'OOT Zora River Bean Seller': 'OOT_MAGIC_BEAN',
      "OOT Zelda's Letter": 'OOT_OCARINA',
      "OOT Zelda's Song": 'OOT_SONG_TP_LIGHT',
      'MM Initial Song of Healing': 'MM_SONG_TIME'
    }
  },
  hints: [
    { type: 'foolish', amount: 8, extra: 1 },
    { type: 'always', amount: 'max', extra: 1 },
    { type: 'sometimes', amount: 4, extra: 1 },
    { type: 'item', amount: 1, extra: 1, item: 'SHARED_SHIELD_MIRROR' },
    { type: 'item', amount: 1, extra: 1, item: 'MM_POWDER_KEG' },
    { type: 'item', amount: 1, extra: 1, item: 'MM_MASK_CAPTAIN' },
    { type: 'playthrough', amount: 1, extra: 1 },
    { type: 'woth', amount: 9, extra: 1 },
    { type: 'sometimes', amount: 'max', extra: 1 }
  ]
});

const PRESET_CROSSKEYS = makeSettings({
  goal: 'any',
  noPlandoHints: false,
  extraHintRegions: true,
  hintImportance: true,
  songs: 'anywhere',
  tingleShuffle: 'starting',
  mapCompassShuffle: 'starting',
  smallKeyShuffleOot: 'anywhere',
  smallKeyShuffleMm: 'anywhere',
  smallKeyShuffleHideout: 'anywhere',
  bossKeyShuffleOot: 'anywhere',
  bossKeyShuffleMm: 'anywhere',
  strayFairyChestShuffle: 'starting',
  strayFairyOtherShuffle: 'starting',
  ganonBossKey: 'anywhere',
  startingAge: 'random',
  swordlessAdult: true,
  doorOfTime: 'open',
  ageChange: 'oot',
  openDungeonsOot: {
    type: "specific",
    values: ["dekuTreeAdult", "wellAdult", "fireChild"]
  },
  kakarikoGate: 'open',
  openZdShortcut: true,
  zoraKing: 'open',
  gerudoFortress: 'single',
  skipZelda: true,
  rainbowBridge: 'custom',
  majoraChild: 'custom',
  bossWarpPads: 'remains',
  freeScarecrowOot: true,
  freeScarecrowMm: true,
  openMaskShop: true,
  crossAge: true,
  crossWarpOot: true,
  crossWarpMm: 'full',
  crossGameFw: true,
  restoreBrokenActors: true,
  fillWallets: true,
  progressiveGoronLullaby: 'single',
  bottleContentShuffle: true,
  fairyOcarinaMm: true,
  blueFireArrows: true,
  sunlightArrows: true,
  shortHookshotMm: true,
  bombchuBehaviorOot: 'bagSeparate',
  bombchuBehaviorMm: 'bagSeparate',
  spellFireMm: true,
  spellWindMm: true,
  spellLoveMm: true,
  bootsIronMm: true,
  bootsHoverMm: true,
  tunicGoronMm: true,
  tunicZoraMm: true,
  scalesMm: true,
  strengthMm: true,
  blastMaskOot: true,
  stoneMaskOot: true,
  elegyOot: true,
  lenientSpikes: false,
  sharedBows: true,
  sharedBombBags: true,
  sharedMagic: true,
  sharedMagicArrowFire: true,
  sharedMagicArrowIce: true,
  sharedMagicArrowLight: true,
  sharedSongEpona: true,
  sharedSongStorms: true,
  sharedSongTime: true,
  sharedSongSun: true,
  sharedHookshot: true,
  sharedLens: true,
  sharedOcarina: true,
  sharedMaskGoron: true,
  sharedMaskZora: true,
  sharedMaskKeaton: true,
  sharedMaskTruth: true,
  sharedMaskBlast: true,
  sharedMaskStone: true,
  sharedSongElegy: true,
  sharedWallets: true,
  sharedHealth: true,
  sharedShields: true,
  sharedBombchu: true,
  sharedSpellFire: true,
  sharedSpellWind: true,
  sharedSpellLove: true,
  sharedBootsIron: true,
  sharedBootsHover: true,
  sharedTunicGoron: true,
  sharedTunicZora: true,
  sharedScales: true,
  sharedStrength: true,
  sunSongMm: true,
  agelessSwords: true,
  agelessTunics: true,
  agelessBoots: true,
  agelessChildTrade: true,
  erDungeons: 'full',
  erGrottos: 'full',
  erMixed: 'full',
  erMixedDungeons: true,
  erMixedIndoors: true,
  erMixedGrottos: true,
  erMajorDungeons: true,
  erMinorDungeons: true,
  erGanonCastle: true,
  erMoon: true,
  erSpiderHouses: true,
  erPirateFortress: true,
  erBeneathWell: true,
  erIkanaCastle: true,
  erSecretShrine: true,
  erIndoors: 'full',
  erIndoorsMajor: true,
  erIndoorsExtra: true,
  erOneWays: 'full',
  erOneWaysMajor: true,
  extraChildSwordsOot: true,
  sharedSwords: true,
  startingItems: {
    OOT_NUTS_10: 2,
    OOT_MASK_BUNNY: 1,
    OOT_STICK: 10,
    MM_SONG_SOARING: 1
  },
  junkLocations: [
    'MM Beneath The Graveyard Dampe Chest',
    'MM Deku Playground Reward All Days',
    'MM Goron Race Reward',
    'MM Great Bay Great Fairy',
    'MM Honey & Darling Reward All Days',
    'MM Ikana Great Fairy',
    'MM Laboratory Zora Song',
    'MM Moon Fierce Deity Mask',
    'MM Mountain Village Frog Choir HP',
    'MM Ocean Spider House Wallet',
    'MM Pinnacle Rock HP',
    'MM Snowhead Great Fairy',
    "MM Stock Pot Inn Couple's Mask",
    'MM Swamp Spider House Mask of Truth',
    'MM Town Archery Reward 2',
    'MM Waterfall Rapids Beaver Race 2',
    'MM Woodfall Great Fairy',
    'OOT Hyrule Field Ocarina of Time',
    'OOT Kakariko Song Shadow',
    'OOT Skulltula House 40 Tokens',
    'OOT Skulltula House 50 Tokens'
  ],
  tricks: [
    'MM_EVAN_FARORE',
    'MM_LENS',
    'MM_NO_SEAHORSE',
    'MM_ONE_MASK_STONE_TOWER',
    'MM_PALACE_BEAN_SKIP',
    'MM_SOUTHERN_SWAMP_SCRUB_HP_GORON',
    'MM_ZORA_HALL_SCRUB_HP_NO_DEKU',
    'OOT_DC_JUMP',
    'OOT_DEAD_HAND_STICKS',
    'OOT_FOREST_HOOK',
    'OOT_HAMMER_WALLS',
    'OOT_HIDDEN_GROTTOS',
    'OOT_LENS',
    'OOT_MAN_ON_ROOF',
    'OOT_NIGHT_GS',
    'OOT_TUNICS',
    'OOT_VOLCANO_HOVERS',
    'OOT_WINDMILL_HP_NOTHING'
  ],
  specialConds: {
    BRIDGE: {
      count: 5,
      stones: true,
      medallions: true,
      remains: true,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    },
    MOON: {
      count: 0,
      stones: false,
      medallions: false,
      remains: false,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    },
    LACS: {
      count: 0,
      stones: false,
      medallions: false,
      remains: false,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    },
    GANON_BK: {
      count: 0,
      stones: false,
      medallions: false,
      remains: false,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    },
    MAJORA: {
      count: 5,
      stones: true,
      medallions: true,
      remains: true,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    }
  },
  plando: { locations: { 'OOT Zora River Bean Seller': 'OOT_MAGIC_BEAN' } },
  hints: [
    { type: 'foolish', amount: 8, extra: 1 },
    { type: 'always', amount: 'max', extra: 1 },
    { type: 'sometimes', amount: 3, extra: 1 },
    { type: 'item', amount: 1, extra: 1, item: 'OOT_SWORD_MASTER' },
    { type: 'item', amount: 1, extra: 1, item: 'SHARED_SONG_TIME' },
    { type: 'item', amount: 1, extra: 1, item: 'MM_MASK_CAPTAIN' },
    { type: 'item', amount: 1, extra: 1, item: 'SHARED_SONG_STORMS' },
    { type: 'item', amount: 2, extra: 1, item: 'SHARED_OCARINA' },
    { type: 'woth', amount: 10, extra: 1 },
    { type: 'sometimes', amount: 'max', extra: 1 },
  ]
});

const PRESET_ONLY_OOT = makeSettings({
  games: 'oot',
  goal: 'ganon',
  hintImportance: true,
  mapCompassShuffle: 'starting',
  shuffleMasterSword: false,
  shuffleGerudoCard: false,
  startingAge: 'random',
  doorOfTime: 'open',
  dekuTree: 'closed',
  kakarikoGate: 'open',
  skipZelda: true,
  freeScarecrowOot: true,
  bottleContentShuffle: true,
  bombchuBehaviorOot: 'bagSeparate',
  startingItems: {
    OOT_NUTS_10: 2,
    OOT_SHIELD_DEKU: 1,
    OOT_STICK: 10,
    OOT_SHIELD_HYLIAN: 1,
    OOT_OCARINA: 1
  },
  specialConds: {
    BRIDGE: {
      count: 0,
      stones: false,
      medallions: false,
      remains: false,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    },
    MOON: {
      count: 7,
      stones: true,
      medallions: false,
      remains: true,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    },
    LACS: {
      count: 0,
      stones: false,
      medallions: false,
      remains: false,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    },
    GANON_BK: {
      count: 5,
      stones: true,
      medallions: true,
      remains: false,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    },
    MAJORA: {
      count: 4,
      stones: true,
      medallions: false,
      remains: true,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    }
  },
  plando: {
    locations: {
      'OOT Zora River Bean Seller': 'OOT_MAGIC_BEAN',
      "OOT Zelda's Letter": 'OOT_OCARINA',
      "OOT Zelda's Song": 'OOT_SONG_TP_LIGHT'
    }
  },
  hints: [
    { type: 'foolish', amount: 3, extra: 1 },
    { type: 'always', amount: 'max', extra: 1 },
    { type: 'sometimes', amount: 7, extra: 1 },
    { type: 'item', amount: 1, extra: 1, item: 'OOT_MAGIC_UPGRADE' },
    { type: 'playthrough', amount: 1, extra: 1 },
    { type: 'woth', amount: 5, extra: 1 },
    { type: 'sometimes', amount: 'max', extra: 1 }
  ]
});

const PRESET_ONLY_MM = makeSettings({
  games: 'mm',
  goal: 'majora',
  hintImportance: true,
  tingleShuffle: 'starting',
  mapCompassShuffle: 'starting',
  strayFairyChestShuffle: 'starting',
  bossWarpPads: 'remains',
  bottleContentShuffle: true,
  bombchuBehaviorMm: 'bagSeparate',
  lenientSpikes: false,
  startingItems: { MM_SHIELD_HERO: 1, MM_OCARINA: 1, MM_SWORD: 1, MM_SONG_SOARING: 1 },
  freeScarecrowMm: true,
  junkLocations: [
    'MM Deku Playground Reward All Days',
    'MM Goron Race Reward',
    'MM Great Bay Great Fairy',
    'MM Honey & Darling Reward All Days',
    'MM Ikana Great Fairy',
    'MM Laboratory Zora Song',
    'MM Moon Fierce Deity Mask',
    'MM Moon Trial Deku HP',
    'MM Moon Trial Goron HP',
    'MM Moon Trial Link Garo Master Chest',
    'MM Moon Trial Link HP',
    'MM Moon Trial Link Iron Knuckle Chest',
    'MM Moon Trial Zora HP',
    'MM Mountain Village Frog Choir HP',
    'MM Snowhead Great Fairy',
    "MM Stock Pot Inn Couple's Mask",
    'MM Town Archery Reward 2',
    'MM Waterfall Rapids Beaver Race 2',
    'MM Woodfall Great Fairy'
  ],
  specialConds: {
    BRIDGE: {
      count: 0,
      stones: false,
      medallions: false,
      remains: false,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    },
    MOON: {
      count: 4,
      stones: false,
      medallions: false,
      remains: true,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    },
    LACS: {
      count: 0,
      stones: false,
      medallions: false,
      remains: false,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    },
    GANON_BK: {
      count: 5,
      stones: true,
      medallions: true,
      remains: false,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    },
    MAJORA: {
      count: 4,
      stones: true,
      medallions: false,
      remains: true,
      skullsGold: false,
      skullsSwamp: false,
      skullsOcean: false,
      fairiesWF: false,
      fairiesSH: false,
      fairiesGB: false,
      fairiesST: false,
      fairyTown: false,
      masksRegular: false,
      masksTransform: false,
      masksOot: false,
      triforce: false,
      coinsRed: false,
      coinsGreen: false,
      coinsBlue: false,
      coinsYellow: false
    }
  },
  plando: {
    locations: {
      'MM Initial Song of Healing': 'MM_SONG_TIME'
    }
  },
  hints: [
    { type: 'foolish', amount: 3, extra: 1 },
    { type: 'always', amount: 'max', extra: 1 },
    { type: 'item', amount: 1, extra: 2, item: 'MM_SHIELD_MIRROR' },
    { type: 'item', amount: 1, extra: 1, item: 'MM_POWDER_KEG' },
    { type: 'item', amount: 1, extra: 1, item: 'MM_MASK_CAPTAIN' },
    { type: 'woth', amount: 3, extra: 1 },
    { type: 'sometimes', amount: 'max', extra: 1 }
  ]
});

export const PRESETS: Presets = {
  'Default': PRESET_DEFAULT,
  'Beginner': PRESET_BEGINNER,
  'Blitz': PRESET_BLITZ,
  'Blitz (with pre-completed dungeons)': PRESET_BLITZ_PRECOMPLETED,
  'Triforce Blitz': PRESET_TRIFORCE_BLITZ,
  'Crosskeys': PRESET_CROSSKEYS,
  'Allsanity': PRESET_ALLSANITY,
  'Hell': PRESET_HELL,
  'Only OoT': PRESET_ONLY_OOT,
  'Only MM': PRESET_ONLY_MM,
};
