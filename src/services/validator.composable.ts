import { useI18n } from 'src/boot/i18n';
const { t } = useI18n();

const useValidators = () => {
  const required =
    (s?: string) =>
      (v: string): boolean | string =>
        !!v || (s ? `${s} ${t('validators.is-required')}` : t('validators.required'));

  const emailFormat =
    () =>
      (v: string): boolean | string =>
        /.+@.+\..+/.test(v) || t('validators.invalid-email-format');

  const minCharacters =
    (n: number) =>
      (v: string): boolean | string =>
        v.length >= n || t('validators.must-be-at-least-n-characters', { n });

  const emailRules = [required(t('validators.email')), emailFormat()];
  const passwordRules = [required(t('validators.password')), minCharacters(8)];

  return {
    required,
    emailFormat,
    minCharacters,
    emailRules,
    passwordRules,
  }
}

export {
  useValidators
}