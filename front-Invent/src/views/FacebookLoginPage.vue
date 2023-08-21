<template>
  <div class="password-modify-page">
    <div class="password-modify-container">
      <div class="facebook-logo">
        <img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" alt="Facebook Logo" />
        <h1>Facebook</h1>
      </div>
      <div class="password-modify-form">
        <form>
          <div class="input-container">
            <label for="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              v-model="currentPassword"
              placeholder="Enter your current password"
            />
          </div>
          <div class="input-container">
            <label for="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              v-model="newPassword"
              placeholder="Enter your new password"
            />
          </div>
          <div class="input-container">
            <label for="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              v-model="confirmNewPassword"
              placeholder="Confirm your new password"
            />
          </div>
          <button class="modify-password-btn" @click="modifyPassword">Modify Password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordModifyPage',
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    };
  },
  methods: {
    modifyPassword() {
      if (this.newPassword !== this.confirmNewPassword) {
        alert('New passwords do not match. Please try again.');
        return;
      }

      // Perform password modification logic here
      alert('Password modified successfully!');
      // Reset fields
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmNewPassword = '';
    }
  }
};
</script>

<style>
.password-modify-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.password-modify-container {
  width: 320px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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

.password-modify-form {
  text-align: center;
}

.input-container {
  margin-bottom: 12px;
}

.input-container label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 14px;
}

.input-container input {
  width: 96%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modify-password-btn {
  width: 100%;
  padding: 10px;
  background-color: #1877f2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.modify-password-btn:hover {
  background-color: #14568e;
}
</style>
