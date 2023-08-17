<template>
  <div>
    <AppNavbar></AppNavbar>

    <div class="PageContainer">
      <h2 class="PageTitle">Page de mise à jour d'utilisateur</h2>

      <p style="margin-top: 50px; margin-bottom: -40px">
        Modifier les données de l'utilisateur
      </p>
      <div class="FormWrapper">
        <div class="FormContainer">
          <h2 class="FormTitle"></h2>
          <form @submit.prevent="updateUser" class="Form">
            <div class="FormRow">
              <label class="LabelContainer" for="nomPrenom"
                >Nom et Prénom:</label
              >
              <input
                class="InputField"
                type="text"
                id="nomPrenom"
                v-model="nom"
                required
              />
            </div>

            <div class="FormRow">
              <label class="LabelContainer" for="password">Password:</label>
              <input
                class="InputField"
                type="password"
                id="password"
                v-model="password"
                required
              />
            </div>
            <div class="FormRow">
              <label class="LabelContainer" for="confirmpassword"
                >Confirm Password:</label
              >
              <input
                class="InputField"
                type="password"
                id="confirmpassword"
                v-model="confirmPassword"
                required
              />
            </div>
            <div style="margin-top:20px;margin-bottom:40px">
            <label
              style="color: red"
              v-if="this.TestConfirmitéPassword === 0"
              class="LabelContainer"
              for="confirmpassword"
              >Vérifier la confirmation de votre mot de passe</label
            >

            </div>


            <div class="ButtonContainer">
              <button class="CustomButton" type="submit">Mettre à jour</button>
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
import { HTTP } from "/axios";
import Swal from "sweetalert2";
import AppNavbar from "../components/AppNavbar.vue";
import router from "@/router"

export default {
  components: {
    AppNavbar,
  },
  data() {
    return {
      TestConfirmitéPassword: 1,
      nom: "",
      email: "",
      confirmPassword: "",
      password: "",
      errorMessage: "",
      User_loggedin_info_Object: Object,
      usersSocieteNumber: 0,
      maxAgentdeComptage: 0,
    };
  },
  mounted() {
    this.getUserByEmail();
  },
  methods: {
        togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async getUserByEmail() {
      const UserEmail = this.$route.params.email;

      try {
        const response = await HTTP.get(
          `/UtilisateursAPI/getUser/${UserEmail}`
        );

        console.log(response.data);

        this.email = response.data.email;
        this.nom = response.data.nom;
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

    reloadPage() {
      window.location.reload();
      console.log("reloading");
    },

    async updateUser() {
      if (this.password != this.confirmPassword) {
        this.TestConfirmitéPassword = 0;
      }else{
                this.TestConfirmitéPassword = 1;

      }

      if (this.TestConfirmitéPassword == 1) {
        try {
          const response = await HTTP.put(
            `/UtilisateursAPI/updateUser/${this.email}`,
            {
              nom: this.nom,
              password: this.password,
            }
          );

          console.log(response.data);

          this.nomPrenom = "";
          this.email = "";

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Utilisateur mis à jour avec succès",
          });
          router.push("/PageListeUsers")
        } catch (error) {
          console.error(error.response.data);
          this.errorMessage = "Server Error: " + error.response.data.error;
          Swal.fire({
            icon: "error",
            title: "Server Error",
            text: this.errorMessage,
          });
        }
      }
    },
  },
};
</script>

<style scoped>
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
  margin-bottom: 20px;
}

.LabelContainer {
  width: 200px;
}

.InputField {
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

.ErrorMessage {
  color: red;
}
.PasswordInputContainer {
  position: relative;
}

.PasswordToggleIcon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
  color: #666;
}
</style>
