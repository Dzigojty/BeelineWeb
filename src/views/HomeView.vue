<template>
  <img src="../assets/baner_img.png" alt="" class="baner" />
  <div class="line"></div>
  <swiper-container class="swiper" slides-per-view="4">
    <swiper-slide
      :key="slide"
      v-for="slide in sldiers"
      class="swiper-el"
      @click="CategoriaSliderClick()"
    >
      <div class="slider_con_el">
        <img :src="slide.path" alt="" />
        <h3>{{ slide.name }}</h3>
      </div></swiper-slide
    >
  </swiper-container>
  <swiper-container id="min-swiper" slides-per-view="4">
    <swiper-slide :key="slide" v-for="slide in sldiers" class="swiper-el">
      <div class="slider_con_el">
        <img :src="slide.path" alt="" />
        <h3>{{ slide.name }}</h3>
      </div></swiper-slide
    >
  </swiper-container>
  <div class="shop">
    <div class="shop_filter">
      <div class="shop_filter_name">Фильтры</div>
      <div class="shop_filter_categors">
        <div class="shop_filter_categor">Дорожно-строительная техника</div>
        <div class="shop_filter_categor">Дорожно-строительная техника</div>
        <div class="shop_filter_categor">Дорожно-строительная техника</div>
        <div class="shop_filter_categor">Дорожно-строительная техника</div>
        <div class="shop_filter_categor">Дорожно-строительная техника</div>
        <div class="shop_filter_categor">Дорожно-строительная техника</div>
        <div class="shop_filter_categor">Дорожно-строительная техника</div>
        <div class="shop_filter_categor">Дорожно-строительная техника</div>
        <div class="shop_filter_categor">Дорожно-строительная техника</div>
        <div class="shop_filter_categor">Другое</div>
      </div>

      <div class="shop_filter_price">
        <div class="shop_filter_name">Стоимость, ₽</div>
        <div class="shop_filter_block">
          <input class="filter_block" type="text" placeholder="От" />
          <input class="filter_block" type="text" placeholder="до" />
        </div>
      </div>

      <div class="shop_filter_datatime">
        <div class="shop_filter_name">Срок аренды</div>
        <div class="shop_filter_block">
          <input class="filter_block" type="text" placeholder="От" />
          <input class="filter_block" type="text" placeholder="до" />
        </div>
      </div>

      <div class="shop_filter_adres">
        <div class="shop_filter_name">Где искать</div>
        <div class="shop_filter_text">Все регионы, <span>радиус</span></div>
      </div>

      <div class="shop_filter_rating">
        <div class="shop_filter_name">Рейтинг</div>
        <div class="filter_rating">
          <img src="../assets/star_yellow.png" alt="" />
          <img src="../assets/star_yellow.png" alt="" />
          <img src="../assets/star_yellow.png" alt="" />
          <img src="../assets/star_yellow.png" alt="" />
          <img src="../assets/star_grey.png" alt="" />
        </div>
      </div>

      <div class="shop_filter_button">Применить</div>

      <div class="shop_filter_ads"></div>
    </div>

    <div class="shop_product">
      <div class="shop_title">Сортировка</div>
      <div class="shop_list">
        <div :key="prod" v-for="prod in prods" @click="selectProduct(product)" class="route-view">
          <div class="product">
            <img class="product_img" src="../assets/product2.png" alt="" />
            <div class="product_des">
              <div class="product_title">
                <div>Аренда и услуги автокрана</div>
                <img src="../assets/star_yellow.png" alt="" />
              </div>
              <div class="product_price">от 2 500 ₽ за час</div>
              <button class="product_button_date">Выбрать дату</button>
              <div class="product_des_text">
                Автокран Ивановец - это марка автокранов, производимых заводом
                “ИМЗ АВТОКРАН” в Иваново. Эти автокраны отличаются высокой
                надежностью, производительностью и долговечностью. Они широко
                используются в различных отраслях промышленности и
                строительства.
              </div>
              <div class="product_title_date">
                График работ: с 9:00 до 20:00
              </div>
              <div class="product_status_r">Занят: 10.05 - 15.05</div>
              <div class="product_status_g">Свободен</div>
              <div class="product_create_at">2 часа назад</div>
            </div>
            <section class="author_rating">
              <img class="author_img" src="../assets/user.png" alt="" />
              <div class="author_name">Серега</div>
              <div class="rating_user">
                <samp>5,0</samp>
                <div class="rating_star">
                  <img src="../assets/star_yellow.png" alt="" /><img
                    src="../assets/star_yellow.png"
                    alt=""
                  /><img src="../assets/star_yellow.png" alt="" /><img
                    src="../assets/star_yellow.png"
                    alt=""
                  /><img src="../assets/star_yellow.png" alt="" />
                </div>
                <samp>3 отзыва</samp>
              </div>
            </section>
          </div>
        <div class="line-grey"></div>

        </div>
        <button class="button_show_more">Показать еще</button>
      </div>
    </div>
  </div>
</template>

<script>
// // @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

let minSlider = true;

export default {
  data() {
    return {
      prods: [
        1,2,3,4
      ],
      sldiers: [
        {
          path: require("@/assets/slider1.png"),
          name: "Самосвалы",
        },
        {
          path: require("@/assets/slider2.png"),
          name: "Экскаваторы",
        },
        {
          path: require("@/assets/slider3.png"),
          name: "Погрузчики",
        },
        {
          path: require("@/assets/slider1.png"),
          name: "Самосвалы",
        },
        {
          path: require("@/assets/slider2.png"),
          name: "Экскаваторы",
        },
        {
          path: require("@/assets/slider3.png"),
          name: "Погрузчики",
        },
      ],
    };
  },
  methods: {
    selectProduct(product) {
      this.$emit('selectProduct', product);
    },
    CategoriaSliderClick() {
      if (minSlider) {
        document.getElementById("min-swiper").style.height = "15vw";
        minSlider = false;
      } else {
        document.getElementById("min-swiper").style.height = "0";
        minSlider = true;
      }
    },
    PodCategoriaSliderClick() {},
  },
 
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
.route-view {
  text-decoration: none;
}

/* .swiper-slide-active .slider_con_el{
background: #f9cc33;
} */

.app {
  margin: 0;
  padding: 0;
}

#min-swiper {
  height: 0;
}

main {
  margin: 0;
  padding: 0;
}

.swiper {
  padding: 1vw 0;
}

.swiper-el {
  padding: 2vw 0;
}

.line-grey {
  background: #d9d9d9;
  margin: 10px 0 20px 0;
  height: 1px;
}

.author_rating {
  white-space: nowrap;
  margin-left: 20px;
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
  color: black;
}

.author_img {
  border-radius: 50%;
  width: 3vw;
}

.rating_user {
  display: flex;
}

.rating_star {
  display: flex;
}

.rating_star img {
  width: 0.9vw;
  height: 0.8vw;
}

.button_show_more {
  display: block;
  background-color: black;
  color: #f9cc33;
  padding: 1.4vw 5vw;
  border-radius: 2vw;
  font-size: var(--fs-20);
  align-content: center;
  align-items: center;
  align-self: center;
  margin: 0 auto;
  margin-top: 10vw;
}

.product_img {
  height: calc(0.869 * 18vw);
  width: 18vw;
  border-radius: 10px;
  margin-right: 22px;
}

.product {
  display: flex;
}

.product_title_date {
  font-size: var(--fs-20);
  color: #929292;
  margin: 5px 0 5px 0;
}

.product_price {
  font-size: var(--fs-25);
  font-weight: bold;
  color: #1d1d1d;
}

.product_button_date_active {
  background-color: #f9cc33;
  border: solid 2px #f9cc33;
  border-radius: 10px;
  padding: 8px 40px;
}

.product_button_date {
  margin-top: 1vw;
  box-sizing: border-box;
  background-color: white;
  border: solid 0.2vw #f9cc33;
  border-radius: 1vw;
  padding: 0.6vw 2.5vw;
}

.product_status_r {
  color: #c70000;
  font-size: var(--fs-15);
}

.product_status_g {
  color: #04c700;
  font-size: var(--fs-15);
}

.product_create_at {
  color: #d9d9d9;
  margin-top: 15px;
  font-size: var(--fs-20);
}

.product_title {
  display: flex;
  justify-content: space-between;
  color: #f9cc33;
  text-decoration: underline 1px #f9cc33;
  font-size: var(--fs-23);
}

.slider_con_el:hover {
  background-color: #f9cc33;
}

.product_button_date:hover {
  background-color: #f9cc33;
}

.product_title img {
  height: 2vw;
  width: 2vw;
}

.product_des {
  font-size: var(--fs-18);
  color: #929292;
}

.product_des_text {
  line-height: 2.5vw;
  margin-top: 10px;
  overflow: hidden;
  height: 12vw;
}

.product_button {
  background-color: #f9cc33;
  font-size: var(--fs-20);
  color: #141414;
}

.product {
  font-size: var(--fs-20);
}

.shop_title {
  font-size: var(--fs-25);
  margin-bottom: 2.5vw;
  padding-top: 2vw;
}

.shop {
  display: flex;
  justify-content: center;
}

.shop_product {
  margin-left: 6vw;
  width: 70vw;
}

.shop_filter {
  width: 18.9%;
}

.shop_filter_text {
  font-size: var(--fs-20);
  color: black;
}

.shop_filter_text span {
  color: #3333336f;
}

.shop_filter_categor {
  font-size: var(--fs-20);
  font-weight: normal;
}

.shop_filter_categor:last-child {
  text-decoration: underline;
}

.shop_filter_name {
  font-size: var(--fs-25);
  font-weight: bold;
  margin: 1.5vw 0;
}

.shop_filter_name:first-child {
  margin-bottom: 1.5vw;
}

.shop_filter_button {
  background-color: #f9cc33;
  font-size: var(--fs-20);
  border-radius: 10px;
  text-align: center;
  padding: 1vw 0;
  margin: 30px 0 30px 0;
}

.shop_filter_block {
  display: flex;
  margin: 1vw 4vw 1vw 0;
  justify-content: space-between;
}

.filter_block {
  background-color: #d9d9d9;
  border-radius: 1vw;
  padding: 0.8vw;
  border: none;
  width: 6vw;
  font-size: var(--fs-20);
  margin-right: 1vw;
}

.filter_block::placeholder {
  color: #929292;
}

.arrow_slider_left {
  align-self: center;
  rotate: 180deg;
  width: 4vw;
}

.arrow_slider_right {
  align-self: center;
  width: 4vw;
}

.slider_con {
  display: flex;
  margin: 20px 0;
  width: 100vw;
}

.slider_con_el h3 {
  display: flex;
  justify-content: end;
  font-size: var(--fs-25);
  margin: 0;
  padding: 0;
  padding-top: 1vw;
}

.slider_con_el img {
  position: absolute;
  left: -2vw;
  height: 10vw;
  bottom: -1.2vw;
}

.slider_con_el {
  position: relative;
  background: #dedede;
  border-radius: 2vw;
  box-shadow: 1vw 1vw 14px rgba(0, 0, 0, 0.348);
  margin: 0 2vw;
  padding-right: 0.6vw;
  height: 11vw;
  width: 21vw;
}

.shop_filter_ads {
  background-color: grey;
  height: 50vw;
}

.baner {
  width: 100%;
  margin: 0;
  padding: 0;
}

.filter_rating {
  display: flex;
}

.filter_rating img {
  width: 2.8vw;
}
</style>