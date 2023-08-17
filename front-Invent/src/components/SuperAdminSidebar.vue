<template>

  <div class="sidebar">
    
    <a href="/PagePrincipale" class="logo-container">
      <div>
        <img src="../assets/WebsiteLogo.png" alt="Logo" class="logo" />
        <div class="logo-text">Gestion d'inventaires</div>
      </div>
    </a>

    <div class="sidebar-content">
      <ul>
        <li>
          <a href="/PageHomeSuperAdmin">
            <i class="fas fa-home"></i> Home
            <div class="nav-line"></div>
          </a>
        </li>

        <li>
          <a href="/PageSuperAdmin_Packages">
            <i class="fas fa-box"></i> Packages
            <div class="nav-line"></div>
          </a>
        </li>

        <li>
          <a href="/PageSuperAdmin_Societes">
            <i class="fas fa-building"></i> Sociétés
            <div class="nav-line"></div>
          </a>
        </li>
      </ul>
    </div>

 
  </div>
</template>

<style scoped>
.sidebar {
  background-color: #2e3d52;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  filter: invert(100%) brightness(100%);
  margin-top: 50px;
}

.logo-text {
    margin-top:15px;
  font-size: 18px;
  color: white;
}

.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 100px;
  width: 100%;
}

.sidebar-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-content li {
  margin-bottom: 15px;
}

.sidebar-content a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  position: relative;
  display: flex;
  align-items: center;
}

.sidebar-content a:hover {
  color: #ff8d6a;
}

.nav-line {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ff8d6a;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.sidebar-content a:hover .nav-line {
  transform: scaleX(1);
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
  100% {
    transform: scale(1.0);
  }
}

.sidebar ul li i {
  margin-right: 10px;
}
.sidebar-content li {
  margin-bottom: 0;

  border-top: 1px solid #b4b4b4;
  border-bottom: 1px solid #b4b4b4;
}
.sidebar-content a {

  padding: 15px;
}

a{
  text-decoration: none;
}
</style>

<script>
import router from "@/router";

export default {
  methods: {
    logout() {
      router.push("/SuperAdminLoginPage");
    },
  },
};

</script>
