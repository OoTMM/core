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
