import { Dark } from 'quasar';

const useTheme = () => {
  const toggleDarkMode = () => Dark.set(Dark.isActive ? false : true);

  return {
    toggleDarkMode
  };
};

export { useTheme };
