<template>
  <div class="PageContainer">
   
    <div class="login-form">
      <h1 class="auth-title">Authentification Super Admin</h1>
      <div>
        <img src="../../assets/WebsiteLogo.png" alt="Logo" class="logo" />
        <div class="logo-text">Gestion d'inventaires</div>
      </div>
      <form>
        <label for="username">Nom d'utilisateur :</label>
        <input type="text" id="email" name="email" v-model="email" required>
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" name="password" v-model="password" required>
        <button @click="login">Se connecter</button>
      </form>
      <h4 id="ErrorResponse">{{ errorMessage }}</h4>
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
  methods: {
    async login(event) {
      event.preventDefault(); 

      try {
        const response = await HTTP.post("UtilisateursAPI/loginActionSuperAdmin", {
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        alert(token);
            localStorage.setItem('token', token);


        try {
          await router.push("/PageHomeSuperAdmin");
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

#ErrorResponse{
    color: red;
}
.PageContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e0e6ed;
    height: 100vh;
}
.login-form {
  width: 300px;
  padding: 30px;
  background-color: #f7f9fa;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.auth-title {
  font-size: 24px;
  margin-bottom: 20px;
}

form {
  text-align: left;
}

label {
  font-size: 14px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #e0e6ed;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #15aabf;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  font-size: 16px;
  margin-bottom: 15px;
}
</style>
