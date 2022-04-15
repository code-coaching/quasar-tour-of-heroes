<template>
  <div class="title">My Heroes</div>

  <div class="hero-list">
    <div class="hero">
      <span class="hero-number">11</span>
      <span class="hero-name">Mr. Nice</span>
    </div>
    <div class="hero">
      <span class="hero-number">12</span> <span class="hero-name">Narco</span>
    </div>
    <div class="hero">
      <span class="hero-number">13</span>
      <span class="hero-name">Bombasto</span>
    </div>
    <div class="hero">
      <span class="hero-number">14</span>
      <span class="hero-name">Celeritas</span>
    </div>
    <div class="hero">
      <span class="hero-number">15</span> <span class="hero-name">Magneta</span>
    </div>
    <div class="hero">
      <span class="hero-number">16</span>
      <span class="hero-name">RubberMan</span>
    </div>
    <div class="hero">
      <span class="hero-number">17</span> <span class="hero-name">Dynama</span>
    </div>
    <div class="hero">
      <span class="hero-number">18</span> <span class="hero-name">Dr IQ</span>
    </div>
    <div class="hero">
      <span class="hero-number">19</span> <span class="hero-name">Magma</span>
    </div>
    <div class="hero">
      <span class="hero-number">20</span> <span class="hero-name">Tornado</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 1.5rem;
  color: grey;
  font-weight: bold;

  margin-top: 1rem;
  margin-bottom: 1rem;
}

.hero-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.hero {
  display: flex;
  max-width: 10rem;
  background-color: darken(#eeeeee, 10%);
  background-color: #eeeeee;
  cursor: pointer;
  color: #8d8d8d;
  border-radius: 0.5rem;

  &:hover {
    background-color: #cfd8dc;
    color: white;
    margin-left: 0.25rem;
  }
}

.hero-number {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #5f7d8c;
  color: white;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.hero-name {
  padding: 0.5rem;
  padding-left: 0.75rem;
  font-weight: 600;
}
</style>
