import { Dark } from 'quasar';
import { computed } from 'vue';

const useTheme = () => {
  const toggleDarkMode = () => Dark.set(Dark.isActive ? false : true);
  const isDarkActive = computed(() => Dark.isActive);

  return {
    toggleDarkMode,
    isDarkActive
  };
};

export { useTheme };
