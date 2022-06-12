<template>
  <div class="example-page">
    <StyledButton @click="toggleDarkMode()">Toggle Dark Mode</StyledButton>

    <div class="component">StyledButton</div>
    <div class="elements">
      <StyledButton>Default</StyledButton>
    </div>
    <div v-for="option in styledButtonOptions" :key="option">
      <div class="option">{{ option }}</div>
      <div class="elements">
        <StyledButton v-bind:[option]="true">{{ option }}</StyledButton>
      </div>
    </div>

    <div class="component">QInput</div>
    <div v-for="option in quasarInputOptions" :key="option">
      <div class="option">{{ option }}</div>
      <div class="elements">
        <q-input outlined placeholder="outlined" v-bind:[option]="true">
          Default
        </q-input>
        <q-input
          v-bind:[option]="true"
          v-for="color in quasarColors"
          :key="color"
          :color="color"
          :placeholder="option"
        >
          {{ color ? color : 'default' }}
        </q-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StyledButton from 'components/StyledButton.vue';
import { useTheme } from 'src/services/theme/theme.service';

export default defineComponent({
  components: {
    StyledButton,
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
    };
  },
});
</script>

<style lang="scss">
.example-page {
  margin: 1rem;
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
</style>
