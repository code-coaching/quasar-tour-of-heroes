<template>
  <div class="title">Top Heroes</div>

  <div class="top-heroes">
    <div class="top-hero">Narco</div>
    <div class="top-hero">Bombasto</div>
    <div class="top-hero">Celeritas</div>
    <div class="top-hero">Magneta</div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.top-heroes {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.top-hero {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #5f7d8c;
  color: white;

  height: 8rem;
  width: 10rem;
  font-weight: 600;
  font-size: 1.1rem;

  &:hover {
    background-color: #eeeeee;
    color: #5f7d8c;
    cursor: pointer;
  }
}
</style>
