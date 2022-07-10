<template>
  <q-btn
    round
    outline
    :class="{ 'text-white': forceLight }"
    :icon="!isDarkActive ? 'dark_mode' : 'light_mode'"
    @click="toggleDarkMode()"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTheme } from 'src/services/theme/theme.service';

export default defineComponent({
  props: {
    forceLight: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { toggleDarkMode, isDarkActive } = useTheme();

    return {
      toggleDarkMode,
      isDarkActive,
    };
  },
});
</script>
