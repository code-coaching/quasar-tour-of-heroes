<template>
  <q-form class="add-container" ref="formRef" greedy>
    <div class="title">{{ t('pages.hero-add.add-hero') }}</div>

    <q-input
      v-bind="getDefaults('QInput')"
      :label="t('name')"
      v-model="name"
      :rules="[required()]"
      lazy-rules
    />

    <FlexWrap v-bind="getDefaults('FlexWrap')" class="button-group">
      <q-btn v-bind="getDefaults('QBtn')" @click="moveBack()">
        {{ t('back') }}
      </q-btn>
      <q-btn v-bind="getDefaults('QBtn')" color="primary" @click="saveHero()">
        {{ t('save') }}
      </q-btn>
    </FlexWrap>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FlexWrap from 'components/FlexWrap.vue';
import { useRouter } from 'vue-router';
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
    const router = useRouter();
    const name = ref('');
    const heroesStore = useHeroesStore();
    const { required } = useValidators();
    const { getDefaults } = useTheme();
    const { t } = useI18n();

    const moveBack = () => void router.go(-1);
    const saveHero = () => {
      void formRef.value.validate().then((valid) => {
        if (valid) {
          heroesStore.addHero(name.value);
          moveBack();
        }
      });
    };

    const formRef = ref({} as QForm);

    return {
      t,
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
