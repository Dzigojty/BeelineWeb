<template>
  <v-popup-add-review :idProduct="idProduct" v-if="isInfoPopupAddReview" @closePopup="closeInfoPopup" />
  <div class="v-popup-fitback">
    <div class="center">
      <div class="title">Отзывы о пользователе</div>
      <div class="rating_title">
        <samp>{{rating_num}}</samp>
        <div v-for="n in 5" :key="n" class="rating_container">
          <img
            src="../../assets/star_yellow.png"
            alt="Звезда"
            class="rating_big"
            v-if="n <= rating_num"
          />
          <img
            src="../../assets/star_grey.png"
            alt="Пустая звезда"
            class="rating_big"
            v-else
          />
        </div>
      </div>
      <div class="text_desc" v-if="reviewsCounter && reviews != null">
        на основании {{ reviews.length }} оценок
      </div>
      <div class="text_desc" v-else>
        Нет оценок
      </div>
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
            <samp>{{stars[1]}}</samp>
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
            <samp>{{stars[2]}}</samp>
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
            <samp>{{stars[3]}}</samp>
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
            <samp>{{stars[4]}}</samp>
          </div>
        </div>
        <button @click="addReviewPopap" class="grey_button">Добавить отзыв</button>
      </div>
      <div class="container_selected">
        <select v-model="selected" @change="onFilterChange" class="selecte_fileter" name="filter" id="">
          <option value="new">Сначала новые</option>
          <option value="old">Сначала старые</option>
        </select>
      </div>
      <div class="container_comments">
        <div v-for="(review, index) in reviews" :key="index" class="container_comment">
          <img class="comment_img" :src="'data:image/png;base64,'+review.Review_avatar" alt="" />
          <div class="comment_desc">
            <div class="name">{{ review.Name }}</div>
            <div class="date">{{ formatDate(review.Updated_at_comment) }}</div>
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
import vPopupAddReview from "./v-popup-add-review.vue";
import "swiper/swiper-bundle.css";
import axios from "axios";
export default {
  data() {
    return {
      isInfoPopupAddReview: false,
      reviews: [],
      rating_num: 0,
      selected: "new", // По умолчанию "Сначала новые"
      stars: [0, 0, 0, 0, 0],
    };
  },
  props: {
    idProduct: {
      type: Number,
      required: true,
    },
  },
  computed: {
    reviewsCounter() {
      return this.apiData?.reviews || []; // Используем пустой массив, если данные ещё не загружены
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    vPopupAddReview,
  },
  methods: {
    formatDate(unixTimestamp) {
      if (!unixTimestamp) return 'Дата неизвестна'; // Обработка некорректных данных
      try {
        const timestamp = unixTimestamp * 1000; // Переводим в миллисекунды
        const date = new Date(timestamp);
        const formatter = new Intl.DateTimeFormat('ru-RU', {
          day: 'numeric',
          month: 'long',
        });
        return formatter.format(date);
      } catch (error) {
        console.error('Ошибка при форматировании даты:', error);
        return 'Дата неизвестна';
      }
    },

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
    // Метод для обработки изменения фильтра
    async onFilterChange() {
      if (this.selected === "new") {
        await this.groupReviewNewOnesFirst();
      } else if (this.selected === "old") {
        await this.groupReviewOldOnesFirst();
      }
    },
    async groupReviewOldOnesFirst() {
      console.log("groupReviewOldOnesFirst");
      try {
        const response = await axios.post(
          "http://185.112.83.36:8080/groupReviewOldOnesFirst",
          {
            ads_id: this.idProduct,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.status === "success") {
          this.reviews = response.data.data.Review_list;
        } else {
          alert("Error groupReviewLowRatOnesFirst status:fatal");
        }
      } catch (error) {
        console.error("Ошибка при выводе отзывов:", error);
      }
    },
    async groupReviewNewOnesFirst() {
      console.log("groupReviewNewOnesFirst");
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
          this.reviews = response.data.data.Review_list;
          console.log(this.reviews[0]);
        } else {
          alert("Error groupReviewLowRatOnesFirst status:fatal");
        }
      } catch (error) {
        console.error("Ошибка при выводе отзывов:", error);
      }
    },
  },
  async created() {
    console.log(this.idProduct)
    try {
      const response = await axios.post(
        "http://185.112.83.36:8080/groupReviewNewOnesFirst",
        {
          ads_id: this.idProduct,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(response.data.status);
      if (response.data.status != "success") console.log("fatalLLLLLLLLLLLL");
      this.reviews = response.data.data.Review_list;
      console.log(this.reviews);
      this.stars[4] = response.data.data.Star_five;
      this.stars[3] = response.data.data.Star_four;
      this.stars[2] = response.data.data.Star_thre;
      this.stars[1] = response.data.data.Star_two;
      this.stars[0] = response.data.data.Star_one;
      this.rating_num = response.data.data.Rating_num;
    } catch (error) {
      console.error(
        "Ошибка при загрузке отзывов:",
        error.response ? error.response.data : error.message
      );
    }
  },
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
  font-size: 18px;
  font-weight: bold;
}

.container_comment {
  display: flex;
  align-items: flex-start;
  margin-top: 2vw;
}

.rating_title {
  display: flex;
  width: 32%;
  align-items: center;
}

.rating_title samp {
  font-size: 16px;
  font-weight: 500;
  margin-right: 7px;
}

.rating_big {
  width: 106%;
}

.container_comments {
  overflow-y: scroll;
  height: 74%;
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
}

.rating_line {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.rating_line samp {
  font-size: 14px;
}

.grey_button {
  background-color: #f1f1f1;
  padding: 0.3% 3%;
  cursor: pointer;
  font-size: 14px;
  border: none;
  border-radius: 5px;
}

.container_selected {
  margin-top: 1%;
  margin-bottom: 2%;
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
  font-size: var(--fs-10);
  font-weight: 200;
}

.selecte_fileter {
  background: #f1f1f1 url(http://localhost:3000/img/selected_arrow.105101f5.svg) no-repeat right 13% center;
  background-size: 10%;
  border: none;
  font-size: 13px;
  padding: 0.6% 5% 0.6% 3%;
  border-radius: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-top: 10px;
}

.selecte_fileter:focus {
  border: none;
}

.selecte_fileter option {
  font-size: calc(14px);
}

.rat_line {
  height: 1px;
  width: 30vw;
  background-color: #d9d9d9;
  margin: 0 1vw 0 0.5vw;
}

.matrix_rating{
  width: 70%;
}

.rating_container {
  width: 10%;
}

.center {
  width: 500px;
  padding: 1%;
  height: 80%;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: white;
  border: 0.1vw solid black;
  box-shadow: 0 5px 9px rgba(0, 0, 0, 1);
}

.v-popup-fitback {
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0);
}
</style>
