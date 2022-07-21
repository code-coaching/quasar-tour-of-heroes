<template>
  <div class="title">{{ t('pages.dashboard.title') }}</div>

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
import { computed, defineComponent } from 'vue';
import { useHeroesStore } from 'src/stores/hero.store';
import { ROUTE_NAMES } from 'src/router/routes';
import { useRouter } from 'vue-router';
import { Hero } from 'src/components/models';
import { useI18n } from 'src/boot/i18n';

export default defineComponent({
  setup() {
    const heroesStore = useHeroesStore();
    const router = useRouter();
    const { t } = useI18n();

    const navigateToHero = (hero: Hero) => {
      void router.push({
        name: ROUTE_NAMES.HERO_DETAILS,
        params: {
          id: hero.number,
        },
      });
    };

    return {
      t,
      topHeroes: computed(() => heroesStore.topHeroes),
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
