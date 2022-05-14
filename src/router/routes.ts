import { RouteRecordRaw } from 'vue-router';

export const ROUTE_NAMES = {
  DASHBOARD: 'Dashboard',
  HERO_LIST: 'HeroList',
  HERO_DETAILS: 'HeroDetails',
  HERO_ADD: 'HeroAdd',
  LOGIN: 'Login',
};

const routes: RouteRecordRaw[] = [

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: ROUTE_NAMES.DASHBOARD,
        path: '',
        component: () => import('pages/Dashboard.vue'),
      },
      {
        name: ROUTE_NAMES.HERO_LIST,
        path: '/heroes',
        component: () => import('pages/HeroList.vue'),
      },
      {
        name: ROUTE_NAMES.HERO_ADD,
        path: '/heroes/add',
        component: () => import('pages/HeroAdd.vue'),
      },
      {
        name: ROUTE_NAMES.HERO_DETAILS,
        path: '/heroes/:id',
        component: () => import('pages/HeroDetails.vue'),
      },
      {
        name: ROUTE_NAMES.LOGIN,
        path: '/login',
        component: () => import('pages/Login.vue'),
      }
    ],
  },

  /*
  * English: The path below will capture all routes that are not defined,
  * leave it as last route.
  * Nederlands: Het pad hieronder zal alle routes die niet gedefinieerd zijn opvangen,
  * laat het als laatste route staan.
  */
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
