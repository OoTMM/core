#include "file_select.h"
#include <combo/config.h>
#include <assets/oot/textures/parameter_static.h>

#define CUSTOM_FILE_INFO_BUFFER_SIZE    0x40000

#define ICON_SIZE   12
#define ICON_NONE   0xffff
#define ICONF_MM    0x8000
#define ICONF_DIM   0x4000

void FileSelect_CustomFileInfoInit(FileSelectState* this)
{
    this->customFileInfoBufs[0] = malloc(CUSTOM_FILE_INFO_BUFFER_SIZE);
    this->customFileInfoBufs[1] = malloc(CUSTOM_FILE_INFO_BUFFER_SIZE);
    this->game = 0;
}

void FileSelect_CustomFileInfoFree(FileSelectState* this)
{
    free(this->customFileInfoBufs[0]);
    free(this->customFileInfoBufs[1]);
}

static void FileSelect_CustomFileInfoSwap(FileSelectState* this)
{
    void* tmp;

    tmp = this->customFileInfoBufs[0];
    this->customFileInfoBufs[0] = this->customFileInfoBufs[1];
    this->customFileInfoBufs[1] = tmp;
}

static char* allocBuf(void** end, u32 size)
{
    size = (size + 0xf) & ~0xf;
    *end = (char*)*end - size;
    return (char*)*end;
}

static void* allocItemIconOot(void** end, int itemId)
{
    void* buf = allocBuf(end, 0x1000);
    comboItemIcon(buf, itemId);
    return buf;
}

static void* allocItemIconMm(void** end, int itemId)
{
    void* buf = allocBuf(end, 0x1000);
    LoadMmItemIcon(buf, itemId);
    return buf;
}

static void* allocIconItem24Oot(void** end, int id)
{
    void* buf = allocBuf(end, 0x900);
    LoadIconItem24Oot(buf, id);
    return buf;
}

static void* allocIconItem24Mm(void** end, int id)
{
    void* buf = allocBuf(end, 0x900);
    LoadIconItem24Mm(buf, id);
    return buf;
}

static void quadIA8(Gfx** gfx, void* tex, s16 w, s16 h, float x, float y, float scale)
{
    float revScale;

    revScale = 1.0f / scale;
    gDPLoadTextureBlock((*gfx)++, tex, G_IM_FMT_IA, G_IM_SIZ_8b, w, h, 0, G_TX_NOMIRROR | G_TX_CLAMP,
        G_TX_NOMIRROR | G_TX_CLAMP, G_TX_NOMASK, G_TX_NOMASK, G_TX_NOLOD, G_TX_NOLOD);

    gSPTextureRectangle((*gfx)++,
        x * 4.f, y * 4.f,
        (int)(x * 4.f + w * scale * 4.f), (int)(y * 4.f + h * scale * 4.f),
        G_TX_RENDERTILE, 0, 0,
        (int)(revScale * (1 << 10)), (int)(revScale * (1 << 10)));
}

static void quadRGBA8(Gfx** gfx, void* tex, s16 w, s16 h, float x, float y, float scale)
{
    float revScale;

    revScale = 1.0f / scale;
    gDPLoadTextureBlock((*gfx)++, tex, G_IM_FMT_RGBA, G_IM_SIZ_32b, w, h, 0, G_TX_NOMIRROR | G_TX_CLAMP,
        G_TX_NOMIRROR | G_TX_CLAMP, G_TX_NOMASK, G_TX_NOMASK, G_TX_NOLOD, G_TX_NOLOD);

    gSPTextureRectangle((*gfx)++,
        x * 4.f, y * 4.f,
        (int)(x * 4.f + w * scale * 4.f), (int)(y * 4.f + h * scale * 4.f),
        G_TX_RENDERTILE, 0, 0,
        (int)(revScale * (1 << 10)), (int)(revScale * (1 << 10)));
}

static s16 drawDigit(Gfx** list, s16 x, s16 y, int digit)
{
    void* tex;

    tex = (void*)(((u32)&gAmmoDigit0Tex) + 0x40 * digit);
    quadIA8(list, tex, 8, 8, x, y, 1.0f);
    return 8;
}

static void drawNumber(Gfx** list, s16 x, s16 y, int num, int paddingZeroes)
{
    int divisor = 1000000000;
    int paddingZeroesDivisor = 1;
    int startPrint;
    int digit;

    startPrint = 0;
    if (paddingZeroes)
        paddingZeroes--;
    while (paddingZeroes)
    {
        paddingZeroesDivisor *= 10;
        paddingZeroes--;
    }

    for (;;)
    {
        if (num < divisor)
        {
            if (divisor <= paddingZeroesDivisor)
                startPrint = 1;
            digit = 0;
        }
        else
        {
            digit = num / divisor;
            num -= digit * divisor;
        }
        divisor /= 10;

        if (digit || startPrint)
        {
            startPrint = 1;
            x += drawDigit(list, x, y, digit);
        }

        if (!num)
            break;
    }
}

static s16 drawItemIcon(Gfx** list, void** end, s16 x, s16 y, u16 id, int noDim)
{
    static const float scale = 0.375f;
    u16 itemId;
    void* tex;

    if (id == ICON_NONE)
        return 0;

    itemId = id & 0x3fff;
    if (!(id & ICONF_MM))
        tex = allocItemIconOot(end, itemId);
    else
        tex = allocItemIconMm(end, itemId);

    /* Dim */
    if (!noDim)
    {
        gDPSetPrimColor((*list)++, 0, 0, 30, 30, 30, 128);
    }
    else
    {
        gDPSetPrimColor((*list)++, 0, 0, 255, 255, 255, 255);
    }

    /* Draw */
    quadRGBA8(list, tex, 32, 32, x, y, scale);
    return ICON_SIZE;
}

static float drawItemIcon24(Gfx** list, void** end, s16 x, s16 y, u16 id, int noDim)
{
    static const float scale = 0.5f;
    u16 itemId;
    void* tex;

    if (id == ICON_NONE)
        return 0;

    itemId = id & 0x3fff;
    if (!(id & ICONF_MM))
        tex = allocIconItem24Oot(end, itemId);
    else
        tex = allocIconItem24Mm(end, itemId);

    /* Dim */
    if (!noDim)
    {
        gDPSetPrimColor((*list)++, 0, 0, 30, 30, 30, 128);
    }
    else
    {
        gDPSetPrimColor((*list)++, 0, 0, 255, 255, 255, 255);
    }

    /* Draw */
    quadRGBA8(list, tex, 24, 24, x, y, scale);
    return ICON_SIZE;
}

static void FileSelect_CustomFileInfoPrepareOotMedsStones(FileSelectState* this, Gfx** list, void** end, int x, int y)
{
    static const float sqrt2_2 = 0.70710677f;

    /* Medallions */
    drawItemIcon24(list, end, x + 1 * ICON_SIZE, y, 5, gOotSave.inventory.quest.medallionLight);
    drawItemIcon24(list, end, x, y + sqrt2_2 * ICON_SIZE, 4, gOotSave.inventory.quest.medallionShadow);
    drawItemIcon24(list, end, x + 2 * ICON_SIZE, y + sqrt2_2 * ICON_SIZE, 0, gOotSave.inventory.quest.medallionForest);
    drawItemIcon24(list, end, x, y + sqrt2_2 * ICON_SIZE, 3, gOotSave.inventory.quest.medallionSpirit);
    drawItemIcon24(list, end, x + 2 * ICON_SIZE, y + sqrt2_2 * ICON_SIZE, 1, gOotSave.inventory.quest.medallionFire);
    drawItemIcon24(list, end, x + 1 * ICON_SIZE, y + sqrt2_2 * ICON_SIZE * 2, 2, gOotSave.inventory.quest.medallionWater);

    /* Stones */
    drawItemIcon24(list, end, x + 0 * ICON_SIZE, y + ICON_SIZE * 4, 6, gOotSave.inventory.quest.stoneEmerald);
    drawItemIcon24(list, end, x + 1 * ICON_SIZE, y + ICON_SIZE * 4, 7, gOotSave.inventory.quest.stoneRuby);
    drawItemIcon24(list, end, x + 2 * ICON_SIZE, y + ICON_SIZE * 4, 8, gOotSave.inventory.quest.stoneSapphire);
}

static void FileSelect_CustomFileInfoPrepareOotInventory(FileSelectState* this, Gfx** list, void** end, float x, float y)
{
    float startX;
    float startY;
    u16 iconOcarina;
    u16 iconHookshot;
    u8 itemId;
    u8 hasBottle;

    /* Pre-compute complex icons */
    if (gOotExtraItems.ocarina & 2)
        iconOcarina = ITEM_OOT_OCARINA_TIME;
    else
        iconOcarina = ITEM_OOT_OCARINA_FAIRY;

    if (gOotExtraItems.hookshot & 2)
        iconHookshot = ITEM_OOT_LONGSHOT;
    else
        iconHookshot = ITEM_OOT_HOOKSHOT;

    hasBottle = 0;
    for (int i = 0; i < 4; ++i)
    {
        itemId = gOotSave.inventory.items[ITS_OOT_BOTTLE + i];
        if (itemId >= ITEM_OOT_BOTTLE_EMPTY && itemId <= ITEM_OOT_POE && itemId != ITEM_OOT_RUTO_LETTER)
        {
            hasBottle = 1;
            break;
        }
    }

    /* Row 1 */
    startX = x;
    startY = y;
    x += drawItemIcon(list, end, x, y, ITEM_OOT_STICK,           gOotSave.inventory.items[ITS_OOT_STICKS] == ITEM_OOT_STICK);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_NUT,             gOotSave.inventory.items[ITS_OOT_NUTS] == ITEM_OOT_NUT);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_BOMB,            gOotSave.inventory.items[ITS_OOT_BOMBS] == ITEM_OOT_BOMB);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_BOW,             gOotSave.inventory.items[ITS_OOT_BOW] == ITEM_OOT_BOW);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_ARROW_FIRE,      gOotSave.inventory.items[ITS_OOT_ARROW_FIRE] == ITEM_OOT_ARROW_FIRE);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_SPELL_FIRE,      gOotSave.inventory.items[ITS_OOT_SPELL_FIRE] == ITEM_OOT_SPELL_FIRE);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_BOTTLE_EMPTY,    hasBottle);
    //drawNumber(list, x + 16 * dx, y + 16 * dy, 2, 0);

    /* Row 2 */
    x = startX;
    y += ICON_SIZE;
    x += drawItemIcon(list, end, x, y, ITEM_OOT_SLINGSHOT,   gOotSave.inventory.items[ITS_OOT_SLINGSHOT] == ITEM_OOT_SLINGSHOT);
    x += drawItemIcon(list, end, x, y, iconOcarina,          gOotExtraItems.ocarina);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_BOMBCHU_10,  gOotSave.inventory.items[ITS_OOT_BOMBCHU] == ITEM_OOT_BOMBCHU_10);
    x += drawItemIcon(list, end, x, y, iconHookshot,         gOotExtraItems.hookshot);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_ARROW_ICE,   gOotSave.inventory.items[ITS_OOT_ARROW_ICE] == ITEM_OOT_ARROW_ICE);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_SPELL_WIND,  gOotSave.inventory.items[ITS_OOT_SPELL_WIND] == ITEM_OOT_SPELL_WIND);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_RUTO_LETTER, gOotExtraItems.rutoLetter);

    /* Row 3 */
    x = startX;
    y += ICON_SIZE;
    x += drawItemIcon(list, end, x, y, ITEM_OOT_BOOMERANG,   gOotSave.inventory.items[ITS_OOT_BOOMERANG] == ITEM_OOT_BOOMERANG);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_LENS,        gOotSave.inventory.items[ITS_OOT_LENS] == ITEM_OOT_LENS);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_MAGIC_BEAN,  gOotSave.inventory.items[ITS_OOT_MAGIC_BEAN] == ITEM_OOT_MAGIC_BEAN);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_HAMMER,      gOotSave.inventory.items[ITS_OOT_HAMMER] == ITEM_OOT_HAMMER);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_ARROW_LIGHT, gOotSave.inventory.items[ITS_OOT_ARROW_LIGHT] == ITEM_OOT_ARROW_LIGHT);
    x += drawItemIcon(list, end, x, y, ITEM_OOT_SPELL_LOVE,  gOotSave.inventory.items[ITS_OOT_SPELL_LOVE] == ITEM_OOT_SPELL_LOVE);

    /* Row 4 - Child Trade */
    x = startX;
    y += ICON_SIZE;
    if (Config_Flag(CFG_OOT_SHUFFLE_EGGS))
        x += drawItemIcon(list, end, x, y, ITEM_OOT_WEIRD_EGG,                gOotExtraTradeSave.child & (1 << XITEM_OOT_CHILD_WEIRD_EGG));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_CHICKEN,                  gOotExtraTradeSave.child & (1 << XITEM_OOT_CHILD_CHICKEN));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_ZELDA_LETTER,             gOotExtraTradeSave.child & (1 << XITEM_OOT_CHILD_ZELDA_LETTER));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_KEATON_MASK,              gOotExtraTradeSave.child & (1 << XITEM_OOT_CHILD_KEATON_MASK));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_SKULL_MASK,               gOotExtraTradeSave.child & (1 << XITEM_OOT_CHILD_SKULL_MASK));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_SPOOKY_MASK,              gOotExtraTradeSave.child & (1 << XITEM_OOT_CHILD_SPOOKY_MASK));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_BUNNY_HOOD,               gOotExtraTradeSave.child & (1 << XITEM_OOT_CHILD_BUNNY_HOOD));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_GORON_MASK,               gOotExtraTradeSave.child & (1 << XITEM_OOT_CHILD_GORON_MASK));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_ZORA_MASK,                gOotExtraTradeSave.child & (1 << XITEM_OOT_CHILD_ZORA_MASK));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_GERUDO_MASK,              gOotExtraTradeSave.child & (1 << XITEM_OOT_CHILD_GERUDO_MASK));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_MASK_OF_TRUTH,            gOotExtraTradeSave.child & (1 << XITEM_OOT_CHILD_MASK_OF_TRUTH));
    if (Config_Flag(CFG_OOT_MASK_BLAST))
        x += drawItemIcon(list, end, x, y, ITEM_MM_MASK_BLAST | ICONF_MM,     gOotExtraTradeSave.child & (1 << XITEM_OOT_CHILD_MASK_BLAST));
    if (Config_Flag(CFG_OOT_MASK_STONE))
        x += drawItemIcon(list, end, x, y, ITEM_MM_MASK_STONE | ICONF_MM,     gOotExtraTradeSave.child & (1 << XITEM_OOT_CHILD_MASK_STONE));

    /* Row 5 - Adult Trade */
    x = startX;
    y += ICON_SIZE;
    if (Config_Flag(CFG_OOT_SHUFFLE_EGGS))
        x += drawItemIcon(list, end, x, y, ITEM_OOT_POCKET_EGG,                gOotExtraTradeSave.adult & (1 << XITEM_OOT_ADULT_POCKET_EGG));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_POCKET_CUCCO,              gOotExtraTradeSave.adult & (1 << XITEM_OOT_ADULT_POCKET_CUCCO));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_COJIRO,                    gOotExtraTradeSave.adult & (1 << XITEM_OOT_ADULT_COJIRO));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_ODD_MUSHROOM,              gOotExtraTradeSave.adult & (1 << XITEM_OOT_ADULT_ODD_MUSHROOM));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_ODD_POTION,                gOotExtraTradeSave.adult & (1 << XITEM_OOT_ADULT_ODD_POTION));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_POACHER_SAW,               gOotExtraTradeSave.adult & (1 << XITEM_OOT_ADULT_POACHER_SAW));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_GORON_SWORD_BROKEN,        gOotExtraTradeSave.adult & (1 << XITEM_OOT_ADULT_BROKEN_GORON_SWORD));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_PRESCRIPTION,              gOotExtraTradeSave.adult & (1 << XITEM_OOT_ADULT_PRESCRIPTION));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_EYEBALL_FROG,              gOotExtraTradeSave.adult & (1 << XITEM_OOT_ADULT_EYEBALL_FROG));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_EYE_DROPS,                 gOotExtraTradeSave.adult & (1 << XITEM_OOT_ADULT_EYE_DROPS));
    x += drawItemIcon(list, end, x, y, ITEM_OOT_CLAIM_CHECK,               gOotExtraTradeSave.adult & (1 << XITEM_OOT_ADULT_CLAIM_CHECK));
}

static void FileSelect_CustomFileInfoPrepareOot(FileSelectState* this, Gfx** list, void** end)
{
    FileSelect_CustomFileInfoPrepareOotMedsStones(this, list, end, 80, 94);
    FileSelect_CustomFileInfoPrepareOotInventory(this, list, end, 130, 94);
}

static void FileSelect_CustomFileInfoPrepareMmRemains(FileSelectState* this, Gfx** list, void** end, int x, int y)
{
    static const float scale = 0.75f;
    static const float sqrt2_2 = 0.70710677f;

    drawItemIcon(list, end, x, y,                             1, 0,           ITEM_MM_REMAINS_ODOLWA | ICONF_MM,      gMmSave.inventory.quest.remainsOdolwa);
    drawItemIcon(list, end, x, y + sqrt2_2 * scale * 16,      0, 0,           ITEM_MM_REMAINS_GYORG | ICONF_MM,       gMmSave.inventory.quest.remainsGyorg);
    drawItemIcon(list, end, x, y + sqrt2_2 * scale * 16,      2, 0,           ITEM_MM_REMAINS_GOHT | ICONF_MM,        gMmSave.inventory.quest.remainsGoht);
    drawItemIcon(list, end, x, y + sqrt2_2 * scale * 16 * 2,  1, 0,           ITEM_MM_REMAINS_TWINMOLD | ICONF_MM,    gMmSave.inventory.quest.remainsTwinmold);
}

static void FileSelect_CustomFileInfoPrepareMmInventory(FileSelectState* this, Gfx** list, void** end, int x, int y)
{
    int dx;
    int dy;
    u16 iconOcarina;
    u16 iconHookshot;
    u16 itemId;
    u8  hasBottle;

    /* Pre-compute complex icons */
    iconOcarina = ITEM_OOT_OCARINA_TIME;
    if (Config_Flag(CFG_MM_OCARINA_FAIRY) && !(gMmExtraItems.ocarina & 2))
        iconOcarina = ITEM_OOT_OCARINA_FAIRY;

    iconHookshot = ITEM_MM_HOOKSHOT | ICONF_MM;
    if (Config_Flag(CFG_MM_HOOKSHOT_SHORT) && !(gMmExtraItems.hookshot & 2))
        iconHookshot = ITEM_OOT_HOOKSHOT;

    /* Bottle */
    hasBottle = 0;
    for (int i = 0; i < 6; ++i)
    {
        itemId = gMmSave.inventory.items[ITS_MM_BOTTLE + i];
        if (itemId >= ITEM_MM_BOTTLE_EMPTY && itemId <= ITEM_MM_CHATEAU && itemId != ITEM_MM_GOLD_DUST)
        {
            hasBottle = 1;
            break;
        }
    }

    /* Main Items */
    dx = 0;
    dy = 0;
    drawItemIcon(list, end, x, y, dx++, dy, iconOcarina,                  gMmExtraItems.ocarina);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_BOW | ICONF_MM,       gMmSave.inventory.items[ITS_MM_BOW] == ITEM_MM_BOW);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_OOT_ARROW_FIRE,          gMmSave.inventory.items[ITS_MM_ARROW_FIRE] == ITEM_MM_ARROW_FIRE);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_OOT_ARROW_ICE,           gMmSave.inventory.items[ITS_MM_ARROW_ICE] == ITEM_MM_ARROW_ICE);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_OOT_ARROW_LIGHT,         gMmSave.inventory.items[ITS_MM_ARROW_LIGHT] == ITEM_MM_ARROW_LIGHT);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_OOT_BOTTLE_EMPTY,        hasBottle);
    dx = 0;
    dy++;
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_OOT_BOMB,                gMmSave.inventory.items[ITS_MM_BOMBS] == ITEM_MM_BOMB);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_OOT_BOMBCHU_10,          gMmSave.inventory.items[ITS_MM_BOMBCHU] == ITEM_MM_BOMBCHU);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_OOT_STICK,               gMmSave.inventory.items[ITS_MM_STICKS] == ITEM_MM_STICK);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_OOT_NUT,                 gMmSave.inventory.items[ITS_MM_NUTS] == ITEM_MM_NUT);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_OOT_MAGIC_BEAN,          gMmSave.inventory.items[ITS_MM_BEANS] == ITEM_MM_MAGIC_BEAN);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_GOLD_DUST | ICONF_MM, gMmExtraItems.goldDust);
    dx = 0;
    dy++;
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_POWDER_KEG | ICONF_MM,            gMmSave.inventory.items[ITS_MM_KEG] == ITEM_MM_POWDER_KEG);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_PICTOGRAPH_BOX | ICONF_MM,        gMmSave.inventory.items[ITS_MM_PICTOBOX] == ITEM_MM_PICTOGRAPH_BOX);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_OOT_LENS,                            gMmSave.inventory.items[ITS_MM_LENS] == ITEM_MM_LENS_OF_TRUTH);
    drawItemIcon(list, end, x, y, dx++, dy, iconHookshot,                             gMmExtraItems.hookshot);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_GREAT_FAIRY_SWORD | ICONF_MM,     gMmExtraItems.hammerGFS & 1);

    /* Trade Items */
    dx = 0;
    dy++;
    y += 5;
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MOON_TEAR | ICONF_MM,             gMmExtraTrade.tradeObtained1 & (1 << XITEM_MM_TRADE1_MOON_TEAR));
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_DEED_LAND | ICONF_MM,             gMmExtraTrade.tradeObtained1 & (1 << XITEM_MM_TRADE1_DEED_LAND));
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_DEED_SWAMP | ICONF_MM,            gMmExtraTrade.tradeObtained1 & (1 << XITEM_MM_TRADE1_DEED_SWAMP));
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_DEED_MOUNTAIN | ICONF_MM,         gMmExtraTrade.tradeObtained1 & (1 << XITEM_MM_TRADE1_DEED_MOUNTAIN));
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_DEED_OCEAN | ICONF_MM,            gMmExtraTrade.tradeObtained1 & (1 << XITEM_MM_TRADE1_DEED_OCEAN));
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_ROOM_KEY | ICONF_MM,              gMmExtraTrade.tradeObtained2 & (1 << XITEM_MM_TRADE2_ROOM_KEY));
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_LETTER_TO_MAMA | ICONF_MM,        gMmExtraTrade.tradeObtained2 & (1 << XITEM_MM_TRADE2_LETTER_TO_MAMA));
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_LETTER_TO_KAFEI | ICONF_MM,       gMmExtraTrade.tradeObtained3 & (1 << XITEM_MM_TRADE3_LETTER_TO_KAFEI));
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_PENDANT_OF_MEMORIES | ICONF_MM,   gMmExtraTrade.tradeObtained3 & (1 << XITEM_MM_TRADE3_PENDANT_OF_MEMORIES));

    /* Masks */
    dx = 0;
    dy++;
    y += 5;
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_POSTMAN | ICONF_MM,             gMmSave.inventory.items[ITS_MM_MASK_POSTMAN] == ITEM_MM_MASK_POSTMAN);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_ALL_NIGHT | ICONF_MM,           gMmSave.inventory.items[ITS_MM_MASK_ALL_NIGHT] == ITEM_MM_MASK_ALL_NIGHT);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_BLAST | ICONF_MM,               gMmSave.inventory.items[ITS_MM_MASK_BLAST] == ITEM_MM_MASK_BLAST);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_STONE | ICONF_MM,               gMmSave.inventory.items[ITS_MM_MASK_STONE] == ITEM_MM_MASK_STONE);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_GREAT_FAIRY | ICONF_MM,         gMmSave.inventory.items[ITS_MM_MASK_GREAT_FAIRY] == ITEM_MM_MASK_GREAT_FAIRY);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_DEKU | ICONF_MM,                gMmSave.inventory.items[ITS_MM_MASK_DEKU] == ITEM_MM_MASK_DEKU);
    dx = 0;
    dy++;
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_KEATON | ICONF_MM,               gMmSave.inventory.items[ITS_MM_MASK_KEATON] == ITEM_MM_MASK_KEATON);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_BREMEN | ICONF_MM,               gMmSave.inventory.items[ITS_MM_MASK_BREMEN] == ITEM_MM_MASK_BREMEN);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_BUNNY | ICONF_MM,                gMmSave.inventory.items[ITS_MM_MASK_BUNNY] == ITEM_MM_MASK_BUNNY);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_DON_GERO | ICONF_MM,             gMmSave.inventory.items[ITS_MM_MASK_DON_GERO] == ITEM_MM_MASK_DON_GERO);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_SCENTS | ICONF_MM,               gMmSave.inventory.items[ITS_MM_MASK_SCENTS] == ITEM_MM_MASK_SCENTS);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_GORON | ICONF_MM,                gMmSave.inventory.items[ITS_MM_MASK_GORON] == ITEM_MM_MASK_GORON);
    dx = 0;
    dy++;
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_ROMANI | ICONF_MM,               gMmSave.inventory.items[ITS_MM_MASK_ROMANI] == ITEM_MM_MASK_ROMANI);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_TROUPE_LEADER | ICONF_MM,        gMmSave.inventory.items[ITS_MM_MASK_TROUPE_LEADER] == ITEM_MM_MASK_TROUPE_LEADER);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_KAFEI | ICONF_MM,                gMmSave.inventory.items[ITS_MM_MASK_KAFEI] == ITEM_MM_MASK_KAFEI);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_COUPLE | ICONF_MM,               gMmSave.inventory.items[ITS_MM_MASK_COUPLE] == ITEM_MM_MASK_COUPLE);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_TRUTH | ICONF_MM,                gMmSave.inventory.items[ITS_MM_MASK_TRUTH] == ITEM_MM_MASK_TRUTH);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_ZORA | ICONF_MM,                 gMmSave.inventory.items[ITS_MM_MASK_ZORA] == ITEM_MM_MASK_ZORA);
    dx = 0;
    dy++;
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_KAMARO | ICONF_MM,               gMmSave.inventory.items[ITS_MM_MASK_KAMARO] == ITEM_MM_MASK_KAMARO);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_GIBDO | ICONF_MM,                gMmSave.inventory.items[ITS_MM_MASK_GIBDO] == ITEM_MM_MASK_GIBDO);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_GARO | ICONF_MM,                 gMmSave.inventory.items[ITS_MM_MASK_GARO] == ITEM_MM_MASK_GARO);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_CAPTAIN | ICONF_MM,              gMmSave.inventory.items[ITS_MM_MASK_CAPTAIN] == ITEM_MM_MASK_CAPTAIN);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_GIANT | ICONF_MM,                gMmSave.inventory.items[ITS_MM_MASK_GIANT] == ITEM_MM_MASK_GIANT);
    drawItemIcon(list, end, x, y, dx++, dy, ITEM_MM_MASK_FIERCE_DEITY | ICONF_MM,         gMmSave.inventory.items[ITS_MM_MASK_FIERCE_DEITY] == ITEM_MM_MASK_FIERCE_DEITY);
}

static void FileSelect_CustomFileInfoPrepareMm(FileSelectState* this, Gfx** list, void** end)
{
    FileSelect_CustomFileInfoPrepareMmRemains(this, list, end, 80, 94);
    FileSelect_CustomFileInfoPrepareMmInventory(this, list, end, 130, 94);
}

void FileSelect_CustomFileInfoPrepare(FileSelectState* this, int slot)
{
    Gfx* list;
    void* end;

    /* Load the saves */
    gSaveContext.fileNum = slot;
    Save_ReadOwn();
    Save_ReadForeign();

    FileSelect_CustomFileInfoSwap(this);
    list = this->customFileInfoBufs[0];
    end = (char*)list + CUSTOM_FILE_INFO_BUFFER_SIZE;

    /* Init */
    gDPSetCombineMode(list++, G_CC_MODULATEIA_PRIM, G_CC_MODULATEIA_PRIM);
    gDPSetPrimColor(list++, 0, 0, 255, 255, 255, 255);
    gDPSetTexturePersp(list++, G_TP_NONE);

    if (!this->game)
        FileSelect_CustomFileInfoPrepareOot(this, &list, &end);
    else
        FileSelect_CustomFileInfoPrepareMm(this, &list, &end);

    gSPEndDisplayList(list++);
}

void FileSelect_CustomFileInfoDraw(FileSelectState* this)
{
    OPEN_DISPS(this->state.gfxCtx);
    gSPDisplayList(POLY_OPA_DISP++, this->customFileInfoBufs[0]);
    CLOSE_DISPS();
}
