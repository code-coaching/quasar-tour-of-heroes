import { api } from 'src/boot/axios';
import { User } from 'src/components/models';
import { readonly, ref, computed } from 'vue';
import { Notify } from 'quasar';

const authenticatedUser = ref({} as User);

const useAuth = () => {
  const isAuthenticated = computed(
    () => authenticatedUser.value._id !== undefined
  );

  const tryToAuthenticate = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        api
          .post('/authentication', {
            strategy: 'jwt',
            accessToken,
          })
          .then((result: { data: { accessToken: string; user: User } }) => {
            authenticatedUser.value = result.data.user;
            resolve();
          })
          .catch(() => {
            localStorage.removeItem('accessToken');
            authenticatedUser.value = {} as User;
            reject();
          });
      } else {
        reject();
      }
    });
  };

  const login = (email: string, password: string): Promise<void> => {
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
            Notify.create({ message: 'Logged in', color: 'positive' });
            localStorage.setItem('accessToken', accessToken);
            authenticatedUser.value = result.data.user;
            resolve();
          } else {
            Notify.create({ message: 'Login failed', color: 'negative' });
            reject();
          }
        })
        .catch(() => {
          Notify.create({ message: 'Login failed', color: 'negative' });
          reject();
        });
    });
  };

  const logout = () => {
    Notify.create({ message: 'Logged out', color: 'positive' });
    localStorage.removeItem('accessToken');
    authenticatedUser.value = {} as User;
  };

  return {
    authenticatedUser: readonly(authenticatedUser),
    isAuthenticated: readonly(isAuthenticated),
    tryToAuthenticate,
    login,
    logout,
  };
};

export { useAuth };
