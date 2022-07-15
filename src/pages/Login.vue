<template>
  <FlexWrap column class="login-container">
    <q-form class="login-fields" ref="formRef" greedy>
      <q-input
        v-bind="getDefaults('QInput')"
        label="email"
        type="email"
        v-model="user.email"
        :rules="emailRules"
        lazy-rules
      />
      <q-input
        v-bind="getDefaults('QInput')"
        label="password"
        type="password"
        v-model="user.password"
        :rules="passwordRules"
        lazy-rules
      />
    </q-form>
    <q-btn v-bind="getDefaults('QBtn')" color="primary" @click="login()">
      {{ t('login') }}
    </q-btn>
  </FlexWrap>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useAuth } from 'src/services/auth.service';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from 'src/router/routes';
import { QForm } from 'quasar';
import { useValidators } from 'src/services/validator.composable';
import { useTheme } from 'src/services/theme/theme.service';
import FlexWrap from 'src/components/FlexWrap.vue';
import { useI18n } from 'src/boot/i18n';

export default defineComponent({
  components: {
    FlexWrap,
  },
  setup() {
    const router = useRouter();
    const { login: authenticate } = useAuth();
    const { emailRules, passwordRules } = useValidators();
    const user = reactive({
      email: '',
      password: '',
    });
    const { getDefaults } = useTheme();
    const { t } = useI18n();

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
      t,
      getDefaults,
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
  max-width: 20rem;
}

.login-fields {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
