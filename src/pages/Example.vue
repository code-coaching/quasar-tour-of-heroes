<template>
  <div class="example-page">
    <FlexWrap v-bind="getDefaults('FlexWrap')">
      <q-btn round outline icon="home" @click="navigate(ROUTE_NAMES.HOME)" />
      <DarkToggle />
      <q-btn @click="toggleDarkMode()">Toggle Dark Mode</q-btn>
      <ThemeToggle />
      <LanguageToggle />
    </FlexWrap>

    <div class="section">Translations</div>
    <FlexWrap class="elements">
      <div class="translation">
        {{ t('failed') }}
      </div>
      <div class="translation">
        {{ t('success') }}
      </div>
    </FlexWrap>

    <div class="section">Theming</div>

    <div class="component">Quasar Variables</div>

    <div class="component">Component Defaults</div>
    <FlexWrap v-bind="getDefaults('FlexWrap')" class="elements">
      <q-checkbox v-bind="getDefaults('QCheckbox')" v-model="syncProps">
        Synchronize Props
      </q-checkbox>
      <FlexWrap
        v-bind="getDefaults('FlexWrap')"
        column
        class="options"
        v-for="(component, componentName) in componentApi"
        :key="componentName"
      >
        <div class="component-name">{{ componentName }}</div>
        <FlexWrap v-bind="getDefaults('FlexWrap')" class="choices">
          <q-checkbox
            v-bind="getDefaults('QCheckbox')"
            v-for="(propertyName, i) in Object.keys(component)"
            :key="i"
            :model-value="getPropertyValue(componentName, propertyName)"
            @update:model-value="
              setPropertyValue(componentName, propertyName, syncProps)
            "
          >
            {{ propertyName }}
          </q-checkbox>
        </FlexWrap>
        <FlexWrap
          v-bind="getDefaults('FlexWrap')"
          class="elements"
          v-if="!EXCLUDED_COMPONENTS.includes(componentName)"
        >
          <component
            v-bind="getDefaults(componentName)"
            :is="componentName"
            v-model="inputModel"
          >
            default
          </component>
          <component
            v-bind="getDefaults(componentName)"
            :is="componentName"
            v-for="color in getColors()"
            :key="color"
            :color="color"
            v-model="inputModel"
          >
            {{ color }}
          </component>
        </FlexWrap>

        <FlexWrap
          v-if="componentName === 'QColor'"
          v-bind="getDefaults('FlexWrap')"
          class="colors"
        >
          <div v-for="color in getColors()" :key="color">
            {{ color }}
            <q-color
              v-bind="getDefaults('QColor')"
              v-model="activeTheme.colors[color]"
            />
          </div>
        </FlexWrap>

        <FlexWrap
          v-if="componentName === 'FlexWrap'"
          v-bind="getDefaults(componentName)"
        >
          <q-btn v-bind="getDefaults('QBtn')"> one </q-btn>
          <q-btn v-bind="getDefaults('QBtn')" color="primary"> two </q-btn>
          <q-btn v-bind="getDefaults('QBtn')" color="secondary"> three </q-btn>
        </FlexWrap>
      </FlexWrap>
    </FlexWrap>
  </div>

  <div class="save-button-container">
    <q-btn
      v-bind="getDefaults('QBtn')"
      color="primary"
      icon="save"
      class="save-button"
      @click="saveCustomTheme()"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DarkToggle from 'src/services/theme/DarkToggle.vue';
import { useTheme } from 'src/services/theme/theme.service';
import ThemeToggle from 'src/services/theme/ThemeToggle.vue';
import { ROUTE_NAMES } from '../router/routes';
import { useRouter } from 'vue-router';
import FlexWrap from 'src/components/FlexWrap.vue';
import { useI18n } from 'boot/i18n';
import LanguageToggle from 'src/services/i18n/LanguageToggle.vue';
import { useLanguage } from 'src/services/i18n/language.service';

export default defineComponent({
  components: {
    DarkToggle,
    ThemeToggle,
    FlexWrap,
    LanguageToggle,
  },
  setup() {
    const {
      isDarkActive,
      activeTheme,
      componentApi,
      syncProps,
      toggleDarkMode,
      getDefaults,
      getPropertyValue,
      setPropertyValue,
      saveCustomTheme,
      loadCustomTheme,
    } = useTheme();

    const { loadLanguage } = useLanguage();

    const { t } = useI18n();

    loadCustomTheme();
    loadLanguage();

    const router = useRouter();

    const quasarColors = [
      'primary',
      'secondary',
      'accent',
      'positive',
      'negative',
      'info',
      'warning',
    ];

    const quasarDarkColors = ['dark', 'dark-page'];

    const getColors = () =>
      isDarkActive.value
        ? [...quasarColors, ...quasarDarkColors]
        : quasarColors;

    const navigate = (name: string) => void router.push({ name });

    const EXCLUDED_COMPONENTS = ['QColor', 'FlexWrap'];

    return {
      Object,

      inputModel: ref(''),
      componentApi,
      activeTheme,
      syncProps,
      ROUTE_NAMES,
      EXCLUDED_COMPONENTS,

      toggleDarkMode,
      getPropertyValue,
      setPropertyValue,
      getColors,
      getDefaults,
      saveCustomTheme,
      navigate,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
.example-page {
  margin: 1rem;
}

.colors {
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
  margin-bottom: 1rem;
}

.options {
  margin-bottom: 1rem;
  width: 100%;
}

.component-name {
  font-weight: bold;
}

.choices {
  margin-bottom: 0.5rem;
}

.save-button-container {
  position: sticky;
  bottom: 0.25rem;

  .save-button {
    position: absolute;
    right: 0.5rem;
    bottom: 0.25rem;
  }
}

.translation {
  outline: 1px solid var(--q-primary);
  padding: 0.5rem;
}
</style>
