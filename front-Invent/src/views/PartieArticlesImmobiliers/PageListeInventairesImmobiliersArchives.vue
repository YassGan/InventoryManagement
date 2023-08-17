<template>
  <div style="height: 100vh; background: #f5f7fa">
    <AppNavbar></AppNavbar>

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
                <th style="padding-left: 100px">Ordre</th>
                <th style="padding-left: 100px">Nom Inventaire</th>
                <th>Date de création</th>
              </tr>
            </thead>
            <tbody>
              <tr
                @click="InventoryDetailPage(inventory.lienArticleInventaire)"
                class="inventory-item"
                v-for="(inventory, index) in filteredInventories"
                :key="inventory._id"
              >
                <td style="display: flex; justify-content: center">
                  {{ index+1 }}
                </td>
                <td style="padding-left: 100px">
                  {{ inventory.nomInventaire }}
                </td>
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
import { HTTP } from "/axios";
import router from "@/router";
import AppNavbar from "../../components/AppNavbar.vue";

export default {
  components: {
    AppNavbar,
  },

  data() {
    return {
      Inventories: [],
      isLoading: false,
      searchTerm: "",
    };
  },

  mounted() {
    this.fetchInventories();
    document.title = "Inventaires archivés";
  },

  methods: {
    InventoryDetailPage(id) {
      router.push("/PageClickedInventaireImmobilierDetails/" + id);
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
          `InventairesImmobiliersAPI/getAllInventaires_Immobiliers_archives/${User_loggedin_info_Object.idSociete}`,
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
