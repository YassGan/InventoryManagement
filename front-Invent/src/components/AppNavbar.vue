


<template>
  <nav class="navbar">
    <a href="/AfterLoginAdminPage">
      <div class="logo-container">
        <div>
          <img src="../assets/most icon.png" alt="Logo" class="logo" />

          <div class="logo-text"  style="width:150px;padding-right:10px">MOST</div>
        </div>
      </div>
    </a>

    <div class="navbar-center">
      <ul>
        <li>
          <a href="/PagePrincipale">
            Accueil
            <div class="nav-line"></div>
          </a>
        </li>
        <!-- Spécifique pour l'utilisateur Admin produit -->

        <li>
          <a
            v-if="this.UserRole == 'admin_produit'"
            href="/PageListeInventairesArchives"
          >
            Inventaires Archivés
            <div class="nav-line"></div>
          </a>
        </li>

        <li>
          <a
            v-if="this.UserRole == 'admin_produit'"
            href="/PageListeInventairesPasVerifies"
          >
            Inventaires Importés
            <div class="nav-line"></div>
          </a>
        </li>

        <li v-if="this.UserRole == 'admin_produit'">
          <a href="/PageCreationNvArticles">
            Nvx Produits
            <div class="nav-line"></div>
          </a>
        </li>
        <!-- Spécifique pour l'utilisateur Admin produit -->

        <!-- Spécifique pour l'utilisateur Admin immo -->

        <li v-if="this.UserRole == 'admin_immo'">
          <a href="/PageListeInventairesImmobiliersArchives">
            Inventaires Immobiliers Archivés
            <div class="nav-line"></div>
          </a>
        </li>

        <li>
          <a
            v-if="this.UserRole == 'admin_immo'"
            href="/PageListeInventairesImmobiliersPasVerifies"
          >
            Inventaires Immobiliers Importés
            <div class="nav-line"></div>
          </a>
        </li>

        <li v-if="this.UserRole == 'admin_immo'">
          <a href="/PageCreationNvArticlesImmobiliers">
            Nvx Articles Immobiliers
            <div class="nav-line"></div>
          </a>
        </li>

        <!-- Spécifique pour l'utilisateur Admin immo -->

        <li>
          <a href="/PageListeUsers">
            Utilisateurs
            <div class="nav-line"></div>
          </a>
        </li>
      </ul>
    </div>
    <div class="navbar-right">
      <button class="logout-button" @click="logout">
        <div class="logoutWord">Logout</div>
        <img src="../assets/exit.png" alt="Logout Icon" class="logout-icon" />
      </button>
    </div>
  </nav>
</template>


<script>
import router from "@/router";
let sessionTimer; 

export default {
  data() {
    return {
      UserRole: "",
    };
  },
  mounted() {
    this.navbarElementsDynamic();
  },
  methods: {
    logout() {
            clearTimeout(sessionTimer);

          localStorage.removeItem('token');
          localStorage.clear(); 




    if (this.$route.path !== '/loginPage') {
      router.push('/loginPage');}





},
    navbarElementsDynamic() {
      const User_loggedin_info_String =
        localStorage.getItem("User_loggedin_info");
      const User_loggedin_info_Object = JSON.parse(User_loggedin_info_String);

      console.log("    navbar  console.log(User_loggedin_info_Object);");
      console.log(User_loggedin_info_Object.role);
      this.UserRole = localStorage.getItem("OptionAdmin");
    },
  },
};
</script>














<style scoped>
a{
  text-decoration: none;
}
.navbar {
    background-color: #011627;

  /* background-color: #2e3d52; */
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 35px;
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  font-size: 19px;
  color: white;
}
.logo-text:hover {
  font-size: 19.5px;
    color: #FF4E00;
    transition: 0.1s ;


}
.navbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.navbar-center ul {
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0;
}

.navbar-center li {
  margin: 0 5px;
}

.navbar-center a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  position: relative;
}

.navbar-center a:hover {
  color: #ff8d6a;
}

.nav-line {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #c55330;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.navbar-center a:hover .nav-line {
  transform: scaleX(1);
}

.navbar-right {
  margin-left: auto;
}

.logout-button {
  border: none;
  background-color: transparent;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
}

.logout-button:hover {
  animation: attention 1s infinite alternate;
}

.logout-icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  filter: invert(100%) brightness(100%);
}

.logoutWord {
  padding-right: 3px;
}

@keyframes attention {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>












