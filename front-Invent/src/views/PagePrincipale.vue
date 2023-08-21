<template>
<div>


    <button v-if="this.showHamburger" class="hamburger-button" @click="toggleSidebar">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="navbarContainer" v-if="windowWidth >= mobileBreakpoint">
      <!-- Your existing navigation bar code here -->
      <AppNavbar> </AppNavbar>

    </div>


    <div   class="mobile-sidebar"
  :class="{open: isOpen, closed: !isOpen}" v-else>
      <!-- Hamburger button -->

      <!-- Mobile sidebar -->
      <MobileSidebar v-show="isSidebarOpen" />
    </div>


  <div class="accueil">
    <h1>Bienvenue sur votre site web</h1>
          <!-- <button @click="alertingLoggedInUserInfos"> Click me to dispaly user logged in info  </button> -->

    <div class="fonctionnalites">
      <div class="fonctionnalite">
        <h2>Visualisation de fichiers CSV</h2>
        <p>Consultez le contenu d'un fichier CSV contenant principalement des données de produits et des informations connexes.</p>
      </div>
      <div class="fonctionnalite">
        <h2>Tâche de comptabilité</h2>
        <p>Importez un fichier CSV et effectuez une vérification comptable. Mettez en évidence les divergences et assurez une comptabilité précise.</p>
      </div>
      <div class="fonctionnalite">
        <h2>Correction de données</h2>
        <p>Corrigez les lignes incorrectes après la vérification comptable pour garantir l'exactitude et la cohérence des données.</p>
      </div>
      <div class="fonctionnalite">
        <h2>Création d'inventaire</h2>
        <p>Créez un nouvel élément d'inventaire et ajoutez-le à la base de données pour le suivi et la gestion.</p>
      </div>
      <div class="fonctionnalite">
        <h2>Inventaires précédents</h2>
        <p>Consultez vos inventaires précédents pour avoir un historique des données d'inventaire.</p>
      </div>
      <div class="fonctionnalite">
        <h2>Exportation des détails de l'inventaire</h2>
        <p>Cliquez sur un inventaire spécifique pour voir ses détails et les télécharger au format PDF ou CSV.</p>
      </div>
     
      <div class="fonctionnalite">
        <h2>Télécharger le modèle CSV</h2>
        <p>Il est obligatoire d'utiliser ce modèle .CSV pour le travail de comptage. Vous allez être redirigé vers un drive où vous devez télécharger le modèle du fichier</p>
         <div>
          <a href="https://drive.google.com/file/d/18P-g8toe03ms_mZKSr9luRP6188p8E0y/view?usp=sharing">
    <button >Télécharger CSV</button>
          </a>
  </div>
      </div>


    </div>
  </div>
</div>
</template>

<style scoped>

.hamburger-button {
  position: relative;
  z-index: 100;
    display: block;
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.mobile-sidebar.open {
  transform: translateX(0);  
}

.mobile-sidebar.closed {
  transform: translateX(-100%);
}
.mobile-sidebar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  z-index: 99;
  background-color: #d1d1d1;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  transition: transform 0.3s ease; 
}
.hamburger-button span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 4px auto;
}
.navbarContainer{
  margin: 0;
  padding: 0;
}


.accueil {
  text-align: center;
  padding: 40px;
}

.fonctionnalites {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-top: 40px;
}

.fonctionnalite {
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

p {
  font-size: 14px;
  color: #555;
}


@media (max-width: 768px) {


.accueil {
    padding: 20px;
  }

  .fonctionnalites {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  h1 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  h2 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  p {
    font-size: 12px;
  }

  .fonctionnalite {
    padding: 15px;
  }

  /* Make buttons more touch-friendly */
  .fonctionnalite button {
    padding: 5px 10px;
    font-size: 12px;
  }
}



</style>


<script>
import AppNavbar from '../components/AppNavbar.vue';
import MobileSidebar from "../components/SideBarMobile.vue";


export default ({
   components: {
    AppNavbar,
        MobileSidebar,

  },
  data() {
    return {
      mobileBreakpoint: 768,
      windowWidth: window.innerWidth,
      isSidebarOpen: false,
    };
  },
    mounted() {
        document.title = 'Home';
            window.addEventListener('resize', this.handleResize);
    this.handleResize(); 

  },
    created() {
    this.handleResize(); 
  },
computed: {
  
  sidebarState() {
    return this.isSidebarOpen ? 'open' : 'closed';
  }

  },

  methods:{

    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= this.mobileBreakpoint) {
        this.isSidebarOpen = false; 
        this.showHamburger=false;
      }
      else{
                this.showHamburger=true;

      }
    },
toggleSidebar() {
        this.isOpen = !this.isOpen;

  if (this.isSidebarOpen) {
    this.isSidebarOpen = false;

  } else {
    this.isSidebarOpen = true; 
  }

},
  watch: {
    windowWidth(newValue) {
      if (newValue >= this.mobileBreakpoint) {
        this.isSidebarOpen = false;
      }
    },
  },


    alertingLoggedInUserInfos(){
        console.log("Logged in user infos are : email: "+localStorage.getItem('email')+' and the socId is '+localStorage.getItem("socId"))
        
    },
    downloadCSV() {
      const filePath = require('@/assets/data.csv');
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath.default;
      downloadLink.download = 'data.csv';
      downloadLink.click();
    },
    convertToCSV(data) {
      const header = Object.keys(data[0]).join(';');
      const rows = data.map(row => Object.values(row).join(';'));
      return header + '\n' + rows.join('\n');
    },
  }
})
</script>
