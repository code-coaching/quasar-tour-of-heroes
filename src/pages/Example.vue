<template>
  <div class="example-page">
    <StyledButton @click="toggleDarkMode()">Toggle Dark Mode</StyledButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import StyledButton from 'components/StyledButton.vue';

export default defineComponent({
  components: {
    StyledButton,
  },
  setup() {
    const $q = useQuasar();

    const toggleDarkMode = () => $q.dark.set($q.dark.isActive ? false : true);

    return {
      toggleDarkMode,
    };
  },
});
</script>

<style lang="scss">
.example-page {
  margin: 1rem;
}
</style>
