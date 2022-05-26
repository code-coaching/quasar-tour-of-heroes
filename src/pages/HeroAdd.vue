<template>
  <q-form class="add-container" ref="formRef" greedy>
    <div class="title">Add hero</div>

    <q-input
      outlined
      dense
      label="name"
      v-model="name"
      :rules="[required()]"
      lazy-rules
    />

    <ButtonGroup class="button-group">
      <StyledButton @click="moveBack()">Back</StyledButton>
      <StyledButton primary @click="saveHero()">Save</StyledButton>
    </ButtonGroup>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import StyledButton from 'components/StyledButton.vue';
import ButtonGroup from 'components/ButtonGroup.vue';
import { useRouter } from 'vue-router';
import { useHeroes } from 'src/services/hero.service';
import { useValidators } from 'src/services/validator.composable';
import { QForm } from 'quasar';

export default defineComponent({
  components: {
    StyledButton,
    ButtonGroup,
  },
  setup() {
    const router = useRouter();
    const name = ref('');
    const { addHero } = useHeroes();
    const { required } = useValidators();

    const moveBack = () => void router.go(-1);
    const saveHero = () => {
      void formRef.value.validate().then((valid) => {
        if (valid) {
          addHero(name.value);
          moveBack();
        }
      });
    };

    const formRef = ref({} as QForm);

    return {
      name,
      moveBack,
      saveHero,
      required,
      formRef,
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
