<template>
  <q-btn
    :class="{
      primary: primary,
      negative: negative,
    }"
  >
    <slot />
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    primary: {
      type: Boolean,
      default: false,
    },
    negative: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  background-color: #eeeeee;
  border-radius: 0.25rem;
  font-weight: 500;
  border: none;
  padding: 0.25rem 0.5rem;
  color: #567868;
}

.primary {
  background-color: var(--q-primary);
  color: white;
}

.negative {
  background-color: var(--q-negative);
  color: white;
}
</style>
