<template>
  <div class="v-popup-add-review">
    <div class="center">
      <div class="title">Чем все закончилось?</div>
      <form @submit.prevent="submitForm">
        <div class="flex-block">
          <div class="status-options">
            <label v-for="option in options" :key="option.value" class="status-option">
              <input
                type="radio"
                name="status"
                :value="option.value"
                v-model="selectedStatus"
              />
              <span
                :class="['status-dot', option.value === selectedStatus ? 'selected' : '']"
              ></span>
              <div class="status-text">
                <p class="status-title">{{ option.title }}</p>
                <p class="status-description">{{ option.description }}</p>
              </div>
            </label>
          </div>

          <div class="rating">
            <div class="title" style="margin: 0 0 1% 0">Оцените пользователя</div>
            <div class="rating_title">
              <div v-for="n in 5" :key="n" class="rating_container" @click="setRating(n)">
                <img
                  src="../../assets/star_yellow.png"
                  alt="Звезда"
                  class="rating_big"
                  v-if="n <= rating"
                />
                <img
                  src="../../assets/star_grey.png"
                  alt="Пустая звезда"
                  class="rating_big"
                  v-else
                />
              </div>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 3%">
          <div class="title" style="margin: 1% 0px 1.5%">Напишите отзыв</div>
          <textarea
            placeholder="Введите ваш отзыв..."
            v-model="comment"
            id="story"
            class="filter_block textarea"
            name="story"
            rows="5"
            cols="33"
          ></textarea>
          <div class="text_desc">Не более 2 000 символов</div>
        </div>
        <div class="center-block">
          <button type="submit">Отправить</button>
        </div>
      </form>
    </div>
    <div class="close_panel" @click="closeInfoPopup()"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedStatus: "", // выбранный статус
      rating: 0, // выбранный рейтинг
      comment: "", // текст отзыва
      options: [
        {
          value: "1",
          title: "Услуга оказана",
          description: "Исполнитель получил деньги",
        },
        {
          value: "2",
          title: "Работа не выполнена",
          description: "После того как вы договорились о сделке",
        },
        {
          value: "3",
          title: "Не договорились",
          description: "Не подошли условия или квалификация",
        },
        {
          value: "4",
          title: "Не общались",
          description: "Не удалось связаться",
        },
      ],
    };
  },
  props: {
    idProduct: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setRating(n) {
      this.rating = n; // Установить рейтинг при клике на звезду
    },
    async submitForm() {
      if (!this.selectedStatus || !this.rating || !this.comment) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }
      console.log(this.idProduct)
      console.log(this.rating)
      console.log(this.comment)
      console.log(this.selectedStatus)
      try {
        const response = await axios.post("http://localhost:8080/sigReview", {
          Ads_id: this.idProduct,
          Rating: this.rating,
          Comment: this.comment,
          State: parseInt(this.selectedStatus, 10),
        },
        {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      }
      );
        console.log(response)

        if (response.data.status === "success") {
          alert("Отзыв успешно отправлен!");
          this.closeInfoPopup();
        } else {
          alert("Ошибка при отправке отзыва: " + response.data.message);
        }
      } catch (error) {
        console.error("Ошибка при отправке отзыва:", error);
        alert("Произошла ошибка при отправке отзыва. Попробуйте снова.");
      }
    },
    closeInfoPopup() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style scoped>
.center-block{
  display: flex;
  justify-content: center;
}

form div button {
  background-color: #f9cc33;
  border-radius: 5px;
  padding: 0.3% 7%;
  border: none;
  align-content: center;
}

.rating_big {
  width: 75%;
}

.rating_title {
  display: flex;
  align-items: center;
  width: 75%;
}

.rating_title samp {
  font-size: var(--fs-18);
  font-weight: 500;
  margin-right: 1vw;
}

.textarea {
  height: 5vw;
  font-size: 14px;
  width: 95% !important;
}

.textarea::placeholder {
  font-size: 14px;
  color: #929292;
}

.flex-block {
  display: flex;
  justify-content: space-between;
  padding-right: 4%;
}

.filter_block::placeholder {
  font-size: 15px;
}

.filter_block {
  background-color: #f1f1f1;
  border-radius: 5px;
  padding-top: 0.8vw;
  padding-bottom: 0.8vw;
  padding-left: 1.5vw;
  padding-right: 3vw;
  border: none;
  width: 15vw;
  font-size: 15px;
  padding: 1%;
}

.status-options {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.status-option {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.status-option input[type="radio"] {
  display: none;
}

.status-dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: lightgray;
  margin-right: 4%;
}

.status-dot.selected {
  background-color: #ffd700; /* желтый цвет для выбранного состояния */
}

.status-text {
  display: flex;
  flex-direction: column;
}

.status-title {
  font-size: 12px;
  font-weight: bold;
  margin: 0;
}

.status-description {
  font-size: 10px;
  color: gray;
  margin: 0;
}

.close_panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 2%;
}

.container_comment {
  display: flex;
  align-items: flex-start;
  margin-top: 2vw;
}

.rating_title {
  display: flex;
  align-items: center;
}

.rating_title samp {
  font-size: var(--fs-18);
  font-weight: 500;
  margin-right: 1vw;
}

.rating_big {
  width: 70%;
}

.container_comments {
  overflow-y: scroll;
  height: 20vw;
  overflow-x: auto;
}

.text_desc {
  font-weight: 200;
  font-size: 14px;
  color: #141414;
}

.comment_title {
  font-size: 14px;
  color: #1d1d1d;
  font-weight: bold;
  margin-top: 0.4vw;
}

.comment_text {
  font-size: 12px;
  font-weight: 300;
  margin-top: 0.25vw;
}

.s-b {
  justify-content: space-between !important;
}

.flex_block {
  display: flex;
  align-items: flex-end;
}

.flex_center {
  align-items: center !important;
}

.rating_midle {
  width: 60%;
  margin-right: 0.25vw;
}

.rating_line {
  display: flex;
  justify-content: space-between;
  width: 41vw;
  align-items: center;
  margin-right: 3vw;
}

.rating_line samp {
  font-size: 14px;
}

.grey_button {
  background-color: #f1f1f1;
  padding: 0.3vw 1.5vw;
  cursor: pointer;
  font-size: 14px;
  border: none;
  border-radius: 0.5vw;
}

.container_selected {
  margin-top: 1vw;
  margin-bottom: 2vw;
}

.comment_img {
  border-radius: 50%;
  width: 2.5vw;
  margin-right: 1vw;
}

.comment_desc .name {
  font-size: 12px;
  font-weight: 600;
}

.state {
  font-size: 12px;
  margin-left: 0.4vw;
}

.rating_mini {
  width: 1vw;
  margin-right: 0.18vw;
}

.comment_desc .date {
  font-size: 10px;
  font-weight: 200;
}

.selecte_fileter {
  background: #f1f1f1 url("../../assets/selected_arrow.svg") no-repeat right 1.2vw center;
  background-size: 0.8vw;
  border: none;
  font-size: 12px;
  padding: 0.6vw 3vw 0.6vw 1vw;
  /* Резервируем место под стрелку */
  border-radius: 1vw;
  -webkit-appearance: none;
  /* Стиль для Safari */
  -moz-appearance: none;
  /* Стиль для Firefox */
  appearance: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.selecte_fileter:focus {
  border: none;
}

.selecte_fileter option {
  font-size: calc(14px);
}

.rat_line {
  height: 1px;
  width: 88%;
  background-color: #d9d9d9;
  margin: 0;
}

.center {
  width: 45%;
  padding: 1%;
  height: min-content;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: white;
  border: 1px solid black;
  box-shadow: 0vw 0.6px 12px rgba(0, 0, 0, 1);
}

.v-popup-add-review {
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
</style>
