<template>
  <div class="shop">
    <user-panel-right @changeRoute="changeRoute" @exitUser="exitUser" />

    <div class="shop_product">
      <div class="shop_title">Избранное</div>
      <div class="block_flex">
        <div class="grey_block select">Объявления</div>
        <div class="grey_block">Профили</div>
      </div>
      <div v-for="(favorite, index) in favorites" :key="index" class="shop_list">
        <a @click="selectProduct(product)" class="route-view">
          <div class="product">
            <img class="product_img" src="../assets/product2.png" alt="" />
            <div class="product_des">
              <div class="product_title">
                <div>{{ favorite.Title }}</div>
              </div>
              <div class="product_price">от 2 500 ₽ за час</div>
              <div class="product_status_g">Сегодня с 8:00 до 12:30</div>
            </div>
          </div>
        </a>
        <div class="line-grey"></div>
        <a @click="selectProduct(product)" class="route-view">
          <div class="product">
            <img class="product_img" src="../assets/product2.png" alt="" />
            <div class="product_des">
              <div class="product_title">
                <div>Аренда и услуги автокрана</div>
              </div>
              <div class="product_price">от 2 500 ₽ за час</div>
              <div class="product_status_r">Завтра с 17:00 до 17:30</div>
            </div>
          </div>
        </a>
        <div class="line-grey"></div>
        <a @click="selectProduct(product)" class="route-view">
          <div class="product">
            <img class="product_img" src="../assets/product2.png" alt="" />
            <div class="product_des">
              <div class="product_title">
                <div>Аренда и услуги автокрана</div>
              </div>
              <div class="product_price">от 2 500 ₽ за час</div>
              <div class="grey_text">Объявление снято</div>
            </div>
          </div>
        </a>
        <div class="line-grey"></div>
      </div>
    </div>
  </div>
</template>

<script>
import UserPanelRight from "../components/user-panel-right.vue";
import axios from "axios";
export default {
  data() {
    return {
      favorites: [],
    };
  },
  methods: {
    changeRoute(newRoute) {
      this.$emit("changeRoute", newRoute);
    },
    selectProduct(product) {
      this.$emit("selectProduct", product);
    },
    exitUser() {
      this.$emit("exitUser");
    },
  },
  //http://185.112.83.36:8080/groupFavByRecent
  components: {
    UserPanelRight,
  },
  async created() {
    try {
      const response = await axios.get("http://185.112.83.36:8080/groupFavByRecent", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      console.log(response.data.data);
      if (response.data.status === "success") {
        this.favorites = response.data.data;
      } else {
        alert("Error favorites status:fatal");
      }
    } catch (error) {
      console.error("Ошибка при выводе favorites:", error);
    }
  },
  setup() {},
};
</script>

<style scoped>
.route-view {
  text-decoration: none;
}

.shop_filter_rating {
  display: flex;
  justify-content: start;
}

.app {
  margin: 0;
  padding: 0;
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
  margin: 2vw 0;
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
  cursor: pointer;
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
  margin-bottom: 0.2vw;
}

.product_button_date_active {
  background-color: #f9cc33;
  border: solid 2px #f9cc33;
  cursor: pointer;
  border-radius: 1vw;
  padding: 8px 40px;
}

.product_button_date {
  margin-top: 1vw;
  box-sizing: border-box;
  cursor: pointer;
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
  color: #1d1d1d;
  text-decoration: underline 2px #1d1d1d;
  font-size: var(--fs-23);
  margin-bottom: 0.5vw;
  font-weight: bold;
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
  margin-left: 5vw;
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
  cursor: pointer;
}

.product {
  font-size: var(--fs-20);
}

.shop_title {
  font-size: var(--fs-48);
  margin-bottom: 2.5vw;
  font-weight: bold;
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

.block_title_user {
  justify-content: center;
  display: flex;
  margin-top: 3.5vw;
}

.block_flex {
  display: flex;
  margin-bottom: 3vw;
}

.title_user {
  border-radius: 50%;
  margin: 0 auto;
  width: 12vw;
  height: 11.5vw;
  box-shadow: 0vw 0vw 1vw -0.2vw rgba(0, 0, 0, 0.348);
  border: 1vw white solid;
  box-sizing: border-box;
}

.shop_filter_text {
  font-size: var(--fs-25);
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

.shop_filter_rating_name {
  font-size: var(--fs-25);
  margin-right: 1vw;
}

.shop_filter_name {
  font-size: var(--fs-20);
  font-weight: bold;
  margin: 1.5vw 0;
  align-content: flex-start;
}

.shop_filter_name:first-child {
  margin-bottom: 1.5vw;
}

.block-num_prof {
  display: flex;
  justify-content: start;
  margin-top: 2vw;
}

.block-num_prof samp:first-child {
  padding-right: 1vw;
}

.shop_filter_button_price {
  border: 1px #888888 solid;
  background-color: #e8e8e8;
  font-size: var(--fs-20);
  border-radius: 0.8vw;
  text-align: center;
  padding: 0.2vw 0;
  cursor: pointer;
  margin: 1.2vw 2.5vw 0 2.5vw;
}

.line-grey2 {
  background-color: #d9d9d9;
  height: 0.2vw;
}

.shop_filter_grey_title {
  display: block;
  color: #929292;
  padding: 0.5vw 0;
  text-decoration: none;
  font-size: var(--fs-25);
}

.exit {
  text-decoration: #929292 underline;
}

.grey_block.select {
  color: #000000;
}

.grey_text {
  color: black;
  font-size: var(--fs-18);
}

.shop_filter_button {
  border: 1px #585858 solid;
  background-color: #f9cc33;
  font-size: var(--fs-16);
  cursor: pointer;
  border-radius: 0.8vw;
  text-align: center;
  padding: 0.5vw 0;
  margin: 1vw 4.5vw 2vw 4.5vw;
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
  align-content: center;
}

.filter_rating img {
  width: 2.5vw;
  height: 2.5vw;
  margin-right: 0.2vw;
}

.route-view {
  text-decoration: none;
}

.shop_filter_rating {
  display: flex;
  justify-content: start;
}

.app {
  margin: 0;
  padding: 0;
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
  margin: 2vw 0;
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
  cursor: pointer;
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
  margin-bottom: 0.2vw;
}

.product_button_date_active {
  background-color: #f9cc33;
  border: solid 2px #f9cc33;
  border-radius: 10px;
  cursor: pointer;
  padding: 8px 40px;
}

.product_button_date {
  margin-top: 1vw;
  cursor: pointer;
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
  color: #1d1d1d;
  text-decoration: underline 2px #1d1d1d;
  font-size: var(--fs-23);
  margin-bottom: 0.5vw;
  font-weight: bold;
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
  margin-left: 5vw;
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
  cursor: pointer;
  color: #141414;
}

.product {
  font-size: var(--fs-20);
}

.shop_title {
  font-size: var(--fs-48);
  margin-bottom: 2.5vw;
  font-weight: bold;
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

.block_title_user {
  justify-content: center;
  display: flex;
  margin-top: 3.5vw;
}

.block_flex {
  display: flex;
  margin-bottom: 3vw;
}

.grey_block {
  color: rgba(20, 20, 20, 0.561);
  width: min-content;
  margin-right: 3vw;
}

.title_user {
  border-radius: 50%;
  margin: 0 auto;
  width: 12vw;
  height: 11.5vw;
  box-shadow: 0vw 0vw 1vw -0.2vw rgba(0, 0, 0, 0.348);
  border: 1vw white solid;
  box-sizing: border-box;
}

.shop_filter_text {
  font-size: var(--fs-25);
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

.shop_filter_rating_name {
  font-size: var(--fs-25);
  margin-right: 1vw;
}

.shop_filter_name {
  font-size: var(--fs-30);
  font-weight: bold;
  margin: 1.5vw 0;
  align-content: flex-start;
}

.shop_filter_name:first-child {
  margin-bottom: 1.5vw;
}

.block-num_prof {
  display: flex;
  justify-content: start;
  margin-top: 2vw;
}

.block-num_prof samp:first-child {
  padding-right: 1vw;
}

.shop_filter_button_price {
  border: 1px #888888 solid;
  background-color: #e8e8e8;
  font-size: var(--fs-20);
  border-radius: 0.8vw;
  cursor: pointer;
  text-align: center;
  padding: 0.2vw 0;
  margin: 1.2vw 2.5vw 0 2.5vw;
}

.line-grey2 {
  background-color: #d9d9d9;
  height: 0.2vw;
}

.shop_filter_grey_title {
  color: #929292;
  display: block;
  text-decoration: none;
  padding: 0.5vw 0;
  font-size: var(--fs-25);
}

.exit {
  text-decoration: #929292 underline;
}

.grey_text {
  color: black;
  font-size: var(--fs-18);
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
  align-content: center;
}

.filter_rating img {
  width: 2.5vw;
  height: 2.5vw;
  margin-right: 0.8vw;
}

.grey_block {
  color: rgba(20, 20, 20, 0.561);
  width: min-content;
  margin-right: 1vw;
}

.shop_filter_grey_title.select {
  color: #000000;
}

.shop_filter_button {
  border: 1px #585858 solid;
  background-color: #f9cc33;
  font-size: var(--fs-16);
  cursor: pointer;
  border-radius: 0.8vw;
  text-align: center;
  padding: 0.5vw 0;
  margin: 1vw 4.5vw 2vw 4.5vw;
}
</style>
