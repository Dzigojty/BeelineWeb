<script setup>
import { v4 as uuidv4 } from "uuid";
import { ref, onMounted, nextTick, defineExpose } from "vue";

const APP_ID = "452f99a0814b44d29d9a446ec20356fc";
const CHANNEL = "wdj";
let uid = uuidv4();
let text = ref("dsadsad");
let messagesRef = ref(null);
let messages = ref([]);
let channel;

//Функция для загрузки изображений

//Функция для загрузки файлов

defineExpose({ messagesRef });

const appendMessage = async (message) => {
  messages.value.push(message);
  await nextTick();
  messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
};

function sendMessage() {
  if (text.value === "") return;
  //   channel.sendMessage({ text: text.value, type: 'text' });
  appendMessage({
    text: text.value,
    uid,
  });
  text.value = "";
}
</script>

<template>
  <div class="chat">
    <div class="contacts">
      <div class="backgroud_contact_select">
        <div class="contact">
          <img src="../assets/user.png" class="contact_img" />
          <div class="column_data">
            <div class="contact_name">Заказчик</div>
            <div class="button_new_message">1 новое сообщение!</div>
          </div>
        </div>
      </div>
      <div class="backgroud_contact">
        <div class="contact">
          <img src="../assets/user.png" class="contact_img" />
          <div class="column_data">
            <div class="contact_name">Заказчик</div>
            <div class="button_status_message">Прочитанно</div>
          </div>
        </div>
      </div>
      <div class="backgroud_contact">
        <div class="contact">
          <img src="../assets/user.png" class="contact_img" />
          <div class="column_data">
            <div class="contact_name">Заказчик</div>
            <div class="button_status_message">Прочитанно</div>
          </div>
        </div>
      </div>
    </div>

    <div class="dialog">
      <!-- <div @v-if="message.uid != uid" class="notification">
        <samp>Заказчик предложил изменить сроки аренды!</samp>
        <button>Открыть</button>
      </div> -->
      <div @v-if="message.uid === uid" class="notification_mediator">
        <samp>Приняли решение?</samp>
        <button>Завершить спор</button>
      </div>
      <div class="panel">
        <div class="messages" ref="messagesRef">
          <div class="inner">
            <div
              :key="index"
              v-for="(message, index) in messages"
              class="message"
            >
              <div v-if="message.uid === uid" class="aligment_you">
                <div class="datetime_message margin-right_message">20:11</div>
                <div class="message_you">
                  {{ message.text }}
                  <img
                    class="message_you_end"
                    src="../assets/message_end.png"
                  />
                </div>
              </div>
              <!-- v-if="(message.type !== 'mediator') & (message.uid !== uid)" -->
              <div v-if="message.uid === uid" class="aligment_noyou">
                <img class="message_user" src="../assets/user.png" alt="" />
                <div class="message_noyou">
                  {{ message.text }}
                  <img
                    class="message_noyou_end"
                    src="../assets/message_end_noyou.png"
                  />
                </div>
                <div class="datetime_message margin-left_message">20:11</div>
              </div>
              <!-- v-if="(message.type === 'mediator') & (message.uid !== uid)" -->
              <div v-if="message.uid === uid" class="aligment_noyou">
                <img class="message_user" src="../assets/user.png" alt="" />
                <div class="message_mediator">
                  {{ message.text }}
                  <img
                    class="message_noyou_end"
                    src="../assets/message_end_mediator.png"
                  />
                </div>
                <div class="datetime_message margin-left_message">20:11</div>
              </div>
              <!-- <div v-if="message.uid === uid" class="message_you">
                You:&nbsp;
              </div>
              <div
                v-if="(message.type !== 'mediator') & (message.uid !== uid)"
                class="message_noyou"
              >
                Them:&nbsp;
              </div>
              <div
                v-if="(message.type === 'mediator') & (message.uid !== uid)"
                class="message_mediator"
              >
                Them:&nbsp;
              </div>
              <div class="text">{{ message.text }}</div> -->
            </div>
          </div>
        </div>
        <form class="form" @submit.prevent="sendMessage">
          <div class="buttons">
            <button>
              <img src="../assets/button_chat_action.png" alt="" />
            </button>
            <button>
              <img src="../assets/button_chat_action1.png" alt="" />
            </button>
          </div>
          <input placeholder="Ответить на сообщение" v-model="text" />
          <button class="submit">
            <img src="../assets/submit_chat.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  height: 39.1vw;
}

.contact_name {
  margin-bottom: 0.5vw;
}

.column_data {
  margin-left: 1vw;
  overflow: hidden;
}

.contact_img {
  border-radius: 50%;
  width: 5vw;
  height: 5vw;
}

.button_status_message {
  border-radius: 4vw;
  background-color: #b5b1ac;
  padding: 0.5vw 1vw;
}

.button_new_message {
  border-radius: 4vw;
  background-color: #f9cc33;
  padding: 0.5vw 1vw;
  overflow: hidden;
  white-space: nowrap;
}

.notification_mediator {
  padding: 2.2vw 0;
  border-bottom: 1px black solid;
  text-align: center;
}

.notification_mediator button{
  margin-left: 1vw;
  background-color: #00dd3079;
  border: 1px #135F00 solid;
  color: black;
  font-size: var(--fs-20);
  border-radius: 0.8vw;
  padding: 0.25vw 2.5vw;
  align-self: center;
  text-align: center;
}

.notification {
  padding: 2.5vw 0;
  border-bottom: 1px black solid;
  text-align: center;
}

.notification button {
  margin-left: 1vw;
  background-color: #f9cc33;
  border: none;
  border-radius: 1vw;
  padding: 0.25vw 2.5vw;
  align-self: center;
  text-align: center;
}

.contact {
  display: flex;
  border: 1px #a96807 solid;
  padding: 1vw 1vw;
  box-shadow: -0.1vw 0.3vw 0.5vw -0.2vw rgba(0, 0, 0, 0.348);
  border-radius: 0.8vw;
}

.contacts {
  background-color: #ffefb9;
  width: 30vw;
  height: 100%;
}

.backgroud_contact_select {
  background-color: white;
  padding: 0.5vw 0.5vw;
}

.backgroud_contact {
  padding: 0.5vw 0.5vw;
}

.margin-right_message {
  margin-right: 1.2vw;
}

.margin-left_message {
  margin-left: 1.2vw;
}

.datetime_message {
  font-size: var(--fs-16);
  align-self: flex-end;
}

.contacts {
  height: 100%;
  overflow: auto;
}

.chat {
  height: 46vw;
  display: flex;
}

body {
  margin: 0;
  height: 400px;
}

#app {
  padding: 2em;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(188, 255, 147, 1) 0%,
    rgba(88, 245, 158, 1) 53%,
    rgba(0, 237, 69, 1) 100%
  );
}

.panel {
  display: flex;
  flex-direction: column;
  width: 73vw;
  height: 100%;
}
.messages {
  height: 100%;
  width: 100%;
  overflow-x: scroll;
  overflow-y: none;
  background-color: white;
}
.inner {
  padding: 10px 30px;
}

.message {
  margin-bottom: 1vw;
}

form {
  position: relative;
  display: flex;
  background-color: #ffefb9;
  padding-bottom: 0.4vw;
  padding-top: 0.6vw;
}

.buttons {
  display: flex;
}

.buttons button {
  border: none;
  background-color: #ffefb9;
}

.buttons button img {
  width: 4vw;
}

.form {
  padding-bottom: 1vw;
}

input {
  width: 100%;
  border: none;
  padding: 0.5vw;
  box-shadow: -0.1vw 0.3vw 0.6vw rgba(0, 0, 0, 0.348);
  border-radius: 0.5vw 0 0 0.5vw;
  margin: 0.5vw 1.5vw 0 0;
  padding-left: 2vw;
  background-color: white;
  outline: none;
}

.submit {
  border: none;
  outline: none;
  background: none;
  position: absolute;
  right: 1vw;
  top: 1.1vw;
  background-color: #f9cc33;
  padding: 0;
  padding-right: 0.5vw;
}

.aligment_noyou {
  display: flex;
  justify-content: start;
  margin-bottom: 0.9vw;
}

.aligment_you {
  display: flex;
  justify-content: end;
  margin-bottom: 0.9vw;
}

.message_mediator {
  position: relative;
  align-self: flex-end;
  background-color: #d9d9d9;
  padding: 0.8vw 1vw;
  border-radius: 1vw;
  max-width: 40vw;
  text-align: left;
  word-break: break-all;
}

.message_user {
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  margin-right: 1vw;
}

.message_noyou {
  position: relative;
  align-self: flex-end;
  background-color: #ffe795;
  padding: 0.8vw 1vw;
  border-radius: 1vw;
  max-width: 40vw;
  text-align: left;
  word-break: break-all;
}

.message_noyou_end {
  position: absolute;
  left: -1.2vw;
  top: -0.36vw;
  width: 2vw;
}

.message_you_end {
  position: absolute;
  right: -0.6vw;
  top: -0.36vw;
  width: 2vw;
}

.message_you {
  position: relative;
  align-self: flex-end;
  background-color: #ebe2c3;
  padding: 0.8vw 1vw;
  border-radius: 1vw;
  max-width: 40vw;
  text-align: left;
  word-break: break-all;
}

.submit img {
  height: 3.8vw;
}

@media (max-width: 2660px) {
  .submit img {
    height: 3.6vw;
  }
}

@media (max-width: 1396px) {
  .submit img {
    height: 3.65vw;
  }
}

@media (max-width: 863px) {
  .submit img {
    height: 3.7vw;
  }
}

@media (max-width: 863px) {
  .submit img {
    height: 3.8vw;
  }
}

@media (max-width: 425px) {
  .submit img {
    height: 3.9vw;
  }
}
</style>