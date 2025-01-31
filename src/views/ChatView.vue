<template>
  <div class="chat">
    <v-popup-moder-decision v-if="isInfoPopupModerDecision" :selectedChat="selectedChat" @closePopup="closePopup" />
    <v-popup-change-deal
      v-if="isInfoPopupChangeDeal"
      @closePopup="closePopup"
    />
    <!-- <v-popup-text-user v-if="isInfoTextUser" @closePopup="closePopup"/> -->
    <v-popup-change-deal-request-edit v-if="isInfoPopupChangeDealRequestEdit" @closePopup="closePopup" />
    <v-popup-torgi v-if="isInfoPopupTorgi" :idAds="idAds" @closePopup="closePopup" />
    <div class="container-chat">
      <swiper-container class="swiper contacts" slides-per-view="8" :direction="'vertical'">
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
                <div class="contact_name">{{ chat.info }}</div>
                <div v-if="!!chat.text" class="button_status_message">
                  Прочитано
                </div>
                <div v-else class="button_new_message">Новое сообщение!</div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide
          v-for="(disput, index) in disputs"
          :key="index"
          :class="['swiper-el', { active: selectDisput == disput }]"
          @click="selectDisputM(disput)"
        >
          <div :class="[{ backgroud_contact: true, backgroud_contact_select: chatSelected === disput.Chat_id }]">
            <div class="contact">
              <!-- <img v-if="chat.avatar" :src="chat.avatar" alt="Avatar" class="contact_img" /> -->
              <img src="../assets/user.png" class="contact_img" />
              <div class="column_data">
                <div class="contact_name">{{ disput.Name1 }}, {{ disput.Name2 }}</div>
                
                <div class="button_status_request_desput">
                  Запрос
                </div>
                <!-- <div v-else class="button_new_message">Новое сообщение!</div> -->
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
        <div v-if="selectedChatProp?.owner_id == user_id && !disputState" class="notification">
          <samp>Заказчик предложил изменить сроки аренды!</samp>
          <div class="flex-block-center">
            <button @click="showPopupPopupChangeDeal">Открыть</button>
            <div @click="createDispute" class="button_status_request_spor">
              <img src="../assets/spor.svg" class="time_img"  alt="" />
            </div>
          </div>
        </div>
        <div v-if="selectedChatProp?.moderator_id == user_id && selectedChatProp?.moderator_id != 0" class="notification_mediator">
          <samp>Приняли решение?</samp>
          <button @click="showPopupModerDecision">Завершить спор</button>
        </div>

        <div v-if="disputState" class="mediator_header_request ">
          <div class="panel_mediator_req">
            <div style="margin-right: 1vw;" class="flex-block">
              <img src="../assets/user.png" class="contact_img" />
              <div class="contact_name">Исполнитель,  </div>
            </div>
            <div style="width: 9vw;" class="flex-block">
              <img styl src="../assets/mediator.png" class="contact_img" />
              <div class="contact_name">Медиатор</div>
            </div>
          </div>
        </div>

        <div v-if="selectedChatProp?.user_id == user_id && !disputState" class="mediator_header_request ">
          <div class="panel_p">
            <div class="flex-block">
              <img src="../assets/user.png" class="contact_img" />
                <div class="contact_name">Исполнитель</div>
              </div>
            <div class="flex-block-big">
              <!-- <div class="button_status_request_desput" @click="createDispute">
                Спор
              </div> -->
              <div @click="createDispute" class="button_status_request_spor">
                <img src="../assets/spor.svg" class="time_img"  alt="" />
              </div>
              <div @click="showPopupTorgi" class="button_status_request_torgi">
                <img src="../assets/torgi.svg" class="time_img"  alt="" />
              </div>
              <!-- <div @click="showPopupChangeDealRequestEdit" class="button_status_request_desput_time">
                <span>Изменить срок аренды</span>
                <img src="../assets/time.png" class="time_img"  alt="" />
              </div> -->
              <img src="../assets/info.png" class="info_img" @click="showInfoTextUser"  alt="" />
            </div>
          </div>
        </div>

        <div v-if="selectDisput != null" class="mediator_header_request ">
          <div class="panel_p">
            <img src="../assets/user.png" class="contact_img" />
            <div class="contact_name">{{ selectDisput.Name1 }}, {{ selectDisput.Name2 }}</div>
            <div class="button_status_request_desput">
              Запрос
            </div>
          </div>
        </div>
        <div v-if="selectDisput != null" class="mediator_ask_panel">
          <div class="ask">Запрос на решение спора</div>
          <div class="request">
            <button @click="reqestYes()" class="green">Принять</button>
            <button @click="reqestNo()" class="grey">Отклонить</button>
          </div>
        </div>
        <div class="panel">
          <div class="messages" id="messages" ref="messagesRef">
            <div class="inner">
              <!-- Список сообщений -->
              <div
                v-for="(message, index) in sortedMessages"
                :key="index"
                class="message"
              >
                <div v-if="message.uid == user_id" class="aligment_you">
                  <div class="datetime_message margin-right_message">{{ message.date }}</div>
                  <div class="message_you">
                    {{ message.text }}
                    <!-- <div v-if="message.media && message.media.length > 0">
                      <video
                        v-for="(video, idx) in message.media"
                        :key="idx"
                        :src="video"
                        controls
                        class="chat-video"
                      ></video>
                    </div> -->
                    <img class="message_you_end" src="../assets/message_end.png" />
                  </div>
                </div>
                <div v-else class="aligment_noyou">
                  <img class="message_user" src="../assets/user.png" alt="" />
                  <div :class="{ message_noyou: message.role == 1 , message_mediator: message.role == 2}">
                    {{ message.text }}
                    <!-- <div v-if="message.media && message.media.length > 0">
                      <video
                        v-for="(video, idx) in message.media"
                        :key="idx"
                        :src="video"
                        controls
                        class="chat-video"
                      ></video>
                    </div> -->
                    <img v-if="message.role == 1" class="message_noyou_end" src="../assets/message_end_noyou.png" />
                    <img v-if="message.role == 2" class="message_noyou_end" src="../assets/message_end_mediator.png" />
                  </div>
                  <div class="datetime_message margin-left_message">{{ message.date }}</div>
                </div>
              </div>
            </div>
          </div>

          <form class="form" @submit.prevent="sendMessage">
            <div class="buttons">
              <!-- <input type="file" accept="video/*" multiple @change="handleVideoUpload" /> -->
              <button>
                <img src="../assets/button_chat_action.png" alt="Отправить видео" />
              </button>
              <button>
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
import VPopupTorgi from "../components/popup/v-pop-torgi.vue";
import VPopupTextUser from "../components/popup/v-popup-text-user.vue"
import axios from 'axios';
import Cookies from "js-cookie";
import { storeToRefs } from 'pinia';

export default {
  components: {
    VPopupModerDecision,
    VPopupChangeDeal,
    VPopupChangeDealRequestEdit,
    VPopupTorgi,
    VPopupTextUser,
  },
  mounted() {
    // Прокрутить к началу при загрузке чата
    // this.scrollToBottom();
    this.initChats(); // Инициализация соединения с WebSocket
  },
  watch: {
    // Обновление при изменении списка сообщений
    // messages() {
    //   this.scrollToBottom();
    // },
  },
  computed: {
    // Сортировка сообщений: от старых к новым
    sortedMessages() {
      return [...this.messages].sort((a, b) => new Date(a.date) - new Date(b.date));
    },
  },
  methods: {
    handleVideoUpload(event) {
      this.videoFiles = Array.from(event.target.files);
      console.log("Загруженные видео:", this.videoFiles);
    },
    async sendVideo() {
      if (!this.chatSelected) {
        alert("Пожалуйста, выберите чат перед отправкой видео.");
        return;
      }

      if (this.videoFiles.length === 0) {
        alert("Пожалуйста, добавьте видео перед отправкой.");
        return;
      }

      try {
        const videoBase64 = await Promise.all(
          this.videoFiles.map((file) => this.convertToBase64(file))
        );

        const response = await axios.post(
          "http://localhost:8080/sendVideo",
          {
            Id_chat: this.chatSelected,
            Videos: videoBase64, // Отправляем видео в Base64 формате
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.data.status === "success") {
          alert("Видео успешно отправлено!");
        } else {
          alert(`Ошибка: ${response.data.message}`);
        }
      } catch (error) {
        console.error("Ошибка при отправке видео:", error);
        alert("Произошла ошибка при отправке видео.");
      }
    },
    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },


    async createDispute() {
      try {
        const response = await axios.post(
          "http://localhost:8080/sigDisputInChat",
          {
            // Ваши данные для POST-запроса
            chatId: this.selectedChat, // Пример идентификатора чата
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Для отправки куки
          }
        );
        
        alert(response.data.message)

        if (response.data.status === "success") {
          // this.successMessage = response.data.message; // "Спор добавлен"
          // this.errorMessage = null; // Сбрасываем сообщение об ошибке
        } else {
          // this.successMessage = null; // Сбрасываем сообщение об успехе
          // this.errorMessage = response.data.message; // Выводим сообщение об ошибке
        }
      } catch (error) {
        console.error("Ошибка при создании спора:", error);
        this.errorMessage = "Произошла ошибка при выполнении запроса.";
        this.successMessage = null; // Сбрасываем сообщение об успехе
      }
    },

    async newDisput() {
      try {
        const response = await axios.post("http://localhost:8080/sigDisputInChat", {
          Id_chat: this.selectedChat,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        // Проверим весь ответ от сервера
        console.log("Ответ от сервера:", response);

        // Проверяем структуру ответа
        if (response.data && response.data.status === "success") {
          alert("Спор открыт. Медиатор присоединиться к вашей беседе в ближайшее время.")
        } else {
          console.error("Неверный формат ответа или нет данных:", response.data);
          this.messages = []; // Очистка сообщений в случае ошибки
        }
      } catch (error) {
        console.error("Ошибка при запросе сообщений чата:", error.message);
      }
    },

    selectDisputM(disput) {
      if (this.selectDisput == null) {
        this.selectDisput = disput;
        console.log(this.selectDisput);
      } else {
        this.selectDisput = null;
      }
    },

    reqestNo() {
      this.selectDisput = null;
    },

    async reqestYes() {
      try {
        const response = await axios.post("http://localhost:8080/mediatorEnterInChat", {
          Id_chat: 36,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        // Проверим весь ответ от сервера
        console.log("Ответ от сервера:", response);

         // Проверяем структуру ответа
         if (response.data && response.data.status === "success" && Array.isArray(response.data.data)) {
          this.selectDisput = null;
          this.messages = response.data.data
            .map(message => ({
              uid: message.User_id,
              name: message.Name,
              role: message.User_role,
              text: message.Text,
              media: message.Media,
              date: new Date(message.Date), // Оставляем объект Date для сортировки
              media_pwd: message.Media_pwd,
            }))
            .sort((a, b) => a.date - b.date); // Сортируем по дате, самые новые в конце

          // Если нужно форматировать дату для отображения:
          this.messages = this.messages.map(message => ({
            ...message,
            date: message.date.toLocaleString(), // Преобразуем дату в строку
          }));
        } else {
          console.error("Неверный формат ответа или нет данных:", response.data);
          this.messages = []; // Очистка сообщений в случае ошибки
        }
      } catch (error) {
        console.error("Ошибка при запросе сообщений чата:", error.message);
      }
    },

    scrollToTop() {
      const messagesContainer = this.$refs.messagesRef;
      if (messagesContainer) {
        messagesContainer.scrollTop = 0;
      }
    },

    initChats(){
      //connect to Sockets Bay
      const token = Cookies.get('token');
      var sockets_bay_url = `ws://localhost:8080/handleWebSocket?token=${token}`;
      this.websocket      = new WebSocket(sockets_bay_url);
      
      this.websocket.onopen    = this.onSocketOpen;
      this.websocket.onmessage = this.onSocketMessage;
      this.websocket.onerror   = this.onSockerError;
    },
    onSocketOpen(evt){
      // alert("[open] Соединение установлено");
      // console.log("onSocketOpen");
      this.connection_ready = true;
    },
    onSocketMessage(evt){
        try {
          var received = JSON.parse(evt.data); // Разбираем JSON
        if(this.chatSelected == received.Chat_id) {
          console.log('Получено сообщение: ', received); // Выводим полученные данные
          console.log("onSocketMessage");
          console.log("chatSelect = ", this.chatSelected)
          console.log("Chat_id = ", received.Chat_id)
          this.messages.push({
              avatar: received.Avatar,
              uid: received.User_id,
              name: received.Name,
              text: received.Text,
              date: new Date(received.Sent_at).toLocaleTimeString(),
              role: received.User_role
            });
        }
        } catch (error) {
          console.error("Ошибка при разборе сообщения:", error);
        }
    },


    onSocketError(evt){
      console.log(`Ошибка WebSocket: ${evt.message || evt}`);
      this.connection_error = true;
    },

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

      if (!this.text.trim()){
        console.error("Пустая строка!")
        return;
      }

      try {
        const response = await axios.post("http://localhost:8080/sendMessage", {
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
        // this.scrollToBottom();

        // Дополнительная проверка данных
        if (response && response.data && response.data.status === "success") {
          this.messages.push({
            uid: this.user_id,
            text: this.text,
            date: new Date().toLocaleTimeString(),
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
      this.isInfoPopupChangeDealRequestEdit = false;
      this.isInfoPopupTorgi = false;
      this.isInfoTextUser = false;
    },
    showInfoTextUser(){
      this.isInfoTextUser = true;
    },
    showPopupModerDecision() {
      this.isInfoPopupModerDecision = true;
    },
    showPopupPopupChangeDeal() {
      this.isInfoPopupChangeDeal = true;
    },
    showPopupChangeDealRequestEdit() {
      this.isInfoPopupChangeDealRequestEdit = true;
    },
    showPopupTorgi() {
      this.isInfoPopupTorgi = true;
    },
    async ChatSelect(chatId) {
      this.chatSelected = chatId;

      try {
        // Отправляем запрос на сервер
        const response = await axios.post(
          "http://localhost:8080/openChat",
          { Id_chat: chatId },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // Для отправки cookies
          }
        );

        console.log(response)

        // Проверяем структуру ответа
        if (response.data && response.data.status === "success" && Array.isArray(response.data.data)) {
          this.idAds = response.data.ads_id;
          this.selectedChatProp = {user_id: response.data.slave_id, owner_id: response.data.owner_id, moderator_id: response.data.moderator_id};
          this.disputState = response.data.disput_state;
          // this.moderator_id = response.data.moderator_id;
          this.messages = response.data.data
            .map(message => ({
              uid: message.User_id,
              name: message.Name,
              role: message.User_role,
              text: message.Text,
              media: message.Media,
              date: new Date(message.Date), // Оставляем объект Date для сортировки
              media_pwd: message.Media_pwd,
            }))
            .sort((a, b) => a.date - b.date); // Сортируем по дате, самые новые в конце

          // Если нужно форматировать дату для отображения:
          this.messages = this.messages.map(message => ({
            ...message,
            date: message.date.toLocaleString(), // Преобразуем дату в строку
          }));
        } else {
          console.error("Неверный формат ответа или нет данных:", response.data);
          this.messages = []; // Очистка сообщений в случае ошибки
        }
      } catch (error) {
        console.error("Ошибка при запросе сообщений чата:", error.message);
      }
    },
    async CreateChats(){
      try {
        const response = await axios.get("http://localhost:8080/printChat", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // для отправки куки
        });
        console.log(response);
        if (response.data.status != "success") {
          this.chats = [];
          return false;
        } else if (response.data.message != "Чатов не найденно, либо они не созданны") {
          this.chats = response.data.data;
          for (let index = 0; index < this.chats.length; index++) {
            this.chats[index].avatar = this.chats[index].avatar != '' ? `data:image/png;base64,${this.chats[index].avatar}` : '';
          }
      // this.scrollToBottom();

          return true;
        }
      } catch (error) {
        console.error("Ошибка при загрузке чатов:", error);
        return false;
      }
    },

    async CreateDisputs(){
      try {
        const response = await axios.get("http://localhost:8080/disputeChatPanel", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // для отправки куки
        });
        if (response.data.status != "success") {
          this.disputs = [];
          console.log(response.data.message);
          return false;
        } else {
          this.disputs = response.data.data;
          // for (let index = 0; index < this.disputs.length; index++) {
            // this.disputs[index].avatar = this.disputs[index].avatar != '' ? `data:image/png;base64,${this.disputs[index].avatar}` : '';
          // }
          return true;
        }
      } catch (error) {
        console.error("Ошибка при загрузке disputs:", error);
        return false;
      }
    },
    async sendBiddingRequest() {
      try {
        const response = await axios.post(
          "http://localhost:8080/bidding",
          {
            Chat_id: this.selectedChat,
            Global_rate: this.globalRate,
            Start_at: this.startAt,
            End_at: this.endAt,
            PositionX: this.positionX,
            PositionY: this.positionY,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Для отправки куки
          }
        );

        // Обработка успешного ответа
        if (response.data.status === "success") {
          console.log("Успех:", response.data.message);
          alert("Транзакция прошла успешно");
          return response.data;
        } else {
          console.error("Ошибка:", response.data.message);
          alert(response.data.message || "Ошибка при выполнении запроса.");
          return null;
        }
      } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        alert("Произошла ошибка при выполнении запроса.");
        return null;
      }
    },
  },
  async created() {
    this.user_id = localStorage.getItem('Id')
      console.log()
    this.CreateChats();
    this.CreateDisputs();
  },
  data() {
    return {
      disputState: false,
      idAds: 0,
      selectedChatProp: null,
      disputs: [],
      avatar: '',
      connection_error : false , 
      connection_ready : false , 
      text: '',
      base64Image: null,
      user_id: null,
      selectDisput: null,
      chatSelected: null,
      isInfoPopupTorgi: false,
      isInfoPopupModerDecision: false,
      isInfoPopupChangeDeal: false,
      isInfoPopupChangeDealRequestEdit: false,
      messages: [],
      chats: [],
    };
  },
};
</script>

<style scoped>

.swiper-el{
  height: 4.5vw !important;
}

.button_status_request_spor{
  border: 0.1vw solid #E27622;
  border-radius: 0.6vw;
  width: 4vw;
  height: 2.2vw;
  align-items: end;
  display: flex;
  justify-content: center;
  padding-bottom: 0.5vw;
  background-color: #F98A33;
}

.button_status_request_torgi{
  border: 0.1vw solid #C2C2C2;
  border-radius: 0.6vw;
  width: 4vw;
  height: 2.2vw;
  align-items: end;
  display: flex;
  justify-content: center;
  padding-bottom: 0.5vw;
  background-color: #DEDDDB;
}

.button_status_request_torgi *{
  width: 1.6vw !important;
}

.button_status_request_spor *{
  width: 2vw;
}

.time_img{
  width: 1.3vw;
}

.info_img{
  width: 2vw;
}

.flex-block-big{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 13vw;
}

.flex-block-center{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 22vw;
  margin: 0 auto;
  margin-top: 0.5vw;
}

.flex-block{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 11vw;
}

#min-swiper {
  height: 0;
}

.dialog {
  height: 39.1vw;
}

.contact_name {
  margin-bottom: 0.5vw;
  font-size: var(--fs-14);
}

.contact {
  cursor: pointer;
}

.column_data {
  margin-left: 1vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.contact_img {
  border-radius: 50%;
  width: 3vw;
  height: 3vw;
}

.button_status_message {
  border-radius: 4vw;
  cursor: pointer;
  background-color: #b5b1ac;
  padding: 0.2vw 0.5vw;
  font-size: var(--fs-10);
  width: 4vw;
}

.button_new_message {
  background-color: #f9cc33;
  border-radius: 4vw;
  cursor: pointer;
  padding: 0.2vw 0.5vw;
  font-size: var(--fs-10);
  width: 7vw;
}

.button_status_request_desput_time{
  background-color: #FFDC67;
  padding: 0.7vw;
  align-items: center;
  align-content: center;
  align-self: center;
  border: 0.1vw solid #A96807;
  border-radius: 1vw;
  display: flex;
  width: 20vw;
  justify-content: space-between
}

.button_status_request_desput {
  border-radius: 4vw;
  background-color: #F98A33;
  padding: 0.3vw 0.8vw;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  font-size: var(--fs-10);
  width: min-content;
}

.container-chat {
  display: flex;
  height: 40vw;
  width: 100%;
}

.notification_mediator {
  position: absolute;
  z-index: 9;
  width: 68.8vw;
  background-color: white;
  padding: 1.2vw 0;
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

.mediator_header_request{
  border-bottom: 1px black solid;
  text-align: center;
  position: absolute;
  z-index: 10;
  width: 75.5vw;
  background-color: white;
  margin-top: -0.1vw;
}

.panel_mediator_req {
  padding: 5px 10px 5px 8px;
  display: flex;
  justify-content: start;
  align-items: center;
}

.panel_p{
  padding: 5px 10px 5px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mediator_ask_panel{
  position: absolute;
  top: 25vw;
  width: 26vw;
  height: 5vw;
  left: 40vw;
  background-color: white;
  font-size: var(--fs-14);
  text-align: center;
  z-index: 10;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.3vw 2vw 1vw 2vw;
}

.ask{
  font-size: var(--fs-18);
  text-align: center;
}

.request {
  display: flex;
  justify-content: space-between;
}

button.green {
  background-color: #00dd317d;
  border: 1px solid #135F00;
  border-radius: 1vw;
  width: 10vw;
  font-size: var(--fs-14);
}

button.grey {
  background-color: #CCCCCC;
  border-radius: 1vw;
  border: none;
  width: 10vw;
  font-size: var(--fs-14);
}

.notification {
  position: absolute;
  z-index: 9;
  background-color: white;
  width: 76.5%;
  padding: 0.5vw 0;
  border-bottom: 1px black solid;
  text-align: center;
  margin-top: -0.1vw;
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
  padding: 0.4vw 0.4vw;
  box-shadow: -0.1vw 0.3vw 0.5vw -0.2vw rgba(0, 0, 0, 0.348);
  border-radius: 0.4vw;
  align-items: center;
}

.contacts {
  background-color: #ffefb9;
  width: 24vw;
  height: 100%;
  overflow: auto;
}

.backgroud_contact_select {
  background-color: white;
  padding: 0.3vw 0.3vw !important;
  margin: 0.2vw 0 0 0;
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
  width: 76vw;
  height: 40vw;
}

.messages {
  height: 100%;
  width: 100%;
  overflow-x: scroll;
  overflow-y: none;
  background-color: white;
  overflow: overlay;
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
  justify-content: center;
}

.buttons {
  display: flex;
  justify-content: center;
  padding-top: 0.7vw;
}

.buttons button {
  border: none;
  cursor: pointer;
  background-color: #ffefb9;
}

.buttons button img {
  width: 2vw;
}

.form {
  padding-bottom: 1vw;
}

input {
  width: 100%;
  border: none;
  padding: 0;
  box-shadow: -0.1vw 0.3vw 0.6vw rgba(0, 0, 0, 0.348);
  border-radius: 0.5vw 0 0 0.5vw;
  margin: 0.5vw 1.5vw 0 0;
  padding-left: 1vw;
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
  width: 3vw;
  height: 55%;
  background-image: url("../assets/submit_chat.png");
  background-repeat: no-repeat;
  background-size: 2.5vw;
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

::-webkit-scrollbar {
    display: none;
}

.messages{
 overflow-x: scroll;
 transform:rotateX(180deg);
                -moz-transform:rotateX(180deg); /* Mozilla */
                -webkit-transform:rotateX(180deg); /* Safari and Chrome */
                -ms-transform:rotateX(180deg); /* IE 9+ */
                -o-transform:rotateX(180deg); /* Opera */
}
.inner{
   transform:rotateX(180deg);
                -moz-transform:rotateX(180deg); /* Mozilla */
                -webkit-transform:rotateX(180deg); /* Safari and Chrome */
                -ms-transform:rotateX(180deg); /* IE 9+ */
                -o-transform:rotateX(180deg); /* Opera */
}
</style>
