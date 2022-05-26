const useValidators = () => {
  const required =
    (s?: string) =>
      (v: string): boolean | string =>
        !!v || (s ? `${s} is required` : 'Required');

  const emailFormat =
    () =>
      (v: string): boolean | string =>
        /.+@.+\..+/.test(v) || 'Invalid email format';

  const minCharacters =
    (n: number) =>
      (v: string): boolean | string =>
        v.length >= n || `Must be at least ${n} characters`;

  const emailRules = [required('Email'), emailFormat()];
  const passwordRules = [required('Password'), minCharacters(8)];

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