#include <combo.h>

#if defined(GAME_OOT)
# define ITEM_BASE_MM           MASK_FOREIGN_ITEM
# define comboAddItemNative     comboAddItemOot
# define comboAddItemForeign    comboAddItemMm
#else
# define ITEM_BASE_MM 0x0
# define comboAddItemNative     comboAddItemMm
# define comboAddItemForeign    comboAddItemOot
#endif

const u8 kMaxSticks[] = { 0, 10, 20, 30 };
const u8 kMaxNuts[] = { 0, 20, 30, 40 };
const u8 kMaxBombs[] = { 0, 20, 30, 40 };
const u8 kMaxArrows[] = { 0, 30, 40, 50 };
const u8 kMaxSeeds[] = { 0, 30, 40, 50 };
const u16 kMaxRupees[] = { 99, 200, 500 };

int comboAddItem(GameState_Play* play, s16 gi)
{
    u16 itemId;

    gi--;
    itemId = kExtendedGetItems[gi].itemId;
    if (gi & MASK_FOREIGN_GI)
    {
        itemId |= MASK_FOREIGN_ITEM;
        comboAddItemForeign(itemId & 0xff, 1);
    }
    else
    {
        comboAddItemNative(itemId, 0);
        comboAddItemEffect(play, itemId);
    }

    comboTextHijackItem(play, itemId);
    return -1;
}

int comboAddItemNoEffect(s16 gi)
{
    u16 itemId;

    gi--;
    itemId = kExtendedGetItems[gi].itemId;
    if (gi & MASK_FOREIGN_GI)
    {
        itemId |= MASK_FOREIGN_ITEM;
        comboAddItemForeign(itemId & 0xff, 1);
    }
    else
    {
        comboAddItemNative(itemId, 1);
    }
    return -1;
}

static int isItemUnavailableOot(s32 gi)
{
    switch (gi)
    {
    case GI_OOT_BOMB:
    case GI_OOT_BOMBS_5:
    case GI_OOT_BOMBS_10:
    case GI_OOT_BOMBS_20:
    case GI_OOT_BOMBS_30:
        return gOotSave.upgrades.bombBag == 0;
    case GI_OOT_ARROWS_5:
    case GI_OOT_ARROWS_10:
    case GI_OOT_ARROWS_30:
        return gOotSave.upgrades.quiver == 0;
    case GI_OOT_DEKU_SEEDS_5:
    case GI_OOT_DEKU_SEEDS_30:
        return gOotSave.upgrades.bulletBag == 0;
    default:
        return 0;
    }
}

static int isItemUnavailableMm(s32 gi)
{
    switch (gi)
    {
    case GI_MM_BOMB:
    case GI_MM_BOMBS_5:
    case GI_MM_BOMBS_10:
    case GI_MM_BOMBS_20:
    case GI_MM_BOMBS_30:
    case GI_MM_BOMBCHU:
    case GI_MM_BOMBCHUS_5:
    case GI_MM_BOMBCHUS_10:
    case GI_MM_BOMBCHUS_20:
        return gMmSave.inventory.upgrades.bombBag == 0;
    case GI_MM_ARROWS_10:
    case GI_MM_ARROWS_30:
    case GI_MM_ARROWS_40:
        return gMmSave.inventory.upgrades.quiver == 0;
    default:
        return 0;
    }
}

int comboIsItemUnavailable(s16 gi)
{
#if defined(GAME_MM)
    gi ^= MASK_FOREIGN_GI;
#endif
    if (gi & MASK_FOREIGN_GI)
        return isItemUnavailableMm(gi & ~MASK_FOREIGN_GI);
    else
        return isItemUnavailableOot(gi);
}

static int isItemMinorOot(s16 gi)
{
    switch (gi)
    {
    case GI_OOT_BOMB:
    case GI_OOT_BOMBS_5:
    case GI_OOT_BOMBS_10:
    case GI_OOT_BOMBS_20:
    case GI_OOT_BOMBS_30:
    case GI_OOT_ARROWS_5:
    case GI_OOT_ARROWS_10:
    case GI_OOT_ARROWS_30:
    case GI_OOT_DEKU_SEEDS_5:
    case GI_OOT_DEKU_SEEDS_30:
        return 1;
    default:
        return 0;
    }
}

static int isItemMinorMm(s16 gi)
{
    switch (gi)
    {
    case GI_MM_BOMB:
    case GI_MM_BOMBS_5:
    case GI_MM_BOMBS_10:
    case GI_MM_BOMBS_20:
    case GI_MM_BOMBS_30:
    case GI_MM_BOMBCHU:
    case GI_MM_BOMBCHUS_5:
    case GI_MM_BOMBCHUS_10:
    case GI_MM_BOMBCHUS_20:
    case GI_MM_ARROWS_10:
    case GI_MM_ARROWS_30:
    case GI_MM_ARROWS_40:
        return 1;
    default:
        return 0;
    }
}

int comboIsItemMinor(s16 gi)
{
#if defined(GAME_MM)
    gi ^= MASK_FOREIGN_GI;
#endif
    if (gi & MASK_FOREIGN_GI)
        return isItemMinorMm(gi & ~MASK_FOREIGN_GI);
    else
        return isItemMinorOot(gi);
}
