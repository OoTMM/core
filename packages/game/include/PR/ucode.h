#ifndef PR_UCODE_H
#define PR_UCODE_H

#include "PR/ultratypes.h"

#define SP_DRAM_STACK_SIZE8 0x400
#define SP_DRAM_STACK_SIZE64 (SP_DRAM_STACK_SIZE8 >> 3)

#define SP_UCODE_SIZE 0x1000

#define SP_UCODE_DATA_SIZE 0x800

extern u64 rspbootTextStart[];
extern u64 rspbootTextEnd[];

extern u64 aspMainTextStart[];
extern u64 aspMainTextEnd[];
extern u64 aspMainDataStart[];
extern u64 aspMainDataEnd[];

extern u64 gspF3DZEX2_NoN_PosLight_fifoTextStart[];
extern u64 gspF3DZEX2_NoN_PosLight_fifoTextEnd[];
extern u64 gspF3DZEX2_NoN_PosLight_fifoDataStart[];
extern u64 gspF3DZEX2_NoN_PosLight_fifoDataEnd[];

/* OoT stuff */
extern u64 gspS2DEX2d_fifoTextStart[], gspS2DEX2d_fifoTextEnd[];
extern u64 gspS2DEX2d_fifoDataStart[], gspS2DEX2d_fifoDataEnd[];
extern u64 njpgdspMainTextStart[], njpgdspMainTextEnd[];
extern u64 njpgdspMainDataStart[], njpgdspMainDataEnd[];
extern u64 cic6105TextStart[], cic6105TextEnd[];

#endif
