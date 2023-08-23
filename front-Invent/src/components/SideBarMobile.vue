<template>
  <div v-show="isSidebarOpen" class="mobile-sidebar">
 

    <a href="/AfterLoginAdminPage">
      <div class="logo-container">
        <div>
          <img src="../assets/WebsiteLogo.png" alt="Logo" class="logo" />
                    <div style="font-size:27px;margin-left:-10px" class="logo-text">Most</div>

          <!-- <div class="logo-text">Gestion d'inventaires</div> -->
        </div>
      </div>
    </a>


    <ul  class="sidebar-links">
      <li style="display:flex;justify-content:start;padding-left:20px" v-for="link in mobileLinks" :key="link.path" >
<router-link :to="link.path" v-if="link.userRole ===UserRole">{{ link.label }}</router-link>
      </li>
    </ul>


     <div style="margin-top:180px;margin-left:6px;margin-bottom:50px" class="">
      <button style="background:transparent;border:none" class="logout-button " @click="logout">
        <img class="logo" style="width:40px" src="../assets/exit.png"  />
                <div class="" style="font-size:18px;color:white;margin-left:-17px">Logout</div>

      </button>
    </div>


  </div>
</template>

<script>
import router from "@/router"
export default {
  data() {
    return {
                  UserRole: "",

 mobileLinks: [
  { userRole: 'admin_produit', path: '/PagePrincipale', label: 'Home' },
    { userRole: 'admin_immo', path: '/PagePrincipale', label: 'Home' },

  { userRole: 'admin_produit', path: '/PageListeInventairesArchives', label: 'Inventaires Archivés' },
    { userRole: 'admin_immo', path: '/PageListeInventairesImmobiliersArchives', label: 'Inventaires Immobiliers Archivés' },

  { userRole: 'admin_produit', path: '/PageListeInventairesPasVerifies', label: 'Inventaires Importés' },
    { userRole: 'admin_immo', path: '/PageListeInventairesImmobiliersPasVerifies', label: 'Inventaires Immobiliers Importés' },

  { userRole: 'admin_produit', path: '/PageCreationNvArticles', label: 'Créer Inventaire' },
    { userRole: 'admin_immo', path: '/PageCreationNvArticlesImmobiliers', label: 'Nvx Articles Immobiliers' },

  { userRole: 'admin_produit', path: '/PageListeUsers', label: 'Utilisateurs ' },

  
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
        logout() {

          localStorage.removeItem('token');
          localStorage.clear(); 




    if (this.$route.path !== '/loginPage') {
      router.push('/loginPage');}





},
  },
};
</script>

<style scoped>
a{
  text-decoration: none;
}
.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px; /* Set the desired width */
  height: 100%;
  background-color: #042f52 !important;
  color: white !important;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  transition:  0.9s ease;
}

.sidebar-links {
  list-style: none;
  padding: 10px 0;
  height: 200px;
  margin-top: 45px;
  margin-bottom: -45px;
}

.sidebar-links li {
  padding: 10px;


}

.sidebar-links a {
  text-decoration: none;
  color: white;
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
    background: white !important;

}

.hamburger-button span {
  display: block;
  width: 25px;
  height: 3px;
  margin: 4px auto;
  transition: background-color 0.3s ease;
}

.hamburger-button.open span {
  background-color: #ff8d6a;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  filter: invert(100%) brightness(100%); 
}

.logo-text {
  font-size: 16px;
  color: white;
}



</style>
