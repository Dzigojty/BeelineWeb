<template>
  <div class="main">
    <div class="detailProduct">
      <div class="block">
        <a @click="changeRoute('createAds1')"  class="route-view">
          <img class="arrow_back" src="../assets/arrow_back.png" alt="" />
        </a>
        <form action="/" method="post">
          <div class="crateAds">
            <div class="shop_title">Новое объявление</div>
            <div class="sm_title">Название объявления</div>
            <div class="flex_block">
              <div class="grey_text_tr">Название объявления</div>
              <input class="input" type="text" />
            </div>
            <div class="sm_title">Название объявления</div>
            <div class="flex_block">
              <div class="grey_text_tr">Тип оборудования</div>
              <input class="filter_block" type="text" />
            </div>
            <div class="flex_block">
              <div class="grey_text_tr">Год выпуска</div>
              <input class="filter_block" type="text" />
            </div>
            <div class="sm_title">Подробности</div>
            <div class="flex_block">
              <div class="grey_text_tr">Цена</div>
              <input
                class="filter_block"
                type="text"
                style="margin-right: 2vw"
              />

              <div class="checkbox">
                <input
                  class="custom-checkbox"
                  type="radio"
                  id="hours"
                  name="daysOrHours"
                />
                <label for="hours" >Почасовая</label>
              </div>
              <div class="checkbox">
                <input
                  class="custom-checkbox"
                  type="radio"
                  id="days"
                  name="daysOrHours"
                />
                <label for="days">Сутки</label>
              </div>
            </div>
            <div id="hour_block">
              <input
                class="hour_input"
                type="text"
                placeholder="С 6:00"
              />
              <input
                class="hour_input"
                type="text"
                placeholder="До 18:00"
              />
            </div>
            <div class="flex_block" style="margin-bottom: 12vw">
              <div>
                <div class="grey_text_tr">Фотографии</div>
                <div class="grey_text_tr">Не более 30</div>
              </div>
              <div class="min-container"><input class="filter_block downloade_file"  id="uploade-photo" type="file" /></div>
            </div>

            <div class="flex_block" style="margin-bottom: 15vw">
              <div class="grey_text_tr">Описание объявления</div>
              <textarea
                id="story"
                class="filter_block textarea"
                name="story"
                rows="5"
                cols="33"
              ></textarea>
            </div>

            <div class="flex-block">
              <div class="sm_title align">Адрес осмотра</div>
              <input
                class="input"
                type="text"
                placeholder="Начните вводить адрес, а потом выберите из списка"
              />
            </div>
            <div class="sm_title">Контакты</div>
            <div class="flex_block" style="margin-bottom: 2vw; margin-top: 2vw">
              <div class="grey_text_tr">Телефон</div>
              <input v-model="phone"  v-mask="'+7 (###) ###-##-##'"  class="input_small" type="text" />
            </div>
            <div class="flex_block">
              <div class="grey_text_tr">Способ связи</div>
              <div>
                <div class="checkbox">
                  <input
                    class="custom-checkbox"
                    type="radio"
                    id="CallsAndMessage"
                    name="CallsAndMessage"
                  />
                  <label for="CallsAndMessage">Звонки и сообщения</label>
                </div>
                <div class="checkbox">
                  <input
                    class="custom-checkbox"
                    type="radio"
                    id="Calls"
                    name="CallsAndMessage"
                  />
                  <label for="Calls">Только звонки</label>
                </div>
                <div class="checkbox">
                  <input
                    class="custom-checkbox"
                    type="radio"
                    id="Message"
                    name="CallsAndMessage"
                  />
                  <label for="Message">Только сообщения</label>
                </div>
              </div>
            </div>
            <div class="buttons">
              <input type="submit" class="black_button" value="Разместить" />
              <a @click="changeRoute('home')" class="grey_button">Сохранить и выйти</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { ref } from "vue";

let hours_days = true;

export default {
  data() {
    return {
      phone: '',
      array_img: ["../assets/bank.png"],
      images: ref([
        "https://via.placeholder.com/150/0000FF", // Blue
        "https://via.placeholder.com/150/008000", // Green
        "https://via.placeholder.com/150/FF0000", // Red
        "https://via.placeholder.com/150/FFFF00", // Yellow
        "https://via.placeholder.com/150/FFA500", // Orange
      ]),
    };
  },

  methods: {
    changeRoute(route) {
      this.$emit('changeRoute', route);
    },
  //   selectTypeTime(){
  //     if (hours_days) {
  //       document.getElementById("hour_block").style.height = "max-content";
  //       document.getElementById("hour_block").style.visibility = "visible";
  //         /* visibility: hidden;
  // height: 0; */
  // /* visibility: visible; */
  // // height: max-content;
  //       hours_days = false;
  //     } else {
  //       document.getElementById("hour_block").style.height = "0";
  //       document.getElementById("hour_block").style.visibility = "hidden";
  //       hours_days = true;
  //     }
  //   },
    // getImagePath(imageFileName) {
    //   const images = require.context("@/assets/", false, /\.png$/);
    //   return images(`./${imageFileName}.png`);
    // },
    displayImage(inputElement) {
      // array_img.push(inputElement.src);
      console.log(inputElement);
      const disp = document.getElementById("changMyPleas");
      disp.innerHTML = "dsadsad";
      // const file = inputElement.files[0];
      // const imageURL = URL.createObjectURL(file);
      // document.getElementById("preview").src = imageURL;
      // inputElement.value = null;
      // document.getElementById("preview").onload = () =>
      //   URL.revokeObjectURL(imageURL);
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
.black_button {
  padding: 0.8vw 3vw;
  border-radius: 0.8vw;
  border: none;
  background-color: black;
  color: white;
  font-weight: bold;
  font-size: var(--fs-18);
}

#uploade-photo{
   opacity: 0;
   position: relative;
   z-index: 10;
}

.buttons {
  margin-top: 13vw;
}

#hour_block{
  margin-left: 21vw;
  /* visibility: visible; */
  /* visibility: hidden;
  height: 0; */
  /* height: max-content; */
}

.hour_input{
  border: none;
  border-radius: 0.6vw;
  background-color: #F1F1F1;
  width: 7vw;
  font-size: var(--fs-18);
  color: #929292;
  padding: 0.8vw 1vw;
  margin-left: 1vw;
}

.grey_button {
  padding: 0.8vw 3vw;
  border-radius: 0.8vw;
  border: none;
  background-color: #d9d9d9;
  color: black;
  font-weight: 200;
  font-size: var(--fs-18);
  margin-left: 2vw;
}

.flex-block {
  display: flex;
}

.textarea {
  height: 11vw;
  width: 38vw !important;
}

.min-container{
  background-color: #F1F1F1;
  background-image: url("../assets/icon_file.svg");
  background-repeat: no-repeat;
  background-position: center;
  height: max-content;
  border-radius: 1vw;
  background-size: 3vw;
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

.align {
  text-align: center;
  padding: 0 !important;
  margin: 0 !important;
  margin-right: 9vw !important;
}

.downloade_file {
  height: 10vw;
}

.sm_title {
  font-size: var(--fs-25);
  color: #141414;
  font-weight: 600;
  margin-top: 2.5vw;
}

/* создание в label псевдоэлемента before со следующими стилями */
.custom-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: #d9d9d9;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  border-radius: 50%;
}

/* стили при наведении курсора на checkbox */
.custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #b3d7ff;
}

/* стили для активного чекбокса (при нажатии на него) */
.custom-checkbox:not(:disabled):active + label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}

.input_small {
  border: 1px #929292 solid;
  width: 20vw;
  padding: 0.6vw 1vw;
}

.input {
  border: 1px #929292 solid;
  width: 40vw;
  padding: 0.6vw 1vw;
}

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
  margin-right: 3vw;
}

.shop_title {
  font-size: var(--fs-48);
  font-weight: bold;
  padding-top: 2vw;
}

.desc_field {
  color: #929292;
  font-size: var(--fs-15);
}

.field_name {
  color: #141414;
  margin: 1vw 0;
  font-weight: 600;
}

h2 {
  font-size: var(--fs-40);
}

.button_show_more {
  display: block;
  background-color: black;
  color: #f9cc33;
  padding: 1.4vw 5vw;
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

.margin-top {
  margin-top: 3vw !important;
  margin-bottom: 2vw !important;
}

.otsivi {
  margin-top: 3vw;
}

.grey_text_tr {
  font-size: var(--fs-18);
  color: #929292;
  align-self: flex-start;
  margin-right: 2vw;
  width: 20vw;
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
  background-color: #d9d9d9;
  font-size: var(--fs-15);
  border: solid 0.2vw #d9d9d9;
  border-radius: 1vw;
  padding: 0.6vw 0;
}

.filter_block {
  background-color: #f1f1f1;
  border-radius: 1vw;
  padding-top: 0.8vw;
  padding-bottom: 0.8vw;
  padding-left: 1.5vw;
  padding-right: 3vw;
  border: none;
  width: 15vw;
  font-size: var(--fs-20);
  padding: 2vw;
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
}

.product_button_chat {
  margin-top: 1vw;
  text-align: center;
  box-sizing: border-box;
  color: #000000;
  background-color: white;
  border: solid 0.2vw #000000;
  border-radius: 1vw;
  padding: 0.6vw 2.5vw;
}

.product_button_date {
  text-align: center;
  margin-top: 1vw;
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

.flex_block {
  margin-top: 1vw;
  display: flex;
  align-content: flex-start;
  height: 3.5vw;
  margin-bottom: 1.5vw;
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
  padding: 0.8vw 0.7vw;
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