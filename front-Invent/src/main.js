import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

const sessionTimeoutMinutes = 0.1667; // Adjust the session timeout duration in minutes
let sessionTimer;

function resetSessionTimer() {
  clearTimeout(sessionTimer);
  sessionTimer = setTimeout(logout, sessionTimeoutMinutes * 60 * 1000);
}

function logout() {
  localStorage.removeItem('token');

  router.push('/loginPage');
}

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

document.addEventListener('mousemove', resetSessionTimer);
document.addEventListener('keydown', resetSessionTimer);
