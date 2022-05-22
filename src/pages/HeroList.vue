<template>
  <div class="title">My Heroes</div>

  <div class="hero-list">
    <div
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
    </div>
  </div>

  <StyledButton class="new-hero-button" primary @click="onNewClick()">
    New Hero
  </StyledButton>

  <div v-if="selectedHero?.name">
    <div class="title">{{ upperCase(selectedHero.name) }} is my hero</div>
    <ButtonGroup>
      <StyledButton @click="onDetailsClick()">Details</StyledButton>
      <StyledButton negative @click="onDeleteClick()">Delete</StyledButton>
    </ButtonGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { upperCase } from 'components/utils';
import { useRouter } from 'vue-router';
import StyledButton from 'components/StyledButton.vue';
import { ROUTE_NAMES } from 'src/router/routes';
import { Hero } from 'components/models';
import { useHeroes } from 'src/services/hero.service';
import ButtonGroup from 'src/components/ButtonGroup.vue';

export default defineComponent({
  components: {
    StyledButton,
    ButtonGroup,
  },
  setup() {
    const router = useRouter();
    const {
      heroes,
      selectedHero,
      deleteHero,
      resetSelectedHero,
      setSelectedHero,
    } = useHeroes();

    const onClickHero = (hero: Hero) => setSelectedHero(hero);

    const onDetailsClick = () => {
      void router.push({
        name: ROUTE_NAMES.HERO_DETAILS,
        params: {
          id: selectedHero.value.number,
        },
      });
    };

    const onDeleteClick = () => {
      deleteHero(selectedHero.value);
      resetSelectedHero();
    };

    const onNewClick = () => void router.push({ name: ROUTE_NAMES.HERO_ADD });

    return {
      heroes,
      selectedHero,
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

.hero-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.hero {
  display: flex;
  max-width: 10rem;
  background-color: darken(#eeeeee, 10%);
  background-color: #eeeeee;
  cursor: pointer;
  color: #8d8d8d;
  border-radius: 0.5rem;

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
