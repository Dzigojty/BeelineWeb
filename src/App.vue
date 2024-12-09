<template>
  <v-popup-auth v-if="showPopupInfoAuth" @auth="Auth" @closePopup="closePopupAuth" />
  <v-popup-category v-if="isCategories" @closePopup="closePopup" />
  <header>
    <nav class="header_navigation">
      <a class="header_breadcroums" @click="changeRoute('home')">
        ➤ Владикавказ, район, радиус
      </a>
      <ul v-if="auth" class="header_navigation-list">
        <li @click="changeRoute('wallet')" class="header_navigation-item">
          <img src="./assets/wallet.png" alt="" width="20" height="20" />
          <a class="header_navigation-link">Кошелек</a>
        </li>
        <li @click="changeRoute('favorit')" class="header_navigation-item">
          <img src="./assets/star.png" alt="" width="20" height="20" />
          <a to="/favorit" class="header_navigation-link"> Избранное </a>
        </li>
        <li @click="changeRoute('chat')" class="header_navigation-item">
          <img src="./assets/message.png" alt="" />
          <a to="/chat" class="route-view header_navigation-link"> Сообщения </a>
        </li>
        <li
          @click="changeRoute('notification')"
          class="header_navigation-item header_notification"
        >
          <span class="header_navigation-link_notification_counter">
            <img class="notif" src="./assets/notification.png" alt="" />
            <i>+5</i>
          </span>
          <a to="/notif" class="header_navigation-link fs18 notion">
            (+5 новых уведомлений)
          </a>
          <!-- <a class="header_navigation-link fs18 notion" href="#"></a> -->
        </li>
        <li @click="changeRoute('myOrder')" class="header_navigation-item">
          <img
            class="header_navigation-image"
            src="./assets/user.png"
            alt=""
            width="40"
            height="40"
          />
          <a to="/myOrder" class="header_navigation-link header_navigation-name">
            Имя Фамилия
          </a>
        </li>
      </ul>
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
    </nav>

    <div class="header_panel">
      <div class="header_panel_button" @click="changeRoute('home')">Все категории</div>
      <search-field :items="items" @selectProduct="selectProduct" />
      <a @click="changeRoute('createAds1')" class="header_panel_button_adverts">
        Разместить объявление
      </a>
      <!-- <div class="header_panel_button_adverts">Разместить объявление</div> -->
    </div>
    <div class="line"></div>
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
    :productId="selectedProduct"
    @changeRoute="changeRoute"
    @goBack="goBack"
  />
  <FavoritView
    v-if="route == 'favorit'"
    @changeRoute="changeRoute"
    @selectProduct="selectProduct"
    @exitUser="exitUser"
  />
  <ChatView v-if="route == 'chat'" />
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
  <footer>
    <nav>
      <a>О нас</a>
      <a>Безопасность</a>
      <a>Поддержка </a>
      <img src="./assets/vk_icon.png" alt="" />
      <img src="./assets/whatsapp_icon.png" alt="" />
      <img src="./assets/mail_icon.png" alt="" />
    </nav>
    <div>Загрузите нашу мобильную версию</div>
  </footer>
</template>

<script>
import vPopupAuth from "../src/components/popup/v-popup-auth.vue";
import vPopupRegister from "../src/components/popup/v-popup-register.vue";
import vPopupAddNumber from "../src/components/popup/v-popup-add-number.vue";
import vPopupFitback from "../src/components/popup/v-popup-fitback.vue";
import AdresView from "../src/views/AdresView.vue";
import AdsView from "../src/views/AdsView.vue";
import ChatView from "../src/views/ChatView.vue";
import CreateAds1 from "../src/views/CreateAds1.vue";
import CreateAds2 from "../src/views/CreateAds2.vue";
import DetailProductView from "../src/views/DetailProductView.vue";
import FavoritView from "../src/views/FavoritView.vue";
import HomeView from "../src/views/HomeView.vue";
import MyOrder from "../src/views/MyOrder.vue";
import NotificationView from "../src/views/NotificationView.vue";
import WalentHistoryView from "../src/views/WalentHistoryView.vue";
import WaletView from "../src/views/WaletView.vue";
import SettingView from "../src/views/SettingView.vue";
import SearchField from "./components/search-field.vue";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  components: {
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
      user: null,
      auth: false,
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
          alert("Ошибка в ответе refreshToken!");
        } else if(response.data != "") {
          alert("Вы авторизовались!");
          // Установка cookie на стороне клиента
          Cookies.set("token", `${response.data.data.JWT}`, { expires: 0.0208 });
          Cookies.set("Refresh_token", `${response.data.data.Refresh_token}`, { expires: 7 });
          // Cookies.set("token", `${response.data.data.JWT}`, { expires: 7 });
          authB = true;
        } 
      })
      .catch(function (error) {
        alert("Произошла ошибка!");
        console.log(error);
        authB = false;
      })
    } else if(Cookies.get('token') != undefined) {
      authB = true;
    } else {
      authB = false;
    }
    this.auth = authB;
    console.log(this.auth)
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
      console.log(product)
      this.selectedProduct = product;
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
      this.deleteToken();
    },
    closePopupAuth() {
      this.showPopupInfoAuth = false;
    },
  },
};
</script>

<style>
@font-face {
  font-family: "Noto Sans";
  src: url("./assets/font/NotoSans-VariableFont_wdth,wght.ttf");
}

* {
  font-family: "Noto Sans";
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
  font-size: var(--fs-20);
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
  width: 30vw;
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
}

body {
  margin: 0;
  padding: 0;
}

nav {
  font-size: var(--fs-20);
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
  font-size: var(--fs-20);
  margin-left: 0.5vw;
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
  width: 12vw;
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
  font-size: var(--fs-20);
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
  font-size: var(--fs-20);
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

@media (min-width: 1548px) {
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
</style>
