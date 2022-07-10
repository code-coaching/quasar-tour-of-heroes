<template>
  <q-form class="add-container" ref="formRef" greedy>
    <div class="title">Add hero</div>

    <q-input
      v-bind="getDefaults('QInput')"
      label="name"
      v-model="name"
      :rules="[required()]"
      lazy-rules
    />

    <FlexWrap v-bind="getDefaults('FlexWrap')" class="button-group">
      <q-btn v-bind="getDefaults('QBtn')" @click="moveBack()">Back</q-btn>
      <q-btn v-bind="getDefaults('QBtn')" color="primary" @click="saveHero()">
        Save
      </q-btn>
    </FlexWrap>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FlexWrap from 'components/FlexWrap.vue';
import { useRouter } from 'vue-router';
import { useHeroes } from 'src/services/hero.service';
import { useValidators } from 'src/services/validator.composable';
import { QForm } from 'quasar';
import { useTheme } from 'src/services/theme/theme.service';

export default defineComponent({
  components: {
    FlexWrap,
  },
  setup() {
    const router = useRouter();
    const name = ref('');
    const { addHero } = useHeroes();
    const { required } = useValidators();
    const { getDefaults } = useTheme();

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
      getDefaults,
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
