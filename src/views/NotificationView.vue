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
      </div>
      <div class="grey-line"></div> -->
    </div>
    <div class="grey_text">
        Здесь будут появляться уведомления!
    </div>
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
    font-size: 20px;
    color: #666666;
    margin-top: 20px;
    text-align: center;
}

.notification {
  width: 1024px;
  margin: 0 auto;
}

.grey-line {
  background-color: #d9d9d9;
  height: 1px;
}

.button .link_button {
  width: 20px;
  margin-left: 10px;
  height: 20px;
}

.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  cursor: pointer;
  padding: 2px 20px;
  border-radius: 5px;
  border: 1px #929292 solid;
}

span img {
  width: 2w;
}

.notififi {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  padding-left: 10px;
}

.notififi img {
  width: 20px;
  border-radius: 50%;
  height: 20px;
}

.notififi span img {
  width: 20px;
}

h1 {
  font-size: 25px;
  color: #141414;
}

.text {
  font-size: 16px;
}

.text_button {
  font-size: 16px;
}


@media (max-width: 1024px) and (min-width: 770px) {
  .notification {
    width: 760px;
    margin: 0 auto;
  }
}


@media (max-width: 768px)  {
  .button .link_button {
    width: 15px;
    margin-left: 5px;
    height: 15px;
  }

  .notification {
    width: 420px;
    margin: 0 auto;
  }


}
</style>
