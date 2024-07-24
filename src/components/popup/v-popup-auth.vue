<template>
  <div class="v-popup-auth">
    <div v-if="showAuth == 'login'" class="center">
      <div class="title">Вход</div>
      <form action="">
        <input type="text" placeholder="Телефон, почта" />
        <input type="password" placeholder="Пароль" />
        <div class="other-auth-block">
          <div class="small-text m-t m-b center-text">Или продолжить через</div>
          <div class="flex-block min-context">
            <img class="other-auth-img" src="../../assets/ok-auth.svg" alt="" />
            <img class="other-auth-img" src="../../assets/vk-auth.svg" alt="" />
          </div>
        </div>
        <div class="center-block">
          <button class="submit" @click="AuthInfo()">Войти</button>
        </div>
      </form>
      <div class="small-text m-b2 center-text">
        Нет аккаунта?
        <samp class="underline" @click="ChangeShowAuth('register')"
          >Создать</samp
        >
      </div>
      <div class="small-text center-text">
        <samp class="underline" @click="ChangeShowAuth('password')"
          >Забыли пароль</samp
        >
      </div>
    </div>
    <div v-if="showAuth == 'password'" class="center">
      <div class="title">Восстановление пароля</div>
      <div class="small-text m-b">
        Введите номер телефона или адрес электронной почты, указанного при
        регистрации, на который Вам будет направлен код для смены пароля или
        письмо с инструкцией.
      </div>
      <form action="" method="post">
        <input type="text" placeholder="Телефон, почта" />
        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('passwordRequst')"
          >
            Запросить
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'passwordRequst'" class="center">
      <div class="title">Восстановление пароля</div>
      <form action="" method="post">
        <input type="text" placeholder="Код" />
        <div class="center-block">
          <button type="submit" class="submit">Отправить</button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <input type="text" placeholder="Введите номер телефона" />
        <div class="small-text m-t m-b">
          Вы сможете скрыть номер телефона в объявлениях
        </div>
        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('register2')"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register2'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <input type="text" placeholder="Код подтверждения" />
        <div class="center-block-width">
          <div class="small-text-black">
            В течении 2 минут вы получите смс с кодом подтверждения на номер + 7
            457 457 45 45
          </div>
          <div class="link">получить новый код</div>
        </div>
        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('register3')"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register3'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="small-text-black margin-bottom">Выберите тип профиля</div>
        <div class="flex-block space-e">
          <div class="check-block">Для личного пользования</div>
          <div class="check-block">Для работы</div>
        </div>
        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('register4')"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register4'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="small-text-black mb">Введите имя</div>
        <div class="small-text-black-c-b">
          Напишите так, как вы хотите, чтобы к вам обращались.
        </div>
        <input type="text" />
        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('register5')"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register5'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="small-text-black marg-bottom">Придумайте пароль</div>
        <input type="text" />
        <div class="small-text-black marg-bottom">Повторите</div>
        <input type="text" />
        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('register6')"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register6'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <input type="text" placeholder="Введите почту" />
        <div class="small-text m-b">Вы сможете скрыть почту в объявлениях</div>
        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('register7')"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register7'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="link marg-bottom">
          Сообщение с подтверждением отправлено!
        </div>

        <div class="small-text-black">
          Чтобы выполнить это действие необходимо подтвердить адрес эл. почты.
          Пожалуйста, проверьте ваш почтовый ящик и выполните следующие
          указания. Письмо отправлено на: opaopaopa@yandex.ru
        </div>

        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('register8')"
          >
            Ок
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register8'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="small-text-black mb">Имя или название компании</div>
        <div class="small-text-black-c-b">
          Напишите так, как вы хотите, чтобы к вам обращались. Если у вас
          компания, можно без ООО, ИП и прочего.
        </div>
        <input type="text" />
        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('register9')"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register9'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="small-text-black mb">Подтверждение данных</div>
        <div class="small-text-black-c-b">
          Выберите способ, который вам удобнее.
        </div>
        <div>
          <div class="check-block w100 pad">
            <div class="title-check-block">Реквизиты компании</div>
            <div class="text-check-block">
              Введите ИНН и оплатите хотя бы 1 ₽ со счёта компании. Деньги
              придут в ваш кошелёк на сайте.
            </div>
          </div>
          <div class="check-block w100 pad">
            <div class="title-check-block">Паспорт</div>
            <div class="text-check-block">
              Селфи с оригинальным паспортом. Данные будут защищены, другие
              пользователи не увидят.
            </div>
          </div>
        </div>
        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('register10')"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register10'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="small-text-black mb">Проверка по реквизитам</div>
        <ul class="list">
          <li>Для проверки вам должно быть от 18 лет</li>
          <li>Вам понадобится ИНН и другие реквизиты юрлица</li>
          <li>
            По реквизитам одного юрлица можно пройти проверку только один раз
          </li>
          <li>
            Для проверки нужно заплатить от 1 ₽ со счёта юрлица, деньги придут
            в ваш кошелёк на сайте
          </li>
          <li>
            Значок «Реквизиты проверены» появится только в том профиле,
            в котором вы пройдёте проверку
          </li>
          <li>
            Проходить проверку в профиле, который вам не принадлежит, нельзя:
            мы отслеживаем такие случаи
          </li>
        </ul>
        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('register11')"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register11'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="small-text-black marg-bottom">
          Введите ИНН юрлица или ИП
        </div>
        <input type="text" placeholder="Введите номер" />
        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('register12')"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register12'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="small-text-black marg-bottom">Загрузите фотографию</div>
        <input type="file" class="file" />
        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('register13')"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register13'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="small-text-black marg-bottom">
          Отправлено на рассмотрение.
        </div>
        <div class="center-block">
          <button
            type="submit"
            class="submit"
            @click="ChangeShowAuth('register14')"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
    <div class="close_panel" @click="closeInfoPopup()"></div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  data() {
    return {
      showAuth: "login",
      startDate: this.startDate,
    };
  },
  components: {},
  methods: {
    AuthInfo() {
      this.$emit("auth");
    },
    closeInfoPopup() {
      this.$emit("closePopup");
    },
    ChangeShowAuth(popup) {
      this.showAuth = popup;
    },
  },
};
</script>

<style scoped>
.file {
  padding: 5vw 1vw;
  width: 93%;
}

li::marker {
  content: "—"; /* Символ маркера */
}

.list li {
  padding: 0.5vw 0;
}

.pad {
  padding: 0 1.5vw;
}

.title-check-block {
  font-size: var(--fs-15);
  font-weight: 600;
}

.text-check-block {
  font-size: var(--fs-15);
  font-weight: 500;
}

.w100 {
  width: 27vw !important;
  margin-bottom: 2vw;
  text-align: start !important;
}

.marg-bottom {
  margin-bottom: 1vw;
}

.check-block {
  background-color: #f1f1f1;
  width: 13vw;
  height: 8vw;
  align-self: center;
  text-align: center;
  font-size: var(--fs-18);
  align-items: center;
  align-content: center;
  border-radius: 1vw;
}

.small-text-black-c-b {
  font-size: var(--fs-15);
  font-weight: 300;
  margin-top: 0.6vw;
  margin-bottom: 1.6vw;
}

.check-block:hover {
  background-color: #f9cc33;
}

.link {
  font-size: var(--fs-15);
  color: black;
  text-decoration: underline;
}

.submit {
  padding: 0.6vw 5vw;
  background-color: #f9cc33;
  border: none;
  border-radius: 1vw;
  margin: 1.5vw 0;
}

.small-text-black {
  font-size: var(--fs-15);
  color: black;
}

.small-text {
  font-size: var(--fs-15);
  color: #3333337a;
}

.m-b2 {
  margin-bottom: 0.3vw;
}

.m-b {
  margin-bottom: 1vw;
}

.small-text samp {
  font-size: var(--fs-15);
  color: #3333337a;
  text-align: center;
}

.underline {
  text-decoration: underline;
}

.m-t {
  margin-top: 1.8vw;
}

.min-context {
  width: min-content;
  margin: 0 auto;
}

.other-auth-img {
  margin-left: 1vw;
}

.center-block-width {
  align-content: center;
  align-items: center;
  align-self: center;
  width: 23vw;
  margin: 0 auto;
}

.center-text {
  align-self: center;
  align-items: center;
  align-content: center;
  text-align: center;
}

.center-block {
  align-content: center;
  align-items: center;
  align-self: center;
  width: min-content;
  margin: 0 auto;
}

.flex-block {
  display: flex;
  justify-content: center;
}

.other-auth-img {
  border-radius: 50%;
  width: 2.5vw;
}

input::placeholder {
  color: #3333337a;
}

input {
  display: block;
  border: 1px #f9cc33 solid;
  padding-top: 0.8vw;
  padding-bottom: 0.8vw;
  padding-right: 2vw;
  padding-left: 2vw;
  border-radius: 1vw;
  width: 26vw;
  margin-bottom: 1.5vw;
}

.margin-bottom {
  margin-bottom: 2vw;
}

.title {
  font-weight: bold;
  text-align: center;
  font-size: var(--fs-30);
  margin-bottom: 2.5vw;
}

.center {
  width: 30vw;
  padding: 2vw;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 1.5vw;
  background-color: white;
}

.v-popup-auth {
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0);
}

.close_panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.space-e {
  justify-content: space-evenly !important;
}
</style>