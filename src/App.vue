<template>
  <header>
    <nav class="header_navigation">
      <a class="header_breadcroums" href="#"> ➤ Владикавказ, район, радиус </a>
      <ul class="header_navigation-list">
        <li class="header_navigation-item">
          <img src="./assets/wallet.png" alt="" width="20" height="20" />
          <Router-link to="/walent" class="header_navigation-link">
            Кошелек
          </Router-link>
          <!-- <a class="header_navigation-link" href="#">Кошелек</a> -->
        </li>
        <li class="header_navigation-item">
          <img src="./assets/star.png" alt="" width="20" height="20" />
          <Router-link to="/favorit" class="header_navigation-link">
            Избранное
          </Router-link>
        </li>
        <li class="header_navigation-item">
          <img src="./assets/message.png" alt="" />
          <Router-link to="/chat" class="route-view header_navigation-link">
            Сообщения
          </Router-link>
        </li>
        <li class="header_navigation-item header_notification">
          <span class="header_navigation-link_notification_counter">
            <img class="notif" src="./assets/notification.png" alt="" />
            <i>+5</i>
          </span>
          <Router-link to="/notif" class="header_navigation-link fs18 notion">
            (+5 новых уведомлений)
          </Router-link>
          <!-- <a class="header_navigation-link fs18 notion" href="#"></a> -->
        </li>
        <li class="header_navigation-item">
          <img
            class="header_navigation-image"
            src="./assets/user.png"
            alt=""
            width="40"
            height="40"
          />
          <Router-link
            to="/myOrder"
            class="header_navigation-link header_navigation-name"
          >
            Имя Фамилия
          </Router-link>
        </li>
      </ul>
    </nav>

    <div class="header_panel">
      <div class="header_panel_button">Все категории</div>
      <div class="header_panel_finder">
        <div class="finder_button">Поиск</div>
      </div>
      <div class="header_panel_button_adverts">Разместить объявление</div>
    </div>
    <div class="line"></div>
  </header>
  <router-view />
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
    linear-gradient(
      -25deg,
      black 25%,
      transparent 25%,
      transparent 75%,
      black 75%,
      black
    );
  background-size: 10% 15px;
  background-position: 11px 25px, 0 23px;
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
  font-size: var(--fs-25);
}

a.header_breadcroums {
  color: black;
  display: block;
  font-size: var(--fs-18);
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
  color: #f8cb32;
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
