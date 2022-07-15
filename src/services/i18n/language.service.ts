import { LocalStorage, Notify } from 'quasar';
import { useI18n } from 'boot/i18n';
import { ref } from 'vue';
const { locale, t } = useI18n();

interface Language {
  nativeWord: string;
  locale: string;
}

const languages: Array<Language> = [
  { nativeWord: 'English', locale: 'en-US' },
  { nativeWord: 'Nederlands', locale: 'nl-NL' },
];

const activeLanguage = ref(languages[0]);

const useLanguage = () => {
  const toggleLanguage = (language: Language) => {
    setLanguage(language);
    saveLanguage(language);
  };

  const setLanguage = (language: Language) => {
    activeLanguage.value = language;
    locale.value = language.locale;
  };

  const saveLanguage = (language: Language) => {
    LocalStorage.set('language', language);
    Notify.create({ message: t('services.language.language-saved'), color: 'positive' });
  };

  const loadLanguage = () => {
    const language = LocalStorage.getItem('language') as Language;
    if (language) setLanguage(language);
  };

  return {
    languages,
    activeLanguage,
    toggleLanguage,
    setLanguage,
    loadLanguage,
  };
};

export { useLanguage, Language };
