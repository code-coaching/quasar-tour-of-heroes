<template>
  <div class="example-page">
    <div class="top-row">
      <DarkToggle />
      <StyledButton @click="toggleDarkMode()">Toggle Dark Mode</StyledButton>
      <ThemeToggle />
    </div>

    <div class="section">Theming</div>

    <div class="component">Quasar Variables</div>

    <div class="colors">
      <div
        v-for="color in quasarColors"
        :key="color"
        class="color"
        :class="`bg-${color}`"
      >
        {{ color }}
      </div>
    </div>

    <div class="section">Components</div>

    <div class="component">StyledButton</div>

    <div class="elements">
      <StyledButton>Default</StyledButton>
    </div>
    <div v-for="option in styledButtonOptions" :key="option">
      <div class="option">{{ option }}</div>
      <div class="elements">
        <StyledButton :color="option">{{ option }}</StyledButton>
      </div>
    </div>

    <div class="component">QInput</div>
    <div v-for="option in quasarInputOptions" :key="option">
      <div class="option">{{ option }}</div>
      <div class="elements">
        <q-input
          outlined
          placeholder="outlined"
          v-bind:[option]="true"
          v-model="inputModel"
        >
          Default
        </q-input>
        <q-input
          v-bind:[option]="true"
          v-for="color in quasarColors"
          :key="color"
          :color="color"
          :placeholder="option"
          v-model="inputModel"
        >
          {{ color ? color : 'default' }}
        </q-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import StyledButton from 'components/StyledButton.vue';
import DarkToggle from 'src/services/theme/DarkToggle.vue';
import { useTheme } from 'src/services/theme/theme.service';
import ThemeToggle from 'src/services/theme/ThemeToggle.vue';

export default defineComponent({
  components: {
    StyledButton,
    DarkToggle,
    ThemeToggle,
  },
  setup() {
    const { toggleDarkMode } = useTheme();

    const quasarColors = [
      'primary',
      'secondary',
      'accent',
      'positive',
      'negative',
      'info',
      'warning',
    ];

    const styledButtonOptions = ['primary', 'negative'];

    const quasarInputOptions = [
      'filled',
      'outlined',
      'borderless',
      'standout',
      'rounded',
      'square',
      'dense',
      'disable',
      'readonly',
      'loading',
    ];

    return {
      toggleDarkMode,
      quasarColors,
      quasarInputOptions,
      styledButtonOptions,
      inputModel: ref(''),
    };
  },
});
</script>

<style lang="scss" scoped>
.example-page {
  margin: 1rem;
}

.colors {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.color {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  min-width: 9rem;
  color: #fff;
}

.section {
  font-size: 1.3rem;
  margin-top: 1rem;
  font-weight: bold;
}

.component {
  font-size: 1.2rem;
  margin-top: 1rem;
  font-weight: bold;
}

.option {
  font-size: 1.1rem;
}

.elements {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.top-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
