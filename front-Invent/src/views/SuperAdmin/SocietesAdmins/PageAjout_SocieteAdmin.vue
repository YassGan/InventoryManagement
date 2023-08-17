<template>
<div>
          <SuperAdminNavbar> </SuperAdminNavbar>

  <div class="PageContainer">
    <div class="navbar-right">
      <button class="logout-button" @click="logout">
        <div class="logoutWord">Logout</div>
        <img
          src="../../../assets/exit.png"
          alt="Logout Icon"
          class="logout-icon"
        />
      </button>
    </div>
    <div class="buttonsTitleContainer">
      <h1 class="title">Super Admin</h1>
      <h1 style="margin-top: 30px" class="title">
        Ajouter un nouveau Société Admin
      </h1>

   
    </div>
  </div>
</div>
</template>


<script>
import router from "@/router";
import SuperAdminNavbar  from '@/components/SuperAdminNavbar.vue';

export default {
   components:{
SuperAdminNavbar
    },
  methods: {
    logout() {
      router.push("/SuperAdminLoginPage");
    },
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
