<template>
  <q-form v-if="hero" class="details-container" ref="formRef" greedy>
    <div class="title">
      {{ hero.name }} {{ t('pages.hero-details.details') }}!
    </div>

    <div>{{ t('pages.hero-details.id') }}: {{ hero.number }}</div>
    <q-input
      v-bind="getDefaults('QInput')"
      :label="t('name')"
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
        {{ t('back') }}
      </q-btn>
      <q-btn v-bind="getDefaults('QBtn')" color="primary" @click="saveHero()">
        {{ t('save') }}
      </q-btn>
      <q-btn
        v-bind="getDefaults('QBtn')"
        color="negative"
        @click="removeHero()"
      >
        {{ t('delete') }}
      </q-btn>
    </FlexWrap>
  </q-form>

  <div v-else class="title">{{ t('pages.hero-details.hero-not-found') }}!</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, Ref } from 'vue';
import FlexWrap from 'components/FlexWrap.vue';
import { Hero } from 'components/models';
import { useRoute, useRouter } from 'vue-router';
import { useHeroesStore } from 'src/stores/hero.store';
import { useValidators } from 'src/services/validator.composable';
import { QForm } from 'quasar';
import { useTheme } from 'src/services/theme/theme.service';
import { useI18n } from 'src/boot/i18n';

export default defineComponent({
  components: {
    FlexWrap,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const hero: Ref<Hero> = ref() as Ref<Hero>;
    const heroesStore = useHeroesStore();
    const { required } = useValidators();
    const { getDefaults } = useTheme();
    const { t } = useI18n();

    onBeforeMount(() => {
      const { id } = route.params;
      if (id) {
        const matchingHero = heroesStore.findHero(id.toString());
        if (matchingHero) hero.value = matchingHero;
      }
    });

    const moveBack = () => void router.go(-1);
    const saveHero = () => {
      void formRef.value.validate().then((valid) => {
        if (valid) {
          heroesStore.editHero(hero.value);
          moveBack();
        }
      });
    };
    const removeHero = () => {
      heroesStore.deleteHero(hero.value);
      moveBack();
    };

    const formRef = ref({} as QForm);

    return {
      t,
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
