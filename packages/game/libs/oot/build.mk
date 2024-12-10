#### Files ####

# ROM image
OOT_ROM			:= $(BUILD_DIR)/oot.z64
OOT_ROMC		:= $(OOT_ROM:.z64=-compressed.z64)
OOT_ELF     	:= $(OOT_ROM:.z64=.elf)
OOT_MAP			:= $(OOT_ROM:.z64=.map)
OOT_LDSCRIPT	:= $(OOT_ROM:.z64=.ld)

# description of ROM segments
OOT_SPEC := libs/oot/spec
OOT_SRC_DIRS := $(shell find libs/oot/src -type d)

ifneq ($(wildcard $(OOT_EXTRACTED_DIR)/assets/audio),)
  OOT_SAMPLE_EXTRACT_DIRS := $(shell find $(OOT_EXTRACTED_DIR)/assets/audio/samples -type d)
  OOT_SAMPLEBANK_EXTRACT_DIRS := $(shell find $(OOT_EXTRACTED_DIR)/assets/audio/samplebanks -type d)
  OOT_SOUNDFONT_EXTRACT_DIRS := $(shell find $(OOT_EXTRACTED_DIR)/assets/audio/soundfonts -type d)
  OOT_SEQUENCE_EXTRACT_DIRS := $(shell find $(OOT_EXTRACTED_DIR)/assets/audio/sequences -type d)
else
  OOT_SAMPLE_EXTRACT_DIRS :=
  OOT_SAMPLEBANK_EXTRACT_DIRS :=
  OOT_SOUNDFONT_EXTRACT_DIRS :=
  OOT_SEQUENCE_EXTRACT_DIRS :=
endif
