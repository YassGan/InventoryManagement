<template>
  <div style="height: 100vh; background: #f5f7fa">









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














    <div style="margin-top: 60px">
      <h3>Liste de vos inventaires archivés</h3>
    </div>

    <div class="PageTitle">
      <div class="InventoryTableWrapper">
        <div v-if="isLoading" class="LoadingSpinner" style="height: 120vh">
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
                <th>Ordre</th>
                <th>Nom Inventaire</th>
                <th>Date de création</th>
              </tr>
            </thead>
            <tbody>
              <tr
                @click="InventoryDetailPage(inventory.lienArticleInventaire)"
                class="inventory-item"
                v-for="(inventory,index) in paginatedInventories"
                :key="inventory._id"
              >
                <td>{{ index+1 }}</td>
                <td>{{ inventory.nomInventaire }}</td>
                <td>{{ inventory.DateInsertion_DB }}</td>
              </tr>
            </tbody>
          </table>





        <div style="margin-top:30px">
          <div class="pagination-buttons">
            <button
              :disabled="currentPage === 1"
              @click="prevPage"
              class="pagination-button"
            >
              Previous
            </button>
            <span class="pagination-page-info">{{ currentPage }} / {{ pageCount }}</span>
            <button
              :disabled="currentPage === pageCount"
              @click="nextPage"
              class="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
    





        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "/axios";
import router from "@/router";
import AppNavbar from "../components/AppNavbar.vue";
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
            pageSize: 4,
      currentPage: 1,
    };
  },
   created() {
    this.handleResize(); 
  },
  mounted() {
    this.fetchInventories();
    document.title = "Inventaires archivés";
                        window.addEventListener('resize', this.handleResize);
    this.handleResize(); 
  },

  methods: {
      prevPage() {
    if (this.currentPage > 1) {
      this.pageChanged(this.currentPage - 1);
    }
  },

  nextPage() {
    if (this.currentPage < this.pageCount) {
      this.pageChanged(this.currentPage + 1);
    }
  },
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

        pageChanged(newPage) {
      this.currentPage = newPage;
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
      router.push("/PageClickedInventaireDetails/" + id);
    },

    async fetchInventories() {
      //getting user logged in info data from the localStorage
      const User_loggedin_info_String =
        localStorage.getItem("User_loggedin_info");
      const User_loggedin_info_Object = JSON.parse(User_loggedin_info_String);
      console.log(User_loggedin_info_Object);

      try {
        this.isLoading = true;
        const response = await HTTP.get(
          `Inventaires_non_verifiesAPI/getAllInventaires_archives/${User_loggedin_info_Object.idSociete}`,
          {}
        );

        this.Inventories = response.data;

        console.log("The array of archived inventories");
        console.table(JSON.parse(JSON.stringify(this.Inventories)));

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
    paginatedInventories() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredInventories.slice(startIndex, endIndex);
    },
    pageCount() {
      return Math.ceil(this.filteredInventories.length / this.pageSize);
    },
    filteredInventories() {
      
      if (!this.searchTerm) {
        return this.Inventories;
      } else {
        const searchTermLower = this.searchTerm.toLowerCase();
        return this.Inventories.filter((inventory) => {
          return inventory.nomInventaire
            .toLowerCase()
            .includes(searchTermLower);
        });
      }
    },
  },
};
</script>

<style scoped>


.pagination-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.pagination-button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  background: #fff;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.pagination-button:hover {
  background-color: #e56e42;
  color: #fff;
}

.pagination-page-info {
  margin: 0 10px;
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
  background-color: black;
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
@media (max-width: 768px) {

.InventoryTableContainer{
  width: 90%  !important;
}


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



h1 {
  margin-top: 70px;
  color: #2c3e50;
  text-align: center;
}

.PageTitle {
  padding-top: 20px;
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
