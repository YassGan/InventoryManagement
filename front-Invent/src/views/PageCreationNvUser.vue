<template>
  <div>
                  <AppNavbar ></AppNavbar >

    <div class="PageContainer">
      <h2 class="PageTitle">Page de création de nouveaux utilisateurs</h2>
      <p>Introduire les données du nouveau utilisateur</p>
      <div class="FormWrapper">
        <div class="FormContainer">
          <h2 class="FormTitle"></h2>
          <form @submit.prevent="registerUser" class="Form">
            <div class="FormRow">
              <label class="LabelContainer" for="email">Email:</label>
              <input type="email" id="email" v-model="email" required>
            </div>
            <div class="FormRow">
              <label class="LabelContainer" for="password">Password:</label>
              <input type="password" id="password" v-model="password" required>
            </div>
            <div class="FormRow">
              <label class="LabelContainer" for="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" v-model="confirmPassword" required>
            </div>
            <div class="ButtonContainer">
              <button class="CustomButton" type="submit">Ajouter</button>
            </div>
            <div v-if="errorMessage" class="ErrorMessage">{{ errorMessage }}</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { HTTP } from '/axios';


import Swal from 'sweetalert2';



import AppNavbar  from '../components/AppNavbar.vue';




export default {
     components: {
    AppNavbar
  },
  data() {
    
    return {
      password: '',
      email: '',
      confirmPassword: '',
      errorMessage: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        let test = 0;
        if (this.password !== this.confirmPassword) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The two passwords do not match',
          });
          test = 1;
        }
        if (test === 0) {


          

          //const response = await axios.post('http://localhost:8000/signup', {


          const response = await HTTP.post('authentRegis/addNewUserFront', {
            password: this.password,
            email: this.email,
            confirmPassword: this.confirmPassword
          });

          console.log(this.password + '/' + this.email);
          console.log(response.data);

          this.confirmPassword = '';
          this.password = '';
          this.email = '';

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Utilisateur créé avec succès',
          });
        }
      } catch (error) {
        console.error(error.response.data);
        this.errorMessage = 'Server Error: ' + error.response.data.error;

        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: this.errorMessage,
        });
      }
    }
  }
};
</script>

<style scoped>
.ErrorMessage {
  color: red;
}





    .LabelContainer{
        width: 200px;
    }

   .ButtonContainer{
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
    background-color: #4CAF50;
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
