# Dirs
LOADER_DIR          := loader
LOADER_BUILD_DIR	:= $(BUILD_DIR)/loader
LOADER_OBJ_DIR		:= $(LOADER_BUILD_DIR)/obj
LOADER_SRC_DIR		:= $(LOADER_DIR)/src

# Sources and objects
LOADER_SOURCES			:= $(shell find $(LOADER_SRC_DIR) -name '*.c' -type f)
LOADER_OBJECTS			:= $(patsubst $(LOADER_SRC_DIR)/%.c,$(LOADER_OBJ_DIR)/%.o,$(LOADER_SOURCES))
LOADER_LINK_SCRIPT		:= $(LOADER_DIR)/link.ld

# Targets
LOADER				:= $(LOADER_BUILD_DIR)/loader.elf

# Rules
.PHONY: loader
loader: $(LOADER)

$(LOADER): $(LOADER_OBJECTS) $(LOADER_LINK_SCRIPT)
	$(CC) -o $@ $(LOADER_OBJECTS) -T $(LOADER_LINK_SCRIPT) $(CFLAGS)

$(LOADER_OBJ_DIR)/%.o: $(LOADER_SRC_DIR)/%.c
	@mkdir -p $(dir $@)
	$(CC) -c -o $@ $< $(CFLAGS)
