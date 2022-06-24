import { Dark, setCssVar } from 'quasar';
import { computed } from 'vue';

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
}

const useTheme = () => {
  const toggleDarkMode = () => Dark.set(Dark.isActive ? false : true);
  const isDarkActive = computed(() => Dark.isActive);

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
        secondary: '#b893ce8f',
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

  const toggleTheme = (theme: Theme) => {
    Dark.set(theme.isDark);

    const colorKeys = Object.keys(theme.colors);
    colorKeys.forEach((key) => setCssVar(key, theme.colors[key]));
  };

  return {
    toggleDarkMode,
    isDarkActive,
    themes,
    toggleTheme,
  };
};

export { useTheme, Theme };
