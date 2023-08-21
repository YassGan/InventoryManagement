<template>
  <div v-show="isSidebarOpen" class="mobile-sidebar">
 
    <ul  class="sidebar-links">
      <li v-for="link in mobileLinks" :key="link.path" >
<router-link :to="link.path" v-if="link.userRole === 'admin_produit'">{{ link.label }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
                  UserRole: "",

 mobileLinks: [
  { userRole: 'admin_produit', path: '/PagePrincipale', label: 'Home' },
  { userRole: 'admin_produit', path: '/PageListeInventairesArchives', label: 'Inventaires Archivés' },
  { userRole: 'admin_produit', path: '/PageListeInventairesPasVerifies', label: 'Inventaires Importés' },
  { userRole: 'admin_produit', path: '/PageCreationNvArticles', label: 'Créer Inventaire' },
  { userRole: 'admin_produit', path: '/PageListeUsers', label: 'Utilisateurs ' },

  
  { userRole: 'admin_immo', path: '/PagePrincipale', label: 'Home' },
  { userRole: 'admin_immo', path: '/PageListeInventairesImmobiliersArchives', label: 'Inventaires Immobiliers Archivés' },
  { userRole: 'admin_immo', path: '/PageListeInventairesImmobiliersPasVerifies', label: 'Inventaires Immobiliers Importés' },
  { userRole: 'admin_immo', path: '/PageCreationNvArticlesImmobiliers', label: 'Articles Immobiliers' },
  { userRole: 'admin_immo', path: '/PageListeUsers', label: 'Utilisateurs ' },

],




      isSidebarOpen: true,
    };
  },
      created() {
    this.UserRole=localStorage.getItem("OptionAdmin");
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>

<style scoped>
.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px; /* Set the desired width */
  height: 100%;
  background-color: #ca7f68 !important;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  transition:  0.9s ease;
}

.sidebar-links {
  list-style: none;
  padding: 150px 0;
  height: 200px;
}

.sidebar-links li {
  padding: 10px;
    margin: 20px;


}

.sidebar-links a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: color 0.3s ease;
}

.sidebar-links a:hover {
  color: #ff8d6a;
}

.hamburger-button {
  display: block;
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.hamburger-button span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 4px auto;
  transition: background-color 0.3s ease;
}

.hamburger-button.open span {
  background-color: #ff8d6a;
}
</style>
