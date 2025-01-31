<template>
  <div class="notification">
    <h1>Уведомления</h1>
    <div class="text">Все</div>
    <div class="bloc-notififis">
      <div v-for="(notif, index) in notifications" :key="index" >
        <div class="notififi" >
          <span> {{ notif.text }} {{ notif.name }} </span>
          <img :src="'data:image/png;base64,' + notif.avatar" alt="" />
        </div>
        <div class="grey-line"></div>
      </div>
      <!-- <div class="notififi">
        <span
          ><img src="../assets/flesh.png" alt="" /> <b> Заказчик1 </b> открыл
          спор! Скоро к чату подключится Медиатор.</span
        >
        <button class="button">
          <span class="text_button">Перейти в чат</span>
          <img class="link_button" src="../assets/link.png" alt="" />
        </button>
      </div> -->
      <!-- <div class="grey-line"></div> -->
    </div>
    <!-- <div class="grey_text">
        Здесь будут появляться уведомления!
    </div> -->
  </div>
</template>

<script>
import { useWebSocketStore } from '../stores/webSocketStore.js';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const webSocketStore = useWebSocketStore();
    const { notifications } = storeToRefs(webSocketStore);

    return { notifications };
  }
};
</script>

<style>
.grey_text{
    font-size: var(--fs-20);
    color: #666666;
    margin-top: 4vw;
    text-align: center;
}

.notification {
  padding: 0 2vw;
}
.grey-line {
  background-color: #d9d9d9;
  height: 1px;
}

.button .link_button {
  width: 2.5vw;
  margin-left: 1vw;
}

.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  cursor: pointer;
  padding: 0.6vw;
  border-radius: 1vw;
  border: 1px #929292 solid;
}

span img {
  width: 2w;
}

.notififi {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vw 2vw;
  padding-left: 1vw;
}

.notififi img {
  width: 3vw;
  border-radius: 50%;
  height: 3vw;
}

.notififi span img {
  width: 2vw;
}

h1 {
  font-size: var(--fs-30);
  color: #141414;
}

.text {
  font-size: var(--fs-18);
}

.text_button {
  font-size: var(--fs-18);
}
</style>
