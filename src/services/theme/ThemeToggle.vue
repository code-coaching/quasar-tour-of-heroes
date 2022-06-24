<template>
  <q-btn-dropdown flat icon="format_color_fill" cover>
    <q-list>
      <q-item
        clickable
        v-close-popup
        v-for="(theme, index) in themes"
        :key="index"
        @click="onThemeClick(theme)"
      >
        <q-item-section>
          <q-item-label class="theme-label">
            <span>{{ theme.name }}</span>
            <q-icon :name="theme.isDark ? 'dark_mode' : 'light_mode'"></q-icon>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTheme, Theme } from 'src/services/theme/theme.service';

export default defineComponent({
  setup() {
    const { toggleTheme, themes } = useTheme();

    const onThemeClick = (theme: Theme) => toggleTheme(theme);

    return {
      onThemeClick,
      themes,
    };
  },
});
</script>

<style lang="scss" scoped>
.theme-label {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
