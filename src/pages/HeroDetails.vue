<template>
  <q-form v-if="hero" class="details-container" ref="formRef" greedy>
    <div class="title">{{ hero.name }} details!</div>

    <div>id: {{ hero.number }}</div>
    <q-input
      v-bind="getDefaults('QInput')"
      label="name"
      v-model="hero.name"
      :rules="[required()]"
      lazy-rules
    />

    <FlexWrap v-bind="getDefaults('FlexWrap')" class="button-group">
      <q-btn
        v-bind="getDefaults('QBtn')"
        class="back-button"
        @click="moveBack()"
      >
        Back
      </q-btn>
      <q-btn v-bind="getDefaults('QBtn')" color="primary" @click="saveHero()">
        Save
      </q-btn>
      <q-btn
        v-bind="getDefaults('QBtn')"
        color="negative"
        @click="removeHero()"
      >
        Delete
      </q-btn>
    </FlexWrap>
  </q-form>

  <div v-else class="title">Hero not found!</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, Ref } from 'vue';
import FlexWrap from 'components/FlexWrap.vue';
import { Hero } from 'components/models';
import { useRoute, useRouter } from 'vue-router';
import { useHeroes } from 'src/services/hero.service';
import { useValidators } from 'src/services/validator.composable';
import { QForm } from 'quasar';
import { useTheme } from 'src/services/theme/theme.service';

export default defineComponent({
  components: {
    FlexWrap,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const hero: Ref<Hero> = ref() as Ref<Hero>;
    const { editHero, findHero, deleteHero } = useHeroes();
    const { required } = useValidators();
    const { getDefaults } = useTheme();

    onBeforeMount(() => {
      const { id } = route.params;
      if (id) {
        const matchingHero = findHero(id.toString());
        if (matchingHero) hero.value = matchingHero;
      }
    });

    const moveBack = () => void router.go(-1);
    const saveHero = () => {
      void formRef.value.validate().then((valid) => {
        if (valid) {
          editHero(hero.value);
          moveBack();
        }
      });
    };
    const removeHero = () => {
      deleteHero(hero.value);
      moveBack();
    };

    const formRef = ref({} as QForm);

    return {
      getDefaults,
      hero,
      moveBack,
      saveHero,
      removeHero,
      required,
      formRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.details-container {
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
