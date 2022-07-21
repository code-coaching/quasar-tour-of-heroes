<template>
  <div class="header">
    <DarkToggle force-light />
    <q-btn
      round
      outline
      class="text-white"
      icon="settings"
      @click="navigate(ROUTE_NAMES.EXAMPLE)"
    />
    <q-btn
      v-bind="getDefaults('QBtn')"
      color="primary"
      v-if="!isAuthenticated"
      @click="navigate(ROUTE_NAMES.LOGIN)"
    >
      {{ t('login') }}
    </q-btn>
    <q-btn
      v-bind="getDefaults('QBtn')"
      color="primary"
      v-else
      @click="logout()"
    >
      {{ t('logout') }}
    </q-btn>
  </div>
  <div class="layout-container">
    <div class="title">{{ t('layouts.main.title') }}</div>
    <FlexWrap v-bind="getDefaults('FlexWrap')">
      <q-btn
        v-bind="getDefaults('QBtn')"
        @click="navigate(ROUTE_NAMES.DASHBOARD)"
      >
        {{ t('navigation.dashboard') }}
      </q-btn>
      <q-btn
        v-bind="getDefaults('QBtn')"
        @click="navigate(ROUTE_NAMES.HERO_LIST)"
      >
        {{ t('navigation.heroes') }}
      </q-btn>
    </FlexWrap>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ROUTE_NAMES } from '../router/routes';
import { useAuth } from 'src/services/auth.service';
import { useHeroesStore } from 'src/stores/hero.store';
import { useTheme } from 'src/services/theme/theme.service';
import DarkToggle from '../services/theme/DarkToggle.vue';
import FlexWrap from 'src/components/FlexWrap.vue';
import { useLanguage } from 'src/services/i18n/language.service';
import { useI18n } from 'src/boot/i18n';

export default defineComponent({
  components: {
    DarkToggle,
    FlexWrap,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { tryToAuthenticate, isAuthenticated, logout } = useAuth();
    const heroesStore = useHeroesStore();
    const { loadCustomTheme, getDefaults } = useTheme();
    const { loadLanguage } = useLanguage();
    const { t } = useI18n();
    loadCustomTheme();
    loadLanguage();

    watch(isAuthenticated, (newValue) => {
      if (newValue) {
        void heroesStore.getHeroes();
      } else {
        void router.push({ name: ROUTE_NAMES.LOGIN });
      }
    });

    watch(
      () => route.path,
      () => {
        const routesWithoutAuth = [ROUTE_NAMES.LOGIN, ROUTE_NAMES.EXAMPLE];

        if (route.name) {
          if (!routesWithoutAuth.includes(route.name.toString())) {
            if (!isAuthenticated.value) {
              tryToAuthenticate()
                .then(() => {
                  void heroesStore.getHeroes();
                })
                .catch(() => {
                  void router.push({ name: ROUTE_NAMES.LOGIN });
                });
            }
          }
        }
      },
      { immediate: true }
    );

    const navigate = (name: string) => {
      // void router.push({ name: 'Dashboard' }); Navigate to Dashboard
      // void router.push({ name: 'HeroList' }); Navigate to HeroList
      void router.push({ name });
    };

    return {
      t,
      getDefaults,
      navigate,
      ROUTE_NAMES,
      isAuthenticated,
      logout,
    };
  },
});
</script>

<style lang="scss" scoped>
.layout-container {
  margin: 2rem;
}

.header {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  background-color: #333;
  gap: 0.5rem;
}
</style>
