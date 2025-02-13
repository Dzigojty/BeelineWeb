<template>
  <v-popup-category
    v-if="isCategories"
    @closePopup="closePopup"
    @changeRoute="changeRoute('createAds2')"
  />
  <div class="main">
    <div class="block">
      <a @click="changeRoute('home')" class="route-view">
        <img class="arrow_back" src="../assets/arrow_back.png" alt="" />
      </a>
      <div class="crateAds">
        <div class="shop_title">Новое объявление</div>
        <h2>Параметры</h2>
        <div class="field_block">
          <div class="field_name">Тип техники</div>
          <input class="filter_block" type="text" />
          <div class="desc_field">Например, “Трактор”</div>
          <div class="field_name">Категория</div>
          <div class="flex_block">
            <input
              class="filter_block filter_block_check"
              type="text"
              readonly="true"
              value="Сельхозтехника"
              @click="changeRoute('createAds2')"
            />
            <input
              class="filter_block filter_block_check"
              type="text"
              readonly="true"
              value="Строительная техника"
              @click="changeRoute('createAds2')"
            />
            <input
              class="filter_block filter_block_check"
              type="text"
              readonly="true"
              value="Другая категория"
              @click="showCategory"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { ref } from "vue";
import vPopupCategory from "../components/popup/v-popup-category.vue";
import VPopup from "@/components/popup/v-popup.vue";

export default {
  data(){
    return{
      base64Image: "",
      selectedFile: null,
      isCategories: false,
    }
  },
  components: {
    vPopupCategory,
    VPopup,
  },
  methods: {
    changeRoute(route) {
      this.$emit("changeRoute", route);
    },

    showCategory(){
      this.isCategories = true;
    },
    
    closePopup() {
      console.log("popup")
      this.isCategories = false;
    },
  },
  setup() {
    const images = ref([
      "https://via.placeholder.com/150/0000FF", // Blue
      "https://via.placeholder.com/150/008000", // Green
      "https://via.placeholder.com/150/FF0000", // Red
      "https://via.placeholder.com/150/FFFF00", // Yellow
      "https://via.placeholder.com/150/FFA500", // Orange
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
.shop_title {
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  padding-top: 15px;
}

.desc_field {
  color: #929292;
  font-size: 12px;
}

.field_name {
  color: #141414;
  margin: 15px 0 10px 0;
  font-weight: 600;
  font-size: 14px;
}

h2 {
  font-size: 15px;
}

.button_show_more {
  display: block;
  background-color: black;
  color: #f9cc33;
  padding: 1.4vw 5vw;
  border-radius: 1vw;
  font-size: 20px;
  align-content: center;
  align-items: center;
  cursor: pointer;
  align-self: center;
  margin: 0 auto;
  margin-top: 4vw;
}

/* .main {
  margin: 0 auto;
  width: 34vw;
} */

.comment_title {
  color: #1d1d1d;
  font-size: var(--fs-15);
  font-weight: bold;
}

.recomendation_price {
  font-weight: bold;
  font-size: 20px;
}

.recomendation_desc {
  font-size: 20px;
}

.margin-top {
  margin-top: 3vw !important;
  margin-bottom: 2vw !important;
}

.otsivi {
  margin-top: 3vw;
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
  font-size: 20px;
  color: #929292;
  margin-top: 1vw;
  font-weight: 200;
}

.rating_user_samp {
  font-size: 12px;
  color: #929292;
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
  box-sizing: border-box;
  color: black;
  cursor: pointer;
  background-color: #d9d9d9;
  font-size: var(--fs-15);
  border: solid 0.2vw #d9d9d9;
  border-radius: 1vw;
  padding: 0.6vw 0;
}

.filter_block {
  background-color: #f1f1f1;
  border-radius: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
  border: none;
  width: 100%;
  font-size: 12px;
  margin-right: 0px;
}

/* .column .filter_block {
  width: 20vw;
  margin-bottom: 0.5vw;
} */

.filter_block::placeholder {
  color: #929292;
}

.filter_block_check {
  text-align: center;
  color: #929292;
  display: block;
  width: min-content;
  margin-right: 10px;
}

.filter_block_check:last-child {
  margin-right: 0;
}

.product_button_chat {
  margin-top: 1vw;
  text-align: center;
  box-sizing: border-box;
  color: #000000;
  background-color: white;
  cursor: pointer;
  border: solid 0.2vw #000000;
  border-radius: 1vw;
  padding: 0.6vw 2.5vw;
}

.product_button_date {
  text-align: center;
  margin-top: 1vw;
  cursor: pointer;
  box-sizing: border-box;
  color: #f9cc33;
  background-color: white;
  border: solid 0.2vw #f9cc33;
  border-radius: 1vw;
  padding: 0.6vw 2.5vw;
}

.flex-row {
  display: flex;
  align-items: end;
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
  width: 1024px;
  margin: 0 auto;
  justify-content: center;
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
  font-size: 20px;
  margin-inline-end: 1ch;
}

.desc_list {
  font-size: 20px;
  padding: 0;
  line-height: 3vw;
}

.flex_block {
  margin-top: 15px;
  display: flex;
}

.desc_text {
  font-size: 20px;
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
}

.select-img {
  width: 35vw;
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
  font-size: 12px;
  color: #929292;
}

.rating_user samp:first-child {
  margin-right: 5px;
}

.rating_user samp:last-child {
  margin-left: 5px;
}

.author_name {
  font-size: 15px;
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
  height: 25px;
  padding: 6px 5px;
  box-shadow: 0 0 0.3vw rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  margin-right: 25px;
}

.min-size {
  width: 20vw;
  color: #929292;
  margin-top: 4vw;
  font-size: 20px;
}

@media (max-width: 1024px) and (min-width: 768px){
  .block {
    width: 760px;
  }
}

@media (max-width: 768px)  {
  .block {
    width: 300px;
  }

  .filter_block_check {
    width: 100%;
  }

  .shop_title {
    font-size: 18px;
  }

  h2 {
    font-size: 14px;
  }

  .field_name {
    font-size: 12px;
    margin: 9px 0 8px 0;
  }

  .crateAds {
    width: 100%;
  }

  .flex_block {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    height: 85px;
    width: 100%;
    justify-content: space-between;
  }

  .arrow_back {
    border-radius: 50%;
    height: 15px;
    padding: 6px 5px;
    box-shadow: 0 0 0.3vw rgba(0, 0, 0, 0.25);
    margin-top: 17px;
    margin-right: 13px;
  }

  .desc_field {
    font-size: 10px;
  }
}
</style>