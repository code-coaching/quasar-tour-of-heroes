<template>
  <div
    class="flex-wrap"
    :class="{
      'flex-wrap--dense': dense,
      'flex-wrap--column': column,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    dense: {
      type: Boolean,
      default: false,
    },
    column: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  &--dense {
    gap: 0.5rem;
  }

  &--column {
    flex-direction: column;
  }
}
</style>
