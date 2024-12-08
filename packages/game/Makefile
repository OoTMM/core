MAKEFLAGS += --no-builtin-rules

# Ensure the build fails if a piped command fails
SHELL = /bin/bash
.SHELLFLAGS = -o pipefail -c

ARCH 		:= mips64-ultra-elf
CC          := $(ARCH)-gcc
BUILD_DIR 	:= build
CFLAGS      := -Os -G 0 -march=vr4300 -mfix4300 -mabi=32 -mno-abicalls -mdivide-breaks -fno-PIC -fno-common \
               -nostdlib -ffreestanding  -funsigned-char

include $(CURDIR)/loader/build.mk

.PHONY: all
all: loader
