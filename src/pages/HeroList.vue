<template>
  <div class="title">My Heroes</div>

  <div class="hero-list">
    <div
      class="hero"
      v-for="(hero, index) in heroes"
      :key="index"
      @click="onClickHero(hero)"
    >
      <span class="hero-number">{{ hero.number }}</span>
      <span class="hero-name">{{ hero.name }}</span>
    </div>
  </div>

  <div>{{ selectedHero }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const selectedHero = ref();

    const heroes = ref([
      { number: 11, name: 'Mr. Nice' },
      { number: 12, name: 'Narco' },
      { number: 13, name: 'Bombasto' },
      { number: 14, name: 'Celeritas' },
      { number: 15, name: 'Magneta' },
      { number: 16, name: 'RubberMan' },
      { number: 17, name: 'Dynama' },
      { number: 18, name: 'Dr IQ' },
      { number: 19, name: 'Magma' },
      { number: 20, name: 'Tornado' },
    ]);

    function onClickHero(hero: { number: number; name: string }) {
      selectedHero.value = hero;
    }

    return {
      heroes,
      selectedHero,
      onClickHero,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.5rem;
  color: grey;
  font-weight: bold;

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
</style>
