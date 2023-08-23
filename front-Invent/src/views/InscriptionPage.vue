<template>
  <div>
    <div class="PageContainer">
      <div v-if="showpacks" class="packs-container">
        <div
          class="pack-container"
          v-for="(pack, index) in packs"
          :key="index"
          @click="showForm(index)"
        >
          <h2>{{ pack.nomPackage }}</h2>
          <p>{{ pack.description }}</p>
          <p>Prix: {{ pack.prixPackage }}/month</p>
          <p>Max Users: {{ pack.maxUsers }}</p>
          <p>Max Articles: {{ pack.maxArticles }}</p>
          <p>Max Inventaires: {{ pack.maxInventaires }}</p>
        </div>
      </div>

      
      <div v-else>
        <div class="PackInfo">
          <h2 style="font-size:29px;margin-bottom:-10px" >{{ selectedpack.nomPackage }}</h2>
          <p>Vous avez choisi le pack {{ selectedpack.nomPackage }}.</p>
        </div>

        <form
          @submit.prevent="submitFormAdd"
          class="form-content"
        >
          <div
       class="formWrapper"
          >
            <div>
              <div class="form-group">
                <label class="labelStyle" for="nomSociete">Nom de la société:</label>
                <input
                  type="text"
                  id="nomSociete"
                  v-model="nomSociete"
                  placeholder="Nom de la société"
                  class="form-control"
                  required
                />
              </div>

              <div  class="form-group">
                <label  class="labelStyle" for="nomAdmin">Nom de l'admin:</label>
                <input
                  type="text"
                  id="nomAdmin"
                  v-model="nomAdmin"
                  placeholder="Nom de l'admin"
                  class="form-control"
                  required
                />
              </div>

              <div class="form-group">
                <label class="labelStyle" style="" for="emailAdmin">Email de l'admin:</label>
                <input
                  type="email"
                  id="emailAdmin"
                  v-model="emailAdmin"
                  placeholder="Email de l'admin"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <div>
              <div class="form-group">
                <label class="labelStyle" for="passwordAdmin">Mot de passe de l'admin:</label>
                <input
                  type="password"
                  id="passwordAdmin"
                  v-model="passwordAdmin"
                  placeholder="Mot de passe de l'admin"
                  class="form-control"
                  required
                />
 <div :class="['password-complexity', passwordComplexity]">      {{ passwordComplexity }}
    </div>
              </div>
              <div  class="form-group" style="margin-top:50px">
                <label class="labelStyle" >Rôle de l'admin:</label>
                <div class="radioContainer">
                  <div class="radio-option">
                    <label>
                      <input
                        type="radio"
                        value="admin_immo"
                        v-model="roleAdmin"
                        required
                      />
                      Admin articles immobiliers
                    </label>
                  </div>
                  <div class="radio-option">
                    <label >
                      <input
                        type="radio"
                        value="admin_produit"
                        v-model="roleAdmin"
                        required
                      />
                      Admin articles ordinaires
                    </label>
                  </div>
                  <div class="radio-option">
                    <label>
  <input
  type="radio"
  value="admin_mixte"
  v-model="roleAdmin"
  required
  class="custom-radio"
/>
                      Admin articles mixtes
                    </label>
                  </div>
                </div>
              </div>
            </div>

          </div>
                      <div style="margin-bottom:50px" v-if="errorMessage" class="error-message">{{ errorMessage }}</div>


          <div class="form-group">
            <button type="submit" class="button blue">Submit</button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import { HTTP } from "/axios";
import moment from "moment";
import Swal from "sweetalert2";
import router from "@/router";

export default {
  data() {
    return {
      momentObj: moment(), // Create a moment object with the desired date

      nomSociete: "",
      nomAdmin: "",
      emailAdmin: "",
      passwordAdmin: "",
      roleAdmin: "",
      showpacks: true,
      selectedpack: null,
      packs: [],
            errorMessage: "", 

    };
  },



computed: {
    passwordComplexity() {
      const password = this.passwordAdmin;
      let complexity = 0;

      if (password.length >= 8) {
        complexity++;
      }

      if (/[A-Z]/.test(password)) {
        complexity++;
      }

      if (/[a-z]/.test(password)) {
        complexity++;
      }

      if (/[0-9]/.test(password)) {
        complexity++;
      }

      if (/[^A-Za-z0-9]/.test(password)) {
        complexity++;
      }

      switch (complexity) {
        case 1:
          return 'faible';
        case 2:
          return 'Modéré';
        case 3:
          return 'Bon';
        case 4:
          return 'Fort';
        case 5:
          return 'Très_Fort';
        default:
          return '';
      }
    },
  },








  computer: {
    formattedDate() {
      return this.formatDate(this.momentObj);
    },
  },
  mounted() {
    this.APIs();
  },
  methods: {
    extractStringAfterAdminPrefix(fullString) {
      const adminPrefix = "admin-";
      const prefixIndex = fullString.indexOf(adminPrefix);

      return fullString.substring(prefixIndex + adminPrefix.length + 1);
    },
    formatDate(moment) {
      const date = moment.format("DD/MM/YYYY");
      const time = moment.format("HH:mm");
      return `${date} - ${time}`;
    },
    async submitFormAdd() {
      const momentObj = moment();
      const formattedDate = this.formatDate(momentObj);
      console.log(formattedDate);
      try {
        const response = await HTTP.post(
          "Societe_et_AdminAPI/add_Societe_et_Admin",
          {
            nomSociete: this.nomSociete,
            idPackage: this.selectedpack._id,
            nomPackage: this.selectedpack.nomPackage,
            nomAdminSociete: this.nomAdmin,
            email: this.emailAdmin,
            passwordSocieteAdmin: this.passwordAdmin,
            role: this.extractStringAfterAdminPrefix(this.roleAdmin),

            dateInsertion_DB: formattedDate,
          }
        );

        console.log(response);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Votre demande d'inscriptin a été effectuée avec succès, merci de valider votre email",
        });

        this.nomSociete = "";
        this.nomAdmin = "";
        this.emailAdmin = "";
        this.passwordAdmin = "";
        this.roleAdmin = "";

        console.log("New Societe added ");
        console.log();

        router.push("/loginPage");
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

    showForm(index) {
      this.showpacks = false;
      this.selectedpack = this.packs[index];
    },
    submitForm() {
      console.log("Form submitted");
      console.log("Nom de la société:", this.nomSociete);
      console.log("Nom de l'admin:", this.nomAdmin);
      console.log("Email de l'admin:", this.emailAdmin);
      console.log("Mot de passe de l'admin:", this.passwordAdmin);
      console.log("Type de package:", this.typePackage);
      console.log("Rôle de l'admin:", this.roleAdmin);
    },
    async APIs() {
      const PacksResponse = await HTTP.get("PackageAPI/AllPackages");
      this.packs = PacksResponse.data;
      console.log(PacksResponse);
    },
  },
};
</script>







<style scoped>

:root {
  --blue: #1d8645;
  --white: #ffffff;
}

.password-complexity {
  margin-top: 5px;
  font-size: 16px;
}

.Fort{
  color:#ab9719
}


.faible{
color:#FF4136
}

.Modéré{
  color:#FF851B
}

.Bon{
  color:#2ECC40;
}

.Très_Fort{
  color:#0074D9;
}


 
  









.labelStyle{
  display:flex;justify-content:start;
  padding-left:10px
}

@media screen and (max-width: 768px) {
   .form-content {
    padding: 20px;
    width: 300px;
    padding-right: 40px;
    margin-bottom: 600px;
  }

  .form-content > div {
    flex-direction: column;
    align-items: center;
  }

  .form-group {
    width: 400px !important;
    max-width: 400px;
    margin-bottom: 20px;
  }

  .form-control {
    width: 80%  !important;
    height: 40px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    outline: none;
  }

  .radioContainer {
    text-align: center;
  }

  .error-message {
    font-size: 12px;
    text-align: center;
    color: #f44336;
    margin-top: 10px;
  }

  .button {
    width: 100%;
  }
 .PackInfo{
  margin-top: 50px !important;
    margin-bottom: 50px !important;

 }


 .PageContainer{
    background-color: #f5f7fa;
    height: auto !important;
    width: auto !important


  }
  .packs-container {
    flex-direction: column;
    align-items: center;
        

  }



  .form-content {
    padding: 20px;
  }



}





.formWrapper{
 
              display: flex;
              justify-content: space-around;
              padding: 50px;
              width: 800px;
            
}

.error-message {
  color: #f44336;
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}
.packs-container {
  display: flex;
  justify-content: space-between;
}

.pack-container {
  flex: 1;
  background-color: #f5f7fa92;
  padding: 20px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pack-container:hover {
  background-color: #011627;
  color: #fff;
}

.form {
  width: 100%;
  display: flex;
}

.form p {
  margin-bottom: 20px;
  text-align: center;
}

.btn {
  width: 100%;
  height: 40px;
  background-color: #e74311;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #ff8d6a;
}

.InscriptionLink {
  margin-top: 10px;
  text-align: center;
}

.InscriptionLink a {
  color: #e74311;
  text-decoration: none;
}

.InscriptionLink a:hover {
  text-decoration: underline;
}

.packs-container[data-v-6609e3bd] {
  display: flex;
  justify-content: space-around;
  width: 90%;
}

.pack-container {
  margin: 40px;
}

.PageContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddddddb4;
  height: 100vh;
}
.form-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background:#ffffffb5;

  border-radius:20px ;
}

.form-group {
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
}

.form-control {
  width: 250px;
  padding: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

.button {
  width: 100%;
  height: 40px;
  background-color: #04345c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #084b82;
}

.radio-option {
  margin: 10px 0;
  display: flex;
}

.radioContainer {
  padding-top: 15px;
  padding-top: 10px;
}
</style>
