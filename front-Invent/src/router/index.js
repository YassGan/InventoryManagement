import Vue from 'vue';
import VueRouter from 'vue-router';

import PageAjoutInvent from '../views/PageAjoutInvent.vue';
import PagePrincipale from '../views/PagePrincipale.vue';
import PageAfficheInvent from '../views/PageAfficheInvent.vue';
import PageComptage from '../views/PageComptage.vue';
import PageArchives from '../views/PageArchives.vue';
import InventoryDetail from '../views/InventoryDetail.vue';
import LoginPage from '../views/LoginPage.vue';
import PageCreationNvUser from '../views/PageCreationNvUser.vue'; 

import ErrorPage from '../views/ErrorPage.vue'; 

Vue.use(VueRouter);

const routes = [
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/PageAjoutInvent',
    name: 'PageAjoutInvent',
    component: PageAjoutInvent,
    meta: { requiresAuth: true }, //The user should be logged in to be able to see this page
  },
  {
    path: '/PageCreationNvUser',
    name: 'PageCreationNvUser',
    component: PageCreationNvUser,
    meta: { requiresAuth: true }, //The user should be logged in to be able to see this page
  },
  {
    path: '/PageArchives',
    name: 'PageArchives',
    component: PageArchives,
    meta: { requiresAuth: true }, 
  },
  {
    path: '/PagePrincipale',
    name: 'PagePrincipale',
    component: PagePrincipale,
    meta: { requiresAuth: true }, 

  },
  {
    path: '/PageAfficheInvent',
    name: 'PageAfficheInvent',
    component: PageAfficheInvent,

  },
  {
    path: '/PageComptage',
    name: 'PageComptage',
    component: PageComptage,
    meta: { requiresAuth: true }, 

  },
  {
    path: '/InventoryDetail/:InventId',
    name: 'InventoryDetail',
    component: InventoryDetail,
    meta: { requiresAuth: true }, 

  },
  {
    path: '/ErrorPage',
    name: 'ErrorPage',
    component: ErrorPage,
  },
  {
    path: '/',
    redirect: '/LoginPage',
  },
  {
    path: '*',
    redirect: '/ErrorPage',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If the route requires authentication
    if (token) {
      // If the token exists
      next();
    } else {
      // If the token does not exist, redirect to ErrorPage
      next('/ErrorPage');
    }
  } else {
    next();
  }
});

export default router;
