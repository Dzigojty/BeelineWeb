<template>
  <div class="shop">
    <user-panel-right @changeRoute="changeRoute" @exitUser="exitUser" />

    <div class="shop_product">
      <div class="shop_title">Настройки</div>
      <div class="mail-block">
        <div>
          <span class="mail">kakoyyakrasiviy@yandex.ru</span>
          <span class="edit-block">
            <img src="../assets/pen.svg" alt="" />
            <samp class="desc-mail">(редактировать)</samp>
          </span>
        </div>
        <div class="verify">
          <img src="../assets/verified.svg" alt="" />
          <samp>Подтвержден</samp>
        </div>
      </div>
      <div class="grey-line2"></div>
      <h3>Телефоны</h3>
      <h3 class="regular">8 928 282 25 25</h3>
      <button class="grey_button">Добавить</button>
      <div class="grey-line2"></div>
      <h3>Звонки</h3>
      <samp class="desc-mail margin-tb">Когда принимать</samp>
      <div class="shop_filter_block">
        <input class="filter_block" type="text" placeholder="с 00:00" />
        <input class="filter_block" type="text" placeholder="до 00:00" />

        <div class="checkbox">
          <input
            class="custom-checkbox"
            type="checkbox"
            id="color-2"
            name="color-2"
            value="time"
          />
          <label for="color-2">В любое время</label>
        </div>
      </div>
      <div class="grey-line2"></div>
      <div class="shop_title kast">Защита профиля</div>
      <h2>Смена пароля</h2>
      <div class="column">
        <input class="filter_block" type="text" placeholder="Текущий" />
        <input class="filter_block" type="text" placeholder="Новый" />
        <button class="yellow_button">Сохранить</button>
      </div>
      <div class="grey-line2"></div>
      <h2>Соцсети и сервисы</h2>
      <div class="flex-block">
        <img src="../assets/vk_icon.png" alt="" />
        <samp class="text_light">VK ID</samp>
      </div>
      <div class="grey-line2"></div>
      <h2>Удаление профиля</h2>
    </div>
  </div>
</template>

<script>
import UserPanelRight from "../components/user-panel-right.vue";

export default {
  methods: {
    changeRoute(newRoute) {
      this.$emit("changeRoute", newRoute);
    },
    exitUser() {
      this.$emit("exitUser");
    },
  },
  components: {
    UserPanelRight,
  },
  setup() {},
};
</script>

<style scoped>
.flex-block {
  display: flex;
  align-items: center;
}

.flex-block img {
  width: 2vw;
}

h2 {
  margin-bottom: 1vw;
  font-size: var(--fs-30);
}

.column {
  display: grid;
}

.text_light {
  margin-left: 1vw;
  font-size: var(--fs-20);
  font-weight: 200;
  color: #929292;
}

.column .filter_block {
  width: 20vw;
  margin-bottom: 0.5vw;
}

.yellow_button {
  background-color: #f9cc33;
  padding: 0.8vw 3vw;
  width: 15vw;
  cursor: pointer;
  border-radius: 1.2vw;
  border: none;
  margin-top: 1vw;
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.color-2 {
  font-size: var(--fs-18);
  font-weight: 200;
}

/* для элемента label, связанного с .custom-checkbox */
.custom-checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}

/* создание в label псевдоэлемента before со следующими стилями */
.custom-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid black;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  border-radius: 50%;
}

/* стили при наведении курсора на checkbox */
/* .custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #b3d7ff;
  
} */

/* стили для активного чекбокса (при нажатии на него) */
/* .custom-checkbox:not(:disabled):active + label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
} */

/* стили для чекбокса, находящегося в фокусе */
/* .custom-checkbox:focus + label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
} */

/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.custom-checkbox:focus:not(:checked) + label::before {
  border-color: #80bdff;
}

/* стили для чекбокса, находящегося в состоянии checked */
.custom-checkbox:checked + label::before {
  border-color: #f9cc33;
  background-color: #f9cc33;
  border-radius: 50%;
  /* background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e"); */
}

/* стили для чекбокса, находящегося в состоянии disabled */
.custom-checkbox:disabled + label::before {
  background-color: #e9ecef;
}

body {
  padding: 20px 50px;
}

.checkbox {
  margin-bottom: 1em;
}

.grey_button {
  background-color: #d9d9d9;
  padding: 0.8vw 3vw;
  border-radius: 1.2vw;
  cursor: pointer;
  border: none;
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

.mail-block {
  display: flex;
  justify-content: space-between;
}

.edit-block {
  margin-left: 0.5vw;
}

.verify {
  display: flex;
  margin-right: 3vw;
  align-content: center;
}

.kast.shop_title {
  margin: 0;
  padding: 0;
}

.verify img {
  width: 2vw;
}

.margin-tb {
  margin-bottom: 1vw;
}

.verify samp {
  text-decoration: underline;
  font-size: var(--fs-18);
  font-weight: 200;
  margin: 0 1vw;
}

.edit-block img {
  width: 1.6vw;
  margin: 0 1vw;
}

.desc-mail {
  color: #ababab;
  text-decoration: underline;
}

.mail {
  text-decoration: underline;
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
  padding: 0 7vw;
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
  cursor: pointer;
  font-size: var(--fs-16);
  border-radius: 0.8vw;
  text-align: center;
  padding: 0.5vw 0;
  margin: 1vw 4.5vw 2vw 4.5vw;
}

.checkbox {
  margin: auto 0;
}

.shop_filter_block {
  display: flex;
  margin: 1vw 4vw 1vw 0;
  justify-content: space-between;
  width: 39vw;
  align-content: center;
}

.grey-line2 {
  background-color: #d9d9d9;
  height: 1px;
  margin: 2vw 0;
}

.filter_block {
  background-color: #f1f1f1;
  border-radius: 1vw;
  padding-top: 0.8vw;
  padding-bottom: 0.8vw;
  padding-left: 1.5vw;
  padding-right: 3vw;
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
