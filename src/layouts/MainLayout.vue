<template>
  <div class="layout-container">
    <div class="title">Tour of Heroes</div>
    <div class="button-container">
      <button @click="navigate(ROUTE_NAMES.DASHBOARD)">Dashboard</button>
      <button @click="navigate(ROUTE_NAMES.HERO_LIST)">Heroes</button>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '../router/routes';

export default defineComponent({
  setup() {
    const router = useRouter();

    const navigate = (path: string) => {
      // void router.push({ name: 'Dashboard' }); Navigate to Dashboard
      // void router.push({ name: 'HeroList' }); Navigate to HeroList
      void router.push({ name: path });
    };

    return {
      navigate,
      ROUTE_NAMES,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.5rem;
  color: grey;
  font-weight: bold;
}

.layout-container {
  margin: 2rem;
}

.button-container {
  display: flex;
  gap: 0.25rem;
}

button {
  background-color: #eeeeee;
  border-radius: 0.25rem;
  font-weight: 500;
  border: none;
  padding: 0.25rem 0.5rem;
  color: #567868;

  &:hover {
    background-color: darken(#eeeeee, 10%);
    color: #0096e8;
    cursor: pointer;
  }
}
</style>
