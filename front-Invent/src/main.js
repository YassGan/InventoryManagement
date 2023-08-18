import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

const sessionTimeoutMinutes = 30; // Adjust the session timeout duration in seconds
const sessionTimeoutSeconds=30*60
let sessionTimer;
let alertTimer;

function showAlertBeforeLogout() {
  alert("Il y'avait un moment que vous n'avez rien fait");
}

function resetAlertTimer() {
  clearTimeout(alertTimer);
  alertTimer = setTimeout(showAlertBeforeLogout, (sessionTimeoutSeconds - 120) * 1000);
}

function resetSessionTimer() {
  clearTimeout(sessionTimer);
  resetAlertTimer();

  sessionTimer = setTimeout(logout, sessionTimeoutMinutes * 1000);
}

function logout() {
  localStorage.removeItem('token');

  if (router.currentRoute.path !== '/loginPage') {
    router.push('/loginPage');
  }
}

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

document.addEventListener('mousemove', resetSessionTimer);
document.addEventListener('keydown', resetSessionTimer);
