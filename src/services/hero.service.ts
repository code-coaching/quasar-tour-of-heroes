
import { Hero } from 'src/components/models';
import { ref, Ref } from 'vue';

const heroes = ref([
  { number: 11, name: 'Mr. Nice' },
  { number: 12, name: 'Narco' },
  { number: 13, name: 'Bombasto' },
  { number: 14, name: 'Celeritas' },
  { number: 15, name: 'Magneta' },
  { number: 16, name: 'RubberMan' },
  { number: 17, name: 'Dynama' },
  { number: 18, name: 'Dr IQ' },
  { number: 19, name: 'Magma' },
  { number: 20, name: 'Tornado' },
]);

const selectedHero: Ref<Hero> = ref() as Ref<Hero>;

const useHeroes = () => {

  const topHeroes = heroes.value.slice(0, 4);

  return {
    heroes,
    selectedHero,
    topHeroes
  }
}

export {
  useHeroes
}