<template>
  <div class="login-container">
    <q-form class="login-fields" ref="formRef" greedy>
      <q-input
        outlined
        dense
        label="email"
        type="email"
        v-model="user.email"
        :rules="emailRules"
        lazy-rules
      />
      <q-input
        outlined
        dense
        label="password"
        type="password"
        v-model="user.password"
        :rules="passwordRules"
        lazy-rules
      />
    </q-form>
    <StyledButton @click="login()">Login</StyledButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useAuth } from 'src/services/auth.service';
import StyledButton from 'src/components/StyledButton.vue';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from 'src/router/routes';
import { QForm } from 'quasar';
import { useValidators } from 'src/services/validator.composable';

export default defineComponent({
  components: { StyledButton },
  setup() {
    const router = useRouter();
    const { login: authenticate } = useAuth();
    const { emailRules, passwordRules } = useValidators();
    const user = reactive({
      email: '',
      password: '',
    });

    const login = () => {
      void formRef.value.validate().then((valid) => {
        if (valid) {
          authenticate(user.email, user.password)
            .then(() => {
              void router.push({ name: ROUTE_NAMES.DASHBOARD });
            })
            .finally(() => {
              user.email = '';
              user.password = '';
            });
        }
      });
    };

    const formRef = ref({} as QForm);

    return {
      login,
      user,

      formRef,
      emailRules,
      passwordRules,
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
