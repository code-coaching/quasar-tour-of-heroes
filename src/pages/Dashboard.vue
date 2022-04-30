<template>
  <div class="title">Top Heroes</div>

  <div class="top-heroes">
    <div
      v-for="(hero, index) in topHeroes"
      :key="index"
      class="top-hero"
      @click="navigateToHero(hero)"
    >
      {{ hero.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHeroes } from 'src/services/hero.service';
import { ROUTE_NAMES } from 'src/router/routes';
import { useRouter } from 'vue-router';
import { Hero } from 'src/components/models';

export default defineComponent({
  setup() {
    const { topHeroes } = useHeroes();
    const router = useRouter();

    const navigateToHero = (hero: Hero) => {
      void router.push({
        name: ROUTE_NAMES.HERO_DETAILS,
        params: {
          id: hero.number,
        },
      });
    };

    return {
      topHeroes,
      navigateToHero,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.top-heroes {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.top-hero {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #5f7d8c;
  color: white;

  height: 8rem;
  width: 10rem;
  font-weight: 600;
  font-size: 1.1rem;

  &:hover {
    background-color: #eeeeee;
    color: #5f7d8c;
    cursor: pointer;
  }
}
</style>
