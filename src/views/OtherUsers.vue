<template>
    <div class="shop">
      <other-user-panel-right @changeRoute="changeRoute" />

      <div class="shop_product">
        <div class="shop_title">Объявления</div>
        <div v-if="selectedModule == 'all'" v-for="(el, index) in array" :key="index" class="shop_list">
          <a @click="selectProduct(el)" class="route-view">
            <div class="product">
              <img class="product_img" src="../assets/product2.png" alt="" />
              <div class="product_des">
                <div class="product_title">
                  <div>{{ el.Title }}</div>
                </div>
                <div v-if="el.Hourly_rate != 0" class="product_price">от {{ el.Hourly_rate }} ₽ за час</div>
                <div v-if="el.Daily_rate != 0" class="product_price">от {{ el.Daily_rate }} ₽ за смену</div>
                <div class="product_status_g">Сегодня с 8:00 до 12:30</div>
              </div>
            </div>
          </a>
          <div class="line-grey"></div>
        </div>
        <div v-if="selectedModule == 'active'" v-for="(el, index) in active" :key="index" class="shop_list">
          <a @click="selectProduct(el)" class="route-view">
            <div class="product">
              <img class="product_img" src="../assets/product2.png" alt="" />
              <div class="product_des">
                <div class="product_title">
                  <div>{{ el.Title }}</div>
                </div>
                <div v-if="el.Hourly_rate != 0" class="product_price">от {{ el.Hourly_rate }} ₽ за час</div>
                <div v-if="el.Daily_rate != 0" class="product_price">от {{ el.Daily_rate }} ₽ за смену</div>
                <div class="product_status_g">Сегодня с 8:00 до 12:30</div>
              </div>
            </div>
          </a>
          <div class="line-grey"></div>
        </div>
        <div v-if="selectedModule == 'noActive'" v-for="(el, index) in noActive" :key="index" class="shop_list">
          <a class="route-view">
            <div class="product">
              <img class="product_img" src="../assets/product2.png" alt="" />
              <div class="product_des">
                <div class="product_title">
                  <div>{{ el.Title }}</div>
                </div>
                <<div v-if="el.Hourly_rate != 0" class="product_price">от {{ el.Hourly_rate }} ₽ за час</div>
                <div v-if="el.Daily_rate != 0" class="product_price">от {{ el.Daily_rate }} ₽ за смену</div>
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
  import OtherUsersPanelRight from "../components/other-user-panel-right.vue";
  import axios from 'axios';
  
  export default {
    data(){
      return {
        array: [],
        active: [],
        noActive: [],
        selectedModule: 'all'
      }
    },
    async created() {
      try {
        const response = await axios.get("http://localhost:8080/groupAdsByRented", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        });
        console.log(response.data);
        if (response.data.status == "success") {
          this.active = response.data.data;
        } else {
          this.active = [];
        }
      } catch (error) {
        console.error("Ошибка при выводе :", error);
      }
  
      this.array = this.active;
  
      try {
        const response = await axios.get("http://localhost:8080/groupAdsByArchived", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        });
        console.log(response.data);
        if (response.data.status == "success") {
          this.noActive = response.data.data;
        } else {
          this.noActive = [];
        }
      } catch (error) {
        console.error("Ошибка при выводе els:", error);
      }
  
      this.array = [...this.active, ...this.noActive]
    },
    methods: {
      showModule(selM){
        this.selectedModule = selM;
        console.log(this.selectedModule)
      },
      changeRoute(newRoute) {
        this.$emit("changeRoute", newRoute);
      },
      selectProduct(product) {
        console.log("product ADS")
        console.log(product.Id)
        this.$emit('selectProduct', product.Id);
      },
      exitUser() {
        this.$emit('exitUser');
      },
    },
    components: {
        OtherUsersPanelRight,
    },
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
    margin: 0.8vw 0;
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
    width: 13vw;
    border-radius: 10px;
    margin-right: 22px;
    height: 12vw;
  }
  
  .product {
    display: flex;
  }
  
  .product_title_date {
    font-size: var(--fs-16);
    color: #929292;
    margin: 5px 0 5px 0;
  }
  
  .product_price {
    font-size: var(--fs-16);
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
    cursor: pointer;
    background-color: white;
    border: solid 0.2vw #f9cc33;
    border-radius: 1vw;
    padding: 0.6vw 2.5vw;
  }
  
  .product_status_r {
    color: #c70000;
    font-size: var(--fs-10);
  }
  
  .product_status_g {
    color: #04c700;
    font-size: var(--fs-10);
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
    -webkit-text-decoration: underline 2px #1d1d1d;
    text-decoration: underline 2px #1d1d1d;
    font-size: var(--fs-16);
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
    margin-left: 0vw;
  }
  
  .product_des_text {
    line-height: 2.5vw;
    margin-top: 10px;
    overflow: hidden;
    height: 12vw;
  }
  
  .product_button {
    background-color: #f9cc33;
    cursor: pointer;
    font-size: var(--fs-20);
    color: #141414;
  }
  
  .product {
    font-size: var(--fs-20);
  }
  
  .shop_title {
    font-size: var(--fs-16);
    margin-bottom: 0.5vw;
    font-weight: bold;
    padding-top: 1vw;
  }
  
  .shop {
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }
  
  .shop_product {
    margin-left: 4vw;
    width: 36vw;
  }
  
  .shop_filter {
    width: 18.9%;
  }
  
  .block_title_user {
    justify-content: center;
    display: flex;
    margin-top: 3.5vw;
  }
  
  .block_flex{
    display: flex;
    margin-bottom: 1vw;
  }
  
  .grey_block{
      cursor: pointer;
      color: rgba(20, 20, 20, 0.561);
      width: min-content;
      margin-right: 1vw;
      font-size: var(--fs-10);
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
    cursor: pointer;
    font-size: var(--fs-20);
    border-radius: 0.8vw;
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
  
  .select {
    color: #000000 !important;
  }
  
  .grey_text{
      color: black;
      font-size: var(--fs-18);
  }
  
  .shop_filter_button {
    border: 1px #585858 solid;
    background-color: #f9cc33;
    font-size: var(--fs-16);
    border-radius: 0.8vw;
    text-align: center;
    cursor: pointer;
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
    margin-right: 0.8vw;
  }
  </style>