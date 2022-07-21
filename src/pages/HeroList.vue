<template>
  <div class="title">{{ t('pages.hero-list.my-heroes') }}</div>

  <FlexWrap v-bind="getDefaults('FlexWrap')" column>
    <q-btn
      :class="{
        'hero--active': hero._id === selectedHero?._id,
      }"
      class="hero"
      v-for="(hero, index) in heroes"
      :key="index"
      @click="onClickHero(hero)"
    >
      <span class="hero-number">{{ hero.number }}</span>
      <span class="hero-name">{{ hero.name }}</span>
    </q-btn>
  </FlexWrap>

  <q-btn
    v-bind="getDefaults('QBtn')"
    class="new-hero-button"
    @click="onNewClick()"
  >
    {{ t('pages.hero-list.new-hero') }}
  </q-btn>

  <div v-if="selectedHero?.name">
    <div class="title">
      {{ upperCase(selectedHero.name) }} {{ t('pages.hero-list.is-my-hero') }}
    </div>
    <FlexWrap v-bind="getDefaults('FlexWrap')">
      <q-btn v-bind="getDefaults('QBtn')" @click="onDetailsClick()">
        {{ t('pages.hero-list.details') }}
      </q-btn>
      <q-btn
        v-bind="getDefaults('QBtn')"
        color="negative"
        @click="onDeleteClick()"
      >
        {{ t('delete') }}
      </q-btn>
    </FlexWrap>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { upperCase } from 'components/utils';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from 'src/router/routes';
import { Hero } from 'components/models';
import { useHeroesStore } from 'src/stores/hero.store';
import FlexWrap from 'src/components/FlexWrap.vue';
import { useTheme } from 'src/services/theme/theme.service';
import { useI18n } from 'src/boot/i18n';

export default defineComponent({
  components: {
    FlexWrap,
  },
  setup() {
    const router = useRouter();
    const heroesStore = useHeroesStore();
    const { getDefaults } = useTheme();
    const { t } = useI18n();

    const onClickHero = (hero: Hero) => heroesStore.setSelectedHero(hero);

    const onDetailsClick = () => {
      void router.push({
        name: ROUTE_NAMES.HERO_DETAILS,
        params: {
          id: heroesStore.selectedHero.number,
        },
      });
    };

    const onDeleteClick = () => {
      heroesStore.deleteHero(heroesStore.selectedHero);
      heroesStore.resetSelectedHero();
    };

    const onNewClick = () => void router.push({ name: ROUTE_NAMES.HERO_ADD });

    return {
      t,
      getDefaults,
      heroes: computed(() => heroesStore.heroes),
      selectedHero: computed(() => heroesStore.selectedHero),
      onClickHero,
      upperCase,
      onDetailsClick,
      onDeleteClick,
      onNewClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.hero {
  display: flex;
  max-width: 10rem;
  background-color: #eeeeee;
  cursor: pointer;
  color: #8d8d8d;
  border-radius: 0.5rem;
  padding: 0;
  align-items: flex-start;

  &:hover {
    background-color: #cfd8dc;
    color: white;
    margin-left: 0.25rem;
  }

  &--active {
    background-color: #cfd8dc;
    color: white;
    margin-left: 0.25rem;
  }
}

.hero-number {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #5f7d8c;
  color: white;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.hero-name {
  padding: 0.5rem;
  padding-left: 0.75rem;
  font-weight: 600;
}

.new-hero-button {
  margin-top: 1rem;
}
</style>
