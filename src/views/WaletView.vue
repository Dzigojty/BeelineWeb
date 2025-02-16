<template>
  <div class="shop">
    <user-panel-right @changeRoute="changeRoute" @exitUser="exitUser" />
    <div class="walent-flex-block">
      <div class="walent">
        <div class="shop_title">Кошелёк</div>
        <div class="h2">Общий счет</div>
        
        <!-- Анимация загрузки или данные -->
        <div class="price">
          <span v-if="loading">Загрузка...</span>
          <span v-else>{{ wallet?.Total_balance }} ₽</span>
        </div>

        <div class="grey-panel">Пополнение кошелька</div>
        <div class="grey-panel_price">1 500 ₽</div>
        <div class="h3">Выберите способ пополнения</div>
        <div class="bank-block">
          <img src="../assets/bank.png" alt="" />
          <span>Банковская карта</span>
        </div>
        <div class="bank-block">
          <img src="../assets/sber.png" alt="" />
          <span>СберБанк Онлайн</span>
        </div>
        <div class="name margin_t">Вывод денежных средств</div>
        <div class="grey-panel_img">
          <img src="../assets/plus.png" alt="" />
          <span>Добавить реквизиты</span>
        </div>
        <router-link
          @click="changeRoute('waletHistory')"
          to="/walentHistory"
          class="history_link"
        >
          История кошелька
        </router-link>
      </div>

      <div class="walent">
        <div class="h2 mtmax">Замороженные средства</div>
        
        <!-- Анимация загрузки или данные -->
        <div class="price">
          <span v-if="loading">Загрузка...</span>
          <span v-else>{{ wallet?.Frozen_funds }} ₽</span>
        </div>

        <div class="green-block">
          <div class="column">
            <div class="name">Ближайшая оплата</div>
            <div class="name2">Николай ПочтиБасков</div>
          </div>

          <div class="arrow">
            <img src="../assets/arrow.png" alt="" />
          </div>

          <div class="column">
            <div class="name">12.05.24</div>
            <div class="name">5 000 ₽</div>
          </div>
        </div>
        <router-link
          @click="changeRoute('waletHistory')"
          to="/walentHistory"
          class="history_link"
        >
          Смотреть историю
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import UserPanelRight from "../components/user-panel-right.vue";
import axios from "axios";

export default {
  components: {
    UserPanelRight,
  },
  data() {
    return {
      wallet: null,
      loading: true, // Изначально включаем состояние загрузки
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
    },
  },
  async created() {
    this.walletList();
  },
};

</script>

<style scoped>
.walent-flex-block {
  display: flex;
  justify-content: space-between;
  margin-left: 2%;
  width: 60%;
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
  font-size: 20px;
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
  font-size: 14px;
  margin-bottom: 5px;
}

.margin_t {
  margin-top: 10px;
  margin-bottom: 8px;
}

.h2 {
  font-size: 16px;
}

.grey-panel_price {
  background-color: #f1f1f1;
  width: 91%;
  text-align: start;
  padding: 4px 0;
  padding-left: 10px;
  padding-right: 8px;
  color: #979797;
  border-radius: 5px;
  margin-bottom: 12px;
  font-size: 14px;
  margin-bottom: 30px;
}

.bank-block {
  margin-top: 12px;
  align-items: center;
  align-content: center;
  display: flex;
}

.bank-block img {
  width: 30px;
  margin-right: 10px;
}

.bank-block span {
  font-size: 12px
}

.h3 {
  font-size: 14px;
  color: black;
}

.history_link {
  text-decoration: underline;
  font-size: 15px;
  color: black;
}

.grey-panel_img {
  background-color: #f1f1f1;
  width: 100%;
  text-align: center;
  padding: 4px;
  border-radius: 5pxvw;
  margin-bottom: 8px;
  font-size: 15px;
  border-radius: 5px;
}

.grey-panel_img img {
  width: 13px;
  text-align: center;
  margin-right: 12px;
}

.grey-panel_img span {
  font-size: 12px;
}

.grey-panel {
  background-color: #f1f1f1;
  width: 100%;
  text-align: center;
  padding: 4px 0;
  font-size: 14px;
  border-radius: 5px;
  margin-bottom: 6px;
}

.price {
  color: #141414;
  font-size: 16px;
  font-weight: bold;
  margin: 8px 0;
}

.col1 {
  margin-left: 0.8vw;
  margin-right: 26vw;
}

.data {
  color: #141414;
  font-size: 15px;
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
  font-size: 15px;
}

.product_status_g {
  color: #04c700;
  font-size: 15px;
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

.mtmax {
  margin-top: 108px;
}

.name2 {
  font-size: 14px;
  color: #141414;
  font-weight: lighter;
}

.green-block {
  background-color: #03c7004c;
  display: flex;
  padding: 3px;
  border-radius: 5px;
  margin-top: 8px;
}

.green-block .arrow {
  align-self: flex-end;
  margin: 0 10px;
  margin-bottom: 18px;
  width: 15%;
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
  display: block;
  color: #929292;
  padding: 0.5vw 0;
  font-size: var(--fs-25);
  text-decoration: none;
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
  font-size: 20px;
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
  font-size: 20px;
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
  font-size: 15px;
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
  font-size: 20px;
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
  cursor: pointer;
  box-sizing: border-box;
  background-color: white;
  border: solid 0.2vw #f9cc33;
  border-radius: 1vw;
  padding: 0.6vw 2.5vw;
}

.product_create_at {
  color: #d9d9d9;
  margin-top: 15px;
  font-size: 20px;
}

.product_title {
  display: flex;
  justify-content: space-between;
  color: #1d1d1d;
  text-decoration: underline 2px #1d1d1d;
  font-size: 20px;
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
  font-size: 14px;
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
  font-size: 20px;
  cursor: pointer;
  color: #141414;
}

.product {
  font-size: 20px;
}

.shop_title {
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: bold;
  padding-top: 20px;
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

.grey_text {
  color: black;
  font-size: var(--fs-18);
}

.shop_filter_button {
  border: 1px #585858 solid;
  background-color: #f9cc33;
  font-size: 20px;
  border-radius: 0.8vw;
  cursor: pointer;
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
  margin-right: 0.8vw;
}

.shop {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 1024px;
}

.price span {
  font-size: 16px;
  color: #aaa;
  animation: blink 10s infinite;
}

@keyframes blink {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}

@media (max-width: 1024px) and (min-width: 768px){
  .walent-flex-block {
    flex-direction: column;
  }

  .walent {
    width: 70%;
  }

  .grey-panel_price {
    width: 95%;
    margin-bottom: 20px;
  }

  .mtmax {
    margin-top: 20px;
  }

  .green-block {
    width: max-content;
  }

  .shop {
    width: 768px;
  }
}

@media (max-width: 768px)  {
  .walent-flex-block {
    flex-direction: column;
  }

  .walent {
    width: 70%;
  }

  .grey-panel_price {
    width: 95%;
    margin-bottom: 20px;
  }

  .mtmax {
    margin-top: 20px;
  }

  .green-block {
    width: max-content;
  }

  .shop {
    width: 424px;
  }

  .grey-panel_price {
    width: 90.5%;
  }
}
</style>
