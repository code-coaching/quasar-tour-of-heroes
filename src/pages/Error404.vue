<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">
        {{ t('pages.error.title') }}
      </div>

      <q-btn
        v-bind="getDefaults('QBtn')"
        class="q-mt-xl"
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'src/boot/i18n';
import { useTheme } from 'src/services/theme/theme.service';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error404',
  setup() {
    const { getDefaults } = useTheme();
    const { t } = useI18n();

    return {
      t,
      getDefaults,
    };
  },
});
</script>
