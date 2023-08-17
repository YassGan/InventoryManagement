<template>
  <div>
    <SuperAdminNavbar></SuperAdminNavbar>

    <div class="PageContainer">
      <div class="buttonsTitleContainer">
        <h3 style="margin-top: 70px; margin-bottom: 40px">
          Ajouter une nouvelle Société
        </h3>

        <div class="formContainer">
          <form @submit.prevent="addSociete" class="form-content">
            <div class="form-row">
              <div class="form-group">
                <label for="nomSociete">Nom de la société:</label>
                <input
                  type="text"
                  id="nomSociete"
                  v-model="nomSociete"
                  placeholder="Nom de la société"
                  class="form-control"
                  required
                />
              </div>

              <div class="form-group">
                <label for="emailSocieteAdmin">Email de l'admin:</label>
                <input
                  type="text"
                  id="emailSocieteAdmin"
                  v-model="emailSocieteAdmin"
                  placeholder="Email de l'admin de la société"
                  class="form-control"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="societeidPackage">Type du package:</label>
                <select
                  style="width: 85%"
                  id="societeidPackage"
                  v-model="societeidPackage"
                  class="form-control"
                  required
                >
                  <option value="">Sélectionnez le type de package</option>
                  <option
                    v-for="(PackageEnt, index) in tabPackage"
                    :key="index"
                    :value="PackageEnt._id"
                  >
                    {{ PackageEnt.nomPackage }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="passwordSocieteAdmin">Password de l'admin:</label>
                <input
                  type="password"
                  id="passwordSocieteAdmin"
                  v-model="passwordSocieteAdmin"
                  placeholder="Password de l'admin de la société"
                  class="form-control"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="nomSocieteAdmin">Nom de l'admin:</label>
                <input
                  type="text"
                  id="nomSocieteAdmin"
                  v-model="nomSocieteAdmin"
                  placeholder="Nom de l'admin de la société"
                  class="form-control"
                  required
                />
              </div>

              <div class="form-group">
                <label for="roleSocieteAdmin">Rôle de l'admin:</label>
                <select
                  style="width: 85%"
                  placeholder="Nom de l'admin de la société"
                  id="roleSocieteAdmin"
                  v-model="roleSocieteAdmin"
                  class="form-control"
                  required
                >
                  <option value="">Sélectionnez le rôle de l'admin</option>
                  <option value="admin_immo">Admin Immo</option>
                  <option value="admin_produit">Admin Produit</option>
                  <option value="admin_mixte">Admin Mixte</option>
                </select>
              </div>
            </div>
            <div style="color:red" v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

            <div class="form-group">
              <button type="submit" class="button blue">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import router from "@/router";
import SuperAdminNavbar from "@/components/SuperAdminNavbar.vue";
// import Swal from "sweetalert2";
import moment from "moment";
import { HTTP } from "/axios";
export default {
  components: {
    SuperAdminNavbar,
  },
  data() {
    return {
      momentObj: moment(),

      nomSociete: "",
      societeidPackage: "",
      societeNomPackage: "",
      roleSocieteAdmin: "",
      passwordSocieteAdmin: "",
      emailSocieteAdmin: "",
      nomSocieteAdmin: "",

      dateInsertion_DB: "",
      tabPackage: [],
            errorMessage: "", 

    };
  },
  computer: {
    formattedDate() {
      return this.formatDate(this.momentObj);
    },
  },
  mounted() {
    this.fetchPackages();
  },
  methods: {
    formatDate(moment) {
      const date = moment.format("DD/MM/YYYY");
      const time = moment.format("HH:mm");
      return `${date} - ${time}`;
    },
    logout() {
      router.push("/SuperAdminLoginPage");
    },

    async fetchPackages() {
      try {
        const response = await HTTP.get("PackageAPI/AllPackages");
        console.log(response);
        this.tabPackage = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    afficherPackages() {
      console.table(this.tabPackage);
    },

    async addSociete() {
      const momentObj = moment();
      const formattedDate = this.formatDate(momentObj);
      console.log(formattedDate);

      const packageFound = this.tabPackage.find(
        (tabPackage) => tabPackage._id === this.societeidPackage
      );
      const NomPackage = packageFound.nomPackage;

      const Societe = {
        nomSociete: this.nomSociete,
        idPackage: this.societeidPackage,
        nomPackage: NomPackage,
        dateInsertion: formattedDate,
      };

      const SocieteAdmin = {
        nomSocieteAdmin: this.nomSocieteAdmin,
        passwordSocieteAdmin: this.passwordSocieteAdmin,
        roleSocieteAdmin: this.roleSocieteAdmin,
        emailSocieteAdmin: this.emailSocieteAdmin,
        dateInsertion: formattedDate,
      };

      console.log("La nouvelle société est");
      console.log(Societe);

      console.log("Le nouveau admin est ");
      console.log(SocieteAdmin);

      try {
        const response = await HTTP.post(
          "Societe_et_AdminAPI/add_Societe_et_Admin",
          {
            nomSociete: Societe.nomSociete,
            idPackage: Societe.idPackage,
            nomPackage: Societe.nomPackage,
            nomAdminSociete: SocieteAdmin.nomSocieteAdmin,
            email: SocieteAdmin.emailSocieteAdmin,
            passwordSocieteAdmin: SocieteAdmin.passwordSocieteAdmin,
            role: SocieteAdmin.roleSocieteAdmin,
            dateInsertion_DB: SocieteAdmin.dateInsertion,
          }
        );

        console.log(response);

        // Swal.fire({
        //   icon: "success",
        //   title: "Success",
        //   text: "Société créée avec succès",
        // });

        console.log("New Societe added ");
        console.log(Societe);

        // Reset the input values
        this.nomSociete = "";
        this.societeidPackage = "";
        this.societeNomPackage = "";
        this.roleSocieteAdmin = "";
        this.passwordSocieteAdmin = "";
        this.emailSocieteAdmin = "";
        this.nomSocieteAdmin = "";
        this.errorMessage="";
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.error;

        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    },
  },
};
</script>











<style scoped>
.input-container {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group {
  margin-bottom: 20px;
}

.form-container {
  margin: 0 auto;
  padding: 20px;
  border-radius: 4px;
}

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
  width: 100%;
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
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-content {
  width: 60%;
  padding: 20px;
  padding-top: 50px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  margin-right: 10px;
}

.form-control {
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

.yellow {
  background-color: #c7bb35;
}

.yellow:hover {
  background-color: #8a8229;
}
.formContainer {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
