<template>
  <div class="main">
    <v-popup-fitback v-if="isInfoPopupRatingView" @closePopup="closeInfoPopup" />
    <v-popup v-if="isInfoPopupView" @closePopup="closeInfoPopup" />
    <div class="detailProduct">
      <div class="block">
        <a @click="goBack" class="route-view">
          <img class="arrow_back" src="../assets/arrow_back.png" alt="" />
        </a>
        <div class="product">
          <h1>{{ detail.Title }}</h1>
          <div class="select-block">
            <img class="select-img" id="select-img" :src="currentImage" alt="" />
          </div>
          <swiper-container grabCursor class="swiper" slides-per-view="3">
            <swiper-slide v-for="(image, index) in images" :key="index" class="swiper-el">
              <img class="slider_img" :src="image" alt="" @click="setMainImage(image)" />
            </swiper-slide>
          </swiper-container>
          <div class="time_publication">5 часов назад</div>
          <div class="desc_title">Описание</div>
          <div class="desc_text">
            {{ detail.Description }}
          </div>
          <div class="desc_title">Характеристика</div>
          <ul class="desc_list">
            <li>Категория: Аренда спецтехники</li>
            <li>Техника: Дорожно-строительная техника</li>
            <li>Вид техники: Экскаватор-погрузчик</li>
            <li>Тип техники: Экскаватор-погрузчик</li>
            <li>Марка: JCB</li>
            <li>Модель: 3CX</li>
            <li>Объём копательного ковша, м³: 0.3</li>
            <li>Минимальная аренда: 2 ч</li>
            <li>Доставка техники: Есть</li>
          </ul>
          <div class="desc_title">Расположение</div>
          <div class="desc_text">
            {{ detail.Location }}
          </div>
          <div class="desc_map">
            <yandex-map
              v-model="map"
              :settings="{
                location: {
                  center: [37.617644, 55.755819],
                  zoom: 9,
                },
              }"
              width="100%"
              height="500px"
            >
              <yandex-map-default-scheme-layer />
            </yandex-map>
          </div>
          <!-- <div class="desc_title">Отзывы заказчиков</div>

          <div class="otsivi" id="otsivi">
            <div v-for="(review, index) in reviews" :key="index" class="ontsiv">
              <div class="ontsiv">
                <img class="author_img user_margin" src="../assets/user.png" alt="" />
                <div class="chat_block">
                  <div class="user_name">{{ review.Name }}</div>
                  <div class="rating_user_samp">6 апреля</div>
                  <div class="rating_user">
                    <div v-for="n in 5" :key="n" class="rating_star">
                      <img
                        src="../assets/star_yellow.png"
                        alt="Звезда"
                        v-if="n <= review.Rating"
                      />
                      <img src="../assets/star_grey.png" alt="Пустая звезда" v-else />
                    </div>
                    <samp class="rating_user_samp">Сделка состоялась </samp>
                  </div>
                  <div class="comment_title">Комментарий</div>
                  <div class="comment">{{ review.Comment }}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            @click="showReviews"
            id="showReviews"
            class="product_button_otsiz min-size"
          >
            Читать еще {{ reviewsLength }} отзывов
          </div> -->
        </div>
      </div>
      <div class="action">
        <div class="flex-row">
          <div class="desc_title">
            {{ detail.Hourly_rate }} ₽ за час<br />
            {{ detail.Daily_rate }} ₽ за день
          </div>
          <div class="product_status_g">Свободен</div>
          <img
            @click="clickFavorite"
            class="desc_star"
            src="../assets/star_yellow.png"
            v-if="adsFav"
            alt=""
          />
          <img
            @click="clickFavorite"
            class="desc_star"
            src="../assets/star_grey.png"
            v-else
            alt=""
          />
        </div>
        <section class="author_rating">
          <div class="product_button_chat" @click="clickChat()">Написать</div>
          <div class="product_button_date" @click="showPopup()">Выбрать дату</div>

          <div class="owner">
            <div class="author_name">{{ detail.Owner_host_name }}</div>
            <img class="author_img" src="../assets/user.png" alt="" />
          </div>
          <div class="rating_user">
            <samp class="rating_user_samp">5,0</samp>
            <div class="rating_star">
              <img src="../assets/star_yellow.png" alt="" /><img
                src="../assets/star_yellow.png"
                alt=""
              /><img src="../assets/star_yellow.png" alt="" /><img
                src="../assets/star_yellow.png"
                alt=""
              /><img src="../assets/star_yellow.png" alt="" />
            </div>
          </div>
          <samp @click="showPopupRating()" class="rating_user_samp">3 отзыва</samp>
          <div class="product_button_otsiz">11 объявлений пользователя</div>
          <div class="grafic">График работ: с 8:00 до 22:00</div>
        </section>
      </div>
    </div>
    <div class="recomendations">
      <div class="desc_title margin-top">Похожие объявления</div>
      <div class="recomendation_list">
        <div class="recomendation">
          <img src="../assets/product2.png" alt="" />
          <div class="recomendation_price">от 2 000 ₽ за смену</div>
          <div class="recomendation_desc">
            Республика Северная Осетия — Владикавказ, Затеречный район, р-н Затеречный 13
            марта 13:05
          </div>
        </div>
        <div class="recomendation">
          <img src="../assets/product2.png" alt="" />
          <div class="recomendation_price">от 2 000 ₽ за смену</div>
          <div class="recomendation_desc">
            Республика Северная Осетия — Владикавказ, Затеречный район, р-н Затеречный 13
            марта 13:05
          </div>
        </div>
        <div class="recomendation">
          <img src="../assets/product2.png" alt="" />
          <div class="recomendation_price">от 2 000 ₽ за смену</div>
          <div class="recomendation_desc">
            Республика Северная Осетия — Владикавказ, Затеречный район, р-н Затеречный 13
            марта 13:05
          </div>
        </div>
        <div class="recomendation">
          <img src="../assets/product2.png" alt="" />
          <div class="recomendation_price">от 2 000 ₽ за смену</div>
          <div class="recomendation_desc">
            Республика Северная Осетия — Владикавказ, Затеречный район, р-н Затеречный 13
            марта 13:05
          </div>
        </div>
      </div>
      <button class="button_show_more">Показать еще</button>
    </div>
  </div>
</template>

<script scoped>
import { ref } from "vue";
import axios from "axios";
import vPopup from "../components/popup/v-popup.vue";
import vPopupFitback from "../components/popup/v-popup-fitback.vue";
import { YandexMap, YandexMapDefaultSchemeLayer } from "vue-yandex-maps";
axios.defaults.xsrfCookieName = 'token'
axios.defaults.xsrfHeaderName = "token"

axios.defaults.withCredentials = true;

export default {
  props: {
    productId: Number,
  },
  data() {
    return {
      isInfoPopupView: false,
      isInfoPopupRatingView: false,
      map: null,
      coordinates: [],
      detail: {},
      favorite: [],
      adsFav: 0,
      reviews: [],
      reviewsLength: 0,
    };
  },
  components: {
    vPopup,
    vPopupFitback,
  },
  methods: {
    clickFavorite() {
      console.log(`ClickFav detail.Ads_id = ${this.detail.Ads_id}`)
      console.log(this.favorite)
      if (this.favorite.find((prod) => prod.Ads_id === this.detail.Ads_id) === undefined) {
        this.addFavorite(this.detail.Ads_id);
      } else {
        this.removeFavorite(this.detail.Ads_id);
      }
    },
    changeRoute(newRoute) {
      this.$emit("changeRoute", newRoute);
    },
    clickChat(){
      
      this.changeRoute('chat')
    },
    async addFavorite(idProduct) {
      console.log(`addFavorite ${idProduct}`);
      try {
        const response = await axios.post(
          "http://185.112.83.36:8090/sigFavAds",
          {
            Ads_id: idProduct,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // для отправки куки
          }
        );
        console.log(response)

        if (response.data.status === "fatal") {
          alert("Error addFavorite status:fatal");
        } else {
          this.getFavoritList();
        }
      } catch (error) {
        console.error("Ошибка при добавлении в избранное:", error);
      }
    },
    async removeFavorite(idProduct) {
      console.log(`removeFavorite ${idProduct}`);
      try {
        const response = await axios.post(
          "http://185.112.83.36:8090/delFavAds",
          {
            Ads_id: idProduct,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // для отправки куки
          }
        );
        console.log(response)

        if (response.data.status === "fatal") {
          alert("Error removeFavirite status:fatal");
        } else {
          this.getFavoritList();
        }
      } catch (error) {
        console.error("Ошибка при удалении из избранного:", error);
      }
    },
    async getFavoritList() {
      try {
        const response = await axios.get("http://185.112.83.36:8090/groupFavByRecent", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response)
        if (response.data.data.status == "fatal") {
          this.favorite = [];
        } else {
          this.favorite = response.data.data.slice(0, this.perPage);
          this.adsFav =
          this.favorite.find((prod) => prod.Ads_id === this.detail.Ads_id) != undefined;
        }
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      }
    },
    showReviews() {
      const listContainer = document.getElementById("otsivi");
      listContainer.classList.toggle("expanded");
    },

    getCoordData() {
      return new Promise((r) =>
        setTimeout(() => {
          this.coordinates = [
            [52.44, 69.73],
            [49.81, 62.12],
          ];
          r();
        }, 1000)
      );
    },
    setMarkers() {
      for (let i = 0; i < this.coordinates.length; i++) {
        let placemark = new ymaps.Placemark(this.coordinates[i]);
        this.map.geoObjects.add(placemark);
      }
    },
    closeInfoPopup() {
      this.isInfoPopupView = false;
      this.isInfoPopupRatingView = false;
    },
    showPopup() {
      this.isInfoPopupView = true;
    },

    showPopupRating() {
      this.isInfoPopupRatingView = true;
    },
    goBack() {
      this.$emit("goBack");
    },
  },
  async created() {
    console.log("Detail this.productId")
    console.log(this.productId)
    try {
      const response = await axios.post(
        "http://185.112.83.36:8090/printAds",
        {
          Ads_id: this.productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status != "success") console.log(response);
      this.detail = response.data.data;
      this.reviews = response.data.data.Customer_reviews;
    } catch (error) {
      console.error(
        "Ошибка при загрузке продукта:",
        error.response ? error.response.data : error.message
      );
    }

    try {
      const response = await axios.get("http://185.112.83.36:8090/groupFavByRecent", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.data.status == "fatal") {
        this.favorite = [];
      } else {
        this.favorite = response.data.data.slice(0, this.perPage);
        this.adsFav =
          this.favorite.find((prod) => prod.Ads_id === this.detail.Ads_id) != undefined;
        console.log(this.adsFav);
      }
    } catch (error) {
      console.error("Ошибка при загрузке избранного:", error);
    }
  },
  setup() {
    const images = ref([
      require("@/assets/product2.png"),
      require("@/assets/product2-1.png"),
      require("@/assets/product2-2.png"),
      require("@/assets/product2-3.png"),
    ]);

    const currentImage = ref(images.value[0]);

    const setMainImage = (image) => {
      currentImage.value = image;
    };

    return {
      images,
      currentImage,
      setMainImage,
    };
  },
};
</script>

<style scoped>
.otsivi.expanded {
  height: min-content !important; /* Новая высота для отображения всех элементов */
}

.button_show_more {
  display: block;
  background-color: black;
  color: #f9cc33;
  padding: 1.4vw 5vw;
  cursor: pointer;
  border-radius: 1vw;
  font-size: var(--fs-20);
  align-content: center;
  align-items: center;
  align-self: center;
  margin: 0 auto;
  margin-top: 4vw;
}

.main {
  margin: 0 5vw;
}

.comment_title {
  color: #1d1d1d;
  font-size: var(--fs-15);
  font-weight: bold;
}

.recomendation_price {
  font-weight: bold;
  font-size: var(--fs-20);
}

.recomendation_desc {
  font-size: var(--fs-20);
}

.select-block {
  height: 33.5vw;
  width: 33.5vw;
  margin-bottom: 1vw;
}

.margin-top {
  margin-top: 3vw !important;
  margin-bottom: 2vw !important;
}

.otsivi {
  height: 17vw;
  margin-top: 3vw;
  overflow: hidden;
}

.user_margin {
  margin-right: 1vw;
}

.recomendation_list {
  display: flex;
}

.recomendation {
  width: 20vw;
  margin-right: 2.5vw;
}

.recomendation img {
  width: 100%;
}

.ontsiv {
  display: flex;
}

.ontsiv:not(:first-child) {
  margin-top: 2vw;
}

.comment {
  color: #141414;
  font-size: var(--fs-15);
  font-weight: 400;
}

.owner {
  display: flex;
  justify-content: space-between;
  margin-top: 4vw;
}

.grafic {
  font-size: var(--fs-20);
  color: #929292;
  margin-top: 1vw;
  font-weight: 200;
}

.rating_user_samp {
  font-size: var(--fs-10);
  color: #929292;
  cursor: pointer;
}

.rating_user samp:first-child {
  margin-right: 5px;
}

.author_rating {
  width: 20vw;
  margin-top: 4vw;
}

.product_button_otsiz {
  margin-top: 1vw;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  color: black;
  background-color: #d9d9d9;
  font-size: var(--fs-15);
  border: solid 0.2vw #d9d9d9;
  border-radius: 1vw;
  padding: 0.6vw 0;
}

.product_button_chat {
  margin-top: 1vw;
  text-align: center;
  box-sizing: border-box;
  color: #000000;
  background-color: white;
  border: solid 0.2vw #000000;
  cursor: pointer;
  border-radius: 1vw;
  padding: 0.6vw 2.5vw;
}

.product_button_date {
  text-align: center;
  margin-top: 1vw;
  box-sizing: border-box;
  color: #f9cc33;
  background-color: white;
  cursor: pointer;
  border: solid 0.2vw #f9cc33;
  border-radius: 1vw;
  padding: 0.6vw 2.5vw;
}

.flex-row {
  display: flex;
  align-items: center;
  width: 30vw;
  justify-content: space-between;
}

.desc_star {
  height: 2vw;
  width: 2vw;
}

.product_status_g {
  color: #04c700;
  font-size: var(--fs-15);
}

.block {
  display: flex;
  margin-left: 5vw;
}

.action {
  margin-top: 2vw;
  margin-right: 3vw;
}

h1 {
  font-size: var(--fs-30);
  padding: 0;
  padding-bottom: 0.5vw;
}

.desc_title {
  font-weight: bold;
  font-size: var(--fs-25);
  margin-top: 0.6vw;
}

li::before {
  content: "•";
  font-size: var(--fs-20);
  margin-inline-end: 1ch;
}

.desc_list {
  font-size: var(--fs-20);
  padding: 0;
  line-height: 3vw;
}

.desc_text {
  font-size: var(--fs-20);
  line-height: 3vw;
}

.time_publication {
  color: #d9d9d9;
  margin-bottom: 5vw;
  margin-top: 1vw;
}

.swiper {
  width: 35vw;
  margin: 0;
  padding: 0;
}

.swiper-el {
  display: block;
  margin: 0;
  padding: 0;
}

.slider_img {
  display: block;
  width: 10vw;
  height: 6.5vw;
  border-radius: 1vw;
}

.select-img {
  width: 100%;
  height: 100%;
  border-radius: 1vw;
  object-fit: cover;
}

.rating_user {
  display: flex;
}

.product {
  width: 35vw;
}

.rating_star {
  display: flex;
}

.rating_star img {
  width: 0.9vw;
  height: 0.8vw;
}

.rating_user samp {
  font-size: var(--fs-10);
  color: #929292;
}

.rating_user samp:first-child {
  margin-right: 5px;
}

.rating_user samp:last-child {
  margin-left: 5px;
}

.author_name {
  font-size: var(--fs-16);
  align-self: center;
}

.author_img {
  border-radius: 50%;
  width: 3vw;
  height: 3vw;
}

.detailProduct {
  display: flex;
  justify-content: space-between;
  margin-top: 2vw;
}

.arrow_back {
  border-radius: 50%;
  height: 2.5vw;
  padding: 0.5vw 0.4vw;
  box-shadow: 0 0 1vw rgba(0, 0, 0, 0.25);
  margin-top: 2vw;
  margin-right: 5vw;
}

.min-size {
  width: 20vw;
  color: #929292;
  margin-top: 4vw;
  font-size: var(--fs-20);
}
</style>
