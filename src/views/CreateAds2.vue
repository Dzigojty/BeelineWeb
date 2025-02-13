<template>
  <div class="main">
      <div class="block">
        <a @click="changeRoute('createAds1')" class="route-view">
          <img class="arrow_back" src="../assets/arrow_back.png" alt="" />
        </a>
        <form @submit.prevent="sigAds" action="/" method="post">
          <div class="crateAds">
            <div class="shop_title">Новое объявление</div>
            <div class="sm_title">Название объявления</div>
            <div class="flex_block">
              <div class="grey_text_tr">Название объявления</div>
              <input v-model="title" class="input" type="text" />
            </div>
            <div class="sm_title">Название объявления</div>
            <div class="flex_block">
              <div class="grey_text_tr">Тип оборудования</div>
              <input v-model="type" class="filter_block" type="text" />
            </div>
            <div class="flex_block">
              <div class="grey_text_tr">Год выпуска</div>
              <input class="filter_block" type="text" />
            </div>
            <div class="sm_title">Подробности</div>
            <div class="flex_block price_block">
              <div class="grey_text_tr">Цена</div>
              <input
                v-model="Rate"
                class="filter_block"
                type="text"
                style="margin-right: 2vw"
              />

              <div class="checkbox">
                <input
                  v-model="priceType"
                  class="custom-checkbox"
                  type="radio"
                  id="hours"
                  name="daysOrHours"
                  value="час"
                />
                <label for="hours">Почасовая</label>
              </div>
              <div class="checkbox">
                <input
                  v-model="priceType"
                  class="custom-checkbox"
                  type="radio"
                  id="days"
                  name="daysOrHours"
                  value="день"
                />
                <label for="days">Сутки</label>
              </div>
            </div>

            <div id="hour_block" v-if="priceType == 'час'">
              <input v-model="hourTo" class="hour_input" type="time" placeholder="С 6:00" />
              <input v-model="hourFrom" class="hour_input" type="time" placeholder="До 18:00" />
            </div>
            <div class="flex_block" style="margin-bottom: 5.8vw">
              <div>
                <div class="grey_text_tr">Фотографии</div>
                <div class="grey_text_tr">Не более 30</div>
              </div>
              <div class="min-container">
                <input
                  class="filter_block downloade_file"
                  id="uploade-photo"
                  type="file"
                  multiple
                  @change="handleFileUpload"
                />
              </div>
            </div>
            <div class="preview-container">
              <div v-for="(image, index) in uploadedImages" :key="index" class="image-preview">
                <img :src="image" @click="deleteFile(index)" alt="Загруженное фото" />
              </div>
            </div>


            <div class="flex_block textarea_block">
              <div class="grey_text_tr">Описание объявления</div>
              <textarea
              v-model="desc"
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
                v-model="place"
                class="input"
                type="text"
                placeholder="Начните вводить адрес, а потом выберите из списка"
              />
            </div>
            <div class="sm_title">Контакты</div>
            <div class="flex_block" style="margin-bottom: 1vw;">
              <div class="grey_text_tr">Телефон</div>
              <input
                v-model="phone"
                v-mask="'+7 (###) ###-##-##'"
                class="input_small"
                type="text"
              />
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
</template>

<script scoped>
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      uploadedImages: [], // Список загруженных изображений
      priceType: '',
      title: "",
      desc: "",
      Rate: 0,
      // daily_rate: 0,
      phone: "",
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
    deleteFile(id) {
      this.uploadedImages.splice(id, 1);
      console.log(this.uploadedImages);
    },
    handleFileUpload(event) {
      const files = event.target.files;

      // Ограничение на количество загружаемых изображений
      if (files.length > 30) {
        alert("Вы можете загрузить не более 30 изображений");
        return;
      }

      Array.from(files).forEach((file) => {
        // Проверка типа файла
        if (!file.type.startsWith("image/")) {
          alert(`Файл ${file.name} не является изображением`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImages.push(e.target.result); // Добавляем base64 строку
        };
        reader.readAsDataURL(file); // Конвертируем в base64
      });
    },

    async sigAds() {
      console.log({
            Image: this.uploadedImages, // Загруженные изображения в base64
            Title: this.title,
            Description: this.desc,
            Hourly_rate: this.priceType === 'час' ? parseInt(this.Rate) : 0,
            Daily_rate: this.priceType === 'день' ? parseInt(this.Rate) : 0,
            Category_id: 1,
            position: (1, 1),
            Location: "Республика Северная Осетия - Алания, г.Владикавказ"
          });
      try {
        console.log("Отправка запроса sigAds ")
        // Отправляем base64 изображения в виде массива
        const response = await axios.post(
          "http://localhost:8080/sigAds",
          {
            Title: this.title,
            Description: this.desc,
            Hourly_rate: this.priceType === 'час' ? parseInt(this.Rate)  : 0,
            Daily_rate: this.priceType === 'день' ? parseInt(this.Rate)  : 0,
            Category_id: 1,
            PositionX: 1,
            PositionY: 1,
            Location: "Республика Северная Осетия - Алания, г.Владикавказ",
            Image: this.uploadedImages, // Загруженные изображения в base64
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // для отправки куки
          }
        );

        console.log(response);

        if(response.data.state == 'fatal') {
            console.error("FATAL sigAds")
        } else {
          console.log(response);
          this.changeRoute('home'); // Переход на другую страницу после отправки
        }
      } catch (error) {
        console.error("Ошибка при отправке:", error);
      }
    },


    // /// Image
    // handleFileChange(event) {
    //   const file = event.target.files[0];
    //   console.log(file);
    //   if (file) {
    //     this.selectedFile = file;
    //   }
    // },

    // convertToBase64(event) {
    //   handleFileChange(event);
    //   if (this.selectedFile) {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       this.base64Image = e.target.result;
    //     };
    //     reader.readAsDataURL(this.selectedFile);
    //   } else {
    //     alert("Пожалуйста, выберите файл!");
    //   }
    // },
    changeRoute(route) {
      this.$emit("changeRoute", route);
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
  padding: 3px 3px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: black;
  color: white;
  font-weight: bold;
  font-size: 14px;
  width: 40%;
}

#uploade-photo {
  opacity: 0;
  position: relative;
  z-index: 10;
  height: 110px;
}

.buttons {
  margin-top: 80px;
}

#hour_block {
  margin-left: 186px;
}

.hour_input {
  border: none;
  border-radius: 5px;
  background-color: #f1f1f1;
  width: 80px;
  font-size: 14px;
  color: #929292;
  padding: 3px 3px;
  margin-left: 20px;
}

.grey_button {
  padding: 3px 10%;
  border-radius: 5px;
  border: none;
  background-color: #d9d9d9;
  cursor: pointer;
  color: black;
  font-weight: 200;
  font-size: 14px;
  margin-left: 10px;
}

.flex-block {
  display: flex;
}

.textarea {
  height: 100px;
  resize: none;
}

.min-container {
  background-color: #f1f1f1;
  background-image: url("../assets/icon_file.svg");
  background-repeat: no-repeat;
  background-position: center;
  height: max-content;
  border-radius: 5px;
  background-size: 25px;
  width: 245px;
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
  font-size: 14px;
  margin-right: 10px;
}

.align {
  text-align: center;
  padding: 0 !important;
  margin: 0 !important;
  margin-right: 4.6vw !important;
}

.downloade_file {
  height: 10vw;
}

.sm_title {
  font-size: 16px;
  color: #141414;
  font-weight: 600;
  margin-top: 15px;
}

/* создание в label псевдоэлемента before со следующими стилями */
.custom-checkbox + label::before {
  content: "";
    display: inline-block;
    width: 0.8em;
    height: 0.8em;
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
  width: 225px;
  padding: 3px 3px;
}

.input {
  border: 1px #929292 solid;
  width: 230px;
  padding: 2px 2px;
  font-size: 14px;
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
  /* margin-bottom: 1em;
  margin-right: 3vw; */
}

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
  cursor: pointer;
  border-radius: 1vw;
  font-size: var(--fs-20);
  align-content: center;
  align-items: center;
  align-self: center;
  margin: 0 auto;
  margin-top: 4vw;
}

/* .main {
  margin: 0 auto;
  width: 48vw;
} */

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
  font-size: 14px;
  color: #929292;
  align-self: flex-start;
  margin-right: 0vw;
  width: 190px;
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
  cursor: pointer;
  font-size: var(--fs-15);
  border: solid 0.2vw #d9d9d9;
  border-radius: 1vw;
  padding: 0.6vw 0;
}

.filter_block {
  background-color: #f1f1f1;
  border-radius: 5px;
  border: none;
  width: 230px;
  font-size: 14px;
  padding: 2px;
  margin-bottom: 0vw;
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
  border: solid 0.2vw #f9cc33;
  cursor: pointer;
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
  justify-content: center;
  display: flex;
  margin: 0 auto;
  width: 1024px;
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
  margin-top: 12px;
  display: flex;
  align-content: flex-start;
  height: 30px;
  margin-bottom: 10px;
}

.flex_block:nth-child(2) {
  height: 30px;
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
  font-size: 16px;
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
  font-size: var(--fs-20);
}

.preview-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 95px;
}

.image-preview {
  margin: 8px;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
    height: 50px;
    width: 100%;
    justify-content: space-between;
  }

  .preview-container {
    margin-top: 115px;
    width: 244px;
  }

  .image-preview {
    margin-left: 0;
  }

  .price_block {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    height: 100px;
    width: 100%;
    justify-content: space-between;
  }

  .flex_block:nth-child(2) {
    height: 50px;
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

  .textarea_block {
    height: 135px;
    margin-bottom: 24px;
  }

  .flex-block {
    display: flex;
    flex-direction: column;
    height: 57px;
    justify-content: space-between;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .black_button {
    width: 100%;
  }

  .grey_button {
    padding: 3px 23%;
    border-radius: 5px;
    border: none;
    background-color: #d9d9d9;
    cursor: pointer;
    color: black;
    font-weight: 200;
    font-size: 14px;
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
