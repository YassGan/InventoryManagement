<template>
  <div class="AppInvContainer">
    <div class="AppInv">

      <div class="image-container">
        <img src="../assets/loginImage.jpg" alt="Login Image" class="login-image" />
      </div>

      <div class="form-container">
        <div class="title-container">
          <h1 class="PageTitle">Gestion d'inventaires</h1>
        </div>
        <div class="form-wrapper">
          <form @submit.prevent="login" class="form">
            <h2>Login Page</h2>
            <div class="input-wrapper">
              <input
                type="email"
                v-model="email"
                placeholder="Email"
                class="form-control"
              />
            </div>
            <div class="input-wrapper">
              <input
                type="password"
                v-model="password"
                placeholder="Password"
                class="form-control"
              />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <div class="InscriptionLink"> <a href="/InscriptionPage"> S'inscrire ? </a></div>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { HTTP } from "/axios";
import router from "@/router";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
    mounted() {
        document.title = 'Gestion d\'inventaires | Login';

  },
  methods: {




    async login() {
      try {
        const response = await HTTP.post("SocieteAdminAPI/loginAdmin", {
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;




          const userResponse = await HTTP.get(`SocieteAdminAPI/getAdmin/${this.email}`);
          const userWasFoundData = userResponse.data;

          const societeSearch = await HTTP.get(`SocietesAPI/getSociete/${userWasFoundData.idSociete}`);
          const AdminSocieteData= societeSearch.data;

          const packageSearch = await HTTP.get(`PackageAPI/getPackage/${AdminSocieteData.idPackage}`);
          const SocietePackageData= packageSearch.data;


          console.log("User logged in info----")
          localStorage.setItem('User_loggedin_info', JSON.stringify(userWasFoundData));
          console.log(localStorage.getItem('User_loggedin_info'))
          //console.log(userWasFoundData)


          console.log("User logged in Societe info----")
          localStorage.setItem('User_loggedin_societe_info', JSON.stringify(AdminSocieteData));
          console.log(localStorage.getItem('User_loggedin_societe_info'))
          // console.log(AdminSocieteData)


          
          console.log("User logged in Societe package info----")
          localStorage.setItem('User_loggedin_societe_package_info', JSON.stringify(SocietePackageData));
          console.log(localStorage.getItem('User_loggedin_societe_package_info'))
          // console.log(SocietePackageData)


    
        localStorage.setItem("token", token);
        localStorage.setItem("email", this.email);
        localStorage.setItem("socId", userWasFoundData._id);


      try {
        // ...
        await router.push("/AfterLoginAdminPage");
      } catch (error) {
        // ...
      }




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
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.PageTitle {
  margin-bottom: 30px;
  margin-top: 70px;
  color: #da552c;
  font-size: 32px;
  text-align: center;
}

.AppInvContainer {
  background: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.AppInv {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  border-radius: 10px;
}

.container {
  display: flex;
}

.form-container {
  background: #ffffff;
  width: 50%;
  height: 80vh;
  overflow: hidden;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.title-container {
  margin-bottom: 20px;
}

.image-container {
  display: flex;
  height: 84vh;
  padding: 30px;
}

.form {
  width: 100%;
}

.input-wrapper {
  margin-bottom: 20px;
}

.form-control {
  width: 95%;
  height: 40px;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
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

.error-message {
  color: #f44336;
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}

.login-image {
  height: 100%;
  border-radius: 10px;
}

.InscriptionLink{
  margin-top:10px;
}


.InscriptionLink a {
  color: #e74311;
  text-decoration: none;
}

.InscriptionLink a:hover {
 text-decoration: underline; 
}




</style>



