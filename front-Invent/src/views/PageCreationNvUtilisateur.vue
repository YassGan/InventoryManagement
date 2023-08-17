<template>
  <div>
    <AppNavbar></AppNavbar>

    <div class="PageContainer">
      <h2 class="PageTitle">Page de création de nouveaux utilisateurs</h2>
      <p>Agents de comptage : {{ this.usersSocieteNumber }}</p>
      <p>
        il en vous reste :
        {{ this.maxAgentdeComptage - this.usersSocieteNumber }}
      </p>

      <p style="margin-top: 50px; margin-bottom: -40px">
        Introduire les données du nouveau utilisateur
      </p>
      <div class="FormWrapper">
        <div class="FormContainer">
          <h2 class="FormTitle"></h2>
          <form @submit.prevent="registerUser" class="Form" style="padding-top:20px">
              <div class="FormRow">
              <label class="LabelContainer" for="nomPrenom"
                >Nom et Prénom:</label
              >
              <input style="width:287px;height:29px;border:1px solid lightgray" type="text" id="nomPrenom" v-model="nomPrenom" required />
            </div>

            <div class="FormRow">
              <label class="LabelContainer" for="email">Email:</label>
              <input type="email" id="email" v-model="email" required />
            </div>
            <div class="FormRow">
              <label class="LabelContainer" for="password">Password:</label>
              <input
                type="password"
                id="password"
                v-model="password"
                required
              />
            </div>
          


            <div class="FormRow">
              <label class="LabelContainer" for="confirmPassword"
                >Confirm Password:</label
              >
              <input
                type="password"
                id="confirmPassword"
                v-model="confirmPassword"
                required
              />
            </div>
            

            <div class="ButtonContainer">
              <button class="CustomButton" type="submit">Ajouter</button>
            </div>
            <div v-if="errorMessage" class="ErrorMessage">
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import { HTTP } from "/axios";
import Swal from "sweetalert2";
import AppNavbar from "../components/AppNavbar.vue";

export default {
  components: {
    AppNavbar,
  },
  data() {
    return {
      momentObj: moment(), // Create a moment object with the desired date
      nomPrenom: "",

      password: "",
      email: "",
      confirmPassword: "",
      errorMessage: "",
      User_loggedin_info_Object: Object,
      usersSocieteNumber: 0,
      maxAgentdeComptage: 0,
    };
  },
  computed: {
    formattedDate() {
      return this.formatDate(this.momentObj);
    },
  },
  mounted() {
    this.gettingAlltheUsersOfTheCompany();
    console.log(this.usersSocieteNumber);
  },
  methods: {
extractStringAfterAdminPrefix(fullString) {
      const adminPrefix = 'admin-';
      const prefixIndex = fullString.indexOf(adminPrefix);


      return fullString.substring(prefixIndex + adminPrefix.length+1);
    }
    ,
    reloadPage() {
      window.location.reload();
      console.log("reloading");
    },

    formatDate(moment) {
      const date = moment.format("DD/MM/YYYY");
      const time = moment.format("HH:mm");
      return `${date} - ${time}`;
    },

    async gettingAlltheUsersOfTheCompany() {
      const User_loggedin_info_String =
        localStorage.getItem("User_loggedin_info");
      this.User_loggedin_info_Object = JSON.parse(User_loggedin_info_String);
      console.log("      console.log(User_loggedin_info_Object);");
      console.log(this.User_loggedin_info_Object.idSociete);

      const User_loggedin_societe_package_info = localStorage.getItem(
        "User_loggedin_societe_package_info"
      );
      this.User_loggedin_societe_package_info = JSON.parse(
        User_loggedin_societe_package_info
      );
      console.log("      console.log(User_loggedin_societe_package_info);");
      console.log(this.User_loggedin_societe_package_info.maxUsers);

      const response = await HTTP.get(
        `/UtilisateursAPI/getUsersBySocieteId/${this.User_loggedin_info_Object.idSociete}`
      );
      let societeAllUsers = response.data;
      console.log("nombre utilisateurs dans le même societe");
      console.log(societeAllUsers.length);
      this.usersSocieteNumber = societeAllUsers.length;

      this.maxAgentdeComptage =
        this.User_loggedin_societe_package_info.maxUsers;
    },

    async registerUser() {
      const momentObj = moment();
      const formattedDate = this.formatDate(momentObj);
      console.log(formattedDate);
      try {
        if (this.password !== this.confirmPassword) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The two passwords do not match",
          });
          return;
        }

        if (this.usersSocieteNumber == this.maxAgentdeComptage) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Vous avez dépassé le nombre maximal d'agents de comptage",
          });
          return;
        }

        const response = await HTTP.post("/UtilisateursAPI/addUser", {
          role: this.extractStringAfterAdminPrefix(this.User_loggedin_info_Object.role),
          nom: this.nomPrenom,
          password: this.password,
          email: this.email,
          societeId: this.User_loggedin_info_Object.idSociete,
          dateInsertionId: this.formattedDate,
        });

        console.log(this.password + "/" + this.email);
        console.log(response.data);


        this.nomPrenom = "";

        this.password = "";
        this.email = "";
        this.confirmPassword = "";

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Utilisateur créé avec succès",
        });
        this.reloadPage();
      } catch (error) {
        console.error(error.response.data);
        this.errorMessage = "Server Error: " + error.response.data.error;
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: this.errorMessage,
        });
      }
    },
  },
};
</script>



<style scoped>
.ErrorMessage {
  color: red;
}
.LabelContainer {
  width: 200px;
}

.ButtonContainer {
  display: flex;
  justify-content: center;
}

.PageContainer {
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.PageTitle {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  padding-top: 70px;
}

.FormWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0px;
}

.FormContainer {
  padding: 20px;
  border-radius: 4px;
  width: 500px;
}

.FormTitle {
  font-size: 20px;
  margin-bottom: 15px;
  padding-bottom: 20px;
  color: #333;
}

.Form {
  display: flex;
  flex-direction: column;
}

.FormRow {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}

label {
  font-weight: bold;
  margin-right: 10px;
  width: 100px;
}

input[type="password"],
input[type="email"] {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.CustomButton {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  width: 170px;
}

.CustomButton:hover {
  background-color: #45a049;
}
</style>
