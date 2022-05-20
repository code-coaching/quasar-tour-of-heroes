<template>
  <input type="email" v-model="user.email" />
  <input type="password" v-model="user.password" />
  <button @click="login()">Login</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useAuth } from 'src/services/auth.service';

export default defineComponent({
  setup() {
    const { login: authenticate } = useAuth();
    const user = reactive({
      email: '',
      password: '',
    });

    const login = () => {
      authenticate(user.email, user.password).finally(() => {
        user.email = '';
        user.password = '';
      });
    };

    return {
      login,
      user,
    };
  },
});
</script>
