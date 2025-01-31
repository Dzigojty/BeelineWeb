<template>
  <div class="v-popup-auth">
    <div v-if="showAuth == 'login'" class="center">
      <div class="title">Вход</div>
      <form @submit.prevent="AuthInfo">
        <input v-model="loginForm.emailOrPhone" type="text" placeholder="Телефон, почта" />
        <span v-if="errors.emailOrPhone" class="error">{{ errors.emailOrPhone }}</span>
        <input v-model="loginForm.password" type="password" placeholder="Пароль" />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
        <div class="other-auth-block">
          <div class="small-text m-t m-b center-text">Или продолжить через</div>
          <div class="flex-block min-context">
            <img class="other-auth-img" src="../../assets/ok-auth.svg" alt="" />
            <img class="other-auth-img" src="../../assets/vk-auth.svg" alt="" />
          </div>
        </div>
        <div class="center-block">
          <button class="submit">Войти</button>
        </div>
      </form>
      <div class="small-text m-b2 center-text">
        Нет аккаунта?
        <samp class="underline" @click="ChangeShowAuth('register_email')">Создать</samp>
      </div>
      <div class="small-text center-text">
        <samp class="underline" @click="ChangeShowAuth('password')">Забыли пароль</samp>
      </div>
    </div>

    <!-- Экран восстановления пароля -->
    <div v-if="showAuth == 'password'" class="center">
      <div class="title">Восстановление пароля</div>
      <div class="small-text m-b">
        Введите номер телефона или адрес электронной почты, указанного при регистрации, на
        который Вам будет направлен код для смены пароля или письмо с инструкцией.
      </div>
      <form @submit.prevent="validateEmail">
        <input v-model="passwordRecoveryForm.emailOrPhone" type="text" placeholder="Телефон, почта" />
        <span v-if="errors.emailOrPhone" class="error">{{ errors.emailOrPhone }}</span>
        <div class="center-block">
          <button type="submit" class="submit">Запросить</button>
        </div>
      </form>
    </div>

    <!-- Экран подтверждения кода для восстановления пароля -->
    <div v-if="showAuth == 'passwordRequst'" class="center">
      <div class="title">Восстановление пароля</div>
      <form @submit.prevent="validateCode">
        <input v-model="confirmationCode" type="text" placeholder="Код" />
        <span v-if="errors.passConfirmationCode" class="error">{{ errors.passConfirmationCode }}</span>
        <div class="center-block">
          <button type="submit" class="submit">Отправить</button>
        </div>
      </form>
    </div>

     <!-- Восстановление пароля Ввод пароля -->
     <div v-if="showAuth == 'passwordRequstPassword'" class="center">
      <div class="title">Восстановление пароля</div>
      <form @submit.prevent="sendCodeForRecoveryPassWithEmail">
        <input v-model="passwordRecoveryForm.password" type="password" placeholder="Пароль" />
        <input v-model="passwordRecoveryForm.confirmPassword" type="password" placeholder="Подтверждение пароля" />
        <span v-if="errors.passConfirmationCode" class="error">{{ errors.passConfirmationCode }}</span>
        <div class="center-block">
          <button type="submit" class="submit">Отправить</button>
        </div>
      </form>
    </div>
    

    <!-- Шаги регистрации -->
    <!-- <div v-if="showAuth == 'register_Phone'" class="center">
      <div class="title">Регистрация</div>
      <form @submit.prevent="validatePhone">
        <input
          v-model="Phone_number"
          type="text"
          placeholder="Введите номер телефона"
        />
        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
        <div class="small-text m-t m-b">
          Вы сможете скрыть номер телефона в объявлениях
        </div>
        <div class="center-block">
          <button type="submit" class="submit">Продолжить</button>
        </div>
      </form>
    </div> -->

    <!-- <div v-if="showAuth == 'register_phone_confirm'" class="center">
      <div class="title">Регистрация</div>
      <form @submit.prevent="validateConfirmationCode">
        <input v-model="confirmationCode" type="text" placeholder="Код подтверждения" />
        <span v-if="errors.confirmationCode" class="error">{{
          errors.confirmationCode
        }}</span>
        <div class="center-block-width">
          <div class="small-text-black">
            В течении 2 минут вы получите смс с кодом подтверждения на номер +7 457 457 45
            45
          </div>
          <div class="link">получить новый код</div>
        </div>
        <div class="center-block">
          <button type="submit" class="submit">Продолжить</button>
        </div>
      </form>
    </div> -->

    <div v-if="showAuth == 'register_type_user'" class="center">
      <div class="title">Регистрация</div>
      <form @submit.prevent="validateProfileType">
        <div class="small-text-black margin-bottom">Выберите тип профиля</div>
        <div class="flex-block space-e">
          <div class="check-block" :class="{ active: profileType == 'personal' }" @click="profileType = 'personal'">
            Для личного пользования
          </div>
          <div class="check-block" :class="{ active: profileType == 'business' }" @click="profileType = 'business'">
            Для работы
          </div>
        </div>
        <span v-if="errors.profileType" class="error">{{ errors.profileType }}</span>
        <div class="center-block">
          <button type="submit" class="submit">Продолжить</button>
        </div>
      </form>
    </div>

    <div v-if="showAuth == 'register_password'" class="center">
      <div class="title">Регистрация</div>
      <form @submit.prevent="validatePassword">
        <div class="small-text-black marg-bottom">Придумайте пароль</div>
        <input v-model="password" type="password" />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
        <div class="small-text-black marg-bottom">Повторите пароль</div>
        <input v-model="confirmPassword" type="password" />
        <span v-if="errors.confirmPassword" class="error">{{
          errors.confirmPassword
        }}</span>
        <div class="center-block">
          <button type="submit" class="submit">Продолжить</button>
        </div>
      </form>
    </div>

    <div v-if="showAuth == 'register_email'" class="center">
      <div class="title">Регистрация</div>
      <form @submit.prevent="validateEmailVostanov">
        <input v-model="Email" required type="email" placeholder="Введите почту" />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
        <div class="small-text m-b">Вы сможете скрыть почту в объявлениях</div>
        <div class="center-block">
          <button type="submit" class="submit">Продолжить</button>
        </div>
      </form>
    </div>

    <div v-if="showAuth == 'register_email_confirm'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="link marg-bottom">Сообщение с подтверждением отправлено!</div>

        <div class="small-text-black">
          Чтобы выполнить это действие необходимо подтвердить адрес эл. почты. Пожалуйста,
          проверьте ваш почтовый ящик и выполните следующие указания. Письмо отправлено
          на: {{ Email }}
        </div>

        <div class="center-block">
          <button type="submit" class="submit" @click="ChangeShowAuth('register_password')">
            Ок
          </button>
        </div>
      </form>
    </div>

    <div v-if="showAuth == 'register_email_confirm_code'" class="center">
      <div class="title">Регистрация</div>
      <form @submit.prevent="validateConfirmationCode">
        <input v-model="confirmationCode" type="text" placeholder="Код подтверждения" />
        <span v-if="errors.confirmationCode" class="error">{{
          errors.confirmationCode
        }}</span>
        <div class="center-block-width">
          <div class="small-text-black">
            В течении 2 минут вы получите письмо с кодом подтверждения на почту
            {{ Email }}
          </div>
          <div class="link">получить новый код</div>
        </div>
        <div class="center-block">
          <button type="submit" class="submit">Продолжить</button>
        </div>
      </form>
    </div>

    <!-- NATURE -->
    <div v-if="showAuth == 'register_nature_user_name'" class="center">
      <div class="title">Регистрация</div>
      <form @submit.prevent="validateName">
        <div class="small-text-black mb">Введите фамилию</div>
        <input v-model="Surname" type="text" />
        <span v-if="errors.surname" class="error">{{ errors.surname }}</span>
        <div class="small-text-black mb">Введите имя</div>
        <input v-model="Name" type="text" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
        <div class="small-text-black mb">
          Введите отчество (оставьте пустым если его нет)
        </div>
        <input v-model="Patronymic" type="text" />
        <div class="center-block">
          <button type="submit" class="submit">Продолжить</button>
        </div>
      </form>
    </div>

    <!-- COMPANY -->
    <div v-if="showAuth == 'register_company_name'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="small-text-black mb">Имя или название компании</div>
        <div class="small-text-black-c-b">
          Напишите так, как вы хотите, чтобы к вам обращались. Если у вас компания, можно
          без ООО, ИП и прочего.
        </div>
        <input v-model="Name_of_company" type="text" />
        <div class="center-block">
          <button type="submit" class="submit" @click="ChangeShowAuth('register_company_confirm')">
            Продолжить
          </button>
        </div>
      </form>
    </div>
    <div v-if="showAuth == 'register_company_confirm'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="small-text-black mb">Подтверждение данных</div>
        <div class="small-text-black-c-b">Выберите способ, который вам удобнее.</div>
        <div>
          <div class="check-block w100 pad" :class="{ active: profileType == 'recvez' }" @click="profileType = 'recvez'">
            <div class="title-check-block">Реквизиты компании</div>
            <div class="text-check-block">
              Введите ИНН и оплатите хотя бы 1 ₽ со счёта компании. Деньги придут в ваш
              кошелёк на сайте.
            </div>
          </div>
          <div class="check-block w100 pad" :class="{ active: profileType == 'recvez' }" @click="profileType = 'passport'">
            <div class="title-check-block">Паспорт</div>
            <div class="text-check-block">
              Селфи с оригинальным паспортом. Данные будут защищены, другие пользователи
              не увидят.
            </div>
          </div>
        </div>
        <div class="center-block">
          <button type="submit" class="submit" @click="
            ChangeShowAuth(
              profileType == 'recvez'
                ? 'register_recvez_confirm'
                : 'register_passport_confirm'
            )
            ">
            Продолжить
          </button>
        </div>
      </form>
    </div>

    <div v-if="showAuth == 'register_passport_confirm'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="small-text-black mb">Проверка по реквизитам</div>
        <ul class="list">
          <li>Для проверки вам должно быть от 18 лет</li>
          <li>Вам понадобится камера и оригинал документа</li>
          <li>
            Проходить проверку в профиле, который вам не принадлежит, нельзя: мы
            отслеживаем такие случаи
          </li>
        </ul>
        <div class="center-block">
          <button type="submit" class="submit" @click="ChangeShowAuth('register_selectedFile')">
            Продолжить
          </button>
        </div>
      </form>
    </div>

    <div v-if="showAuth == 'register_recvez_confirm'" class="center">
      <div class="title">Регистрация</div>
      <form action="" method="post">
        <div class="small-text-black mb">Проверка по реквизитам</div>
        <ul class="list">
          <li>Для проверки вам должно быть от 18 лет</li>
          <li>Вам понадобится ИНН и другие реквизиты юрлица</li>
          <li>По реквизитам одного юрлица можно пройти проверку только один раз</li>
          <li>
            Для проверки нужно заплатить от 1 ₽ со счёта юрлица, деньги придут в ваш
            кошелёк на сайте
          </li>
          <li>
            Значок «Реквизиты проверены» появится только в том профиле, в котором
            вы пройдёте проверку
          </li>
          <li>
            Проходить проверку в профиле, который вам не принадлежит, нельзя:
            мы отслеживаем такие случаи
          </li>
        </ul>
        <div class="center-block">
          <button type="submit" class="submit" @click="ChangeShowAuth('register_company_inn')">
            Продолжить
          </button>
        </div>
      </form>
    </div>

    <div v-if="showAuth == 'register_company_inn'" class="center">
      <div class="title">Регистрация</div>
      <form @submit.prevent="validateINN">
        <div class="small-text-black marg-bottom">Введите ИНН юрлица или ИП</div>
        <input v-model="Ind_num_taxp" type="text" placeholder="Введите номер" />
        <span v-if="errors.inn" class="error">{{ errors.inn }}</span>
        <div class="center-block">
          <button type="submit" class="submit">Продолжить</button>
        </div>
      </form>
    </div>

    <div v-if="showAuth == 'register_selectedFile'" class="center">
      <div class="title">Регистрация</div>
      <form @submit.prevent="convertToBase64">
        <div class="small-text-black marg-bottom">Загрузите фотографию</div>
        <input type="file" class="file" @change="handleFileUpload" accept="image/*" />
        <!-- Предварительный просмотр -->
        <div v-if="base64Image">
          <img :src="base64Image" alt="Preview" style="max-width: 300px; max-height: 300px; margin-top: 10px;" />
        </div>
        <!-- Сообщение об ошибке -->
        <div v-if="validationError" style="color: red; margin-top: 10px;">
          {{ validationError }}
        </div>
        <span v-if="errors.selectedFile" class="error">{{ errors.selectedFile }}</span>
        <div class="center-block">
          <button @click="uploadImage" :disabled="!base64Image || validationError" type="submit"
            class="submit">Продолжить</button>
        </div>
      </form>
    </div>

    <div v-if="showAuth == 'register_finaly'" class="center">
      <div class="title">Регистрация</div>
      <form @submit.prevent="submitForReview">
        <div class="small-text-black marg-bottom">Отправлено на рассмотрение.</div>
        <div class="center-block">
          <button type="submit" class="submit">Продолжить</button>
        </div>
      </form>
    </div>
    <div class="close_panel" @click="closeInfoPopup()"></div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      emailCodeStatus: false,
      selectedFile: null,
      base64Image: null,
      validationError: null,  // Сообщение об ошибке
      maxSize: 2 * 1024 * 1024,  // Максимальный размер файла в байтах (2 MB)

      showAuth: "login",
      errors: {},
      loginForm: {
        emailOrPhone: "",
        password: "",
      },
      passwordRecoveryForm: {
        emailOrPhone: "",
        password: "",
        confirmPassword: "",
      },
      password: "",
      confirmPassword: "",
      recoveryCode: "",
      profileType: "",
      confirmationCode: "",
      inn: "",
      Email: "",
      Ind_num_taxp: "",
      Name_of_company: "",
      Address_name: "feqwew",
      Phone_number: "",
      Patronymic: "",
      Name: "",
      Surname: "",
      Password_hash: "",
    };
  },
  components: {},
  methods: {

    handleFileUpload(event) {
      const file = event.target.files[0];
      this.validationError = null; // Сброс ошибок при новой загрузке

      if (file) {

        // Проверка типа файла
        if (!file.type.startsWith("image/")) {
          this.validationError = "Файл должен быть изображением.";
          return;
        }

        // Проверка размера файла
        if (file.size > this.maxSize) {
          this.validationError = `Размер изображения не должен превышать ${this.maxSize / (1024 * 1024)} MB.`;
          return;
        }

        // Если проверка пройдена, сохраняем файл и конвертируем в Base64
        
        this.selectedFile = file;

        if ((file instanceof Blob)) {
          console.log("Файл типа Blob:", file);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.base64Image = reader.result;
          };
          reader.onerror = (error) => {
            console.error("Ошибка при конвертации в Base64: ", error);
            this.validationError = "Не удалось преобразовать файл в Base64.";
          };
          this.validateSelectedFile();
        } else {
          console.error("Выбранный объект не является Blob");
          this.validationError = "Ошибка: Выбранный файл недействителен.";
        }
      } else {
        this.validationError = "Файл не выбран.";
      }
    },

    validateINN() {
      this.errors = {};
      if (!this.Ind_num_taxp) {
        this.errors.inn = "Введите ИНН.";
      } else if (!/^\d{10,12}$/.test(this.Ind_num_taxp)) {
        this.errors.inn = "Введите корректный ИНН.";
      }

      if (Object.keys(this.errors).length === 0) {
        this.ChangeShowAuth("register_selectedFile");
      }
    },

    validateSelectedFile() {
      this.errors = {};
      console.log(this.selectedFile);
      if (!this.selectedFile) {
        this.errors.selectedFile = "Загрузите фотографию.";
      }

      if (Object.keys(this.errors).length === 0) {
        this.ChangeShowAuth("register_finaly");
      }
    },

    async sendCode() {
      try {
        const response = await axios.post(
          "http://localhost:8080/enterCodeFromEmail",
          {
            reg_code: Number(this.confirmationCode),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // для отправки куки
          }
        );

        console.log(response); // Выводим ответ сервера в консоль

        // Проверяем статус в ответе сервера
        if (response.data.status !== "success") {
          this.emailCodeStatus = false;
          console.log(`1. emailCodeStatus: ${this.emailCodeStatus}`);
          return;
        }

        alert("Код введен правильно!");
        this.emailCodeStatus = true;
        console.log(`2. emailCodeStatus: ${this.emailCodeStatus}`);
      } catch (error) {
        alert("Произошла ошибка!");
        console.error(error);
        this.emailCodeStatus = false;
        console.log(`3. emailCodeStatus: ${this.emailCodeStatus}`);
      }
      console.log("this.emailCodeStatus", this.emailCodeStatus)
    },

    async emailCode() {
      try {
        const response = await axios.post(
          "http://localhost:8080/enterCodeFromEmail",
          {
            reg_code: Number(this.confirmationCode),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // для отправки куки
          }
        );

        console.log(response); // Выводим ответ сервера в консоль

        // Проверяем статус в ответе сервера
        if (response.data.status !== "success") {
          this.emailCodeStatus = false;
          console.log(`1. emailCodeStatus: ${this.emailCodeStatus}`);
          return;
        }

        alert("Код введен правильно!");
        this.emailCodeStatus = true;
        console.log(`2. emailCodeStatus: ${this.emailCodeStatus}`);
      } catch (error) {
        alert("Произошла ошибка!");
        console.error(error);
        this.emailCodeStatus = false;
        console.log(`3. emailCodeStatus: ${this.emailCodeStatus}`);
      }
      console.log("this.emailCodeStatus", this.emailCodeStatus)
    },

    async LoginSubmit() {
      // try {
      console.log(this.loginForm);

      let form = {
        Login: this.loginForm.emailOrPhone,
        Password: this.loginForm.password,
      };
      let costil = false;

      const response = await axios
        .post("http://localhost:8080/login", form, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log("Auth resp");
          console.log(response);

          if (response.data.Status == "fatal") {
            alert("Вы ввели не действительные данные!");
          } else {
            alert("Вы авторизовались!");
            costil = true;
            // Установка cookie на стороне клиента
            // Cookies.set("token", `${response.data.data.JWT}`, {
            //   // path: "/", // путь
            //   // domain: "http://localhost:8080/", // замените на ваш домен
            //   secure: true, // для HTTPS
            //   sameSite: "None", // для кросс-доменных запросов
            //   expires: 1 / 48, // срок действия, например, 30 мин
            // });
            Cookies.set("Refresh_token", `${response.data.data.Refresh_token}`, { expires: 7 });
            Cookies.set("token", `${response.data.data.JWT}`, { expires: 0.0208 });
            localStorage.setItem('Login', response.data.data.Information.Login);
            localStorage.setItem('Name', response.data.data.Information.Name);
            localStorage.setItem('Id', response.data.data.Information.Id);
            localStorage.setItem('Surname_or_Ind_num', response.data.data.Information.Surname_or_Ind_num);
            localStorage.setItem('Patronomic_or_Addres_name', response.data.data.Information.Patronomic_or_Addres_name);
            location.reload(true);
          }
        })
        .catch(function (error) {
          alert("Произошла ошибка!");
          console.log("Auth error");
          console.log(error);
        });

      if (costil) {
        this.$emit("registrationComplete");
        this.$emit("auth");
        this.closeInfoPopup();
      }

      // console.log(response.data);  // Выводим ответ сервера в консоль
      // } catch (error) {
      //   alert('Произошла ошибка!');
      //   console.error(error);
      // }

      // Завершение процесса регистрации или переход на другую страницу
    },

    async submitEmail(Email) {
      try {
        const response = await axios.post(
          "http://localhost:8080/signupUserByEmail",
          {
            Email: Email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response); // Выводим ответ сервера в консоль
        if (response.data.status != "success") {
          return false;
        }
        alert("Сообщение отправленно на почту!");
        Cookies.set("request_token", `${response.data.data}`, { expires: 1 / 48 });
        return true;
      } catch (error) {
        alert("Произошла ошибка!");
        console.error(error);
        return false;
      }
      // Завершение процесса регистрации или переход на другую страницу
      // this.closeInfoPopup();
    },

    async submitForReview() {
      if (!this.base64Image) {
        this.validationError = "Изображение не загружено!";
        return;
      }

      if (this.profileType == "personal") {
        if (this.Patronymic == "") {
          this.Patronymic = "-";
        }
        try {
          const response = await axios.post(
            "http://localhost:8080/signupNaturEmail",
            {
              Surname: this.Surname,
              Name: this.Name,
              Patronymic: this.Patronymic,
              Phone_number: this.Phone_number,
              Password_hash: this.Password_hash,
              data: this.base64Image,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true, // для отправки куки
            }
          );
          alert("Ваши данные отправлены на рассмотрение!");
          console.log(response.data); // Выводим ответ сервера в консоль
        } catch (error) {
          alert("Произошла ошибка!");
          console.error(error);
        }
      } else {
        try {
          const response = await axios.post(
            "http://localhost:8080/signupLegalEmail",
            {
              Password_hash: this.Password_hash,
              Ind_num_taxp: this.Ind_num_taxp,
              Name_of_company: this.Name_of_company,
              Address_name: this.Address_name,
              data: this.base64Image,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true, // для отправки куки
            }
          );
          alert("Ваши данные отправлены на рассмотрение!");
          console.log(response.data); // Выводим ответ сервера в консоль
        } catch (error) {
          alert("Произошла ошибка!");
          console.error(error);
        }
      }
    },

    /*  handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.selectedFile = file;
        }
      },*/

    validateLoginForm() {
      this.errors = {};

      if (!this.loginForm.emailOrPhone) {
        this.errors.emailOrPhone = "Поле не может быть пустым.";
      } else if (!this.isValidEmailOrPhone(this.loginForm.emailOrPhone)) {
        this.errors.emailOrPhone = "Введите корректный телефон или email.";
      }

      if (!this.loginForm.password) {
        this.errors.password = "Пароль обязателен для заполнения.";
      }

      return Object.keys(this.errors).length === 0;
    },

    /*validatePhone() {
      this.errors = {};
      console.log(this.Phone_number);
      if (!this.Phone_number) {
        this.errors.phone = "Введите номер телефона.";
      } else if (!this.isValidPhone(this.Phone_number)) {
        this.errors.phone = "Введите корректный номер телефона.";
      }

      if (Object.keys(this.errors).length === 0) {
        this.ChangeShowAuth("register_phone_confirm");
      }
    },*/

    validateConfirmationCode() {
      this.errors = {};
      if (!this.confirmationCode) {
        this.errors.confirmationCode = "Введите код подтверждения.";
      }

      if (Object.keys(this.errors).length === 0) {
        console.log(this.confirmationCode);
        console.log("this.emailCodeStatus1");
        this.emailCode();
        console.log("this.emailCodeStatus2");
        console.log(this.emailCodeStatus);
        if (this.emailCodeStatus) {
          this.ChangeShowAuth("register_password");
        }
      }
    },

    validateProfileType() {
      this.errors = {};
      if (!this.profileType) {
        this.errors.profileType = "Выберите тип профиля.";
      }

      if (Object.keys(this.errors).length === 0) {
        this.ChangeShowAuth(
          this.profileType == "personal"
            ? "register_nature_user_name"
            : "register_company_name"
        );
      }
    },

    validateName() {
      this.errors = {};
      if (!this.Name) {
        this.errors.name = "Введите ваше имя.";
      }

      if (!this.Name) {
        this.errors.surname = "Введите вашу фамилию.";
      }

      if (Object.keys(this.errors).length === 0) {
        this.ChangeShowAuth("register_selectedFile");
      }
    },

    // validatePassword() {
    //   const passwordStrength = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(this.password);
    //   this.errors = {};
    //   if (!this.password) {
    //     this.errors.password = "Введите пароль.";
    //   } else if (!passwordStrength) {
    //     this.errors.password = "Пароль должен быть не менее 8 символов и содержать Заглавные и строчные буквы.";
    //   }

    //   if (!this.confirmPassword) {
    //     this.errors.confirmPassword = "Повторите пароль.";
    //   } else if (this.confirmPassword !== this.password) {
    //     this.errors.confirmPassword = "Пароли не совпадают.";
    //   }

    //   this.Password_hash = this.password;

    //   if (Object.keys(this.errors).length === 0) {
    //     this.ChangeShowAuth("register_type_user");
    //   }
    // },

    sendCodeForRecoveryPassWithEmail() {
      console.log(this.passwordRecoveryForm.password);
      const passwordStrength = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(this.passwordRecoveryForm.password);
      this.errors = {};
      console.log(this.passwordRecoveryForm)
      if (!this.passwordRecoveryForm.password) {
        this.errors.passwordRecoveryForm = "Введите пароль.";
      } else if (passwordStrength) {
        this.errors.passwordRecoveryForm = "Пароль должен быть не менее 8 символов и содержать Заглавные и строчные буквы.";
      }

      if (!this.passwordRecoveryForm.confirmPassword) {
        this.errors.passwordRecoveryForm = "Повторите пароль.";
      } else if (this.passwordRecoveryForm.confirmPassword !== this.passwordRecoveryForm.password) {
        this.errors.passwordRecoveryForm = "Пароли не совпадают.";
      }

      this.Password_hash = this.password;
      console.log("Object.keys(this.errors).length", Object.keys(this.errors).length);
      if (Object.keys(this.errors).length == 0) {
        this.sendCodeForRecoveryPassWithEmailReq();
        this.ChangeShowAuth("login");
      }
    },

    async sendCodeForRecoveryPassWithEmailReq(){
      try {
        const response = await axios.post(
          "http://localhost:8080/sendCodeForRecoveryPassWithEmail",
          {
            Passwd_1: this.passwordRecoveryForm.password,
            Passwd_2: this.passwordRecoveryForm.confirmPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // для отправки куки
          }
        );
        alert("Пароль успешно изменен!");
        console.log(response.data); // Выводим ответ сервера в консоль
      } catch (error) {
        alert("Произошла ошибка!");
        console.error(error);
      }
    },

    validatePassword() {
      console.log(this.password);
      const passwordStrength = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(this.password);
      this.errors = {};
      if (!this.password) {
        this.errors.password = "Введите пароль.";
      } else if (passwordStrength) {
        this.errors.password = "Пароль должен быть не менее 8 символов и содержать Заглавные и строчные буквы.";
      }

      if (!this.confirmPassword) {
        this.errors.confirmPassword = "Повторите пароль.";
      } else if (this.confirmPassword !== this.password) {
        this.errors.confirmPassword = "Пароли не совпадают.";
      }

      this.Password_hash = this.password;
      console.log("Object.keys(this.errors).length", Object.keys(this.errors).length);
      if (Object.keys(this.errors).length == 0) {
        this.ChangeShowAuth("register_type_user");
      }
    },

    validateEmailVostanov() {
      this.errors = {};
      if (!this.Email) {
        this.errors.email = "Введите адрес электронной почты.";
      } else if (!this.isValidEmail(this.Email)) {
        this.errors.email = "Введите корректный email.";
      }

      if (Object.keys(this.errors).length === 0) {
        if (this.submitEmail(this.Email)) {
          this.ChangeShowAuth("register_email_confirm_code");
        }
      }
    },

    validateEmail() {
      this.errors = {};
      if (!this.passwordRecoveryForm.emailOrPhone) {
        this.errors.email = "Введите адрес электронной почты.";
      } else if (!this.isValidEmail(this.passwordRecoveryForm.emailOrPhone)) {
        this.errors.email = "Введите корректный email.";
      }

      if (Object.keys(this.errors).length === 0) {
        if (this.submitEmail(this.passwordRecoveryForm.emailOrPhone)) {
          this.ChangeShowAuth("passwordRequst");
        }
      }
    },

    validateCode() {
      this.errors = {};
      if (!this.confirmationCode) {
        this.errors.passConfirmationCode = "Введите код подтверждения.";
      }

      if (Object.keys(this.errors).length === 0) {
        this.emailCode();
        if (this.emailCodeStatus) {
          this.ChangeShowAuth("passwordRequstPassword");
        }
      }
    },

    // validateCode() {
    //   this.errors = {};
    //   if (!this.passwordRecoveryForm.emailOrPhone) {
    //     this.errors.email = "Введите адрес электронной почты.";
    //   } else if (!this.isValidEmail(this.passwordRecoveryForm.emailOrPhone)) {
    //     this.errors.email = "Введите корректный email.";
    //   }

    //   if (Object.keys(this.errors).length === 0) {
    //     if (this.submitEmail()) {
    //       this.ChangeShowAuth("passwordRequst");
    //     }
    //   }
    // },

    // requestPassword() {
    //   if (this.validatePasswordRecoveryForm()) {
    //     this.$emit("passwordRequested");
    //   }
    // },

    isValidEmail(value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(value);
    },

    isValidPhone(value) {
      const phonePattern = /^\+?\d{10,15}$/;
      return phonePattern.test(value);
    },

    isValidEmailOrPhone(value) {
      return this.isValidEmail(value) || this.isValidPhone(value);
    },

    ChangeShowAuth(popup) {
      this.showAuth = popup;
    },
    closeInfoPopup() {
      this.$emit("closePopup");
    },
    ChangeShowAuth(popup) {
      this.showAuth = popup;

      switch (popup) {
        case "register_phone_confirm":
          isValidPhone();
          break;
        default:
          break;
      }
    },
    validateLoginForm() {
      this.errors = {};

      if (!this.loginForm.emailOrPhone) {
        this.errors.emailOrPhone = "Поле не может быть пустым.";
      } else if (!this.isValidEmailOrPhone(this.loginForm.emailOrPhone)) {
        this.errors.emailOrPhone = "Введите корректный телефон или email.";
      }

      if (!this.loginForm.password) {
        this.errors.password = "Пароль обязателен для заполнения.";
      }

      return Object.keys(this.errors).length === 0;
    },
    validatePasswordRecoveryFormVostanov() {
      this.errors = {};

      if (!this.passwordRecoveryForm.emailOrPhone) {
        this.errors.emailOrPhone = "Поле не может быть пустым.";
      } else if (!this.isValidEmailOrPhone(this.passwordRecoveryForm.emailOrPhone)) {
        validateLoginForm;
        this.errors.emailOrPhone = "Введите корректный телефон или email.";
      }

      return Object.keys(this.errors).length === 0;
    },
    AuthInfo() {
      if (this.validateLoginForm()) {
        this.LoginSubmit();
      }
    },
    requestPassword() {
      if (this.validatePasswordRecoveryForm()) {
        this.$emit("passwordRequested");
      }
    },

    isValidEmail(value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(value);
    },
    isValidPhone(value) {
      const phonePattern = /^\+?\d{10,15}$/;
      return phonePattern.test(value);
    },
    isValidEmailOrPhone(value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^\+?\d{10,15}$/;
      return emailPattern.test(value) || phonePattern.test(value);
    },
    ChangeShowAuth(popup) {
      this.showAuth = popup;
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-size: var(--fs-15);
  margin-top: -10px;
  margin-bottom: 10px;
  display: block;
}

.file {
  padding: 5vw 1vw;
  width: 93%;
}

li::marker {
  content: "—";
  /* Символ маркера */
}

.list li {
  padding: 0.5vw 0;
}

.pad {
  padding: 0 1.5vw;
}

.title-check-block {
  font-weight: 700;
  text-align: center;
  font-size: var(--fs-20);
  margin-bottom: 1vw;
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
  cursor: pointer;
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

.active {
  background-color: #f9cc33;
}

.link {
  font-size: var(--fs-15);
  color: black;
  text-decoration: underline;
  cursor: pointer;
}

.submit {
    padding: 0.2vw 3vw;
    background-color: #f9cc33;
    border: none;
    border-radius: 0.4vw;
    margin: 0.5vw 0;
    font-size: var(--fs-14);
}

.small-text-black {
  font-size: var(--fs-15);
  color: black;
}

.small-text {
  font-size: var(--fs-10);
  color: #3333337a;
}

.m-b2 {
  margin-bottom: 0.3vw;
}

.m-b {
  margin-bottom: 0.5vw;
}

.small-text samp {
  font-size: var(--fs-10);
  color: #3333337a;
  text-align: center;
}

.underline {
  text-decoration: underline;
  cursor: pointer;
}

.m-t {
  margin-top: 0vw;
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
  width: 1.5vw;
}

input::placeholder {
  color: #3333337a;
}

input {
  display: block;
  border: 1px solid #f9cc33;
  padding-top: .2vw;
  padding-bottom: .2vw;
  padding-right: 1vw;
  padding-left: 1vw;
  border-radius: 0.4vw;
  width: 86%;
  margin-bottom: 1vw;
  font-size: var(--fs-14);
  margin: 0 auto;
  margin-bottom: 0.6vw;
}

button {
  cursor: pointer;
}

.margin-bottom {
  margin-bottom: 2vw;
}

.title {
  font-weight: bold;
  text-align: center;
  font-size: var(--fs-16);
  margin-bottom: 1vw;
}

.center {
  max-width: 300px;
  padding: 1vw;
  min-width: 150px;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 1vw;
  background-color: #FFFFFF;
  border: 0.3vw solid black;
  box-shadow: 0vw 0.6vw 12px rgba(0, 0, 0, 1);
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
