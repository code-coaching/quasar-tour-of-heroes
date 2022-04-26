<template>
  <div v-if="hero">
    <div class="title">{{ hero.name }} details!</div>

    <div>id: {{ hero.number }}</div>
    <div>name: <input v-model="hero.name" /></div>

    <StyledButton class="back-button" @click="moveBack()">Back</StyledButton>
  </div>

  <div v-else class="title">Hero not found!</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, Ref } from 'vue';
import StyledButton from 'components/StyledButton.vue';
import { Hero } from 'components/models';
import { useRoute, useRouter } from 'vue-router';
import { ROUTE_NAMES } from 'src/router/routes';
import { useHeroes } from 'src/services/hero.service';

export default defineComponent({
  components: {
    StyledButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const hero: Ref<Hero> = ref() as Ref<Hero>;
    const { heroes } = useHeroes();

    onBeforeMount(() => {
      const { id } = route.params;
      if (id) {
        const matchingHero = heroes.value.find((h) => h.number === +id);
        if (matchingHero) hero.value = matchingHero;
      }
    });

    const moveBack = () => void router.push({ name: ROUTE_NAMES.HERO_LIST });

    return {
      hero,
      moveBack,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.back-button {
  margin-top: 1rem;
}
</style>
