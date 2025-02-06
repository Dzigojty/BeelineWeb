<template>
  <div class="main">
    <v-popup-fitback v-if="isInfoPopupRatingView" :idProduct="idProduct" @closePopup="closeInfoPopup" />
    <v-popup :dailyRate="detail.Daily_rate" :hourlyRate="detail.Hourly_rate" :idProduct="idProduct" v-if="isInfoPopupView" @closePopup="closeInfoPopup" />
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
      
          </div>
          <div class="desc_title">Отзывы заказчиков</div>

          <div class="otsivi" id="otsivi">
            <div v-for="(review, index) in reviews" :key="index" class="ontsiv">
              <div class="ontsiv">
                <img
                  class="author_img user_margin"
                  :src="'data:image/png;base64,' + review.Review_avatar"
                  alt=""
                />
                <div class="chat_block">
                  <div class="user_name">{{ review.Review_name }}</div>
                  <div class="rating_user_samp">{{ formatDate(review.Updated_at_comment) }}</div>
                  <div class="rating_user">
                    <div v-for="n in 5" :key="n" class="rating_star">
                      <img
                        src="../assets/star_yellow.png"
                        alt="Звезда"
                        v-if="n <= review.Rating"
                      />
                      <img src="../assets/star_grey.png" alt="Пустая звезда" v-else />
                    </div>
                    <samp class="rating_user_samp">Сделка состоялась</samp>
                  </div>
                  <div class="comment_title">Комментарий</div>
                  <div class="comment">{{ review.Comment }}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            @click="showPopupRating()"
            id="showReviews"
            class="product_button_otsiz min-size"
          >
            Читать еще {{ reviewsLength }} отзывов
          </div>
        </div>
      </div>
      <div class="action">
        <div class="flex-row">
          <!-- <div class="desc_title">
            {{ detail.Hourly_rate }} ₽ за час
          </div> -->
          <div v-if="detail.Hourly_rate != 0" class="desc_title">{{ detail.Hourly_rate }} ₽ за час</div>
          <div v-if="detail.Daily_rate != 0" class="desc_title">{{ detail.Daily_rate }} ₽ за смену</div>
          <div v-if="detail?.Duration" 
              :class="{ product_status_r: detail.Duration.includes('Занят'), 
                        product_status_g: !detail.Duration.includes('Занят') }">
            {{ detail.Duration }}
          </div>
          <div class="product_status_g" v-else>
            Информация отсутствует
          </div>

          <!-- <div class="product_status_r">
            {{ detail.Duration }}
          </div> -->
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
            <div class="author_name">{{ detail.Owner_name }}</div>
            <img class="author_img" :src="detail.Avatar" alt="" />
          </div>
          <div class="rating_user">
            <div class="rating_user">
              <samp class="rating_user_samp">{{ detail.Owner_rating }}</samp>
              <div class="rating_star">
                <img
                  v-for="n in 5"
                  :key="n"
                  :src="n <= Math.round(detail.Owner_rating) ? require(`@/assets/star_yellow.png`) : require('@/assets/star_grey.png')"
                  :alt="n <= Math.round(detail.Owner_rating) ? 'Желтая звезда' : 'Серая звезда'"
                />
              </div>
            </div>
          </div>

          <samp class="rating_user_samp">0 отзывов</samp>
          <div class="product_button_otsiz">{{ detail.Ads_count }} объявлений пользователя</div>
          <div class="grafic">График работ: с 8:00 до 22:00</div>
        </section>
      </div>
    </div>
    <div class="recomendations">
      <div class="desc_title margin-top">Похожие объявления</div>
      <div class="recomendation_list" >
        <div class="recomendation" v-for="prod in displayedProducts" @click="selectProduct(prod.Id)">
          <img src="../assets/product2.png" alt="" />
          <div v-if="prod.Hourly_rate != 0" class="recomendation_price">от {{prod.Hourly_rate}} ₽ за час</div>
          <div v-if="prod.Daily_rate != 0" class="recomendation_price">от {{prod.Daily_rate}} ₽ за смену</div>
          <div class="recomendation_desc">
            {{prod.Title}}
          </div>
        </div>
      </div>
      <button @click="loadMore" v-if="canLoadMore" class="button_show_more">Показать еще</button>
    </div>
  </div>
</template>

<script scoped>
import { ref } from "vue";
import axios from "axios";
import vPopup from "../components/popup/v-popup.vue";
import vPopupFitback from "../components/popup/v-popup-fitback.vue";
// import { YandexMap, YandexMapDefaultSchemeLayer } from "vue-yandex-maps";
axios.defaults.xsrfCookieName = 'token'
axios.defaults.xsrfHeaderName = "token"

axios.defaults.withCredentials = true;

export default {
  props: {
    idProduct: Number,
  },
  data() {
    return {
      isInfoPopupView: false,
      localIdProduct: null,
      isInfoPopupRatingView: false,
      map: null,
      coordinates: [],
      detail: {},
      currentPage: 1,
      favorite: [],
      perPage: 5,
      displayedProducts: [],
      prods: [],
      adsFav: 0,
      reviews: [],
      reviewsLength: 0,
      mapSettings: {
        center: [55.751244, 37.618423], // Центр карты (Москва)
        zoom: 10, // Уровень приближения
      },
    };
  },
  computed: {
    canLoadMore() {
      console.log("prods:", this.prods);
      console.log("displayedProducts:", this.displayedProducts);
      if (!this.prods || !Array.isArray(this.prods)) {
        console.error("prods не определен или не является массивом");
        return false;
      }
      return this.displayedProducts.length < this.prods.length;
    }
  },
  components: {
    vPopup,
    vPopupFitback,
  },
  methods: {
    loadMore() {
      this.currentPage++;
      const start = this.displayedProducts.length;
      const end = start + this.perPage;
      this.displayedProducts.push(...this.prods.slice(start, end));
    },
    selectProduct(product) {
      this.localIdProduct = product;
      console.log("this.localIdProduct",this.localIdProduct);
      this.printAds();
    },
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
      this.createChat()
      this.changeRoute('chat')
    },

    async createChat() {
      console.log(`addFavorite ${this.localIdProduct}`);
      try {
        const response = await axios.post(
          "http://localhost:8080/sigChat",
          {
            Ads_id: this.localIdProduct,
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
          alert("Создан новый чат")
        }
      } catch (error) {
        console.error("Ошибка при добавлении в избранное:", error);
      }
    },
    
    async addFavorite(idProduct) {
      console.log(`addFavorite ${idProduct}`);
      try {
        const response = await axios.post(
          "http://localhost:8080/sigFavAds",
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
          "http://localhost:8080/delFavAds",
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
        const response = await axios.get("http://localhost:8080/groupFavByRecent", {
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
    async loadProducts() {
      try {
        const response = await axios.post(
          "http://localhost:8080/sortProductListCategoriez",
          { Category: [this.detail.Category_id] },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.status === "fatal") {
          console.error("Ошибка загрузки данных:", response.data.message);
          this.prods =  []
          return;
        }

        // Предположим, данные находятся в response.data.data
        this.prods = Array.isArray(response.data.data) ? response.data.data : [] 

        // Инициализация отображаемых продуктов
        this.displayedProducts = this.prods.slice(0, this.perPage);
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
        this.prods = []; // На случай ошибки оставляем массив пустым
      }
    },

    async printAds() {
      console.log("Detail this.localIdProduct")
      console.log(this.localIdProduct)
      try {
        const response = await axios.post(
          "http://localhost:8080/printAds",
          {
            Ads_id: this.localIdProduct,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response)
        if (response.data.status != "success") console.log(response);

        this.detail = response.data.data;
        this.detail.Avatar = this.detail.Avatar != 'File not found' ? `data:image/png;base64,${this.detail.Avatar}` : '../assets/user.png';
        this.reviews = response.data.data.reviews;
        
        // Update images based on API response
        console.log("this.images");
        if (response.data.data.Imags.length > 0) {
          this.images = response.data.data.Imags.map(img => img !=  "Error reading file" ? `data:image/png;base64,${img}` : require("@/assets/product2.png"));
        } else {
          this.images = [require("@/assets/product2.png")];
          this.currentImage = require("@/assets/product2.png");
        }
        console.log(this.images);

      } catch (error) {
        console.error(
          "Ошибка при загрузке продукта:",
          error.response ? error.response.data : error.message
        );
      }
    }
  },
  async created() {
    this.localIdProduct = this.idProduct;
    this.printAds();

    try {
      const response = await axios.post(
        "http://localhost:8080/groupReviewNewOnesFirst",
        {
          ads_id: this.localIdProduct,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)
      if (response.data.status != "success") console.log(response);
      this.reviewsLength = response.data.data.Review_list.length;
    } catch (error) {
      console.error(
        "Ошибка при загрузке продукта:",
        error.response ? error.response.data : error.message
      );
    }


    try {
      const response = await axios.get("http://localhost:8080/groupFavByRecent", {
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
  
    this.loadProducts();

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
  padding: 0.1% 3%;
  cursor: pointer;
  border-radius: 5px;
  font-size: 18px;
  align-content: center;
  align-items: center;
  align-self: center;
  margin: 0 auto;
  margin-top: 2%;
}

/* .main {
  margin: 0 5vw;
} */

.chat_block {
  
}

.route-view {
  margin-right: 5%;
}

.comment_title {
  color: #1d1d1d;
  font-size: 14px;
  font-weight: bold;
}

.recomendation_price {
  font-weight: bold;
  font-size: 14px;
}

.recomendation_desc {
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select-block {
  height: 33%;
  width: 100%;
  margin-bottom: 10px;
}

.margin-top {
  margin-top: 2% !important;
  margin-bottom: 1% !important;
}

.recomendations{
  /* padding: 0 2%; */
  width: 98%;
  margin-left: 2%;
}

.otsivi {
  height: max-content;
  margin-top: 2%;
  overflow: hidden;
}

.user_margin {
  margin-right: 6%;
}

.recomendation_list {
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  grid-template-rows: 250px;
  gap: 2%;
}

.recomendation {
  width: 100%;
  cursor: pointer;
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
  font-size: 14px;
  font-weight: 400;
}

.owner {
  display: flex;
  justify-content: space-between;
  margin-top: 2%;
}

.grafic {
  font-size: 15px;
  color: #929292;
  margin-top: 10px;
  font-weight: 200;
}

.rating_user_samp {
  font-size: 11px;
  color: #929292;
  cursor: pointer;
  margin-bottom: 5px;
}

.rating_user samp:first-child {
  margin-right: 5px;
}

.author_rating {
  width: 100%;
}

yandex-map {
  display: block;
  width: 100%; /* Убедитесь, что карта имеет размеры */
  height: 500px;
}
.product_button_otsiz {
  margin-top: 0.5%;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  color: black;
  background-color: #d9d9d9;
  font-size: 15px;
  border: solid 1px #d9d9d9;
  border-radius: 5px;
  padding: 1% 0;
}

.product_button_chat {
  margin-top: 2%;
  text-align: center;
  box-sizing: border-box;
  color: #000000;
  background-color: white;
  border: solid 1px #000000;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.3% 0;
  font-size: 15px;
}

.product_button_date {
  text-align: center;
  margin-top: 0.5vw;
  box-sizing: border-box;
  color: #f9cc33;
  border: solid 1px #f9cc33;
  margin-top: 1%;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.3% 0;
  font-size: 15px;
}

.flex-row {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.desc_star {
  height: 20px;
  width: 20px;
}

.product_status_g {
  color: #04c700;
  font-size: 15px;
}

.product_status_r {
  color: #c70000;
  font-size: 15px;
}

.block {
  display: flex;
  width: 60%
}

.action {
  margin-top: 45px;
  width: 40%;
  margin-left: 4%;
}

h1 {
  font-size: 26px;
  padding: 0;
  padding-bottom: 15px;
}

.desc_title {
  font-weight: bold;
  font-size: 20px;
}

li::before {
  content: "•";
  font-size: 18px;
  margin-inline-end: 1ch;
}

.desc_list {
  font-size: 18px;
  padding: 0;
  line-height: 3vw;
}

.desc_list li{
  font-size: 18px;
  line-height: 30px;
}

.desc_text {
  font-size: 18px;
  line-height: 40px;
  width: 100%;
  overflow-x: hidden;
  height: min-content;
  text-wrap: auto;
  text-overflow: ellipsis;
}

.time_publication {
  color: #d9d9d9;
  margin-bottom: 5vw;
  margin-top: 1vw;
  font-size: 15px;
  margin-bottom: 5%;
  margin-top: 2%;
}

.swiper {
  margin: 0;
  padding: 0;
  width: 90%;
}

.swiper-el {
  display: block;
  margin: 0;
  padding: 0;
  margin-right: 2%;
}

.slider_img {
  display: block;
  width: 80%;
  height: 100%;
  border-radius: 3px;
}

.select-img {
  width: 100%;
  height: 100%;
  border-radius: 1vw;
  object-fit: cover;
}

.rating_user {
  display: flex;
  height: 20px;
}

.product {
  width: 100%;
}

.rating_star {
  display: flex;
}

.rating_star img {
  width: 13px;
  height: 13px;
}

.rating_user samp {
  font-size: 13px;
  color: #929292;
}

.rating_user samp:first-child {
  margin-right: 5px;
}

.rating_user samp:last-child {
  margin-left: 50px;
}

.author_name {
  font-size: 15px;
  align-self: center;
}

.author_img {
  border-radius: 50%;
  width: 35px;
  height: 35px;
}

.detailProduct {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 10px;
  width: 1024px;
}

.arrow_back {
  border-radius: 50%;
  height: 20px;
  padding: 10px 8px;
  box-shadow: 0 2px 9px rgba(0, 0, 0, 0.25);
  margin-top: 58px;
  margin-right: 0;
}

.min-size {
  width: 50%;
  color: #929292;
  margin-top: 15px;
  font-size: 15px;
}

.user_name {
  font-size: 14px;
}

@media (max-width: 1024px) and (min-width: 770px) {

  .detailProduct {
    width: 770px;
  }

  .desc_title {
    font-size: 12px;
  }

  .product_status_r {
    font-size: 10px;
  }

  .product_status_g {
    font-size: 10px;
  }

  .product_button_otsiz {
    margin-top: 0.5%;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    color: black;
    background-color: #d9d9d9;
    font-size: 12px;
    border: solid 1px #d9d9d9;
    border-radius: 5px;
    padding: 1% 0;
  }
}


@media (max-width: 768px) {
  .select-block {
    height: 24%;
    width: 100%;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 20px;
  }

  .block {
    display: flex;
    width: 100%
  }

  .desc_list li {
    font-size: 14px;
    line-height: 40px;
  }

  .desc_title {
    font-size: 14px
  }

  .desc_text {
    font-size: 14px;
  }

  .action {
    width: 85%;
    position: absolute;
    top: 520px;
    margin: 0 auto;
    right: 0;
    height: 220px;
  }

  .select-img {
    width: 100%;
    height: 100%;
    border-radius: 1vw;
    -o-object-fit: cover;
    object-fit: cover;
  }

  .slider_img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }

  .swiper {
    width: 100%;
  }

  .recomendation_list {
    display: grid;
    grid-template-columns: 48% 48%;
    grid-template-rows: 320px;
    row-gap: 10px;
  }

  .recomendation {
    width: 100%;
    cursor: pointer;
  }

  .time_publication {
    margin-bottom: 265px;
  }

  .detailProduct {
    margin-bottom: 265px;
    width: 420px;
    position: relative;
  }

  .desc_title {
    font-size: 16px;
  }

  .product_status_r {
    font-size: 12px;
  }

  .product_status_g {
    font-size: 12px;
  }

  .product_button_otsiz {
    margin-top: 0.5%;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    color: black;
    background-color: #d9d9d9;
    font-size: 12px;
    border: solid 1px #d9d9d9;
    border-radius: 5px;
    padding: 1% 0;
  }
}
</style>
