<template>
  <div v-if="hero">
    <div class="title">{{ hero.name }} details!</div>

    <div>id: {{ hero.number }}</div>
    <div>name: <input :value="hero.name" /></div>

    <StyledButton>Back</StyledButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, Ref } from 'vue';
import StyledButton from 'components/StyledButton.vue';
import { Hero } from 'components/models';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    StyledButton,
  },
  setup() {
    const route = useRoute();
    const hero: Ref<Hero> = ref() as Ref<Hero>;

    onBeforeMount(() => {
      const { id } = route.params;
      if (id) {
        const matchingHero = heroes.value.find((h) => h.number === +id);
        if (matchingHero) hero.value = matchingHero;
      }
    });

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

    return {
      hero,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
