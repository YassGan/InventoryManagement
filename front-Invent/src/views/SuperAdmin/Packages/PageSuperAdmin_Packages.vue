<template>
  <div class="pageHoleContainer">
    <div class="sideBarContainer">
      <SuperAdminSidebar></SuperAdminSidebar>
    </div>

    <div class="contentContainer">
      <div class="buttonsTitleContainer">
        <h3 style="margin-bottom: 20px;">
          Liste des packages dans l'application Gestion d'inventaires
        </h3>

        <button
          style="margin-bottom: 30px"
          class="button green"
          @click="ajouterPackage"
        >
          Ajouter Package
        </button>

        <table id="myTable" class="data-table">
          <thead>
            <tr>
              <th>Ordre</th>
              <th>Nom Package</th>
              <th>Prix Package</th>
              <th>Max Articles</th>
              <th>Max Inventaires</th>
              <th>Max Users</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(packageApplication, index) in packagesApplication"
              :key="packageApplication._id"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ packageApplication.nomPackage }}</td>
              <td>{{ packageApplication.prixPackage }} dt</td>
              <td>{{ packageApplication.maxArticles }}</td>
              <td>{{ packageApplication.maxInventaires }}</td>
              <td>{{ packageApplication.maxInventaires }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import SuperAdminSidebar from "@/components/SuperAdminSidebar.vue";
import { HTTP } from "/axios";

export default {
  data() {
    return {
      packagesApplication: [],
      isLoading: true,
    };
  },
  components: {
    SuperAdminSidebar,
  },

  mounted() {
    document.title = "Page de packages";
    this.fetchPackages();
  },
  methods: {
    logout() {
      router.push("/SuperAdminLoginPage");
    },

    ajouterPackage() {
      router.push("/PageAjout_Package");
    },

    async fetchPackages() {
      try {
        this.isLoading = true;
        const response = await HTTP.get("PackageAPI/AllPackages", {});
        this.packagesApplication = response.data;
        this.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    afficherPackages() {
      console.table(this.packagesApplication);
    },
  },
};
</script>

<style scoped>
.pageHoleContainer {
  display: flex;
  height: 100vh;
}

.sideBarContainer {
  width: 250px;
  background-color: #f0f0f0;
}

.contentContainer {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e0e6ed;
}

.buttonsTitleContainer {
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button.green {
  background-color: #4bc04b;
}

.button.green:hover {
  background-color: #306530;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.data-table th,
.data-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}
.button {
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

.green {
  background-color: #4bc04b;
}

</style>

