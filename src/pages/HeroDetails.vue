<template>
  <div v-if="hero">
    <div class="title">{{ hero.name }} details!</div>

    <div>id: {{ hero.number }}</div>
    <div>name: <input :value="hero.name" /></div>

    <StyledButton>Back</StyledButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import StyledButton from 'components/StyledButton.vue';
import { Hero } from 'components/models';

export default defineComponent({
  components: {
    StyledButton,
  },
  setup() {
    const hero: Ref<Hero> = ref({ number: 15, name: 'Magneta' }) as Ref<Hero>;

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
