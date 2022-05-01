
import { Hero } from 'src/components/models';
import { ref } from 'vue';

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

const selectedHero = ref({} as Hero);

const useHeroes = () => {

  const topHeroes = heroes.value.slice(0, 4);

  const editHero = (hero: Hero) => {
    heroes.value = heroes.value.map(h => h.number === hero.number ? hero : h);
  }

  const findHero = (id: number): Hero | undefined => {
    const matchingHero = heroes.value.find((h) => h.number === +id);
    if (matchingHero) return { ...matchingHero };
  }

  const deleteHero = (hero: Hero) => {
    heroes.value = heroes.value.filter(h => h.number !== hero.number);
  }

  const addHero = (name: string) => {
    const maxNumber = Math.max(...heroes.value.map(h => h.number));
    const newHero = { number: maxNumber + 1, name };
    heroes.value.push(newHero);
  }

  const resetSelectedHero = () => selectedHero.value = {} as Hero;

  return {
    heroes,
    selectedHero,
    topHeroes,
    editHero,
    findHero,
    deleteHero,
    resetSelectedHero,
    addHero
  }
}

export {
  useHeroes
}