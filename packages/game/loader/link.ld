SECTIONS
{
  . = 0x80000000;

  .loader.lodata :   ALIGN(16) { *(.lodata*); }
  .loader.text   :   ALIGN(16) { *(.text.entry); *(.text*); }
  .loader.data   :   ALIGN(16) { *(.data*); }
  .loader.rodata :   ALIGN(16) { *(.rodata*); }
  .loader.bss    :   ALIGN(16) { *(.bss*); }

  .MIPS.abiflags : {
    *(.MIPS.abiflags*);
  }

  /DISCARD/ : { *(.*); }
}
