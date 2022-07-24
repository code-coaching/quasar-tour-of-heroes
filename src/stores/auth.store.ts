import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { User } from 'src/components/models';
import { useI18n } from 'src/boot/i18n';
const { t } = useI18n();

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    authenticatedUser: {} as User,
  }),

  getters: {
    isAuthenticated: (state) => state.authenticatedUser._id !== undefined,
  },

  actions: {
    tryToAuthenticate(): Promise<void> {
      return new Promise((resolve, reject) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          api
            .post('/authentication', {
              strategy: 'jwt',
              accessToken,
            })
            .then((result: { data: { accessToken: string; user: User } }) => {
              this.authenticatedUser = result.data.user;
              resolve();
            })
            .catch(() => {
              localStorage.removeItem('accessToken');
              this.authenticatedUser = {} as User;
              reject();
            });
        } else {
          reject();
        }
      });
    },
    login(email: string, password: string): Promise<void> {
      return new Promise((resolve, reject) => {
        api
          .post('/authentication', {
            strategy: 'local',
            email,
            password,
          })
          .then((result: { data: { accessToken: string; user: User } }) => {
            const accessToken = result.data.accessToken;
            if (accessToken) {
              Notify.create({ message: t('services.auth.logged-in'), color: 'positive' });
              localStorage.setItem('accessToken', accessToken);
              this.authenticatedUser = result.data.user;
              resolve();
            } else {
              Notify.create({ message: t('services.auth.login-failed'), color: 'negative' });
              reject();
            }
          })
          .catch(() => {
            Notify.create({ message: t('services.auth.login-failed'), color: 'negative' });
            reject();
          });
      });
    },
    logout() {
      Notify.create({ message: t('services.auth.logged-out'), color: 'positive' });
      localStorage.removeItem('accessToken');
      this.authenticatedUser = {} as User;
    }
  }
});
