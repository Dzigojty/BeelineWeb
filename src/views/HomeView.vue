<template>
  <img src="../assets/baner_img.png" alt="" class="baner" />
  <div class="line"></div>
  <swiper-container class="swiper" slides-per-view="4">
    <swiper-slide
      :key="slide.name"
      v-for="(slide, index) in sldiers"
      :class="['swiper-el', { active: selectedIndex === index }]" 
      @click="CategoriaSliderClick(index)"
    >
      <div
      :class="['slider_con_el', { active: selectedIndex === index }]" 
      >
        <img :src="slide.path" alt="" />
        <h3>{{ slide.name }}</h3>
      </div>
    </swiper-slide>
  </swiper-container>

  <swiper-container
    id="min-swiper"
    :style="{ height: selectedIndex === null ? '0' : '15vw' }"
    slides-per-view="4"
    v-if="selectedIndex !== null"
  >
    <swiper-slide
      :key="subSlide.name"
      v-for="subSlide in sldiers[selectedIndex].subcategories"
      :class="['swiper-el', { active: subSlide.active }]"
      @click="selectSubcategory(subSlide)"
    >
      <div :class="['swiper-el-block', { active: subSlide.active }]" class="slider_con_el">
        <img :src="subSlide.path" alt="" />
        <h3>{{ subSlide.name }}</h3>
      </div>
    </swiper-slide>
  </swiper-container>
  <div class="shop">
    <div class="shop_filter">
      <div class="shop_filter_name">Фильтры</div>

      <!-- Категории техники -->
      <div class="shop_filter_categors">
        <div
          class="shop_filter_categor"
          v-for="category in categories"
          :key="category"
          :class="{ selected: selectedCategory === category }"
          @click="selectCategory(category)"
        >
          {{ category }}
        </div>
      </div>

      <!-- Фильтр по цене -->
      <div class="shop_filter_price">
        <div class="shop_filter_name">Стоимость, ₽</div>
        <div class="shop_filter_block">
          <input
            class="filter_block"
            type="number"
            placeholder="От"
            v-model="priceFrom"
          />
          <input class="filter_block" type="number" placeholder="до" v-model="priceTo" />
        </div>
      </div>

      <!-- Фильтр по сроку аренды -->
      <div class="shop_filter_datatime">
        <div class="shop_filter_name">Срок аренды</div>
        <div class="shop_filter_block">
    <input
      class="filter_block"
      type="text"
      placeholder="дд.мм.гггг"
      v-model="rentalFrom"
      v-mask="'##.##.####'"
    />
    <input
      class="filter_block"
      type="text"
      placeholder="дд.мм.гггг"
      v-model="rentalTo"
      v-mask="'##.##.####'"
    />
  </div>
      </div>

      <!-- Фильтр по региону -->
      <div class="shop_filter_adres">
        <div class="shop_filter_name">Где искать</div>
        <input class="shop_filter_text" type="text" placeholder="Все регионы, радиус" v-model="region" />
      </div>

      <!-- Фильтр по рейтингу -->
      <div class="shop_filter_rating">
        <div class="shop_filter_name">Рейтинг</div>
        <div class="filter_rating">
          <img
            v-for="star in 5"
            :key="star"
            :src="star <= rating ? starYellow : starGrey"
            @click="setRating(star)"
            alt="star"
          />
        </div>
      </div>

      <!-- Кнопка Применить -->
      <div class="shop_filter_button" @click="applyFilters">Применить</div>

      <div class="shop_filter_ads"></div>
    </div>

    <!-- Список продуктов -->
    <div class="shop_product">
      <div class="shop_title">Сортировка</div>
      <div v-if="loading" class="loader">Loading...</div>
      <div v-else>
        <div class="shop_list">
          <div
            :key="prod.id"
            v-for="prod in displayedProducts"
            @click="selectProduct(prod)"
            class="route-view"
          >
            <div class="product">
              <img class="product_img" src="../assets/product2.png" alt="" />
              <div class="product_des">
                <div class="product_title">
                  <div>{{ prod.Title }}</div>
                  <img src="../assets/star_yellow.png" alt="" />
                </div>
                <div class="product_price">от {{ prod.Hourly_rate }} ₽ за час</div>
                <button class="product_button_date">Выбрать дату</button>
                <div class="product_des_text">Автокран Ивановец - это марка автокранов, производимых заводом “ИМЗ АВТОКРАН” в Иваново. Эти автокраны отличаются высокой надежностью, производительностью и долговечностью. Они широко используются в различных отраслях промышленности и строительства.</div>
                <div class="product_title_date">График работ: с 9:00 до 20:00</div>
                <div class="product_status_r"></div>
                <div class="product_status_g">Свободен</div>
                <!-- <div class="product_create_at">{{ formatCreationTime(prod.created_at) }}</div> -->
              </div>
              <section class="author_rating">
                <img class="author_img" src="../assets/user.png" alt="" />
                <div class="author_name">{{ prod.Name }} </div>
                <div class="rating_user">
                  <samp>5,0</samp>
                  <div class="rating_star">
                    <img src="../assets/star_yellow.png" alt="" /><img
                      src="../assets/star_yellow.png"
                      alt=""
                    /><img src="../assets/star_yellow.png" alt="" /><img
                      src="../assets/star_yellow.png"
                      alt=""
                    /><img src="../assets/star_yellow.png" alt="" />
                  </div>
                  <samp>3 отзыва</samp>
                </div>
              </section>
            </div>
            <div class="line-grey"></div>
          </div>
          <button @click="loadMore" v-if="canLoadMore" class="button_show_more">Показать еще</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// // @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from 'axios';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ref, onMounted } from 'vue'
let minSlider = true;

export default {
  data() {
    return {
      selectedIndex: null, // Индекс выбранного слайда
      selectedPodcategory: null, // Выбранная подкатегория
      category_id: -1, // ID выбранной категории
      starYellow: require("@/assets/star_yellow.png"),
      starGrey: require("@/assets/star_grey.png"),
      categories: [
        "Подъемная техника",
        "Землеройная техника",
        "Дорожно-строительная техника",
        "Грузовой транспорт",
        "Погрузочная техника",
        "Прицепы",
        "Сельхозтехника",
        "Строительная техника",
        "Другое",
      ],
      selectedCategory: "",
      priceFrom: -1,
      priceTo: -1,
      rentalFrom: "",
      rentalTo: "",
      region: "",
      rating: 0,
      currentPage: 1,
      prods: [
        {
          id: 0,
          title: "",
          description: "Автокран Ивановец - это марка автокранов, производимых заводом “ИМЗ АВТОКРАН” в Иваново. Эти автокраны отличаются высокой надежностью, производительностью и долговечностью. Они широко используются в различных отраслях промышленности и строительства.",
          status: "Занят: 10.05 - 15.05",
          file_path: "",
          hourly_rate: 120,
          category_id: "",
          name: "",
          Owner_id: 29,
          created_at: 1724335213382,
        }
      ],
      loading: true,
      perPage: 4,
      displayedProducts: [],
      selectedIndex: null, // Индекс выбранного слайда
      selectedPodcategory: null, // Выбранная подкатегория
      sldiers: [
        {
          path: require("@/assets/slider1.png"),
          name: "Самосвалы",
          subcategories: [
            { path: require("@/assets/slider1.png"), name: "Малые самосвалы", category_id: 0, active: ref(false) },
            { path: require("@/assets/slider1.png"), name: "Легкие самосвалы", category_id: 1, active: ref(false) },
            { path: require("@/assets/slider1.png"), name: "Средние самосвалы", category_id: 2, active: ref(false) },
            { path: require("@/assets/slider1.png"), name: "Большие самосвалы", category_id: 3, active: ref(false) },
          ],
        },
        { 
          path: require("@/assets/slider2.png"),
          name: "Экскаваторы",
          subcategories: [
            { path: require("@/assets/slider2.png"), name: "Малые экскаваторы", category_id: 4, active: ref(false) },
            { path: require("@/assets/slider2.png"), name: "Средние экскаваторы", category_id: 5, active: ref(false) },
            { path: require("@/assets/slider2.png"), name: "Большие экскаваторы", category_id: 6, active: ref(false) },
            { path: require("@/assets/slider2.png"), name: "Сверхбольшие экскаваторы", category_id: 7, active: ref(false) },
          ],
        },
        { 
          path: require("@/assets/погрузчик.png"),
          name: "Экскаваторы – Погрузчики",
          subcategories: [
            { path: require("@/assets/погрузчик.png"), name: "Малые экскаваторы", category_id: 8, active: ref(false) },
            { path: require("@/assets/погрузчик.png"), name: "Средние экскаваторы", category_id: 9, active: ref(false) },
            { path: require("@/assets/погрузчик.png"), name: "Большие экскаваторы", category_id: 10, active: ref(false) },
          ],
        },
        { 
          path: require("@/assets/бульдозер.png"),
          name: "Бульдозеры",
          subcategories: [
            { path: require("@/assets/бульдозер.png"), name: "Малые бульдозеры", category_id: 11, active: ref(false) },
            { path: require("@/assets/бульдозер.png"), name: "Легкие бульдозеры", category_id: 12, active: ref(false) },
            { path: require("@/assets/бульдозер.png"), name: "Средние бульдозеры", category_id: 13, active: ref(false) },
            { path: require("@/assets/бульдозер.png"), name: "Тяжелые бульдозеры", category_id: 14, active: ref(false) },
            { path: require("@/assets/бульдозер.png"), name: "Иные бульдозеры", category_id: 15, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/грейдер.png"),
          name: "Самоходные грейдеры",
          subcategories: [
            { path: require("@/assets/грейдер.png"), name: "Легкие", category_id: 16, active: ref(false) },
            { path: require("@/assets/грейдер.png"), name: "Средние", category_id: 17, active: ref(false) },
            { path: require("@/assets/грейдер.png"), name: "Тяжелые", category_id: 18, active: ref(false) },
            { path: require("@/assets/грейдер.png"), name: "Сверхтяжелые", category_id: 19, active: ref(false) },
          ],
        },
        { /* Нет фото */
          path: require("@/assets/slider3.png"),
          name: "Землеройно-фрезерные машины",
          subcategories: [
            { path: require("@/assets/slider3.png"), name: "Бобкат", category_id: 20, active: ref(false) },
            { path: require("@/assets/slider3.png"), name: "Вилочные", category_id: 21, active: ref(false) },
            { path: require("@/assets/slider3.png"), name: "Ковшовые", category_id: 22, active: ref(false) },
            { path: require("@/assets/slider3.png"), name: "Платформенные", category_id: 23, active: ref(false) },
            { path: require("@/assets/slider3.png"), name: "Иные", category_id: 24, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/Фронтальный погрузчик.png"),
          name: "Фронтальные Погрузчики",
          subcategories: [
            { path: require("@/assets/Фронтальный погрузчик.png"), name: "Бобкат", category_id: 25, active: ref(false) },
            { path: require("@/assets/Фронтальный погрузчик.png"), name: "Вилочные", category_id: 26, active: ref(false) },
            { path: require("@/assets/Фронтальный погрузчик.png"), name: "Ковшовые", category_id: 27, active: ref(false) },
            { path: require("@/assets/Фронтальный погрузчик.png"), name: "Платформенные", category_id: 28, active: ref(false) },
            { path: require("@/assets/Фронтальный погрузчик.png"), name: "Иные", category_id: 29, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/краны.png"),
          name: "Краны",
          subcategories: [
            { path: require("@/assets/краны.png"), name: "Манипуляторы", category_id: 30, active: ref(false) },
            { path: require("@/assets/краны.png"), name: "Малые", category_id: 31, active: ref(false) },
            { path: require("@/assets/краны.png"), name: "Легкие", category_id: 32, active: ref(false) },
            { path: require("@/assets/краны.png"), name: "Средние", category_id: 33, active: ref(false) },
            { path: require("@/assets/краны.png"), name: "Тяжелые", category_id: 34, active: ref(false) },
            { path: require("@/assets/краны.png"), name: "Башеные", category_id: 35, active: ref(false) },
            { path: require("@/assets/краны.png"), name: "Иные", category_id: 36, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/бетономешалка.png"),
          name: "Бетономешалки",
          subcategories: [
            { path: require("@/assets/бетономешалка.png"), name: "Малые", category_id: 37, active: ref(false) },
            { path: require("@/assets/бетономешалка.png"), name: "Средние", category_id: 38, active: ref(false) },
            { path: require("@/assets/бетономешалка.png"), name: "Большие", category_id: 39, active: ref(false) },
            { path: require("@/assets/бетономешалка.png"), name: "Иные", category_id: 40, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/Бетононасосы.png"),
          name: "Бетононасосы",
          subcategories: [
            { path: require("@/assets/Бетононасосы.png"), name: "Малые", category_id: 41, active: ref(false) },
            { path: require("@/assets/Бетононасосы.png"), name: "Средние", category_id: 42, active: ref(false) },
            { path: require("@/assets/Бетононасосы.png"), name: "Большие", category_id: 43, active: ref(false) },
            { path: require("@/assets/Бетононасосы.png"), name: "Иные", category_id: 44, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/автовышка.png"),
          name: "Автовышки",
          subcategories: [
            { path: require("@/assets/автовышка.png"), name: "Малые", category_id: 45, active: ref(false) },
            { path: require("@/assets/автовышка.png"), name: "Легкие", category_id: 46, active: ref(false) },
            { path: require("@/assets/автовышка.png"), name: "Средние", category_id: 47, active: ref(false) },
            { path: require("@/assets/автовышка.png"), name: "Тяжелые", category_id: 48, active: ref(false) },
            { path: require("@/assets/автовышка.png"), name: "Иные", category_id: 49, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/Асфальтоукладчик.png"),
          name: "Асфальтоукладчики",
          subcategories: [
            { path: require("@/assets/Асфальтоукладчик.png"), name: "Гусеничные", category_id: 50, active: ref(false) },
            { path: require("@/assets/Асфальтоукладчик.png"), name: "Колесные", category_id: 51, active: ref(false) },
            { path: require("@/assets/Асфальтоукладчик.png"), name: "Иные", category_id: 52, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/дорожные катки.png"),
          name: "Дорожные катки",
          subcategories: [
            { path: require("@/assets/дорожные катки.png"), name: "Легкие", category_id: 53, active: ref(false) },
            { path: require("@/assets/дорожные катки.png"), name: "Средние", category_id: 54, active: ref(false) },
            { path: require("@/assets/дорожные катки.png"), name: "Тяжелые", category_id: 55, active: ref(false) },
            { path: require("@/assets/дорожные катки.png"), name: "Иные", category_id: 56, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/Дорожные фрезы.png"),
          name: "Дорожные фрезы",
          subcategories: [
            { path: require("@/assets/Дорожные фрезы.png"), name: "Самоходные", category_id: 57, active: ref(false) },
            { path: require("@/assets/Дорожные фрезы.png"), name: "Навесные и полунавесные (полуприцепные)", category_id: 58, active: ref(false) },
            { path: require("@/assets/Дорожные фрезы.png"), name: "Прицепные", category_id: 59, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/Перегружатель асфальт.png"),
          name: "Перегружатель асфальтобетонной смеси",
          subcategories: [
            { path: require("@/assets/Перегружатель асфальт.png"), name: "Негабаритные", category_id: 60, active: ref(false) },
            { path: require("@/assets/Перегружатель асфальт.png"), name: "Низкорамные", category_id: 61, active: ref(false) },
            { path: require("@/assets/Перегружатель асфальт.png"), name: "Малый", category_id: 62, active: ref(false) },
            { path: require("@/assets/Перегружатель асфальт.png"), name: "Иные", category_id: 63, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/Гудронатор.png"),
          name: "Гудронатор",
          subcategories: [
            { path: require("@/assets/Гудронатор.png"), name: "Негабаритные", category_id: 60, active: ref(false) },
            { path: require("@/assets/Гудронатор.png"), name: "Низкорамные", category_id: 61, active: ref(false) },
            { path: require("@/assets/Гудронатор.png"), name: "Малый", category_id: 62, active: ref(false) },
            { path: require("@/assets/Гудронатор.png"), name: "Иные", category_id: 63, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/тралы.png"),
          name: "Тралы",
          subcategories: [
            { path: require("@/assets/тралы.png"), name: "Негабаритные", category_id: 60, active: ref(false) },
            { path: require("@/assets/тралы.png"), name: "Низкорамные", category_id: 61, active: ref(false) },
            { path: require("@/assets/тралы.png"), name: "Малый", category_id: 62, active: ref(false) },
            { path: require("@/assets/тралы.png"), name: "Иные", category_id: 63, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/комм-доро машины.png"),
          name: "Коммунально-Дорожные Машины",
          subcategories: [
            { path: require("@/assets/комм-доро машины.png"), name: "Мусоровозы", category_id: 60, active: ref(false) },
            { path: require("@/assets/комм-доро машины.png"), name: "Снегоуборочные", category_id: 61, active: ref(false) },
            { path: require("@/assets/комм-доро машины.png"), name: "Пескоуборочные", category_id: 62, active: ref(false) },
            { path: require("@/assets/комм-доро машины.png"), name: "Водовоз", category_id: 63, active: ref(false) },
            { path: require("@/assets/комм-доро машины.png"), name: "Иные", category_id: 63, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/Машины для буровых и свайных работ.png"),
          name: "Машины для буровых и свайных работ",
          subcategories: [
            { path: require("@/assets/Машины для буровых и свайных работ.png"), name: "Тяжелые", category_id: 60, active: ref(false) },
            { path: require("@/assets/Машины для буровых и свайных работ.png"), name: "Средние", category_id: 61, active: ref(false) },
            { path: require("@/assets/Машины для буровых и свайных работ.png"), name: "Малые", category_id: 62, active: ref(false) },
            { path: require("@/assets/Машины для буровых и свайных работ.png"), name: "Иные", category_id: 63, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/седельные тягачи.png"),
          name: "Седельные тягачи",
          subcategories: [
            { path: require("@/assets/седельные тягачи.png"), name: "С полуприцепом", category_id: 60, active: ref(false) },
            { path: require("@/assets/седельные тягачи.png"), name: "С тонаром", category_id: 61, active: ref(false) },
            { path: require("@/assets/седельные тягачи.png"), name: "Иные", category_id: 62, active: ref(false) },
          ],
        },
        {
          path: require("@/assets/тракторы.png"),
          name: "Тракторы",
          subcategories: [
          ],
        },
        {
          path: require("@/assets/комбайны.png"),
          name: "Комбайны",
          subcategories: [
          ],
        },
        {
          path: require("@/assets/опрыскиватели.png"),
          name: "Опрыскиватели",
          subcategories: [
          ],
        },
      ],
    };
  },
  computed: {
    canLoadMore() {
      console.log(this.prods)
      
      return this.displayedProducts.length < this.prods.length;
    }
  },
  async created() {
    this.loading = true;

    try {
    console.log("create");

        const response = await axios.post('http://localhost:8090/sortProductListAll',
          {
            "Category": [],
            "LowNum": -1,
            "HigNum": -1,
            "LowDate": 1452585372,
            "HigDate": 1489308972,
            "Location": "",
            "Rating": 1
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        console.log(response);
        if (response.data.data.status == "fatal") {
          this.prods = [];
          this.displayedProducts = [];
        } else {
          this.prods = response.data.data;
          this.displayedProducts = this.prods.slice(0, this.perPage);
        }
      } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
      } finally {
        this.loading = false;
      }
  },
  methods: {
    clickFavorite(idProduct, idUser, state){
      if (state) {
        this.removeFavorite(idProduct, idUser, state);
      } else {
        this.addFavorite(idProduct, idUser, state);
      }
    },
    async addFavorite(idProduct, idUser, state){
      try {
        const response = await axios.post('http://localhost:8090/sigFavAds',
          {
            "Ads_id": idProduct,
            "User_id": idUser
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        console.log(response);
        if (response.data.status === "fatal") {
          alert("Error removeFavirite status:fatal")
        } else {
          state = !state;
        }
      } catch (error) {
        console.error('Ошибка при добавлении в избранное:', error);
      } 
    },
    async removeFavorite(idProduct, idUser, state){
      try {
        const response = await axios.post('http://localhost:8090/delFavAds',
          {
            "Ads_id": idProduct,
            "User_id": idUser
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        console.log(response);
        if (response.data.status === "fatal") {
          alert("Error removeFavirite status:fatal")
        } else {
          state = !state;
        }
        
      } catch (error) {
        console.error('Ошибка при удалении из избранного:', error);
      } 
    },
    CategoriaSliderClick(index) {
      // Переключаем отображение подкатегорий
      if (this.selectedIndex === index) {
        this.selectedIndex = null; // Скрыть подкатегории
      } else {
        this.selectedIndex = index; // Показать подкатегории для выбранного слайда
        this.selectedPodcategory = null; // Сбросить выбранную подкатегорию при выборе нового слайда
      }
    },
    selectSubcategory(subSlide) {
      // Переключаем активный статус подкатегории и устанавливаем category_id
      subSlide.active = !subSlide.active;
      this.category_id = subSlide.active ? subSlide.category_id : -1;
      console.log("Selected Subcategory:", subSlide.name);
      console.log("Category ID:", this.category_id);
    },


    formatCreationTime(createdAt) {
      const date = new Date(createdAt);

      if (isToday(date)) {
        return formatDistanceToNow(date, { addSuffix: true, locale: ru }); // Например, "2 часа назад"
      } else if (isYesterday(date)) {
        return 'вчера';
      } else {
        return format(date, 'dd.MM.yyyy', { locale: ru }); // Например, "25.12.2023"
      }
    },
    loadMore() {
      this.currentPage++;
      const start = this.displayedProducts.length;
      const end = start + this.perPage;
      this.displayedProducts.push(...this.prods.slice(start, end));
    },
    selectCategory(category) {
      this.category_id = category;
    },
    setRating(star) {
      this.rating = star;
    },
    async applyFilters() {

      let partsDateFrom = this.rentalFrom.split('.');
      let partsDateTo = this.rentalTo.split('.');
      if (partsDateFrom.length === 3) {
        const formattedDate = `${partsDateFrom[2]}-${partsDateFrom[1]}-${partsDateFrom[0]}`;
        partsDateFrom = Date.parse(formattedDate) / 1000; 
      } else {
        partsDateFrom = 1452585372;
      }

      if (partsDateTo.length === 3) {
        const formattedDate = `${partsDateTo[2]}-${partsDateTo[1]}-${partsDateTo[0]}`;
        partsDateTo= Date.parse(formattedDate) / 1000; 
      } else {
        partsDateTo = 1489308972;
      }
      console.log(partsDateFrom)
      console.log(partsDateTo)
      try {
        const response = await axios.post('http://localhost:8090/sortProductListAll',
          {
            "Category": [],
            "LowNum": this.priceFrom,
            "HigNum": this.priceTo,
            "LowDate": partsDateFrom,
            "HigDate": partsDateTo,
            "Location": "",
            "Rating": this.rating
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        console.log(response);
        if (response.data.status === "fatal") {
          this.displayedProducts = [];
        } else {
          this.prods = response.data.data;
          this.displayedProducts = this.prods.slice(0, this.perPage);
        }
        
      } catch (error) {
        console.error('Ошибка при загрузке продуктов:', error);
      } finally {
        this.loading = false;
      }

      /*try {
        const response = await axios.post("http://localhost:8080", filters);
        console.log("Filters applied:", response.data);
      } catch (error) {
        console.error("Error applying filters:", error);
      }*/
    },

    selectProduct(product) {
      console.log(product);
      this.$emit("selectProduct", product);
    },
    CategoriaSliderClick(index) {
      // Переключаем отображение подкатегорий
      if (this.selectedIndex === index) {
        this.selectedIndex = null; // Скрыть подкатегории
      } else {
        this.selectedIndex = index; // Показать подкатегории для выбранного слайда
        this.selectedPodcategory = null; // Сбросить выбранную подкатегорию при выборе нового слайда
      }
    },
    selectSubcategory(subSlide) {
      this.selectedPodcategory = subSlide;
      subSlide.active = !subSlide.active;
      this.category_id = subSlide.category_id;
      console.log("Selected Subcategory:", this.selectedPodcategory);
      console.log(this.category_id);
    },
  },

  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
.swiper-el-block.active {
  background-color: #f9cc33; /* Цвет активного слайда */
}

.slider_con_el.active {
  background-color: #f9cc33; /* Цвет активного слайда */
}

.filter_rating img {
  cursor: pointer;
}

.route-view {
  text-decoration: none;
}

/* .swiper-slide-active .slider_con_el{
background: #f9cc33;
} */

.app {
  margin: 0;
  padding: 0;
}

#min-swiper {
  height: 0;
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
  margin: 10px 0 20px 0;
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
  color: black;
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
}

.product_button_date_active {
  background-color: #f9cc33;
  border: solid 2px #f9cc33;
  border-radius: 10px;
  padding: 8px 40px;
}

.product_button_date {
  margin-top: 1vw;
  box-sizing: border-box;
  background-color: white;
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
  color: #f9cc33;
  text-decoration: underline 1px #f9cc33;
  font-size: var(--fs-23);
}

.slider_con_el:hover {
  background-color: #f9cc33;
}

.swiper-el .active {
  background-color: #f9cc33 !important;
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
  color: #141414;
}

.product {
  font-size: var(--fs-20);
}

.shop_title {
  font-size: var(--fs-25);
  margin-bottom: 2.5vw;
  padding-top: 2vw;
}

.shop {
  display: flex;
  justify-content: center;
}

.shop_product {
  margin-left: 6vw;
  width: 70vw;
}

.shop_filter {
  width: 18.9%;
}

input.shop_filter_text {
  font-size: var(--fs-20);
  border: none;
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

.shop_filter_name {
  font-size: var(--fs-25);
  font-weight: bold;
  margin: 1.5vw 0;
}

.shop_filter_name:first-child {
  margin-bottom: 1.5vw;
}

.shop_filter_button {
  background-color: #f9cc33;
  font-size: var(--fs-20);
  border-radius: 10px;
  text-align: center;
  padding: 1vw 0;
  margin: 30px 0 30px 0;
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
  width: 8vw;
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
  text-align: end;
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
}

.filter_rating img {
  width: 2.8vw;
}
</style>
