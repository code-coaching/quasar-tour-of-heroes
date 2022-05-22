<template>
  <div class="header">
    <StyledButton v-if="!isAuthenticated" @click="navigate(ROUTE_NAMES.LOGIN)">
      Login
    </StyledButton>
    <StyledButton v-else @click="logout()">Logout</StyledButton>
  </div>
  <div class="layout-container">
    <div class="title">Tour of Heroes</div>
    <div class="button-container">
      <StyledButton @click="navigate(ROUTE_NAMES.DASHBOARD)">
        Dashboard
      </StyledButton>
      <StyledButton @click="navigate(ROUTE_NAMES.HERO_LIST)">
        Heroes
      </StyledButton>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '../router/routes';
import StyledButton from 'src/components/StyledButton.vue';
import { useAuth } from 'src/services/auth.service';
import { useHeroes } from 'src/services/hero.service';

export default defineComponent({
  components: {
    StyledButton,
  },
  setup() {
    const router = useRouter();
    const { tryToAuthenticate, isAuthenticated, logout } = useAuth();
    const { getHeroes } = useHeroes();

    onBeforeMount(() => {
      tryToAuthenticate()
        .then(() => {
          void getHeroes();
        })
        .catch(() => {
          void router.push({ name: ROUTE_NAMES.LOGIN });
        });
    });

    const navigate = (name: string) => {
      // void router.push({ name: 'Dashboard' }); Navigate to Dashboard
      // void router.push({ name: 'HeroList' }); Navigate to HeroList
      void router.push({ name });
    };

    return {
      navigate,
      ROUTE_NAMES,
      isAuthenticated,
      logout,
    };
  },
});
</script>

<style lang="scss" scoped>
.layout-container {
  margin: 2rem;
}

.button-container {
  display: flex;
  gap: 0.25rem;
}

.header {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  background-color: #333;
}
</style>
