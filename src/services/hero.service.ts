
import { AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';
import { BackendHero, Hero } from 'src/components/models';
import { readonly, Ref, ref, computed } from 'vue';

interface Paged<T> {
  total: number;
  limit: number;
  skip: number;
  data: Array<T>;
}

const getRequestConfig = (): AxiosRequestConfig => {
  const accessToken = localStorage.getItem('accessToken') || '';

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}

const heroes: Ref<Array<Hero>> = ref([]);

const selectedHero = ref({} as Hero);

const useHeroes = () => {

  const topHeroes = computed(() => heroes.value.slice(0, 4));

  const getHeroes = async () => {

    const result = await api.get<Paged<BackendHero>>('/heroes', getRequestConfig());

    heroes.value = result.data.data.map((hero: BackendHero): Hero => {
      return {
        ...hero,
        number: hero.id
      }
    });
  }

  const editHero = (hero: Hero) => {
    if (hero._id) {
      const index = heroes.value.findIndex((h: Hero) => h._id === hero._id);
      const oldHero = heroes.value[index];
      heroes.value[index] = hero;

      api
        .patch(`/heroes/${hero._id}`, hero, getRequestConfig())
        .catch(() => {
          heroes.value[index] = oldHero;
        });
    }
  }

  const findHero = (id: string): Hero | undefined => {
    const matchingHero = heroes.value.find((h) => h.number === id);
    if (matchingHero) return { ...matchingHero };
  }

  const deleteHero = (hero: Hero) => {
    if (hero._id) {
      const index = heroes.value.findIndex((h) => h._id === hero._id);
      heroes.value.splice(index, 1);

      api
        .delete(`/heroes/${hero._id}`, getRequestConfig())
        .catch(() => {
          heroes.value.splice(index, 0, hero);
        });
    }
  }

  const addHero = (name: string) => {
    let maxNumber = Math.max(...heroes.value.map((h) => +h.number));
    if (maxNumber === -Infinity) maxNumber = 0;

    const number = (maxNumber + 1).toString();
    const newHero = { number, name };

    heroes.value.push(newHero);
    const index = heroes.value.length - 1;

    api
      .post<BackendHero>(
        '/heroes',
        {
          ...newHero,
          id: newHero.number,
        },
        getRequestConfig()
      )
      .then((result) => {
        heroes.value[index] = { ...result.data, number: result.data.id };
      })
      .catch(() => {
        alert('Error adding hero');
        const index = heroes.value.findIndex((e) => e === newHero);
        heroes.value.splice(index, 1);
      });
  };

  const resetSelectedHero = () => selectedHero.value = {} as Hero;
  const setSelectedHero = (hero: Hero) => selectedHero.value = hero;

  return {
    heroes: readonly(heroes),
    selectedHero: readonly(selectedHero),
    topHeroes,
    editHero,
    findHero,
    deleteHero,
    resetSelectedHero,
    addHero,
    setSelectedHero,
    getHeroes
  }
}

export {
  useHeroes
}