<template>
  <div class="v-popup-text-owner">
    <div class="center">
      <section>
        <p>
          Заказчик предложил продлить либо сократить время работы машины! В
          случае спора, к чату присоединится <b>Медиатор</b>
        </p>
        <p>
          Внимание! <br />
          Стоимость высчитывается автоматически.
        </p>
      </section>
    </div>
    <div class="close_panel" @click="closeInfoPopup()"></div>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    closeInfoPopup() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style scoped>
.finaly_price {
  color: #009a0f;
  margin-left: 1vw;
}

.price {
  margin-left: 0.4vw;
}

.finaly_price-block {
  text-align: center;
  margin-top: 3vw;
}

.time-title {
  color: #0000008f;
}

.end_date_time {
  align-content: end;
}

.time {
  margin-top: 0.5vw;
}

.green-text {
  color: #009a0f;
}

.red-text {
  color: #d34242;
}

.time-block {
  display: flex;
  margin-top: 2vw;
  justify-content: space-around;
}

.yellow_button {
  height: 3vw;
  width: 8vw;
  font-size: var(--fs-15);
  background-color: #f9cc33;
  border-radius: 0.4vw;
  cursor: pointer;
  border: 1px #5b3700 solid;
}

.button-block {
  display: flex;
  cursor: pointer;
  justify-content: space-evenly;
  padding: 0 10vw;
  margin-top: 2vw;
}

.date {
  margin-top: 0.5vw;
}

.date-second {
  color: #0000008f;
}

.up-line {
  height: 9vw;
  width: 1px;
  background-color: #949494;
  margin: 0 2vw;
}

.center-block {
  align-content: center;
  margin-bottom: 1vw;
  align-items: center;
}

.user img {
  display: block;
  width: 4vw;
  align-self: center;
  height: 4vw;
  margin: 0 auto;
  border-radius: 50%;
}

.user {
  width: 10vw;
  align-content: center;
  align-items: center;
  align-self: center;
}

.user .name {
  text-align: center;
  background-color: #f9cc33;
  border: 1px #5b3700 solid;
  font-size: var(--fs-20);
  font-weight: 200;
  padding: 1vw;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 0.8vw;
}

.padding {
  padding: 1vw 1.5vw;
}

.users {
  display: flex;
  justify-content: center;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5vw;
}

.popup-header img {
  width: 2vw;
  height: 2vw;
}

.link {
  font-size: var(--fs-20);
  text-decoration: underline;
}

.title {
  text-align: center;
  font-size: var(--fs-30);
}

.grey-min-text {
  font-size: var(--fs-15);
  color: #929292;
  margin-bottom: 1vw;
}

#desc::placeholder {
  font-size: var(--fs-20);
  color: #959595;
}

#desc {
  font-size: var(--fs-20);
  background-color: #e0e0e0;
  border-radius: 1.2vw;
  padding: 1vw;
  margin-top: 1.2vw;
  margin-bottom: 0.2vw;
}

.center {
  width: 20vw;
  padding: 2vw;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 1.5vw;
  background-color: #FFFBEE;
}

.v-popup-text-owner {
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0);
}

.close_panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
}
</style>