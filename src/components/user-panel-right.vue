<template>
  <div class="user-panel-right">
    <div class="block_title_user">
      <img class="title_user" src="../assets/user.png" alt="" />
    </div>
    <div class="shop_filter_name">{{Surname_or_Ind_num}} {{Name}}</div>
    <div class="shop_filter_rating">
      <div class="shop_filter_rating_name">{{ Rating }}</div>
      <div v-for="n in 5" class="filter_rating">
          <img
            src="../assets/star_yellow.png"
            alt="Звезда"
            class="rating_midle"
            v-if="n <= Rating"
          />
          <img
            src="../assets/star_grey.png"
            alt="Пустая звезда"
            class="rating_midle"
            v-else
          />
      </div>
    </div>
    <!-- <div class="block-num_prof">
      <samp>Номер профиля</samp>
      <samp>0000</samp>
    </div> -->
    <div class="shop_filter_button_price">
      <span v-if="loading" style="font-size: 12px">Загрузка...</span>
      <span v-else>{{ wallet?.Total_balance }} ₽</span>
    </div>
    <div class="shop_filter_button">Применить</div>
    <div class="line-grey2"></div>
    <a class="shop_filter_grey_title" @click="changeRoute('ads')"> Объявления </a>
    <a @click="changeRoute('myOrder')" class="shop_filter_grey_title"> Заказы </a>
    <a @click="changeRoute('adres')" class="shop_filter_grey_title"> Адреса </a>
    <a @click="changeRoute('setting')" class="shop_filter_grey_title"> Настройки </a>
    <div class="shop_filter_grey_title exit" @click="exitUser">Выйти</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from "axios";

export default {
  data(){
    return {
      wallet: null,
      loading: true, // Изначально включаем состояние загрузки
    }
  },
  setup() {
    let Login = ref('');
    let Name = ref('');
    let Surname_or_Ind_num = ref('');
    let Patronomic_or_Addres_name = ref('');
    let Rating = ref('');

    // Загружаем данные из localStorage при монтировании компонента
    onMounted(() => {
      const storedLogin = localStorage.getItem('Login');
      const storedName = localStorage.getItem('Name');
      const storedSurname_or_Ind_num = localStorage.getItem('Surname_or_Ind_num');
      const storedPatronomic_or_Addres_name = localStorage.getItem('Patronomic_or_Addres_name');
      const storedRating = localStorage.getItem('Rating');

      if (storedLogin && storedName && storedSurname_or_Ind_num && storedPatronomic_or_Addres_name && (storedRating > -1 && storedRating < 6)) {
        Login.value = storedLogin;
        Name.value = storedName;
        Surname_or_Ind_num.value = storedSurname_or_Ind_num;
        Patronomic_or_Addres_name.value = storedPatronomic_or_Addres_name;
        Rating.value = storedRating;
      }
    });

    return {
      Login,
      Name,
      Surname_or_Ind_num,
      Patronomic_or_Addres_name,
      Rating
    };
  },
  methods: {
    async walletList() {
      try {
        const response = await axios.get(
          "http://185.112.83.36:8080/walletList",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("walletList");
        console.log(response);
        if (response.data.data.status === "fatal") {
          this.wallet = null;
        } else {
          this.wallet = response.data.data[0];
        }
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      } finally {
        this.loading = false; // Снимаем состояние загрузки после запроса
      }
    },
    changeRoute(newRoute) {
      this.$emit("changeRoute", newRoute);
    },
    exitUser() {
      this.$emit("exitUser");
      location.reload(true);

    },
   
  },
  created(){
      this.walletList();
    }
}

  
</script>

<style scoped>
.user-panel-right{
  width: 16%;
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

.row {
  display: flex;
  justify-content: start;
}

.user_img {
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
}

.name {
  color: #141414;
  font-size: var(--fs-20);
  margin-bottom: 0.3vw;
}

.margin_t {
  margin-top: 1vw;
  margin-bottom: 1vw;
}

.h2 {
  font-size: var(--fs-30);
}

.grey-panel_price {
  background-color: #f1f1f1;
  width: 17vw;
  text-align: start;
  padding: 0.8vw;
  padding-left: 1.2vw;
  padding-right: 0.6vw;
  color: #979797;
  border-radius: 0.6vw;
  margin-bottom: 1vw;
  font-size: var(--fs-15);
  margin-bottom: 2vw;
}

.bank-block {
  margin-top: 2vw;
}

.bank-block img {
  width: 3vw;
  margin-right: 1vw;
}

.h3 {
  font-size: var(--fs-20);
  color: black;
}

.history_link {
  text-decoration: underline;
  font-size: var(--fs-15);
  margin-top: 1.5vw;
  color: black;
}

.grey-panel_img {
  background-color: #f1f1f1;
  width: 17vw;
  text-align: center;
  padding: 1vw;
  font-size: var(--fs-15);
  border-radius: 0.6vw;
  margin-bottom: 1vw;
}

.grey-panel_img img {
  width: 1.3vw;
  text-align: center;
  margin-right: 1vw;
}

.grey-panel {
  background-color: #f1f1f1;
  width: 17vw;
  text-align: center;
  padding: 1vw;
  font-size: var(--fs-15);
  border-radius: 0.6vw;
  margin-bottom: 1vw;
}

.price {
  color: #141414;
  font-size: var(--fs-40);
  font-weight: bold;
}

.col1 {
  margin-left: 0.8vw;
  margin-right: 26vw;
}

a {
  cursor: pointer;
}

.data {
  color: #141414;
  font-size: var(--fs-15);
}

.data:first-child {
  margin-bottom: 0.8vw;
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
  cursor: pointer;
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
  border-radius: 10px;
  cursor: pointer;
  padding: 8px 40px;
}

.product_button_date {
  margin-top: 1vw;
  box-sizing: border-box;
  background-color: white;
  border: solid 0.2vw #f9cc33;
  cursor: pointer;
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
  cursor: pointer;
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

.mtmax {
  margin-top: 9vw;
}

.name2 {
  font-size: var(--fs-15);
  color: #141414;
  font-weight: lighter;
}

.green-block {
  background-color: #03c7004c;
  display: flex;
  padding: 1vw;
  border-radius: 1vw;
  margin-top: 2vw;
}

.green-block .arrow {
  align-self: flex-end;
  margin: 0 1.2vw;
  margin-bottom: 0.8vw;
  width: 2.5vw;
}


.shop_filter {
  width: 18.9%;
}

.block_title_user {
  justify-content: center;
  display: flex;
  margin-top: 10%;
}

.block_flex {
  display: flex;
  margin-bottom: 3vw;
}

.grey_block {
  color: #141414;
  background-color: #d9d9d9;
  border-radius: 1vw;
  width: min-content;
  margin-right: 1vw;
  padding: 0.3vw 1vw;
}

.title_user {
  border-radius: 50%;
  margin: 0 auto;
  width: 120px;
  height: 120px;
  box-shadow: 0vw 0vw 25px -3.6px rgba(0, 0, 0, 0.348);
  border: 12px white solid;
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
  font-size: var(--fs-10);
  margin-right: 0.3vw;
}

.shop_filter_name {
  font-size: var(--fs-20);
  font-weight: bold;
  text-align: center;
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

.line-grey2 {
  background-color: #d9d9d9;
  height: 0.2vw;
}

.shop_filter_grey_title {
  color: #929292;
  display: block;
  text-decoration: none;
  padding: 0.5vw 0;
  font-size: var(--fs-20);
}

.exit {
  text-decoration: #929292 underline;
}

.select {
  color: white;
  background-color: #929292;
}

.grey_block.select {
  color: white;
  background-color: #929292;
}

.grey_text {
  color: black;
  font-size: var(--fs-18);
}

.shop_filter_button {
  border: 1px #585858 solid;
  background-color: #f9cc33;
  font-size: 11px;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  padding: 2px 25px;
  margin: 8px auto;
  width: min-content;
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

.route-view {
  text-decoration: none;
}

.shop_filter_rating {
  display: flex;
  justify-content: center;
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
  cursor: pointer;
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
  border-radius: 10px;
  padding: 8px 40px;
}

.product_button_date {
  margin-top: 1vw;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
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
  cursor: pointer;
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

.shop_product {
  width: 60%;
  margin-left: 2%;
}

.shop_filter {
  width: 18.9%;
}

.block_title_user {
  justify-content: center;
  display: flex;
  margin-top: 25px;
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
  margin-top: 10px;
}

.shop_filter_name {
  font-size: 16px;
  font-weight: bold;
  margin: 6px 0;
  align-content: flex-start;
}

/* .shop_filter_name:first-child {
  margin-bottom: 1.5vw;
} */

.block-num_prof {
  display: flex;
  justify-content: center;
  margin-top: 2vw;
}

.block-num_prof samp:first-child {
  padding-right: 1vw;
}

.shop_filter_button_price {
  border: 1px #888888 solid;
  background-color: #e8e8e8;
  font-size: 10px;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  padding: 1px 10px;
  margin: 0 auto;
  width: max-content;
  margin-top: 10px;
}

.shop_filter_button_price span {
  font-size: 11px;
}

.line-grey2 {
  background-color: #d9d9d9;
  height: 2px;
}

.shop_filter_grey_title {
  color: #929292;
  display: block;
  text-decoration: none;
  padding: 3px 0;
  font-size: 16px;
}

.exit {
  text-decoration: #929292 underline;
  cursor: pointer;
}

.select {
  color: #000000 !important;
}

.grey_text {
  color: black;
  font-size: var(--fs-18);
}

/* .shop_filter_button {
  border: 1px #585858 solid;
  background-color: #f9cc33;
  font-size: var(--fs-16);
  cursor: pointer;
  border-radius: 0.8vw;
  text-align: center;
  padding: 0.5vw 0;
  margin: 1vw 4.5vw 2vw 4.5vw;
} */

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
  width: 12px;
  height: 12px;
  margin-right: 10px;
}

.shop {
  display: flex;
  justify-content: space-evenly;
}

@media (max-width: 768px)  {
  .user-panel-right{
    width: 40%;
  }

  .title_user {
    width: 100px;
    height: 100px;
  }
}
</style>
