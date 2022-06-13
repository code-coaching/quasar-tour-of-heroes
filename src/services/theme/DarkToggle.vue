<template>
  <q-btn
    round
    outline
    :icon="!isDarkActive ? 'dark_mode' : 'light_mode'"
    @click="toggleDarkMode()"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTheme } from 'src/services/theme/theme.service';

export default defineComponent({
  setup() {
    const { toggleDarkMode, isDarkActive } = useTheme();

    return {
      toggleDarkMode,
      isDarkActive,
    };
  },
});
</script>