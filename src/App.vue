<template>
  <v-popup-auth v-if="showPopupInfoAuth" @auth="Auth" @closePopup="closePopupAuth" />
  <header>
    <!-- Навбар -->
    <nav class="navbar">
      <a class="logo" @click="changeRoute('home')">
          <img src="./assets/logoSMT.png" alt="">
      </a>
      <div v-if="auth" class="navbar-menu">
        <div class="navbar-menu-left">
            <a @click="changeRoute('wallet')">Кошелек</a>
            <a @click="changeRoute('favorit')">Избранное</a>
            <div @click="changeRoute('chat')" class="block-message-menu">
                <a>Сообщения</a>
                <!-- <div class="number-message">
                    +5
                </div> -->
            </div>
            <div @click="changeRoute('notification')" class="block-message-menu-2">
                <a ><img class="notification-image" src="./assets/Complete.svg" alt=""></a>
                <!-- <div class="number-message-2">
                    +5
                </div> -->
            </div>
        </div>
        <div class="navbar-menu-right">
            <div class="profile" @click="changeRoute('myOrder')">
                <a  class="profile-photo-div"><img class="profile-photo" src="./assets/cate.png" alt=""></a>
                <a  class="profile-name">{{ name }}</a>
            </div>
            <button @click="changeRoute('createAds1')" class="button-posting">Разместить объявление</button>
        </div>
      </div>

      <ul v-else class="header_navigation-list_end">
        <li class="header_navigation-item">
          <a
            @click="showPopupAuth()"
            class="header_navigation-link header_navigation-name"
          >
            Войти
          </a>
        </li>
      </ul>

      <div class="navbar-poisk" v-if="route == 'home'">
        <div class="navbar-poisk-left">
            <button class="button-all-categories" @click="changeRoute('home')">
                <img src="./assets/lupaSMT.svg" alt="">
                <div @click="changeRoute('home')">Все категории</div>
            </button>
            <search-field :items="items" @selectProduct="selectProduct" />
        </div>
        <a  class="map-marker" >
            <img src="./assets/markermapSMT.svg" alt="">
            <div>Владикавказ</div>
        </a>
      </div>
    </nav>
  </header>

  <!-- <router-view /> -->
  <WaletView
    v-if="route == 'wallet'"
    @changeRoute="changeRoute"
    @selectProduct="selectProduct"
    @exitUser="exitUser"
  />
  <WalentHistoryView
    v-if="route == 'waletHistory'"
    @changeRoute="changeRoute"
    @selectProduct="selectProduct"
  />
  <SettingView
    v-if="route == 'setting'"
    @changeRoute="changeRoute"
    @selectProduct="selectProduct"
    @exitUser="exitUser"
  />
  <NotificationView v-if="route == 'notification'" />
  <MyOrder
    v-if="route == 'myOrder'"
    @changeRoute="changeRoute"
    @exitUser="exitUser"
    @selectProduct="selectProduct"
  />
  <HomeView v-if="route == 'home'" @selectProduct="selectProduct" :user_id="appMessage" />
  <DetailProductView
    v-if="route == 'detail'"
    @selectProduct="selectProduct"
    :idProduct="selectedProduct"
    @changeRoute="changeRoute"
    @goBack="goBack"
    :auth="auth"
  />
  <FavoritView
    v-if="route == 'favorit'"
    @changeRoute="changeRoute"
    @selectProduct="selectProduct"
    @exitUser="exitUser"
  />
  <ChatView v-if="route == 'chat'" />
  <OtherUsers
    v-if="route == 'OtherUsers'"
    @changeRoute="changeRoute"
    @selectProduct="selectProduct"
    @exitUser="exitUser"
  />
  <AdsView
    v-if="route == 'ads'"
    @changeRoute="changeRoute"
    @selectProduct="selectProduct"
    @exitUser="exitUser"
  />
  <AdresView
    v-if="route == 'adres'"
    @changeRoute="changeRoute"
    @selectProduct="selectProduct"
    @exitUser="exitUser"
  />
  <CreateAds1
    v-if="route == 'createAds1'"
    @changeRoute="changeRoute"
    @selectProduct="selectProduct"
    @exitUser="exitUser"
  />
  <CreateAds2
    v-if="route == 'createAds2'"
    @changeRoute="changeRoute"
    @selectProduct="selectProduct"
    @exitUser="exitUser"
  />
  
  
  <footer class="footer">
    <div class="banner">
      <div class="icon-stors">
          <a href="#"><img src="./assets/googleplay.png" alt=""></a>
          <a href="#"><img src="./assets/appstore.png" alt=""></a>
      </div>
      <img class="banner-img" src="./assets/bannerFooter.jpg" alt="">
    </div>
    <div class="flex-footer">
        <div class="flex-footer-1">
            <a >О нас</a>
            <a >Безопасность</a>
            <a >Поддержка</a>
            <a ><img src="./assets/vkSMT.png" alt=""></a>
            <a ><img src="./assets/whatsappSMT.png" alt=""></a>
            <a ><img src="./assets/mailSMT.png" alt=""></a>
        </div>
        <a class="flex-footer-2" >Загрузите мобильную версию</a>
    </div>
  </footer>
</template>

<script>
import vPopupAuth from "./components/popup/v-popup-auth.vue";
import vPopupRegister from "./components/popup/v-popup-register.vue";
import vPopupAddNumber from "./components/popup/v-popup-add-number.vue";
import vPopupFitback from "./components/popup/v-popup-fitback.vue";
import AdresView from "./views/AdresView.vue";
import AdsView from "./views/AdsView.vue";
import OtherUsers from "./views/OtherUsers.vue";
import ChatView from "./views/ChatView.vue";
import CreateAds1 from "./views/CreateAds1.vue";
import CreateAds2 from "./views/CreateAds2.vue";
import DetailProductView from "./views/DetailProductView.vue";
import FavoritView from "./views/FavoritView.vue";
import HomeView from "./views/HomeView.vue";
import MyOrder from "./views/MyOrder.vue";
import NotificationView from "./views/NotificationView.vue";
import WalentHistoryView from "./views/WalentHistoryView.vue";
import WaletView from "./views/WaletView.vue";
import SettingView from "./views/SettingView.vue";
import SearchField from "./components/search-field.vue";
import Cookies from "js-cookie";
import axios from "axios";
import { useWebSocketStore } from '@/stores/webSocketStore.js';

export default {
  components: {
    OtherUsers,
    SearchField,
    vPopupAuth,
    vPopupAddNumber,
    vPopupRegister,
    vPopupFitback,
    SettingView,
    NotificationView,
    WalentHistoryView,
    MyOrder,
    HomeView,
    WaletView,
    DetailProductView,
    CreateAds1,
    CreateAds2,
    ChatView,
    AdsView,
    FavoritView,
    AdresView,
  },
  data() {
    return {
      name: '',
      user: null,
      auth: true,
      isCategories: false,
      selectedFile: '',
      route: "home",
      popup: "popup-auth",
      showPopupInfoAuth: false,
      selectedProduct: null, // Здесь будет храниться выбранный продукт
    };
  },
  async created() {
    console.log("Server started and collections cleared.");
    let authB = false;
    if(Cookies.get('token') == undefined && Cookies.get('Refresh_token') != undefined) {
      const response = await axios
      .get("http://185.112.83.36:8080/refreshToken", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status == "fatal") {
          // alert("Ошибка в ответе refreshToken!");
        } else if(response.data != "") {
          alert("Вы авторизовались!");
          // Установка cookie на стороне клиента
          Cookies.set("token", `${response.data.data.JWT}`, { expires: 0.0208 });
          Cookies.set("Refresh_token", `${response.data.data.Refresh_token}`, { expires: 7 });
          // Cookies.set("token", `${response.data.data.JWT}`, { expires: 7 });
          authB = true;
          // Устанавливаем токен и подключаем WebSocket
          location.reload(true);
        } 
      })
      .catch(function (error) {
        alert("Произошла ошибка!");
        console.log(error);
        authB = false;
      })

    } else if(Cookies.get('token') != undefined) {
      authB = true;
      this.name = localStorage.getItem('Name');

    } else {
      authB = false;
    }
    this.auth = true;
    console.log("this.auth", this.auth)

    console.log("web socket")
    const webSocketStore = useWebSocketStore();
    webSocketStore.setTokenAndConnect(Cookies.get("token"));
  },
  methods: {
    changeRoute(route) {
      this.$emit("changeRoute", route);
    },

    showCategory() {
      this.isCategories = true;
    },

    closePopup() {
      this.isCategories = false;
    },

    Auth(state) {
      this.auth = state;
      console.log(this.auth);
    },
    selectProduct(product) {
      this.selectedProduct = product;
      console.log("this.selectedProduct", this.selectedProduct);
      this.route = "detail";
    },
    goBack() {
      this.route = "home"; // Возвращаемся на главную страницу
      this.selectedProduct = null; // Очищаем выбранный продукт
    },
    changeRoute(newRoute) {
      this.route = newRoute;
    },
    showPopupAuth() {
      this.showPopupInfoAuth = true;
    },
    exitUser() {
      this.auth = false;
      Cookies.remove('token');
      Cookies.remove('Refresh_token');
      location.reload(true);
    },

    closePopupAuth() {
      this.showPopupInfoAuth = false;
    },
  },
};
</script>

<style>
@font-face {
  font-family: "NotoSans";
  src: url("./assets/font/NotoSans-VariableFont_wdth,wght.ttf");
}

* {
  font-family: "NotoSans";
  --fs-20: calc(100vw / 72);
  --fs-25: calc(100vw / (288 / 5));
  --fs-30: calc(100vw / (144 / 3));
  --fs-48: calc(100vw / (120 / 4));
  --fs-16: calc(100vw / 90);
  --fs-15: calc(100vw / 96);
  --fs-14: calc(100vw / (720 / 7));
  --fs-40: calc(100vw / (144 / 4));
  --fs-10: calc(100vw / 144);
  --fs-23: calc(100vw / (1440 / 23));
  --fs-18: calc(100vw / 80);
  font-size: 14px;
}
/* 0,0555556
1,38889
*/
head {
  margin: 0;
  padding: 0;
}

header {
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
}

.line_block {
  display: flex;
}

footer {
  margin: 0;
  margin-bottom: 2vw;
  padding: 0;
}

.header_navigation-link_notification_counter {
  position: relative;
}

.header_navigation-item img {
  width: 10px;
}

footer nav a {
  margin: 0 0.5vw;
}

footer nav img {
  margin: 0 0.5vw;
  width: 4vw;
  height: 4.2vw;
}

footer nav {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-25);
  margin-bottom: 3vw;
  margin-top: 5vw;
}

.line {
  height: 0.5vw;
  background-color: #f8cb32;
  background-image: linear-gradient(
      -25deg,
      black 25%,
      transparent 25%,
      transparent 75%,
      black 75%,
      black
    ),
    linear-gradient(-25deg, black 25%, transparent 25%, transparent 75%, black 75%, black);
  background-size: 10% 15px;
  background-position: 11px 25px, 0 23px;
}

.line:nth-child(3) {
  margin-top: -0.45vw;
}

#parallelogramB {
  width: 50px;
  height: 21px;
  -webkit-transform: skew(-70deg);
  -moz-transform: skew(20deg);
  -o-transform: skew(20deg);
  background: black;
}

#parallelogramY {
  width: 50px;
  height: 21px;
  -webkit-transform: skew(-70deg);
  -moz-transform: skew(20deg);
  -o-transform: skew(20deg);
  background: #f8cb32;
}

footer div {
  display: flex;
  justify-content: center;
  font-size: var(--fs-25);
  text-decoration: underline black solid 1px;
}

header {
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
}

body {
  margin: 0;
  padding: 0;
}

nav {
  font-size: 20px;
}

ul {
  list-style-type: none;
}

.header_navigation {
  display: flex;
  height: 5vw;
  justify-content: space-between;
  align-items: center;
  margin: 0 2%;
}

.header_navigation-list {
  display: flex;
  justify-content: space-between;
  width: 70vw;
  padding: 0;
}

.header_navigation-image {
  border-radius: 50%;
}

i {
  color: white;
  position: absolute;
  background-color: red;
  font-weight: bold;
  padding: 0.2vw 0.3vw;
  font-size: var(--fs-10);
  top: 0vw;
  right: -0.5vw;
  border-radius: 50%;
}

html {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}

.header_navigation-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 1vw;
}

.header_navigation-item img {
  width: 1.8vw;
  height: 1.8vw;
}

a.header_navigation-link {
  color: black;
  align-self: center;
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
}

a.header_breadcroums {
  color: black;
  display: block;
  font-size: var(--fs-18);
  cursor: pointer;
}

.header_navigation-link.header_navigation-name {
  text-decoration: none;
  width: 90px;
}

.header_panel {
  display: flex;
  justify-content: center;
  font-size: var(--fs-18);
  padding: 2.2vw 0;
  align-items: center;
  background-color: #f8cb32;
}

div.header_panel_button {
  display: flex;
  align-content: center;
  cursor: pointer;
  align-items: center;
  color: black;
  background-color: #ffc500;
  box-sizing: border-box;
  padding: 0.3vw 5%;
  border-radius: 0.5vw;
  border: solid 1px #5b3700;
}

.notion {
  width: 15vw;
}
.finder_button {
  cursor: pointer;
  position: absolute;
  border-radius: 0.5vw;
  padding: 0.2vw 1vw;
  font-size: 20px;
  font-weight: 100;
  width: min-content;
  border: solid 0.1vw #5b3700;
  box-sizing: border-box;
  align-self: center;
  right: -5px;
  background-color: #ffc500;
}

div.header_panel_finder {
  position: relative;
  border: solid 1px #5b3700;
  width: 31.961%;
  margin-left: 25px;
  margin-right: 25px;
  height: calc(0.056 * 31vw);
  display: flex;
  border-radius: 0.5vw;
  padding: 0.3vw 0;
  background-color: #f7ead6;
}

.header_panel_button_adverts {
  cursor: pointer;
  color: #f8cb32;
  text-decoration: none;
  background-color: black;
  padding: 0.3vw 5%;
  height: calc(0.056 * 33.35vw);
  border-radius: 0.5vw;
  align-self: end;
  display: flex;
  align-items: center;
  font-size: 20px;
  border: solid 0.2vw #a96807;
}

.fs18 {
  font-size: var(--fs-18) !important;
}

.notif {
  width: 2.3vw !important;
  height: 2.3vw !important;
}

.header_navigation-list_end {
  display: flex;
  justify-content: end;
}

@media (min-width: 1548px){
  .line {
    height: 0.5vw;
    background-color: #f8cb32;
    background-image: linear-gradient(
        -25deg,
        black 25%,
        transparent 25%,
        transparent 75%,
        black 75%,
        black
      ),
      linear-gradient(
        -25deg,
        black 25%,
        transparent 25%,
        transparent 75%,
        black 75%,
        black
      );
    background-size: 10% 25px;
    background-position: 23px 0, 0px 15px;
  }
}






* {
    margin: 0;
    padding: 0;
    text-decoration: none;
}

/* Навбар */
.navbar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 1024px;
  margin: 35px auto;
  margin-top: 20px;
  position: relative;
}
.navbar-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2vw;
}
.navbar-menu-left {
  display: flex;
  align-items: center;
  gap: 20px;
}
.navbar-menu-left a {
  cursor: pointer;
  color: rgba(29, 29, 29, 1);
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 15px;
}
.block-message-menu {
    position: relative;
}
.number-message {
    position: absolute;
    top: -1vw;
    right: -1vw;
    padding: 0.1vw;
    border-radius: 100%;
    background-color: red;
    color: #ffff;
    text-align: center;
    font-family: "NotoSans";
    font-weight: 400;
    font-size: clamp(6px, 0.9vw, 40px);
}
.block-message-menu-2 {
    position: relative;
}
.number-message-2 {
    position: absolute;
    top: -0.8vw;
    right: -1vw;
    padding: 0.1vw;
    border-radius: 100%;
    background-color: red;
    color: #ffff;
    text-align: center;
    font-family: "NotoSans";
    font-weight: 400;
    font-size: clamp(6px, 0.9vw, 40px);
}
.notification-image {
    width: 20px;
}
.navbar-menu-right {
    display: flex;
    align-items: center;
    gap: 30px;
}
.profile {
    display: flex;
    gap: 15px;
    align-items: center;
}
.profile-photo {
    width: 30px;
}
.profile-name {
  color: rgba(29, 29, 29, 1);
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
}
.button-posting {
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 15px;
  background-color: rgba(83, 83, 83, 1);
  border: 1px solid rgba(83, 83, 83, 1);
  color: #ffff;
  padding: 2px;
  border-radius: 5px;
  transition: all 500ms;
}
.button-posting:hover {
    cursor: pointer;
    background: none;
    color: rgba(83, 83, 83, 1);
    padding: 0.4vw;
    border-radius: 10px;
}
.logo {
  display: inline-block;
  position: absolute;
  left: -100px;
}
.logo img {
    width: 75px;
}
.navbar-poisk{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: max-content;
    margin: 0 auto;
    margin-bottom: 10px;
}
.navbar-poisk-left {
    display: flex;
    align-items: center;
    gap: 10px;
}
.button-all-categories div {
  width: max-content;
}
.button-all-categories {
  font-family: "NotoSans";
  font-weight: 400;
  font-size: clamp(9px, 1.1vw, 40px);
  background-color: rgba(247, 202, 50, 1);
  border: 1px solid rgba(247, 202, 50, 1);
  border-radius: 10px;
  transition: 500ms background;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 5px 25px;
}
.button-all-categories img {
    width: 20px;
}
.button-all-categories:hover {
    background: none;
    cursor: pointer;
}
.input-fon {
    display: flex;
    align-items: center;
    background-color: rgba(247, 202, 50, 1);
    padding: 1px;
    border-radius: 5px;
}
.input-poisk {
  box-sizing: border-box;
  width: 578px;
  height: 30px;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 15px;
}
.input-button {
  box-sizing: border-box;
  background-color: rgba(247, 202, 50, 1);
  border: none;
  width: 80px;
  height: 30px;
  transition: all 500ms;
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 16px;
}
.input-button:hover {
    cursor: pointer;
    color: #ffff;
}
.map-marker {
    display: flex;
    align-items: center;
    gap: 0.5vw;
    color: black;
    font-family: "NotoSans";
    font-weight: 400;
    font-size: clamp(9px, 1.1vw, 40px);
}
.map-marker img {
    width: 1vw;
}






/* Картинка шапки и линия */
.line-header {
    width: 100%;
    height: 1vw;
    position: absolute;
}
.fon-header {
    position: relative;
    overflow: hidden;
    background-color: black;
    width: 100%;
    height: 42vw;
    z-index: 1;
}
.fon-header-img {
    z-index: 2;
    position: absolute;
    bottom: -5vw;
    left: 0;
    width: 100vw;
    height: 42vw;
}







/* Слайдер меню */

/* Задай просто позиционирование relative родителю слайдеру */

/* позицию высоты и отступов тоже настроишь под свой слайдер */

/* .slider-left-arrow {
    position: absolute;
    top: 0vw;
    left: 15vw;
    width: 2vw;
    transition: all 500ms;
}
.slider-left-arrow:hover {
    cursor: pointer;
    opacity: .7;
}
.slider-right-arrow {
    position: absolute;
    top: 0vw;
    right: 15vw;
    width: 2vw;
    transition: all 500ms;
}
.slider-right-arrow:hover {
    cursor: pointer;
    opacity: .7;
} */






/* Блок фильров и контента */

/* Блок фильтров */
.flex-filter-and-content {
  margin: 0 auto;
  margin-top: 2%;
  position: relative;
  z-index: 3;
  display: flex;
  gap: 4%;
  width: 1024px;
}

.filter {
  width: 31%;
  height: 380px;
}

.title-filter {
  font-family: "NotoSans";
  font-weight: 700;
  margin-bottom: 0.8%;
  font-size: 14px;
}

.checkbox-text {
    display: flex;
    flex-direction: column;
    gap: 0.5vw;
    font-family: "NotoSans";
    font-weight: 400;
    font-size: clamp(9px, 1.1vw, 40px);
    margin: 1.5vw 0;
}

/* Скрываем стандартные чекбоксы */
.checkbox-text-input {
    display: none;
}

/* Стили для меток */
.text-option {
   cursor: pointer;
   transition: color 0.3s;
}

/* Состояние активной опции */
.checkbox-text-input:checked + .text-option {
   color: rgba(247, 202, 50, 1);
}

.flex-filter-input{
  display: flex;
  gap: 2%;
  height: 15%;
  margin-bottom: 3%;
  width: 100%;
}
.flex-filter-input div{
  position: relative;
  width: 50%;
  height: 100%;
}
.flex-filter-input label{
  position: absolute;
  left: 4%;
  top: 38%;
  font-family: "NotoSans";
  font-weight: 400;
  color: rgba(146, 146, 146, 1);
  font-size: 12px;
}
.flex-filter-input input {
  box-sizing: border-box;
  margin: 10% 0;
  padding: 0 3% 0 17%;
  height: 55%;
  width: 100%;
  border: none;
  border-radius: 3%;
  background-color: rgba(240, 240, 240, 1);
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 12px;
}

.filter-region {
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 13px;
  margin: 3% 0;
}
.filter-region a {
  color: rgb(124, 124, 124);
  font-size: 13px;
}
.filter-region a:hover {
    color: rgb(124, 124, 124);
    cursor: pointer;
}

.star-rating {
    display: flex;
    flex-direction: row-reverse;
    justify-content: left;
    /* gap: 0.6vw; */
    margin: 0 0 5.5% 0;
}
.star-rating input[type="radio"] {
    display: none; /* Скрываем радиокнопки */
}
.star-rating label {
    font-size: 2.4vw;
    color: gray;
    cursor: pointer;
    transition: color 0.3s ease;
}
/* Если радиокнопка активна, подсветить текущую звезду и все предыдущие */
.star-rating input[type="radio"]:checked ~ label {
    color: gold;
}
/* Подсветить звёзды при наведении мыши */
.star-rating label:hover,
.star-rating label:hover ~ label {
    color: gold;
}

.button-filter {
  background-color: rgba(249, 204, 51, 1);
  color: #000000;
  border: none;
  width: 100%;
  height: 7%;
  border-radius: 3%;
  font-family: "NotoSans";
  font-weight: 400;
  font-size: clamp(11px, 0.8vw, 45px);
  transition: all 500ms;
  font-size: 13px;
}
.button-filter:hover {
  cursor: pointer;
  opacity: 0.7;
}




/* Контент */
.content {
    width: 69%;
}
.title-content {
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 14px;
}
.content-block {
  display: flex;
  flex-direction: column;
  gap: 0.7vw;
  margin: 3% 0;
}
.content-card {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.5%;
  border-bottom: 1px solid #a3a3a3;
}
.card-image {
    width: 100%;
}
.title-content-card {
  font-family: "NotoSans";
  font-weight: 500;
  font-size: clamp(9px, 0.9vw, 40px);
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}
.cost-content-card {
  font-family: "NotoSans";
  font-weight: 700;
  margin: 0.8% 0;
  font-size: 13px;
}
.button-content-card {
  background-color: rgba(249, 204, 51, 1);
  border: none;
  padding: 0.5% 6%;
  border-radius: .3vw;
  transition: all 500ms;
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 9px;
}
.info-content-card {
  font-family: "NotoSans";
  font-weight: 400;
  font-size: clamp(9px, 0.8vw, 40px);
  color: rgba(146, 146, 146, 1);
  line-height: 140%;
  margin: 0.2vw 0;
  height: 125px;
  overflow-y: hidden;
  font-size: 10px;
  text-overflow: ellipsis;
}
.work-schedule {
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 11px;
  margin: 0.5% 0;
}
.busy {
  font-family: "NotoSans";
  font-weight: 400;
  font-size: clamp(9px, 0.9vw, 40px);
  color: red;
}
.lately {
  margin: 0.6% 0px 0vw 0;
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 11px;
  color: rgba(217, 217, 217, 1);
}
.button-content-card:hover {
    opacity: 0.7;
    cursor: pointer;
}
.card-profile-photo {
  width: 35px;
  height: 35px;
  border-radius: 50%;  
}
.card-profile-name {
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 10px;
}
.row-reviews {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 105px;
}
.grade {
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 8px;
}
.star-rating-card {
  display: flex;
  flex-direction: row-reverse;
  justify-content: left;
  gap: 2%;
}
.star-rating-card input[type="radio"] {
    display: none; /* Скрываем радиокнопки */
}
.star-rating-card label {
  font-size: 11px;
  color: gray;
  cursor: pointer;
  transition: color 0.3s ease;
}
/* Если радиокнопка активна, подсветить текущую звезду и все предыдущие */
.star-rating-card input[type="radio"]:checked ~ label {
    color: gold;
}
/* Подсветить звёзды при наведении мыши */
.star-rating-card label:hover,
.star-rating-card label:hover ~ label {
    color: gold;
}
.number-of-reviews-flex {
  display: flex;
  gap: 8%;
  margin-left: 5px;
}
.number-of-reviews {
    font-family: "NotoSans";
    font-weight: 400;
    font-size: 8px;
}


.button-cards-div {
    display: flex;
    justify-content: center;
}
.button-all-cards {
  background-color: rgba(0, 0, 0, 1);
  color: #ffff;
  font-family: "NotoSans";
  font-weight: 400;
  font-size: 16px;
  padding: 0.2% 3%;
  border: none;
  border-radius: 10px;
  transition: all 500ms;
}
.button-all-cards:hover {
    opacity: 0.7;
    cursor: pointer;
}

@media (max-width: 1226px) and (min-width: 1024px){
  .navbar {
    width: 790px;
  }

  .input-poisk {
    width: 367px;
  }
}



@media (max-width: 1024px) and (min-width: 768px){
  .navbar {
    width: 566px;
  }

  .navbar-poisk {
    gap: 0;
  }

  .button-all-categories {
    font-size: 12px;
    border-radius: 5px;
    padding: 5px 12px;
  }

  .button-all-categories img {
    width: 15px;
  }

  .button-posting {
    font-size: 12px;
  }

  .navbar-poisk-left {
    gap: 0;
  }

  .navbar-menu-left {
    gap: 18px;
  }

  .profile-name {
    display: none;
  }

  .navbar-menu-right {
    gap: 15px;
  }

  .input-poisk {
    width: 267px;
  }

  .flex-filter-and-content {
    width: 760px;
  }

  .flex-filter-input input {
    box-sizing: border-box;
    margin: 2% 0;
    padding: 0 3% 0 14%;
    height: 63%;
    width: 100%;
    border: none;
    border-radius: 3%;
    background-color: rgba(240, 240, 240, 1);
    font-family: "NotoSans";
    font-weight: 400;
    font-size: 12px;
  }

  .shop_filter_block{
    display: flex;
    margin: 3% 0 4.5% 0;
    justify-content: space-between;
    width: 50%;
  }

  .block-desc {
    height: 230px;
    margin-left: 2%;
  }

  .card-profile-phot{
    width: 30px;
    height: 30px;
  }

  .flex-filter-input label {
    position: absolute;
    left: 4%;
    top: 17%;
    font-family: "NotoSans";
    font-weight: 400;
    color: rgba(146, 146, 146, 1);
    font-size: 12px;
  }

  .flex-filter-input div {
    width: 100%;
    height: 60%;
  }

  .flex-filter-input {
    height: 15%;
    margin-bottom: 3%;
    width: 100%;
    display: block;
  }
}

@media (max-width: 768px)  {
  .logo {
    display: inline-block;
    position: absolute;
    left: 40%;
    top: -55px;
  }

  .navbar {
    width: 300px;
    margin: 65px auto 10px auto;
  }

  .navbar-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    flex-direction: column;
    margin-top: 32px;
  }

  .input-poisk {
    height: 23px;
  }

  .navbar-poisk {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: -moz-max-content;
    width: max-content;
    margin: 0 auto;
    margin-bottom: 10px;
    flex-direction: column-reverse;
    height: 58px;
  }

  .button-all-categories {
    display: none;
  }

  .map-marker img {
    width: 10px;
  }

  .navbar-poisk {
    gap: 0;
  }

  .button-all-categories {
    font-size: 12px;
    border-radius: 5px;
    padding: 3px 10px;
  }

  .button-all-categories img {
    width: 15px;
  }

  .button-posting {
    font-size: 12px;
  }

  .navbar-poisk-left {
    gap: 0;
  }

  .navbar-menu-left {
    gap: 18px;
  }

  .profile-name {
    display: none;
  }

  .navbar-menu-right {
    gap: 15px;
  }

  .input-poisk {
    width: 267px;
  }











  .flex-filter-input input {
    font-size: 11px;
    padding: 0 3% 0 23%;
  }

  .button-all-cards {
    background-color: rgba(0, 0, 0, 1);
    color: #ffff;
    font-family: "NotoSans";
    font-weight: 400;
    font-size: 12px;
    padding: 1.2% 5%;
    border: none;
    border-radius: 5px;
    transition: all 500ms;
  }

  .content-card {
    display: block;
    padding-bottom: 3.5%;
  }

  .flex-filter-and-content {
    width: 760px;
  }

  .flex-filter-input input {
    box-sizing: border-box;
    margin: 2% 0;
    padding: 0 3% 0 23%;
    height: 63%;
    width: 100%;
    border: none;
    border-radius: 3%;
    background-color: rgba(240, 240, 240, 1);
    font-family: "NotoSans";
    font-weight: 400;
    font-size: 12px;
  }

  .info-content-card {
    height: 120px;
    width: 100%;
  }

  /* .shop_filter_block{
    display: flex;
    margin: 3% 0 4.5% 0;
    justify-content: space-between;
    width: 50%;
  } */

  .block-desc {
    height: 230px;
    margin-left: 2%;
  }

  .card-profile-phot{
    width: 30px;
    height: 30px;
  }

  .flex-filter-input label {
    position: absolute;
    left: 4%;
    top: 17%;
    font-family: "NotoSans";
    font-weight: 400;
    color: rgba(146, 146, 146, 1);
    font-size: 12px;
  }

  .title-content-card {
    font-size: 11px;
  }

  .title-content {
    font-size: 12px;
  }

  .filter-region a {
    color: rgb(124, 124, 124);
    font-size: 11px;
  }

  .flex-filter-input div {
    width: 100%;
    height: 60%;
  }

  .flex-filter-input {
    height: 15%;
    margin-bottom: 3%;
    width: 100%;
    display: block;
  }

  .flex-filter-input {
    height: 15%;
    margin-bottom: 3%;
    width: 100%;
    display: block;
  }

  .flex-filter-and-content {
    width: 400px;
  }

  .title-filter {
    font-size: 12px;
  }

  .flex-filter-input input {
    font-size: 11px;
    padding: 0 3% 0 23%;
  }

  .shop_filter_block p{
    font-size: 11px;
  }

  .shop_filter_block {
    display: flex;
    margin: 3% 0 7.5% 0;
    justify-content: space-between;
    width: 80%;
  }

  .filter-region {
    font-family: "NotoSans";
    font-weight: 400;
    font-size: 11px;
    margin: 3% 0;
  }

  .filter_rating img {
    width: 17%;
  }

  .button-filter {
    margin-top: 10px;
  }
} 


/* Banner предположительно */

.banner {
    margin-top: 10vw;
    position: relative;
    text-align: center;
}
.banner-img {
    width: 80%;
}
.icon-stors {
    position: absolute;
    display: flex;
    gap: 2vw;
    bottom: 1vw;
    left: 16vw;
}
.icon-stors a {
    transition: all 500ms;
}
.icon-stors a:hover {
    opacity: 0.5;
}
.icon-stors a img {
    width: 10vw;
}


/* Fotter предположительно */
.flex-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1vw;
    padding: 3vw 0 5vw 0;
}
.flex-footer-1 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2vw;
}
.flex-footer-1 a{
    font-family: "NotoSans";
    font-weight: 400;
    font-size: clamp(9px, 1.1vw, 40px);
    color: #000000;
    transition: all 500ms;
}
.flex-footer-1 a:hover{
    opacity: 0.5;
}
.flex-footer-1 a img{
    width: 3vw;
}
.flex-footer-2 {
    font-family: "NotoSans";
    font-weight: 400;
    font-size: clamp(9px, 1.1vw, 40px);
    color: #000000;
    text-decoration: underline;
    text-underline-offset: 5px;
    transition: all 500ms;
}
.flex-footer-2:hover {
    opacity: 0.6;
}
a {
  cursor: pointer;
}

html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    /* display: flex; */
    flex-direction: column;
}

#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Минимальная высота равна 100% экрана */
}

main {
    flex: 1; /* Занимает всю доступную высоту, оставляя место footer */
}

.footer {
    margin-top: auto; /* Прижимает футер вниз */
}
</style>