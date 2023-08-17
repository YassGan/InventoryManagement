<template>
  <div class="popup-dialog-container" v-if="show">
    <div class="popup-dialog">
      <div style="display: flex; justify-content: end">
        <button class="X" @click="closePopup">X</button>
      </div>
      <div class="popup-dialog-content">
        <slot></slot>
      </div>
      <div style="display:flex;justify-content:center">
              <button style="font-size:16px" class="close-button" @click="closePopup">OK</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style scoped>
.popup-dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-dialog {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.popup-dialog-content {
  margin-bottom: 10px;
}

.close-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #3d9afe;
}

.X {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 21px;
  transition: 0.1s;
}
.X:hover {
  background: #fad6cd;
  border-radius: 50%;
}
</style>
