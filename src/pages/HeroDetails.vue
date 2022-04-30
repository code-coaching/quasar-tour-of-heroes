<template>
  <div v-if="hero">
    <div class="title">{{ hero.name }} details!</div>

    <div>id: {{ hero.number }}</div>
    <div>name: <input v-model="hero.name" /></div>

    <div class="buttons">
      <StyledButton class="back-button" @click="moveBack()">Back</StyledButton>
      <StyledButton class="save-button" @click="saveHero()">Save</StyledButton>
    </div>
  </div>

  <div v-else class="title">Hero not found!</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, Ref } from 'vue';
import StyledButton from 'components/StyledButton.vue';
import { Hero } from 'components/models';
import { useRoute, useRouter } from 'vue-router';
import { useHeroes } from 'src/services/hero.service';

export default defineComponent({
  components: {
    StyledButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const hero: Ref<Hero> = ref() as Ref<Hero>;
    const { editHero, findHero } = useHeroes();

    onBeforeMount(() => {
      const { id } = route.params;
      if (id) {
        const matchingHero = findHero(+id);
        if (matchingHero) hero.value = matchingHero;
      }
    });

    const moveBack = () => void router.go(-1);
    const saveHero = () => editHero(hero.value);

    return {
      hero,
      moveBack,
      saveHero,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.buttons {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}
</style>
