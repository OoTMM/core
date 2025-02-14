#include <combo.h>

#define TRIGGER_SONG_HEALING 0x100

void CustomTriggers_HandleTriggerGame(Actor_CustomTriggers* this, PlayState* play)
{
    switch (gComboTriggersData.trigger)
    {
    case TRIGGER_SONG_HEALING:
        if (CustomTriggers_GiveItemNpc(this, play, GI_MM_SONG_HEALING, NPC_MM_SONG_HEALING))
        {
            gMmExtraFlags2.songHealing = 1;
            gComboTriggersData.trigger = 0;
        }
        break;
    default:
        break;
    }
}

void CustomTriggers_CheckTriggerGame(Actor_CustomTriggers* this, PlayState* play)
{
    if (!gMmExtraFlags2.songHealing && gSave.entrance == ENTR_MM_CLOCK_TOWN_FROM_CLOCK_TOWER && g.isNextEntranceInitialSong)
    {
        gComboTriggersData.trigger = TRIGGER_SONG_HEALING;
        return;
    }
}
