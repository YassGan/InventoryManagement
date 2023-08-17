<template>
  <div>
    <SuperAdminNavbar> </SuperAdminNavbar>

    <div class="PageContainer">
      <div class="buttonsTitleContainer">

        <h3 style="margin-bottom: 20px ;margin-top: 100px ">
          Liste des sociétés dans l'application Gestion d'inventaires
        </h3>

        <button
          style="margin-bottom: 30px"
          class="button blue "
          @click="ajouterSociete"
        >
          Ajouter Société
        </button>


        <!-- <button @click="afficherSocietes"> Afficher sociétés </button> -->

        <table id="myTable" class="data-table">
          <thead>
            <tr>
              <th>Ordre</th>
              <th>Nom Société</th>
              <th>Date Ajout</th>
              <th>Package</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(societe, index) in listeSocietes" :key="societe._id">
              <td>{{ index + 1 }}</td>
              <td>{{ societe.nomSociete }}</td>
              <td>{{ societe.dateInsertion_DB }}</td>
              <td>{{ societe.nomPackage }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import router from "@/router";
import SuperAdminNavbar from "@/components/SuperAdminNavbar.vue";
import {HTTP} from '/axios'
export default {
  data() {
    return {
      listeSocietes: [],
    };
  },
  components: {
    SuperAdminNavbar,
  },
    mounted() {
        document.title = 'Page de sociétés';
        this.fetchPackages();

  },
  methods: {
    logout() {
      router.push("/SuperAdminLoginPage");
    },
    ajouterSociete(){
      router.push("/PageAjout_Societe");

    },
    async fetchPackages() {
      try {

        const response = await HTTP.get('SocietesAPI/AllSocietes', {
         
        });

        this.listeSocietes = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    afficherSocietes(){
      console.table(this.listeSocietes)
    }
  },
};
</script>

<style scoped>
.navbar-right {
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 20px;
  padding-top: 20px;
}

.navbar-right:hover {
  padding-right: 30px;
  transition: 500ms;
}

.buttonsTitleContainer {
}
.PageContainer {
  display: flex;
  justify-content: center;
  background: #e0e6ed;
  height: 100vh;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
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

.green:hover {
  background-color: #306530;
}

.blue {
  background-color: #197484;
}

.blue:hover {
  background-color: #15535e;
}

.yellow {
  background-color: #c7bb35;
}

.yellow:hover {
  background-color: #8a8229;
}

.logout-button {
  border: none;
  background-color: transparent;
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
}

.logoutWord {
  padding-right: 3px;
}
</style>
