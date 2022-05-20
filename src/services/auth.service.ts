
import { api } from 'src/boot/axios';
import { readonly, ref, computed } from 'vue';

interface User {
  _id: string;
}

const authenticatedUser = ref({} as User);

const useAuth = () => {

  const isAuthenticated = computed(() => authenticatedUser.value._id !== undefined);

  const tryToAuthenticate = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      api.post('/authentication', {
        strategy: 'jwt',
        accessToken
      }).then((result: { data: { accessToken: string, user: User } }) => {
        console.log(result);
        authenticatedUser.value = result.data.user;
      }).catch(() => {
        localStorage.removeItem('accessToken');
        authenticatedUser.value = {} as User;
      })
    }
  }

  const login = (email: string, password: string): Promise<void> => {
    return api
      .post('/authentication', {
        strategy: 'local',
        email,
        password,
      })
      .then((result: { data: { accessToken: string, user: User } }) => {
        const accessToken = result.data.accessToken;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          authenticatedUser.value = result.data.user;
          console.log(result.data.user);
          alert('Login successful');
        };
      })
      .catch((error) => {
        console.log(error);
        alert('Login failed');
      });
  }

  const logout = () => {
    localStorage.removeItem('accessToken');
    authenticatedUser.value = {} as User;
  }

  return {
    authenticatedUser: readonly(authenticatedUser),
    isAuthenticated: readonly(isAuthenticated),
    tryToAuthenticate,
    login,
    logout,
  }
}

export {
  useAuth
}