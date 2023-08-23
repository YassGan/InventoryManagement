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










    <div class="PageContainer">
      <h3 style="margin-top:15px" class="PageTitle">Page de création de nouveaux utilisateurs</h3>
  
      <p style="margin-top: 20px; margin-bottom: 50px">
        Introduire les données du nouveau utilisateur
      </p>
      <div class="FormWrapper">
        <div class="FormContainer">
          <form @submit.prevent="registerUser" class="Form">
            <div style="margin-top:-40px" class="FormRow">
              <label class="LabelContainer" for="nomPrenom">Nom et Prénom:</label>
              
              <input style="  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;" type="text" id="text" v-model="nomPrenom" required />
            </div>

            <div class="FormRow">
              <label class="LabelContainer" for="email">Email:</label>
              <input type="email" id="email" v-model="email" required />
            </div>
            <div class="FormRow">
              <label class="LabelContainer" for="password">Password:</label>
              <input type="password" id="password" v-model="password" required />
            </div>

            <div class="FormRow">
              <label class="LabelContainer" for="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" v-model="confirmPassword" required />
            </div>

            <div style="margin-top:-25px" class="ButtonContainer">
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
import MobileSidebar from "../components/SideBarMobile.vue";

import router from '@/router'

export default {
  components: {
    AppNavbar,
            MobileSidebar,

  },
  data() {
    return {
      isAddingInProgress:false,
            mobileBreakpoint: 768,
      windowWidth: window.innerWidth,
      isSidebarOpen: false,
      momentObj: moment(), 
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
      sidebarState() {
    return this.isSidebarOpen ? 'open' : 'closed';
  },
    formattedDate() {
      return this.formatDate(this.momentObj);
      
    },
  },
    created() {
    this.handleResize(); 
  },
  mounted() {
    this.gettingAlltheUsersOfTheCompany();
    console.log(this.usersSocieteNumber);
                window.addEventListener('resize', this.handleResize);
    this.handleResize(); 
  },
  methods: {
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

extractStringAfterAdminPrefix(fullString) {
      const adminPrefix = 'admin-';
      const prefixIndex = fullString.indexOf(adminPrefix);


      return fullString.substring(prefixIndex + adminPrefix.length+1);
    }
    ,
    reloadPage() {
  
          router.push("PageListeUsers/");

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
        this.isAddingInProgress = true;

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
        this.isAddingInProgress = false;

    },
  },
};
</script>



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
  transition: transform 0.3s ease; 
}
.hamburger-button span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: black;
  margin: 4px auto;
}

@media (max-width: 768px) {

h3{
  font-size: 14px;
}



  .FormContainer {
    width: 80% !important;
    padding: 10px;
  }

  .LabelContainer {
    width: 100px;
  }

  .FormRow {
    flex-direction: column;
    margin-bottom: 20px;
  }

  input[type="password"],
  input[type="email"],
  input[type="text"] {
    width: 100%;
  }

  .ButtonContainer {
    justify-content: center;
  }
}



















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
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
  padding-top: 20px;
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
  background-color: #da622f;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  width: 170px;
}

.CustomButton:hover {
  background-color: #fd8957;
}
</style>
