<template>
  <div class="message-page">
    <div class="message-container">
      <div class="facebook-logo">
        <img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" alt="Facebook Logo" />
        <h1>Facebook</h1>
      </div>
      <h2>Password Modified Successfully</h2>
      <p>Your password has been successfully modified.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordModifiedMessage',
};
</script>

<style>
.message-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.message-container {
  width: 320px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.facebook-logo {
  text-align: center;
  margin-bottom: 20px;
}

.facebook-logo img {
  width: 80px;
  height: auto;
}

.facebook-logo h1 {
  font-size: 24px;
  margin-top: 8px;
}

.message-container h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.message-container p {
  font-size: 16px;
  color: #333;
}
</style>
