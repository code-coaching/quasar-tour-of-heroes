import { AxiosRequestConfig } from 'axios';
import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { BackendHero, Hero } from 'src/components/models';
import { useI18n } from 'src/boot/i18n';
const { t } = useI18n();

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
};

export const useHeroesStore = defineStore('heroStore', {
  state: () => ({
    heroes: [] as Array<Hero>,
    selectedHero: {} as Hero
  }),

  getters: {
    topHeroes: (state) => state.heroes.slice(0, 4),
  },

  actions: {
    async getHeroes() {
      const result = await api.get<Paged<BackendHero>>(
        '/heroes',
        getRequestConfig()
      );

      this.heroes = result.data.data.map((hero: BackendHero): Hero => {
        return {
          ...hero,
          number: hero.id,
        };
      });
    },
    editHero(hero: Hero) {
      if (hero._id) {
        const index = this.heroes.findIndex((h: Hero) => h._id === hero._id);
        const oldHero = this.heroes[index];
        this.heroes[index] = hero;

        api
          .patch(`/heroes/${hero._id}`, hero, getRequestConfig())
          .then(() =>
            Notify.create({ message: t('services.hero.hero-updated'), color: 'positive' })
          )
          .catch(() => {
            Notify.create({ message: t('services.hero.hero-update-failed'), color: 'negative' });
            this.heroes[index] = oldHero;
          });
      }
    },

    findHero(id: string): Hero | undefined {
      const matchingHero = this.heroes.find((h) => h.number === id);
      if (matchingHero) return { ...matchingHero };
    },

    deleteHero(hero: Hero) {
      if (hero._id) {
        const index = this.heroes.findIndex((h) => h._id === hero._id);
        this.heroes.splice(index, 1);

        api
          .delete(`/heroes/${hero._id}`, getRequestConfig())
          .then(() =>
            Notify.create({ message: t('services.hero.hero-deleted'), color: 'positive' })
          )
          .catch(() => {
            Notify.create({
              message: t('services.hero.failed-to-delete-hero'),
              color: 'negative',
            });
            this.heroes.splice(index, 0, hero);
          });
      }
    },

    addHero(name: string) {
      let maxNumber = Math.max(...this.heroes.map((h) => +h.number));
      if (maxNumber === -Infinity) maxNumber = 0;

      const number = (maxNumber + 1).toString();
      const newHero = { number, name };

      this.heroes.push(newHero);
      const index = this.heroes.length - 1;

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
          Notify.create({ message: t('services.hero.hero-added'), type: 'positive' });
          this.heroes[index] = { ...result.data, number: result.data.id };
        })
        .catch(() => {
          Notify.create({ message: t('services.hero.error-adding-hero'), type: 'negative' });
          const index = this.heroes.findIndex((e) => e === newHero);
          this.heroes.splice(index, 1);
        });
    },

    resetSelectedHero() { this.selectedHero = {} as Hero },
    setSelectedHero(hero: Hero) { this.selectedHero = hero },
  }
});
