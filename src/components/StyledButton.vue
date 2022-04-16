<template>
  <button>
    <slot />
  </button>
</template>

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
</style>
