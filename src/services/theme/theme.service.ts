import { Dark, LocalStorage, setCssVar, Notify } from 'quasar';
import { useI18n } from 'src/boot/i18n';
import { computed, Ref, ref, watch } from 'vue';
import { ComponentApi, componentApi, getDefaults, getPropertyValue, setPropertyValue, syncProps } from './api';
const { t } = useI18n();

interface Theme {
  isDark: boolean;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;

    positive: string;
    negative: string;
    info: string;
    warning: string;

    dark: string;
    'dark-page': string;
    [key: string]: string;
  };
  custom?: boolean;
}

const themes: Array<Theme> = [
  {
    isDark: false,
    name: 'Quasar',
    colors: {
      primary: '#1976d2',
      secondary: '#26a69a',
      accent: '#9c27b0',

      positive: '#21ba45',
      negative: '#c10015',
      info: '#31ccec',
      warning: '#f2c037',

      dark: '#1d1d1d',
      'dark-page': '#121212',
    },
  },
  {
    isDark: true,
    name: 'Quasar',
    colors: {
      primary: '#1976d2',
      secondary: '#26a69a',
      accent: '#9c27b0',

      positive: '#21ba45',
      negative: '#c10015',
      info: '#31ccec',
      warning: '#f2c037',

      dark: '#1d1d1d',
      'dark-page': '#121212',
    },
  },
  {
    isDark: true,
    name: 'Synthwave',
    colors: {
      primary: '#ff7edb',
      secondary: '#b893ce',
      accent: '#9c27b0',

      positive: '#20615b',
      negative: '#a21232',
      info: '#3e35a8',
      warning: '#c1a54d',

      dark: '#241b2f',
      'dark-page': '#262335',
    },
  },
];

const activeTheme: Ref<Theme> = ref(themes[0]);

const useTheme = () => {
  const toggleDarkMode = () => (activeTheme.value.isDark = !activeTheme.value.isDark);
  const isDarkActive = computed(() => Dark.isActive);

  const toggleTheme = (theme: Theme) => {
    activeTheme.value = theme;
    Dark.set(theme.isDark);

    const colorKeys = Object.keys(theme.colors);
    colorKeys.forEach((key) => setCssVar(key, theme.colors[key]));
  };

  watch(
    activeTheme,
    (theme: Theme) => toggleTheme(theme),
    { deep: true }
  );

  const saveCustomTheme = () => {
    LocalStorage.set('theme', { ...activeTheme.value, name: 'Custom', custom: true });
    LocalStorage.set('properties', componentApi.value);
    Notify.create({ message: t('services.theme.theme-saved'), color: 'positive' });

    const customTheme = themes.findIndex(t => t.name === 'Custom');
    themes[customTheme] = activeTheme.value;
  }

  const loadCustomTheme = () => {
    const theme = LocalStorage.getItem('theme') as Theme;
    if (theme) {
      if (!themes.find((t) => t.name === theme.name)) themes.push(theme);
      activeTheme.value = theme;
    }
    const properties = LocalStorage.getItem('properties') as ComponentApi;
    if (properties) {
      Object.keys(properties).forEach((key) => {
        componentApi.value[key] = properties[key];
      })
    }
  }

  return {
    isDarkActive,
    themes,
    componentApi,
    activeTheme,
    syncProps,
    toggleDarkMode,
    toggleTheme,
    getDefaults,
    getPropertyValue,
    setPropertyValue,
    saveCustomTheme,
    loadCustomTheme
  };
};

export { useTheme, Theme };
