<template>
  <div class="v-popup-moder-decision">
    <div class="center">
      <div class="popup-header">
        <img src="../../assets/info.png" alt="" />
        <samp class="link">Отложить.</samp>
      </div>
      <div class="padding">
        <div class="title">Чью сторону принимает медиатор?</div>
        <textarea
          v-model="text"
          name="desc"
          id="desc"
          cols="53"
          rows="4"
          minlength="200"
          placeholder="Напишите комментарий о своем решении"
        ></textarea>
        <div :class="{grey_min_text: true, error: textError}">Не менее 200 символов</div>
        <div class="users">
          <div class="user">
            <div class="center-block">
              <img src="../../assets/user.png" alt="" />
            </div>
            <div class="name" @click="mediatorFinishJobUser">Алексей К.</div>
          </div>
          <div class="up-line"></div>
          <div class="user">
            <div class="center-block">
              <img src="../../assets/user.png" alt="" />
            </div>
            <div class="name" @click="mediatorFinishJobOwner">Валентин Ж.</div>
          </div>
        </div>
      </div>
    </div>
    <div class="close_panel" @click="closeInfoPopup()"></div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    selectedChat: Number,
  },
  data() {
    return {
      text: '',
      textError: false,
    };
  },
  components: {},
  methods: {
    validation(){
      if (this.text.length > 200) {
        this.textError = true;
      } else {
        this.textError = false;
      }
    },
    async mediatorFinishJobUser() {
      if(this.validation){
        try {
          const response = await axios.post("http://185.112.83.36:8080/mediatorFinishJobUser", {
            Chat_id: this.selectedChat,
            Amount: 0,
            Comment: this.text,
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
            alert("Спор закрыт.")
          } else {
            alert("Неверный формат ответа или нет данных.")
            console.error("Неверный формат ответа или нет данных:", response.data);
          }
        } catch (error) {
          console.error("Ошибка при запросе mediatorFinishJobUser:", error.message);
        }
      }
    },

    async mediatorFinishJobOwner() {
      if(this.validation){
        try {
          const response = await axios.post("http://185.112.83.36:8080/mediatorFinishJobOwner", {
            Chat_id: this.selectedChat,
            Comment: this.text,
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
            alert("Спор закрыт.")
          } else {
            alert("Неверный формат ответа или нет данных.")
            console.error("Неверный формат ответа или нет данных:", response.data);
          }
        } catch (error) {
          console.error("Ошибка при запросе mediatorFinishJobUser:", error.message);
        }
      }
    },

    closeInfoPopup() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style scoped>
.up-line {
  height: 9vw;
  width: 1px;
  background-color: #949494;
  margin: 0 2vw;
}

.center-block{
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

.grey_min_text {
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
  width: 44vw;
  padding: 2vw;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 1.5vw;
  background-color: white;
  border: 0.1vw solid black;
  box-shadow: 0vw 0.6vw 12px rgba(0, 0, 0, 1);
}

.v-popup-moder-decision {
  position: fixed;
  z-index: 11;
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