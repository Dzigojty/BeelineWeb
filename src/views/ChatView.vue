<template>
  <div class="chat">
    <v-popup-moder-decision v-if="isInfoPopupModerDecision" @closePopup="closePopup" />
    <!-- <v-popup-change-deal
      v-if="isInfoPopupChangeDeal"
      @closePopup="closePopup"
    /> -->
    <v-popup-change-deal-request-edit v-if="isInfoPopupChangeDeal" @closePopup="closePopup" />
    <div class="container-chat">
      <swiper-container class="swiper contacts" slides-per-view="5" :direction="'vertical'">
        <swiper-slide
  v-for="(chat, index) in chats"
  :key="index"
  :class="['swiper-el', { active: chatSelected === chat.Chat_id }]"
  @click="ChatSelect(chat.Chat_id)"
>
  <div :class="[{ backgroud_contact: true, backgroud_contact_select: chatSelected === chat.Chat_id }]">
    <div class="contact">
      <img v-if="chat.avatar" :src="chat.avatar" alt="Avatar" class="contact_img" />
      <img v-else src="../assets/user.png" class="contact_img" />
      <div class="column_data">
        <div class="contact_name">{{ chat.name_owner }}</div>
        <div v-if="!!chat.text" class="button_status_message">
          Прочитано
        </div>
        <div v-else class="button_new_message">Новое сообщение!</div>
      </div>
    </div>
  </div>
</swiper-slide>

      </swiper-container>
      <div class="dialog">
        <!-- <div @v-if="message.uid != uid" class="notification">
          <samp>Заказчик предложил изменить сроки аренды!</samp>
          <button @click="showPopupPopupChangeDeal">Открыть</button>
        </div> -->
        <!-- <div @v-if="message.uid === uid" class="notification_mediator">
        <samp>Приняли решение?</samp>
        <button @click="showPopupModerDecision">Завершить спор</button>
        </div> -->
        <div class="panel">
          <div class="messages" ref="messagesRef">
  <div class="inner">
    <div v-for="(message, index) in messages" :key="index" class="message">
      <div v-if="message.uid === user_id" class="aligment_you">
        <div class="datetime_message margin-right_message">{{ message.date }}</div>
        <div class="message_you">
          {{ message.text }}
          <img class="message_you_end" src="../assets/message_end.png" />
        </div>
      </div>
      <div v-else class="aligment_noyou">
        <img class="message_user" src="../assets/user.png" alt="" />
        <div class="message_noyou">
          {{ message.text }}
          <img class="message_noyou_end" src="../assets/message_end_noyou.png" />
        </div>
        <div class="datetime_message margin-left_message">{{ message.date }}</div>
      </div>
    </div>
  </div>
</div>

          <form class="form" @submit.prevent="sendMessage">
            <div class="buttons">
              <button >
                <img src="../assets/button_chat_action.png" alt="" />
              </button>
              <input type="file" @change="convertToBase64" accept="image/*">
              <button >
                <img src="../assets/button_chat_action1.png" alt="" />
              </button>
            </div>
            <input placeholder="Ответить на сообщение" v-model="text" />
            <button class="submit" type="submit" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VPopupModerDecision from "../components/popup/v-popup-moder-decision.vue";
import VPopupChangeDeal from "../components/popup/v-popup-change-deal.vue";
import VPopupChangeDealRequestEdit from "../components/popup/v-popup-change-deal-request-edit.vue";
import axios from 'axios';
import Cookies from "js-cookie";

export default {
  components: {
    VPopupModerDecision,
    VPopupChangeDeal,
    VPopupChangeDealRequestEdit,
  },
  methods: {
    convertToBase64(event) {
      const file = event.target.files[0]; // Получаем выбранный файл
      if (!file) return; // Проверяем, что файл выбран

      const reader = new FileReader(); // Создаем FileReader для чтения файла

      // Обработчик завершения чтения файла
      reader.onload = (e) => {
        this.base64Image = e.target.result; // Сохраняем результат (Base64)
      };

      // Запускаем чтение файла в формате Base64
      reader.readAsDataURL(file);
    },


    async sendMessage() {
      const selectedChat = this.chats.find(chat => this.chatSelected == chat.Chat_id);
      if (!selectedChat) {
        console.error("Выбранный чат не существует.");
        return;
      }

      try {
        // this.messages.push({
        //     uid: this.user_id,
        //     text: this.text,
        //     sent_at: new Date().toLocaleTimeString(),
        //   });
        const response = await axios.post("http://185.112.83.36:8080/sendMessage", {
          Id_chat: this.chatSelected,
          Text: this.text,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        // Проверим весь ответ от сервера
        console.log("Ответ от сервера:", response);

        // Дополнительная проверка данных
        if (response && response.data && response.data.status === "success") {
          this.messages.push({
            uid: this.user_id,
            text: this.text,
            sent_at: new Date().toLocaleTimeString(),
          });
          this.text = ""; // Очистка поля ввода после отправки
        } else {
          console.error("Ошибка отправки сообщения:", response.data ? response.data.message : "Нет данных");
        }
      } catch (error) {
        console.error("Ошибка при отправке сообщения:", error.message);
      }
    },
    closePopup() {
      this.isInfoPopupModerDecision = false;
      this.isInfoPopupChangeDeal = false;
    },
    showPopupModerDecision() {
      this.isInfoPopupModerDecision = true;
    },
    showPopupPopupChangeDeal() {
      this.isInfoPopupChangeDeal = true;
    },
    async ChatSelect(chatId) {
    this.chatSelected = chatId;
    console.log(this.chatSelected)

    try {
      // Отправляем запрос на сервер
      const response = await axios.post(
        "http://185.112.83.36:8080/openChat",
        { Id_chat: chatId },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Для отправки cookies
        }
      );

      console.log(response)

      // Проверяем структуру ответа
      if (response.data && response.data.status === "success" && Array.isArray(response.data.data)) {
        // Преобразуем данные
        this.messages = response.data.data.map(message => ({
          uid: message.User_id,
          name: message.Name,
          text: message.Text,
          media: message.Media,
          date: new Date(message.Date).toLocaleString(), // Преобразуем дату
          media_pwd: message.Media_pwd,
        }));
      } else {
        console.error("Неверный формат ответа или нет данных:", response.data);
        this.messages = []; // Очистка сообщений в случае ошибки
      }
    } catch (error) {
      console.error("Ошибка при запросе сообщений чата:", error.message);
    }
  },

  },
  async created() {
    try {
      const response = await axios.get("http://185.112.83.36:8080/printChat", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // для отправки куки
      });
      if (response.data.status != "success") {
        this.chats = [];
        return false;
      } else if (response.data.message != "Чатов не найденно, либо они не созданны") {
        this.chats = response.data.data;
        for (let index = 0; index < this.chats.length; index++) {
          this.chats[index].avatar = this.chats[index].avatar != '' ? `data:image/png;base64,${this.chats[index].avatar}` : '';
        }
        consoel.log(this.chats)
        return true;
      }
    } catch (error) {
      console.error("Ошибка при загрузке чатов:", error);
      return false;
    }
  },
  data() {
    return {
      avatar: '',
      text: '',
      base64Image: null,
      user_id: 27,
      chatSelected: null,
      isInfoPopupModerDecision: false,
      isInfoPopupChangeDeal: false,
      messages: [],
      chats: [
        {
          id: 30,
          message_id: 0,
          path_to_file: "",
          sender_id: 27,
          sent_at: "2024-10-29T15:33:20.057Z",
          text: null,
        }
      ],
    };
  },
};
</script>

<style scoped>
#min-swiper {
  height: 0;
}

.dialog {
  height: 39.1vw;
}

.contact_name {
  margin-bottom: 0.5vw;
}

.contact {
  cursor: pointer;
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
  cursor: pointer;
  background-color: #b5b1ac;
  padding: 0.5vw 1vw;
}

.button_new_message {
  border-radius: 4vw;
  background-color: #f9cc33;
  padding: 0.5vw 1vw;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
}

.container-chat {
  display: flex;
  width: 100vw;
}

.notification_mediator {
  padding: 2.2vw 0;
  border-bottom: 1px black solid;
  text-align: center;
}

.notification_mediator button {
  margin-left: 1vw;
  background-color: #00dd3079;
  border: 1px #135f00 solid;
  cursor: pointer;
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
  cursor: pointer;
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
  overflow: auto;
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
  background: linear-gradient(90deg,
      rgba(188, 255, 147, 1) 0%,
      rgba(88, 245, 158, 1) 53%,
      rgba(0, 237, 69, 1) 100%);
}

.panel {
  display: flex;
  flex-direction: column;
  width: 73vw;
  /* height: 38.5vw; */
  height: 46vw;
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
  cursor: pointer;
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
  width: 4.5vw;
  height: 66%;
  background-image: url("../assets/submit_chat.png");
  background-repeat: no-repeat;
  background-size: 3.8vw;
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
