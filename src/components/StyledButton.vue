<template>
  <button
    :class="{
      primary: primary,
      negative: negative,
    }"
  >
    <slot />
  </button>
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

  &:hover {
    background-color: darken(#eeeeee, 10%);
    color: #0096e8;
    cursor: pointer;
  }
}

.primary {
  background-color: var(--q-primary);
  color: white;

  &:hover {
    background-color: darken($primary, 5%);
    color: white;
  }
}

.negative {
  background-color: var(--q-negative);
  color: white;

  &:hover {
    background-color: darken($negative, 5%);
    color: white;
  }
}
</style>
