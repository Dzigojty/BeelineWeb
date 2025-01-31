<template>
<div class="v-popup-text-user">
  <div class="info-card">
    <div class="info-item">
      <div class="icon-placeholder">⚡</div>
      <p>
        К чату присоединится <span class="highlight">Медиатор</span>, и поможет
        рассудить конфликтную ситуацию!
      </p>
    </div>
    <div class="info-item">
      <div class="icon-placeholder">⏰</div>
      <p>
        Если нужно больше времени, или машина простаивала во время аренды.
      </p>
    </div>
  </div>
  <div class="close_panel" @click="closePopup()"></div>
</div>
</template>

<script>
export default {
  components: {},
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style scoped>
.v-popup-text-user{
  position: absolute;
  z-index: 15;
  top: 20%;
  left: 40%;
}

.close_panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.info-card {
  background-color: #fdf6e3; /* Светло-кремовый фон */
  border: 2px solid #444444; /* Темно-серый бордер */
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  font-family: Arial, sans-serif;
  color: #333333;
  border: 0.1vw solid black;
  box-shadow: 0vw 0.6vw 12px rgba(0, 0, 0, 1);
}

.info-item {
  display: flex;
  align-items: start;
  margin-bottom: 20px;
}

.icon-placeholder {
  font-size: 24px;
  margin-right: 10px;
  color: #000000; /* Черный цвет для иконок */
}

p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.highlight {
  color: #d9534f; /* Красный текст */
  font-weight: bold;
}

</style>