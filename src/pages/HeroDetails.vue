<template>
  <div v-if="hero">
    <div class="title">{{ hero.name }} details!</div>

    <div>id: {{ hero.number }}</div>
    <div>name: <input v-model="hero.name" /></div>

    <ButtonGroup class="button-group">
      <StyledButton class="back-button" @click="moveBack()">Back</StyledButton>
      <StyledButton primary @click="saveHero()">Save</StyledButton>
      <StyledButton negative @click="removeHero()">Delete</StyledButton>
    </ButtonGroup>
  </div>

  <div v-else class="title">Hero not found!</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, Ref } from 'vue';
import StyledButton from 'components/StyledButton.vue';
import ButtonGroup from 'components/ButtonGroup.vue';
import { Hero } from 'components/models';
import { useRoute, useRouter } from 'vue-router';
import { useHeroes } from 'src/services/hero.service';

export default defineComponent({
  components: {
    StyledButton,
    ButtonGroup,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const hero: Ref<Hero> = ref() as Ref<Hero>;
    const { editHero, findHero, deleteHero } = useHeroes();

    onBeforeMount(() => {
      const { id } = route.params;
      if (id) {
        const matchingHero = findHero(id.toString());
        if (matchingHero) hero.value = matchingHero;
      }
    });

    const moveBack = () => void router.go(-1);
    const saveHero = () => {
      editHero(hero.value);
      moveBack();
    };
    const removeHero = () => {
      deleteHero(hero.value);
      moveBack();
    };

    return {
      hero,
      moveBack,
      saveHero,
      removeHero,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.button-group {
  margin-top: 1rem;
}
</style>
