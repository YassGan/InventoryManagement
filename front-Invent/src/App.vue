<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {

data() {
    return {
      sessionTimeoutMinutes: 30,
      sessionTimer:localStorage.getItem("sessionTimeoutMinutes"),
    };
  },
  methods: {
  
    startSessionTimer() {
      clearTimeout(this.sessionTimer);

      this.sessionTimer = setTimeout(() => {
        this.showSessionWarning();
      }, (this.sessionTimeoutMinutes - 1) * 60 * 1000 - 4 * 1000); // Alert 4 seconds before session timeout

      document.addEventListener('mousemove', this.resetSessionTimer);
      document.addEventListener('keydown', this.resetSessionTimer);
      document.addEventListener('click', this.resetSessionTimer);
    },
    logout() {
      clearTimeout(this.sessionTimer);

      localStorage.removeItem('token');
      // Perform logout logic
    },
    resetSessionTimer() {
      clearTimeout(this.sessionTimer);
      this.startSessionTimer();
    },
    showSessionWarning() {
      alert("Il y'avait un moment que vous n'avez rien fait");
      setTimeout(() => {
        this.logout();
      }, 5000); // Log out after 5 seconds
    },
  },
  created() {
    this.startSessionTimer();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

body {
  margin: 0;
  padding: 0;
}
</style>
