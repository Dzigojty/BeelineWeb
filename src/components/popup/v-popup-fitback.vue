<template>
  <v-popup-add-review v-if="isInfoPopupAddReview" @closePopup="closeInfoPopup" />
  <div class="v-popup-fitback">
    <div class="center">
      <div class="title">Отзывы о пользователе</div>
      <div class="rating_title">
        <samp>5,0</samp>
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
      <div class="text_desc">на основании {{reviews.length}} оценок</div>
      <div class="flex_block s-b">
        <div class="matrix_rating">
          <div class="rating_line">
            <div v-for="n in 5" :key="n" class="rating_container">
              <img
                src="../../assets/star_yellow.png"
                alt="Звезда"
                class="rating_midle"
                v-if="n <= 5"
              />
              <img
                src="../../assets/star_grey.png"
                alt="Пустая звезда"
                class="rating_midle"
                v-else
              />
            </div>
            <div class="rat_line"></div>
            <samp>{{stars[0]}}</samp>
          </div>
          <div class="rating_line">
            <div v-for="n in 5" :key="n" class="rating_container">
              <img
                src="../../assets/star_yellow.png"
                alt="Звезда"
                class="rating_midle"
                v-if="n <= 4"
              />
              <img
                src="../../assets/star_grey.png"
                alt="Пустая звезда"
                class="rating_midle"
                v-else
              />
            </div>
            <div class="rat_line"></div>
            <samp>0</samp>
          </div>
          <div class="rating_line">
            <div v-for="n in 5" :key="n" class="rating_container">
              <img
                src="../../assets/star_yellow.png"
                alt="Звезда"
                class="rating_midle"
                v-if="n <= 3"
              />
              <img
                src="../../assets/star_grey.png"
                alt="Пустая звезда"
                class="rating_midle"
                v-else
              />
            </div>
            <div class="rat_line"></div>
            <samp>{{stars[0]}}</samp>
          </div>
          <div class="rating_line">
            <div v-for="n in 5" :key="n" class="rating_container">
              <img
                src="../../assets/star_yellow.png"
                alt="Звезда"
                class="rating_midle"
                v-if="n <= 2"
              />
              <img
                src="../../assets/star_grey.png"
                alt="Пустая звезда"
                class="rating_midle"
                v-else
              />
            </div>
            <div class="rat_line"></div>
            <samp>{{stars[0]}}</samp>
          </div>
          <div class="rating_line">
            <div v-for="n in 5" :key="n" class="rating_container">
              <img
                src="../../assets/star_yellow.png"
                alt="Звезда"
                class="rating_midle"
                v-if="n <= 1"
              />
              <img
                src="../../assets/star_grey.png"
                alt="Пустая звезда"
                class="rating_midle"
                v-else
              />
            </div>
            <div class="rat_line"></div>
            <samp>{{stars[0]}}</samp>
          </div>
        </div>
        <button @click="addReviewPopap" class="grey_button">Добавить отзыв</button>
      </div>
      <div class="container_selected">
        <select v-model="selected" class="selecte_fileter" name="filter" id="">
          <option>Сначала новые</option>
          <option>Сначала старые</option>
        </select>
      </div>
      <div class="container_comments">
        <div v-for="(review, index) in reviews" :key="index" class="container_comment">
          <img class="comment_img" src="../../assets/user.png" alt="" />
          <div class="comment_desc">
            <div class="name">{{ review.Name }}</div>
            <div class="date">6 апреля</div>
            <div class="flex_block">
              <div v-for="n in 5" :key="n" class="rating_container">
                <img
                  src="../../assets/star_yellow.png"
                  alt="Звезда"
                  v-if="n <= review.Rating"
                  class="rating_mini"
                />
                <img
                  src="../../assets/star_grey.png"
                  alt="Пустая звезда"
                  class="rating_mini"
                  v-else
                />
              </div>
              <div class="state">Сделка состоялась</div>
            </div>
            <div class="comment_title">Комментарий</div>
            <div class="comment_text">{{ review.Comment }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="close_panel" @click="closeInfoPopup()"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import vPopupAddReview from "../popup/v-popup-add-review.vue";
import "swiper/swiper-bundle.css";
import axios from "axios";
export default {
  data() {
    return {
      isInfoPopupAddReview: false,
      reviews: [],
      selected: "Сначала новые",
      stars: [0,0,0,0,0]
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    vPopupAddReview,
  },
  methods: {
    //add review
    closeInfoPopup() {
      this.isInfoPopupView = false;
      this.isInfoPopupAddReview = false;
    },
    addReviewPopap() {
      this.isInfoPopupAddReview = true;
    },

    
    groupReview(){
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
.close_panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.title {
  font-size: var(--fs-25);
  font-weight: bold;
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
  padding: 0.6vw 3vw 0.6vw 1vw; /* Резервируем место под стрелку */
  border-radius: 1vw;
  -webkit-appearance: none; /* Стиль для Safari */
  -moz-appearance: none; /* Стиль для Firefox */
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

.v-popup-fitback {
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
</style>
