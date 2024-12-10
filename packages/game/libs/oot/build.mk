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

ifneq ($(wildcard libs/oot/assets/audio/samples),)
  OOT_SAMPLE_DIRS := $(shell find libs/oot/assets/audio/samples -type d)
else
  OOT_SAMPLE_DIRS :=
endif

ifneq ($(wildcard libs/oot/assets/audio/samplebanks),)
  OOT_SAMPLEBANK_DIRS := $(shell find libs/oot/assets/audio/samplebanks -type d)
else
  OOT_SAMPLEBANK_DIRS :=
endif

ifneq ($(wildcard libs/oot/assets/audio/soundfonts),)
  OOT_SOUNDFONT_DIRS := $(shell find libs/oot/assets/audio/soundfonts -type d)
else
  OOT_SOUNDFONT_DIRS :=
endif

ifneq ($(wildcard libs/oot/assets/audio/sequences),)
  OOT_SEQUENCE_DIRS := $(shell find libs/oot/assets/audio/sequences -type d)
else
  OOT_SEQUENCE_DIRS :=
endif

OOT_SAMPLE_FILES         := $(foreach dir,$(OOT_SAMPLE_DIRS),$(wildcard $(dir)/*.wav))
OOT_SAMPLE_EXTRACT_FILES := $(foreach dir,$(OOT_SAMPLE_EXTRACT_DIRS),$(wildcard $(dir)/*.wav))
OOT_AIFC_FILES           := $(foreach f,$(OOT_SAMPLE_FILES),$(BUILD_DIR)/$(f:.wav=.aifc)) $(foreach f,$(OOT_SAMPLE_EXTRACT_FILES:.wav=.aifc),$(f:$(OOT_EXTRACTED_DIR)/%=$(BUILD_DIR)/%))

OOT_SAMPLEBANK_XMLS         := $(foreach dir,$(OOT_SAMPLEBANK_DIRS),$(wildcard $(dir)/*.xml))
OOT_SAMPLEBANK_EXTRACT_XMLS := $(foreach dir,$(OOT_SAMPLEBANK_EXTRACT_DIRS),$(wildcard $(dir)/*.xml))
OOT_SAMPLEBANK_BUILD_XMLS   := $(foreach f,$(OOT_SAMPLEBANK_XMLS),$(BUILD_DIR)/$f) $(foreach f,$(OOT_SAMPLEBANK_EXTRACT_XMLS),$(f:$(OOT_EXTRACTED_DIR)/%=$(BUILD_DIR)/%))
OOT_SAMPLEBANK_O_FILES      := $(foreach f,$(OOT_SAMPLEBANK_BUILD_XMLS),$(f:.xml=.o))
OOT_SAMPLEBANK_DEP_FILES    := $(foreach f,$(OOT_SAMPLEBANK_O_FILES),$(f:.o=.d))

OOT_SOUNDFONT_XMLS         := $(foreach dir,$(OOT_SOUNDFONT_DIRS),$(wildcard $(dir)/*.xml))
OOT_SOUNDFONT_EXTRACT_XMLS := $(foreach dir,$(OOT_SOUNDFONT_EXTRACT_DIRS),$(wildcard $(dir)/*.xml))
OOT_SOUNDFONT_BUILD_XMLS   := $(foreach f,$(OOT_SOUNDFONT_XMLS),$(BUILD_DIR)/$f) $(foreach f,$(OOT_SOUNDFONT_EXTRACT_XMLS),$(f:$(OOT_EXTRACTED_DIR)/%=$(BUILD_DIR)/%))
OOT_SOUNDFONT_O_FILES      := $(foreach f,$(OOT_SOUNDFONT_BUILD_XMLS),$(f:.xml=.o))
OOT_SOUNDFONT_HEADERS      := $(foreach f,$(OOT_SOUNDFONT_BUILD_XMLS),$(f:.xml=.h))
OOT_SOUNDFONT_DEP_FILES    := $(foreach f,$(OOT_SOUNDFONT_O_FILES),$(f:.o=.d))

OOT_SEQUENCE_FILES         := $(foreach dir,$(OOT_SEQUENCE_DIRS),$(wildcard $(dir)/*.seq))
OOT_SEQUENCE_EXTRACT_FILES := $(foreach dir,$(OOT_SEQUENCE_EXTRACT_DIRS),$(wildcard $(dir)/*.seq))
OOT_SEQUENCE_O_FILES       := $(foreach f,$(OOT_SEQUENCE_FILES),$(BUILD_DIR)/$(f:libs/%.seq=%.o)) $(foreach f,$(OOT_SEQUENCE_EXTRACT_FILES:.seq=.o),$(f:$(OOT_EXTRACTED_DIR)/%=$(BUILD_DIR)/%))
OOT_SEQUENCE_DEP_FILES     := $(foreach f,$(OOT_SEQUENCE_O_FILES),$(f:.o=.d))

OOT_SEQUENCE_TABLE := include/tables/sequence_table.h
