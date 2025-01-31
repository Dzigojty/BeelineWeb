<template>
  <div class="v-popup-auth">
    <div class="center">
      <div class="title">Вход</div>
      <form action="" method="post">
        <input type="text" placeholder="Телефон, почта" />
        <input type="password" placeholder="Пароль" />
        <div class="other-auth-block">
          <div class="small-text m-t m-b">Или продолжить через</div>
          <div class="flex-block min-context">
            <img class="other-auth-img" src="../../assets/ok-auth.svg" alt="" />
            <img class="other-auth-img" src="../../assets/vk-auth.svg" alt="" />
          </div>
        </div>
        <div class="center-block">
          <button type="submit" class="submit">Войти</button>
        </div>
      </form>
      <div class="small-text m-b2">Нет аккаунта? <samp @click="show" class="underline">Создать</samp></div>
      <div class="small-text"><samp class="underline">Забыли пароль</samp></div>
    </div>
    <div class="close_panel" @click="closeInfoPopup()"></div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  data() {
    return {
      startDate: this.startDate,
    };
  },
  components: {},
  methods: {
    closeInfoPopup() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style scoped>
.submit {
  padding: 0.6vw 5vw;
  background-color: #f9cc33;
  border: none;
  border-radius: 1vw;
  margin: 1.5vw 0;
}

.small-text{
  font-size: var(--fs-15);
  color: #3333337a;
  text-align: center;

}

.m-b2{
  margin-bottom: 0.3vw;
}

.m-b{
  margin-bottom: 1vw;
}

.small-text samp{
  font-size: var(--fs-15);
  color: #3333337a;
  text-align: center;
}

.underline{
  text-decoration: underline;
}

.m-t{
  margin-top: 1.8vw;
}

.min-context{
  width: min-content;
  margin: 0 auto;
}

.other-auth-img{
  margin-left: 1vw;
}

.center-block{
  align-content: center;
  align-items: center;
  align-self: center;
  width: min-content;
  margin: 0 auto;
}

.flex-block {
  display: flex;
  justify-content: center;
}

.other-auth-img {
  border-radius: 50%;
  width: 2.5vw;
}

input::placeholder {
  color: #3333337a;
}

input {
  display: block;
  border: 1px #f9cc33 solid;
  padding-top: 0.8vw;
  padding-bottom: 0.8vw;
  padding-right: 2vw;
  padding-left: 2vw;
  border-radius: 1vw;
  width: 26vw;
  margin-bottom: 1.5vw;
}

.title {
  font-weight: bold;
  text-align: center;
  font-size: var(--fs-30);
  margin-bottom: 2.5vw;
}

.center {
  width: 30vw;
  padding: 2vw;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 1.5vw;
  background-color: white;
  border: 0.1vw solid black;
  box-shadow: 0vw 0.6vw 12px rgba(0, 0, 0, 1);
}

.v-popup-auth {
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
  z-index: -1;
}
</style>