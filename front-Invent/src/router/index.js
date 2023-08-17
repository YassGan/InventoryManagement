import Vue from 'vue';
import VueRouter from 'vue-router';

import PagePrincipale from '../views/PagePrincipale.vue';
import PageAfficheInvent from '../views/PageAfficheInvent.vue';

import LoginPage from '../views/LoginPage.vue';
import PageCreationNvUtilisateur from '../views/PageCreationNvUtilisateur.vue'; 
import PageCreationNvArticles from '../views/PageCreationNvArticles.vue'; 

import PageValidationInventaire from '../views/PageValidationInventaire.vue'; 




import PageArchiveInventaires from '../views/PageArchiveInventaires.vue'; 


import PageClickedInventaireDetails from '../views/PageClickedInventaireDetails.vue'; 








import ErrorPage from '../views/ErrorPage.vue'; 

Vue.use(VueRouter);

const routes = [
  {
    path: '/SuperAdminLoginPage',
    name: 'SuperAdminLoginPage',
    component: () => import("@/views/SuperAdmin/SuperAdminLoginPage.vue"),
  },


  {
    path: '/AfterLoginAdminPage',
    name: 'AfterLoginAdminPage',
    component: () => import("@/views/AfterLoginAdminPage.vue"),
  },


  {
    path: '/PageListeInventairesPasVerifies',
    name: 'PageListeInventairesPasVerifies',
    component: () => import("@/views/PageListeInventairesPasVerifies.vue"),
  },

  {
    path: '/PageListeInventairesArchives',
    name: 'PageListeInventairesArchives',
    component: () => import("@/views/PageListeInventairesArchives.vue"),
  },

  
  {
    path: '/InscriptionPage',
    name: 'InscriptionPage',
    component: () => import("@/views/InscriptionPage.vue"),
  },

  
  {
    path: '/PageCreationNvArticlesImmobiliers',
    name: 'InscriptPageCreationNvArticlesImmobiliersionPage',
    component: () => import("@/views/PartieArticlesImmobiliers/PageCreationNvArticlesImmobiliers.vue"),
  },


  
  {
    path: '/PageListeInventairesImmobiliersPasVerifies',
    name: 'PageListeInventairesImmobiliersPasVerifies',
    component: () => import("@/views/PartieArticlesImmobiliers/PageListeInventairesImmobiliersPasVerifies.vue"),
  },


  {
    path: '/PageListeInventairesImmobiliersArchives',
    name: 'PageListeInventairesImmobiliersArchives',
    component: () => import("@/views/PartieArticlesImmobiliers/PageListeInventairesImmobiliersArchives.vue"),
  },

  
  {
    path: '/PageClickedInventaireImmobilierDetails/:InventId',
    name: 'PageClickedInventaireImmobilierDetails',
    component: () => import("@/views/PartieArticlesImmobiliers/PageClickedInventaireImmobilierDetails.vue"),
  },

  

  

  {
    path: '/PageHomeSuperAdmin',
    name: 'PageHomeSuperAdmin',
    component: () => import("@/views/SuperAdmin/PageHomeSuperAdmin.vue"),
    meta: { requiresAuth: true }, //The user should be logged in to be able to see this page

  },

  {
    path: '/PageSuperAdmin_Societes',
    name: 'PageSuperAdmin_Societes',
    component: () => import("@/views/SuperAdmin/Societes/PageSuperAdmin_Societes.vue"),

  },

  {
    path: '/PageAjout_Societe',
    name: 'PageAjout_Societe',
    component: () => import("@/views/SuperAdmin/Societes/PageAjout_Societe.vue"),

  },
  

  {
    path: '/PageAjout_Package',
    name: 'PageAjout_Package',
    component: () => import("@/views/SuperAdmin/Packages/PageAjout_Package.vue"),

  },


  {
    path: '/PageSuperAdmin_Packages',
    name: 'PageSuperAdmin_Packages',
    component: () => import("@/views/SuperAdmin/Packages/PageSuperAdmin_Packages.vue"),

  },

  {
    path: '/PageSuperAdmin_SocietesAdmins',
    name: 'PageSuperAdmin_SocietesAdmins',
    component: () => import("@/views/SuperAdmin/SocietesAdmins/PageSuperAdmin_SocietesAdmins.vue"),

  },

  {
    path: '/PageAjout_SocieteAdmin',
    name: 'PageAjout_SocieteAdmin',
    component: () => import("@/views/SuperAdmin/SocietesAdmins/PageAjout_SocieteAdmin.vue"),

  },

  {
    path: '/PageValidationInventaireImmobilier/:InventId',
    name: 'PageValidationInventaireImmobilier',
    component: () => import("@/views/PartieArticlesImmobiliers/PageValidationInventaireImmobilier.vue"),
  },


  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage,
  },








  {
    path: '/PageCreationNvArticles',
    name: 'PageCreationNvArticles',
    component: PageCreationNvArticles,
    meta: { requiresAuth: true }, //The user should be logged in to be able to see this page
  },

  {
    path: '/PageClickedInventaireDetails/:InventId',
    name: 'PageClickedInventaireDetails',
    component: PageClickedInventaireDetails,
    meta: { requiresAuth: true }, //The user should be logged in to be able to see this page
  },
  

  {
    path: '/PageCreationNvUtilisateur',
    name: 'PageCreationNvUtilisateur',
    component: PageCreationNvUtilisateur,
    meta: { requiresAuth: true }, //The user should be logged in to be able to see this page
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
    path: '/PageArchiveInventaires',
    name: 'PageArchiveInventaires',
    component: PageArchiveInventaires,

  },

  {
    path: '/PageValidationInventaire/:InventId',
    name: 'PageValidationInventaire',
    component: PageValidationInventaire,
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
