<template>
  <input type="email" v-model="user.email" />
  <input type="password" v-model="user.password" />
  <button @click="login()">Login</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  setup() {
    const user = reactive({
      email: '',
      password: '',
    });

    const login = () => {
      api
        .post('/authentication', {
          strategy: 'local',
          email: user.email,
          password: user.password,
        })
        .then((result: { data: { accessToken: string } }) => {
          const accessToken = result.data.accessToken;
          if (accessToken) localStorage.setItem('accessToken', accessToken);
        })
        .catch((error) => {
          console.log(error);
          alert('Login failed');
        });
    };

    return {
      login,
      user,
    };
  },
});
</script>
