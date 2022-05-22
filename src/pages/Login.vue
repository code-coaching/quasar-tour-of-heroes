<template>
  <div class="login-container">
    <div class="login-fields">
      <input type="email" v-model="user.email" />
      <input type="password" v-model="user.password" />
    </div>
    <StyledButton @click="login()">Login</StyledButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useAuth } from 'src/services/auth.service';
import StyledButton from 'src/components/StyledButton.vue';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from 'src/router/routes';

export default defineComponent({
  components: { StyledButton },
  setup() {
    const router = useRouter();
    const { login: authenticate } = useAuth();
    const user = reactive({
      email: '',
      password: '',
    });

    const login = () => {
      authenticate(user.email, user.password)
        .then(() => {
          void router.push({ name: ROUTE_NAMES.DASHBOARD });
        })
        .finally(() => {
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

<style lang="scss">
.login-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 20rem;
}

.login-fields {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
