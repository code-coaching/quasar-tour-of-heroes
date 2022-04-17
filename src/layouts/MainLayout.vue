<template>
  <div class="layout-container">
    <div class="title">Tour of Heroes</div>
    <div class="button-container">
      <StyledButton @click="navigate(ROUTE_NAMES.DASHBOARD)">Dashboard</StyledButton>
      <StyledButton @click="navigate(ROUTE_NAMES.HERO_LIST)">Heroes</StyledButton>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '../router/routes';
import StyledButton from 'src/components/StyledButton.vue';

export default defineComponent({
  components: {
    StyledButton,
  },
  setup() {
    const router = useRouter();

    const navigate = (name: string) => {
      // void router.push({ name: 'Dashboard' }); Navigate to Dashboard
      // void router.push({ name: 'HeroList' }); Navigate to HeroList
      void router.push({ name });
    };

    return {
      navigate,
      ROUTE_NAMES,
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
</style>
