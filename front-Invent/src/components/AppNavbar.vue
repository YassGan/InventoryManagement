<template>
  <nav class="navbar">
    <a href="/PagePrincipale">
      <div class="logo-container">
        <div>
          <img src="../assets/WebsiteLogo.png" alt="Logo" class="logo" />
          <div class="logo-text">Gestion d'inventaires</div>
        </div>
      </div>
    </a>

    <div class="navbar-center">
      <ul>
        <li><a href="/PagePrincipale">Home</a></li>
        <li><a href="/PageArchives">Archive</a></li>
        <li><a href="/PageComptage">Comptage</a></li>
        <li><a href="/PageAfficheInvent">Live Visualisation</a></li>
      </ul>
    </div>
    <div class="navbar-right">
      <button class="logout-button" @click="logout">
        <div class="logoutWord">Logout</div>
        <img src="../assets/exit.png" alt="Logout Icon" class="logout-icon" />
      </button>
    </div>
  </nav>
</template>

<script>
import router from "@/router";

export default {
  name: "AppNavbar",
  methods: {
    logout() {
      localStorage.removeItem("token");
      router.push("/");
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #2e3d52; 
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  filter: invert(100%) brightness(100%); /* Change the logo color to white */
}

.logo-text {
  font-size: 16px;
  color: white;
}

.navbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.navbar-center ul {
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0;
}

.navbar-center li {
  margin: 0 15px;
}

.navbar-center a {
  text-decoration: none;
  color: #fff; 
  font-weight: bold;
  padding: 10px;
  transition: color 0.3s ease;
  position: relative;
}

.navbar-center a:hover {
  color: #ff8d6a;
}

.navbar-center a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ff8d6a;
  transform: scaleX(0);
  transition: transform s ease;
}

.navbar-center a:hover::after {
  transform: scaleX(0.5); 
}

.navbar-right {
  margin-left: auto;
}

.logout-button {
  border: none;
  background-color: transparent;
  color: #fff;
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
  filter: invert(100%) brightness(100%); 
}

.logoutWord {
  padding-right: 3px;
}

@keyframes attention {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }

}
</style>
