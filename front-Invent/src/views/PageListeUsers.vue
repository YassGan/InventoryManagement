<template>
  <div>
    <AppNavbar></AppNavbar>

    <div class="PageContainer">
            <div style="margin-top: 60px">
      <h3>
        Liste de vos inventaires immobiliers qui ne sont pas encore validés
      </h3>
    </div>

      <!-- Button to navigate to create new user page -->
      <div style="margin-bottom:40px" class="CreateButtonContainer">
        <router-link to="/PageCreationNvUtilisateur" class="CreateButton">Créer un nouveau client</router-link>
      </div>

      <!-- Display the list of users in a table -->
<table class="UserTable">
        <thead>
          <tr>
            <th>Nom et Prénom</th>
            <th>Email</th>
            <th style="width:20%"><span style="margin-left:80px">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index" class="UserRow">
            <td>{{ user.nom }}</td>
            <td>{{ user.email }}</td>

            <td style="display:flex;justify-content:center">
              <button class="CustomButton yellowButton" @click="editUser(user.email)">Modifier</button>
              <button class="CustomButton redButton" @click="deleteUser(user.email)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { HTTP } from "/axios";
import AppNavbar from "../components/AppNavbar.vue";
import router from '@/router'

export default {
  components: {
    AppNavbar,
  },
  data() {
    return {
      users: [], 
    };
  },
  mounted() {
    this.getUsers(); 
  },
  methods: {
    async getUsers() {
      try {
        const User_loggedin_info_String =
          localStorage.getItem("User_loggedin_info");
        const User_loggedin_info_Object = JSON.parse(User_loggedin_info_String);
        const idSociete = User_loggedin_info_Object.idSociete;

        const response = await HTTP.get(`UtilisateursAPI/getAllUsersBySocieteId/${idSociete}`);
        this.users = response.data;
        console.log(this.users)
      } catch (error) {
        console.error(error);
      }
    },
    editUser(email) {
      console.log("Editing user:", email);
      router.push("PageUpdateUser/"+email);
    },
    async deleteUser(email) {
      console.log("Deleting user:", email);
          try {
        const response = await HTTP.delete(
          `UtilisateursAPI/deleteUser/${email}`
        );
        console.log(response.data.message);
        const deletedIndex = this.users.findIndex(
          (item) => item.email === email
        );

        if (deletedIndex !== -1) {
          this.users.splice(deletedIndex, 1);
        }
      } catch (error) {
        console.error("Error deleting about option:", error);
      }
    },
  },
};
</script>




<style scoped>
.PageContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.PageTitle {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  padding-top: 70px;
}

.UserTable {
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
}

.UserTable th,
.UserTable td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.UserTable th {
  background-color: #2c3e50;
  color:white;
  
}

.UserRow:hover {
  background-color: #f0f0f0;
}

button {
  padding: 4px 8px;
  margin-right: 4px;
  cursor: pointer;
}

.CustomButton {
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
}

.CustomButton:hover {
  background-color: #c2c0bd;
}

.CreateButtonContainer {
  margin-top: 20px;
}

.CreateButton {
  background-color: #e65124;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
  text-decoration: none;
}

.CreateButton:hover {
  background-color: #45a049;
}

.redButton {
  background: rgb(214, 38, 38);
}

.yellowButton {
  background: rgb(214, 190, 38);
}
</style>