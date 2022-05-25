<template>
  <div class="add-container">
    <div class="title">Add hero</div>

    <div><q-input outlined dense label="name" v-model="name" /></div>

    <ButtonGroup class="button-group">
      <StyledButton @click="moveBack()">Back</StyledButton>
      <StyledButton primary @click="saveHero()">Save</StyledButton>
    </ButtonGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import StyledButton from 'components/StyledButton.vue';
import ButtonGroup from 'components/ButtonGroup.vue';
import { useRouter } from 'vue-router';
import { useHeroes } from 'src/services/hero.service';

export default defineComponent({
  components: {
    StyledButton,
    ButtonGroup,
  },
  setup() {
    const router = useRouter();
    const name = ref('');
    const { addHero } = useHeroes();

    const moveBack = () => void router.go(-1);
    const saveHero = () => {
      addHero(name.value);
      moveBack();
    };

    return {
      name,
      moveBack,
      saveHero,
    };
  },
});
</script>

<style lang="scss" scoped>
.add-container {
  width: 20rem;
}

.title {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.button-group {
  margin-top: 1rem;
}
</style>
