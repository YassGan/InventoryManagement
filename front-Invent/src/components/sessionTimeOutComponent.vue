<template>
  <div class="session-expiry-warning" v-if="showWarning">
    <p>Session will expire in {{ countdown }} seconds. Do you want to continue?</p>
    <button @click="extendSession">Extend Session</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdown: 0,
      showWarning: false,
    };
  },
  created() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      const warningTime = 5; 
      let remainingTime = this.sessionTimeoutMinutes * 60 - warningTime;
      this.countdown = remainingTime;

      const countdownInterval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(countdownInterval);
          this.showWarning = false;
        } else if (this.countdown <= warningTime) {
          this.showWarning = true;
        }
      }, 1000);
    },
    extendSession() {
      // Reset the session timer
      this.$emit('extend-session');
      this.showWarning = false;
    },
  },
};
</script>

<style>
</style>
