<template>
  <div class="v-popup-add-review">
    <div class="center">
      <div class="title">Чем все закончилось?</div>
      <form action="">
        <div class="flex-block">
          <div class="status-options">
            <label v-for="option in options" :key="option.value" class="status-option">
              <input
                type="radio"
                name="status"
                :value="option.value"
                v-model="selectedStatus"
                @change="handleChange"
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
            <div class="title" style="margin: 0 0 1vw 0">Оцените пользователя</div>
            <div class="rating_title">
              <div v-for="n in 5" :key="n" class="rating_container">
                <img
                  src="../../assets/star_yellow.png"
                  alt="Звезда"
                  class="rating_big"
                  v-if="n <= 5"
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

        <div style="margin-bottom: 4vw">
          <div class="title" style="margin: 2vw 0 1.5vw 0">Напишите отзыв</div>
          <textarea
            placeholder="В тексте не должно содержаться оскорблений, ненормативной лексики и чужой личной информации, такой как фамилия, контактные данные и адрес."
            v-model="desc"
            id="story"
            class="filter_block textarea"
            name="story"
            rows="5"
            cols="33"
          ></textarea>
          <div class="text_desc">Не более 2 000 символов</div>
        </div>
        <div class="center-block">
          <button>Отправить</button>
        </div>
      </form>
    </div>
    <div class="close_panel" @click="closeInfoPopup()"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import axios from "axios";
export default {
  data() {
    return {
      reviews: [],
      selected: "Сначала новые",
      stars: [0, 0, 0, 0, 0],
      selectedStatus: "", // переменная для хранения выбранного значения
      options: [
        {
          value: "done",
          title: "Услуга оказана",
          description: "Исполнитель получил деньги",
        },
        {
          value: "not_done",
          title: "Работа не выполнена",
          description: "После того как вы договорились о сделке",
        },
        {
          value: "no_agreement",
          title: "Не договорились",
          description: "Не подошли условия или квалификация",
        },
        {
          value: "no_contact",
          title: "Не общались",
          description: "Не удалось связаться",
        },
      ],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    handleChange() {
      console.log(this.selectedStatus); // выводим выбранное значение в консоль
    },

    closeInfoPopup() {
      this.$emit("closePopup");
    },

    groupReview() {
      console.log("@click=groupReview");
      switch (selected) {
        case "Сначала новые":
          groupReviewNewOnesFirst();
          break;
        case "Сначала старые":
          groupReviewOldOnesFirst();
          break;
        default:
          break;
      }
    },
    closeInfoPopup() {
      this.$emit("closePopup");
    },
    async groupReviewOldOnesFirst() {
      try {
        const response = await axios.get(
          "http://185.112.83.36:8080/groupReviewOldOnesFirst",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status === "success") {
          this.reviews = response.data.data;
        } else {
          alert("Error groupReviewLowRatOnesFirst status:fatal");
        }
      } catch (error) {
        console.error("Ошибка при выводе отзывав:", error);
      }
    },
    async groupReviewNewOnesFirst() {
      try {
        const response = await axios.get(
          "http://185.112.83.36:8080/groupReviewNewOnesFirst",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status === "success") {
          this.reviews = response.data.data;
        } else {
          alert("Error groupReviewLowRatOnesFirst status:fatal");
        }
      } catch (error) {
        console.error("Ошибка при выводе отзывав:", error);
      }
    },
  },
  async created() {
    try {
      const response = await axios.get(
        "http://185.112.83.36:8080/groupReviewNewOnesFirst",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === "success") {
        this.reviews = response.data.data;
      } else {
        alert("Error groupReviewLowRatOnesFirst status:fatal");
      }
    } catch (error) {
      console.error("Ошибка при выводе отзывав:", error);
    }
  },
  setup() {},
};
</script>

<style scoped>
.center-block{
  display: flex;
  justify-content: center;
}

form div button {
  background-color: #f9cc33;
  border-radius: 1vw;
  padding: 1vw 6vw;
  border: none;
  align-content: center;
}

.rating_big {
  width: 2vw;
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

.textarea {
  height: 5vw;
  font-size: var(--fs-15);
  width: 41vw !important;
}

.textarea::placeholder {
  font-size: var(--fs-15);
  color: #929292;
}

.flex-block {
  display: flex;
  justify-content: space-between;
  padding-right: 5vw;
}

.filter_block {
  background-color: #f1f1f1;
  border-radius: 1vw;
  padding-top: 0.8vw;
  padding-bottom: 0.8vw;
  padding-left: 1.5vw;
  padding-right: 3vw;
  border: none;
  width: 15vw;
  font-size: var(--fs-20);
  padding: 2vw;
}

.status-options {
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
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
  width: 1.1vw;
  height: 1.1vw;
  border-radius: 50%;
  background-color: lightgray;
  margin-right: 1.1vw;
}

.status-dot.selected {
  background-color: #ffd700; /* желтый цвет для выбранного состояния */
}

.status-text {
  display: flex;
  flex-direction: column;
}

.status-title {
  font-size: var(--fs-14);
  font-weight: bold;
  margin: 0;
}

.status-description {
  font-size: var(--fs-10);
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
  font-size: var(--fs-20);
  font-weight: 600;
  margin-bottom: 2vw;
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
  width: 2vw;
}

.container_comments {
  overflow-y: scroll;
  height: 20vw;
  overflow-x: auto;
}

.text_desc {
  font-weight: 200;
  font-size: var(--fs-15);
  color: #141414;
}

.comment_title {
  font-size: var(--fs-15);
  color: #1d1d1d;
  font-weight: bold;
  margin-top: 0.4vw;
}

.comment_text {
  font-size: var(--fs-14);
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
  width: 1.2vw;
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
  font-size: var(--fs-15);
}

.grey_button {
  background-color: #f1f1f1;
  padding: 0.3vw 1.5vw;
  cursor: pointer;
  font-size: var(--fs-15);
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
  font-size: var(--fs-14);
  font-weight: 600;
}

.state {
  font-size: var(--fs-14);
  margin-left: 0.4vw;
}

.rating_mini {
  width: 1vw;
  margin-right: 0.18vw;
}

.comment_desc .date {
  font-size: var(--fs-10);
  font-weight: 200;
}

.selecte_fileter {
  background: #f1f1f1 url("../../assets/selected_arrow.svg") no-repeat right 1.2vw center;
  background-size: 0.8vw;
  border: none;
  font-size: var(--fs-14);
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
  font-size: calc(var(--fs-15));
}

.rat_line {
  height: 1px;
  width: 30vw;
  background-color: #d9d9d9;
  margin: 0 1vw 0 0.5vw;
}

.center {
  width: 60vw;
  padding: 2vw;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 1.5vw;
  background-color: white;
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
