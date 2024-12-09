MAKEFLAGS += --no-builtin-rules

# Ensure the build fails if a piped command fails
SHELL = /bin/bash
.SHELLFLAGS = -o pipefail -c

ARCH 		:= mips64-ultra-elf
CC          := $(ARCH)-gcc
BUILD_DIR 	:= build
CFLAGS      := -Os -G 0 -march=vr4300 -mfix4300 -mabi=32 -mno-abicalls -mdivide-breaks -fno-PIC -fno-common \
               -nostdlib -ffreestanding  -funsigned-char \
               -I include -MMD

.PHONY: all
all: loader

DEPS := $(shell find $(BUILD_DIR) -name '*.d' -type f 2>/dev/null)
-include $(DEPS)

include $(CURDIR)/loader/build.mk

