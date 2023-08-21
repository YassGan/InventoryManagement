<template>
  <div style="height:100vh;background:#f5f7fa;">




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






     <div style="margin-top:60px">
      <h3>Liste de vos inventaires Nouvelle page</h3> 
    </div>

    <div class="PageTitle">

      <div class="InventoryTableWrapper">
        <div v-if="isLoading" class="LoadingSpinner" style="height:120vh">
          <div class="Spinner"></div>
          <div class="LoadingText">Chargement en cours...</div>
        </div>
        <div v-else-if="Inventories" class="InventoryTableContainer">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Entrer le nom de l'inventaire"
            class="InputSearch"
          />
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom Inventaire</th>
                <th>Date de création</th>
              </tr>
            </thead>
            <tbody>
              <tr
                @click="InventoryDetailPage(inventory._id)"
                class="inventory-item"
                v-for="inventory in filteredInventories"
                :key="inventory._id"
              >
                <td>{{ inventory._id }}</td>
                <td>{{ inventory.NomInventaire }}</td>
                <td>{{ inventory.DateInsertion_DB }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '/axios';
import router from '@/router';
import AppNavbar from '../components/AppNavbar.vue';
import MobileSidebar from "../components/SideBarMobile.vue";

export default {
  
  components: {
    AppNavbar,
            MobileSidebar,

  },
 
  data() {
    return {
            mobileBreakpoint: 768,
      windowWidth: window.innerWidth,
      isSidebarOpen: false,
      Inventories: [],
      isLoading: false,
      searchTerm: '',
    };
  },    created() {
    this.handleResize(); 
  },

  mounted() {
    this.fetchInventories();
        document.title = 'Page d\'archives';
                    window.addEventListener('resize', this.handleResize);
    this.handleResize(); 

  },
  

  methods: {    handleResize() {
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

    InventoryDetailPage(id) {
      router.push('/PageClickedInventaireDetails/' + id);
    },

    async fetchInventories() {
      try {
        this.isLoading = true;
        const response = await HTTP.get(`InventairesAPI/getInventaires/${localStorage.getItem('email')}`, {

          headers: {
            Email: localStorage.getItem('email'),
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        this.Inventories = response.data;
        this.isLoading = false;
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
  },

  computed: {
      sidebarState() {
    return this.isSidebarOpen ? 'open' : 'closed';
  },
    filteredInventories() {
      return this.Inventories.filter((inventory) => {
        return inventory.NomInventaire.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>



@media (max-width: 768px) {
  /* Adjustments for smaller screens */
  h3{
  font-size: 16px;
}

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

.InputSearch {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 30px;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  width: 200px !important;
}


table.data-table {
  border-collapse: collapse;
  border: 1px solid #2e3d52;
  border-radius: 5px;
}
.InventoryTableContainer {
width: 90% !important;
}




h1 {
  margin-top: 70px;
  color: #2c3e50;
  text-align: center;
}

.PageTitle {
  padding-top: 50px;
  margin-top: -50px;
}

table.data-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #2e3d52;
  border-radius: 5px;
}

.data-table th,
.data-table td {
  padding: 10px;
  border-bottom: 1px solid #e56e42;
}

.data-table th {
  background-color: #2e3d52;
  color: #fff;
}

.inventory-item:hover {
  background-color: #ffe5d9;
  cursor: pointer;
}

.InventoryTableContainer {
  width: 65%;
  margin-top: 10px;
  margin-bottom: 50px;
}

.InventoryTableWrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.InputSearch {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 30px;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  width: 300px;
}

.InputSearch:hover,
.InputSearch:focus {
  border-color: #e56e42;
}

.LoadingSpinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  margin-top: -300px;
}

.Spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #e56e42;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.LoadingText {
  margin-top: 10px;
  font-size: 16px;
  color: gray;
}
</style>
