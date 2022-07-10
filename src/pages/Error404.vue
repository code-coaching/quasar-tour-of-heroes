<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

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
import { useTheme } from 'src/services/theme/theme.service';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error404',
  setup() {
    const { getDefaults } = useTheme();
    return {
      getDefaults,
    };
  },
});
</script>
