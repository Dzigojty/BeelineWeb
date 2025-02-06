<template>
  <!-- Картинка шапки и линия -->
  <div class="fon-header">
        <img class="line-header" src="../assets/lineSMT.jpg" alt="">
        <img class="fon-header-img" src="../assets/fonSMT.jpg" alt="">
    </div>
  <swiper-container :breakpoints="{
      1024: { slidesPerView: 4 },
      768: { slidesPerView: 2 },
      425: { slidesPerView: 2 }}" class="swiper">
    <swiper-slide :key="slide.name"  v-for="(slide, index) in sldiers"
      :class="['swiper-el', { active: selectedIndex === index }]" @click="CategoriaSliderClick(index)">
      <div :class="['slider_con_el', { active: selectedIndex === index }]">
        <img :class="[slide.path.split('/').pop().split('.')[0].replace(/ /g, '_')]" :src="slide.path" alt="" />
        <h3>{{ slide.name }}</h3>
      </div>
    </swiper-slide>
    <swiper-slide>
    </swiper-slide>
  </swiper-container>
  <swiper-container id="min-swiper" :style="{ height: selectedIndex === null ? '0' : '15vw' }" slides-per-view="2"
    v-if="selectedIndex !== null">
    <swiper-slide :key="subSlide.name" v-for="subSlide in sldiers[selectedIndex].subcategories"
      :class="['swiper-el', { active: subSlide.active }]" @click="selectSubcategory(subSlide)">
      <div :class="['swiper-el-block', { active: subSlide.active }]" class="slider_con_el">
        <img :src="subSlide.path" alt="" />
        <h3>{{ subSlide.name }}</h3>
      </div>
    </swiper-slide>
    <swiper-slide>
    </swiper-slide>
  </swiper-container>
  <div class="flex-filter-and-content">
        <!-- Фильтр -->
        <div class="filter" v-on:submit.prevent="formSumitted">

            <p class="title-filter">Фильтры</p>

            <!-- <div class="checkbox-text">
                <input class="checkbox-text-input" type="checkbox" id="option1">
                <label for="option1" class="text-option">Подъемная техника</label>
            
                <input class="checkbox-text-input" type="checkbox" id="option2">
                <label for="option2" class="text-option">Землеройная техника</label>
            
                <input class="checkbox-text-input" type="checkbox" id="option3">
                <label for="option3" class="text-option">Дорожно-строительная техника</label>

                <input class="checkbox-text-input" type="checkbox" id="option4">
                <label for="option4" class="text-option">Грузовой транспорт</label>

                <input class="checkbox-text-input" type="checkbox" id="option5">
                <label for="option5" class="text-option">Погрузочная техника</label>

                <input class="checkbox-text-input" type="checkbox" id="option6">
                <label for="option6" class="text-option">Прицепы</label>

                <input class="checkbox-text-input" type="checkbox" id="option7">
                <label for="option7" class="text-option">Сельхозтехника</label>

                <input class="checkbox-text-input" type="checkbox" id="option8">
                <label for="option8" class="text-option">Строительная техника</label>

                <label class="text-option">Другое</label>
            </div> -->

            <p class="title-filter">Стоимость, ₽</p>

            <div class="flex-filter-input">
                <div>
                    <input type="number" v-model="priceFrom">
                    <label>От</label>
                </div>
                <div>
                    <input type="number" v-model="priceTo">
                    <label>до</label>
                </div>
            </div>

            <!-- Фильтр по типу -->
            <div class="shop_filter_price">
              <div class="title-filter">Тип аренды</div>
              <div class="shop_filter_block">
                <p><input v-on:click="sortSelectedRadio(true)" name="dzen" type="radio" value="day"> Дни </p>
                <p><input v-on:click="sortSelectedRadio(false)" name="dzen" type="radio" value="hour" checked> Часы</p>
              </div>
            </div>

            <p class="title-filter">Срок аренды</p>

            <div class="flex-filter-input">
                <div>
                    <input v-model="rentalFrom" v-mask="'##.##.####'">
                    <label>От</label>
                </div>
                <div>
                    <input v-model="rentalTo" v-mask="'##.##.####'">
                    <label>до</label>
                </div>
            </div>

            <p class="title-filter">Где искать</p>

            <p class="filter-region">Все регионы, <a class="region">радиус</a> </p>

            <p class="title-filter">Рейтинг</p>

            <div class="star-rating">
              <div class="filter_rating">
                <img v-for="star in 5" :key="star" :src="star <= rating ? starYellow : starGrey" @click="setRating(star)"
                  alt="star" />
              </div>
            </div>

            <button class="button-filter" @click="applyFilters">Применить</button>
        </div>
        <!-- Контент -->
        <div class="content">

            <p class="title-content">Сортировка</p>

            <div class="content-block" >
                <div class="content-card" :key="prod.id" v-for="prod in displayedProducts" @click="selectProduct(prod)">
                    <div style="width: 50%; margin: 0 auto;">
                        <img class="card-image" :src="prod.Ads_photo != 'Error reading file' && prod.Ads_photo != 'File not found' ? `data:image/png;base64,${prod.Ads_photo}` : require('@/assets/product2.png')" alt="">
                    </div>

                    <div class="block-desc">
                        <p class="title-content-card">{{ prod.Title }}</p>
                        <p v-if="prod.Hourly_rate != undefined" class="cost-content-card">от {{ prod.Hourly_rate }} ₽ за час</p>
                        <p v-if="prod.Daily_rate != undefined" class="cost-content-card">от {{ prod.Daily_rate }} ₽ за час</p>
                        <button class="button-content-card">Выбрать дату</button>
                        <p class="info-content-card">
                          {{prod.Description}}
                        </p>
                        <p class="work-schedule">График работ: с 9:00 до 20:00</p>
                        <p class="busy" :class="{ product_status_r: prod.Duration.includes('Занят'), product_status_g: !prod.Duration.includes('Занят') }">{{ prod.Duration }}</p>
                        <p class="lately">2 часа назад</p>
                    </div>

                    <div style="display: flex; justify-content: space-around; align-items: start;margin-top: 15px;">
                        <img class="card-profile-photo" :src="prod.Avatar_photo != null ? `data:image/png;base64,${prod.Avatar_photo}` : require('@/assets/user.png')" alt="" >
                        <p class="card-profile-name">{{ prod.Name }} {{ prod.Surname_or_ind_num }}</p>
                        <div class="row-reviews">
                            <p class="grade">5,0</p>
                            <div class="star-rating-card">
                                <input type="radio" id="star5" name="rating" value="5" />
                                <label for="star5" title="5 stars">★</label>
                        
                                <input type="radio" id="star4" name="rating" value="4" />
                                <label for="star4" title="4 stars">★</label>
                        
                                <input type="radio" id="star3" name="rating" value="3" />
                                <label for="star3" title="3 stars">★</label>
                        
                                <input type="radio" id="star2" name="rating" value="2" />
                                <label for="star2" title="2 stars">★</label>
                        
                                <input type="radio" id="star1" name="rating" value="1" />
                                <label for="star1" title="1 star">★</label>
                            </div>
                            <div class="number-of-reviews-flex">
                                <p class="number-of-reviews">3</p>
                                <p class="number-of-reviews">отзыва</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="button-cards-div">
        <button @click="showMore" v-if="canLoadMore"  class="button-all-cards">Показать еще</button>
    </div>


    <div class="banner">
        <div class="icon-stors">
            <a href="#"><img src="../assets/googleplay.png" alt=""></a>
            <a href="#"><img src="../assets/appstore.png" alt=""></a>
        </div>
        <img class="banner-img" src="../assets/bannerFooter.jpg" alt="">
    </div>
</template>


<script>
// // @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";
import { ref } from "vue";

export default {
  data() {
    return {
      LengthAds: 0,
      showMoreData: null,
      nowPage: 1,
      sortRadio: false,
      user_id: 29,
      selectedIndex: null, // Индекс выбранного слайда
      selectedPodcategory: null, // Выбранная подкатегория
      category_id: [], // ID выбранной категории
      Category: [],
      starYellow: require("@/assets/star_yellow.png"),
      starGrey: require("@/assets/star_grey.png"),
      favorite: [],
      selectedCategory: "",
      priceFrom: 1,
      priceTo: 99999,
      rentalFrom: '21.06.1970',
      rentalTo: '21.06.2026',
      region: [
        1,
        2
      ],
      rating: 0,
      currentPage: 1,
      prods: [
      ],
      loading: true,
      perPage: 2,
      displayedProducts: [],
      selectedIndex: null, // Индекс выбранного слайда
      selectedPodcategory: null, // Выбранная подкатегория
      sldiers: [
        {
          path: require("@/assets/slider1.png"),
          name: "Самосвалы",
          subcategories: [
            {
              path: require("@/assets/slider1.png"),
              name: "Малые самосвалы",
              category_id: 0,
              active: ref(false),
            },
            {
              path: require("@/assets/slider1.png"),
              name: "Легкие самосвалы",
              category_id: 1,
              active: ref(false),
            },
            {
              path: require("@/assets/slider1.png"),
              name: "Средние самосвалы",
              category_id: 2,
              active: ref(false),
            },
            {
              path: require("@/assets/slider1.png"),
              name: "Большие самосвалы",
              category_id: 3,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/slider2.png"),
          name: "Экскаваторы",
          subcategories: [
            {
              path: require("@/assets/slider2.png"),
              name: "Малые экскаваторы",
              category_id: 4,
              active: ref(false),
            },
            {
              path: require("@/assets/slider2.png"),
              name: "Средние экскаваторы",
              category_id: 5,
              active: ref(false),
            },
            {
              path: require("@/assets/slider2.png"),
              name: "Большие экскаваторы",
              category_id: 6,
              active: ref(false),
            },
            {
              path: require("@/assets/slider2.png"),
              name: "Сверхбольшие экскаваторы",
              category_id: 7,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/pogruzchik.png"),
          name: "Экскаваторы – Погрузчики",
          subcategories: [
            {
              path: require("@/assets/pogruzchik.png"),
              name: "Малые экскаваторы",
              category_id: 8,
              active: ref(false),
            },
            {
              path: require("@/assets/pogruzchik.png"),
              name: "Средние экскаваторы",
              category_id: 9,
              active: ref(false),
            },
            {
              path: require("@/assets/pogruzchik.png"),
              name: "Большие экскаваторы",
              category_id: 10,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/buldozer.png"),
          name: "Бульдозеры",
          subcategories: [
            {
              path: require("@/assets/buldozer.png"),
              name: "Малые бульдозеры",
              category_id: 11,
              active: ref(false),
            },
            {
              path: require("@/assets/buldozer.png"),
              name: "Легкие бульдозеры",
              category_id: 12,
              active: ref(false),
            },
            {
              path: require("@/assets/buldozer.png"),
              name: "Средние бульдозеры",
              category_id: 13,
              active: ref(false),
            },
            {
              path: require("@/assets/buldozer.png"),
              name: "Тяжелые бульдозеры",
              category_id: 14,
              active: ref(false),
            },
            {
              path: require("@/assets/buldozer.png"),
              name: "Иные бульдозеры",
              category_id: 15,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/greyder.png"),
          name: "Самоходные greyderы",
          subcategories: [
            {
              path: require("@/assets/greyder.png"),
              name: "Легкие",
              category_id: 16,
              active: ref(false),
            },
            {
              path: require("@/assets/greyder.png"),
              name: "Средние",
              category_id: 17,
              active: ref(false),
            },
            {
              path: require("@/assets/greyder.png"),
              name: "Тяжелые",
              category_id: 18,
              active: ref(false),
            },
            {
              path: require("@/assets/greyder.png"),
              name: "Сверхтяжелые",
              category_id: 19,
              active: ref(false),
            },
          ],
        },
        {
          /* Нет фото */ path: require("@/assets/zemleroy.png"),
          name: "Землеройно-фрезерные машины",
          subcategories: [
            {
              path: require("@/assets/zemleroy.png"),
              name: "Бобкат",
              category_id: 20,
              active: ref(false),
            },
            {
              path: require("@/assets/zemleroy.png"),
              name: "Вилочные",
              category_id: 21,
              active: ref(false),
            },
            {
              path: require("@/assets/zemleroy.png"),
              name: "Ковшовые",
              category_id: 22,
              active: ref(false),
            },
            {
              path: require("@/assets/zemleroy.png"),
              name: "Платформенные",
              category_id: 23,
              active: ref(false),
            },
            {
              path: require("@/assets/zemleroy.png"),
              name: "Иные",
              category_id: 24,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/FrontalPogryzchic.png"),
          name: "Фронтальные Погрузчики",
          subcategories: [
            {
              path: require("@/assets/FrontalPogryzchic.png"),
              name: "Бобкат",
              category_id: 25,
              active: ref(false),
            },
            {
              path: require("@/assets/FrontalPogryzchic.png"),
              name: "Вилочные",
              category_id: 26,
              active: ref(false),
            },
            {
              path: require("@/assets/FrontalPogryzchic.png"),
              name: "Ковшовые",
              category_id: 27,
              active: ref(false),
            },
            {
              path: require("@/assets/FrontalPogryzchic.png"),
              name: "Платформенные",
              category_id: 28,
              active: ref(false),
            },
            {
              path: require("@/assets/FrontalPogryzchic.png"),
              name: "Иные",
              category_id: 29,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/krany.png"),
          name: "Краны",
          subcategories: [
            {
              path: require("@/assets/krany.png"),
              name: "Манипуляторы",
              category_id: 30,
              active: ref(false),
            },
            {
              path: require("@/assets/krany.png"),
              name: "Малые",
              category_id: 31,
              active: ref(false),
            },
            {
              path: require("@/assets/krany.png"),
              name: "Легкие",
              category_id: 32,
              active: ref(false),
            },
            {
              path: require("@/assets/krany.png"),
              name: "Средние",
              category_id: 33,
              active: ref(false),
            },
            {
              path: require("@/assets/krany.png"),
              name: "Тяжелые",
              category_id: 34,
              active: ref(false),
            },
            {
              path: require("@/assets/krany.png"),
              name: "Башеные",
              category_id: 35,
              active: ref(false),
            },
            {
              path: require("@/assets/krany.png"),
              name: "Иные",
              category_id: 36,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/betonomeshalka.png"),
          name: "Бетономешалки",
          subcategories: [
            {
              path: require("@/assets/betonomeshalka.png"),
              name: "Малые",
              category_id: 37,
              active: ref(false),
            },
            {
              path: require("@/assets/betonomeshalka.png"),
              name: "Средние",
              category_id: 38,
              active: ref(false),
            },
            {
              path: require("@/assets/betonomeshalka.png"),
              name: "Большие",
              category_id: 39,
              active: ref(false),
            },
            {
              path: require("@/assets/betonomeshalka.png"),
              name: "Иные",
              category_id: 40,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/Betononasos.png"),
          name: "Бетононасосы",
          subcategories: [
            {
              path: require("@/assets/Betononasos.png"),
              name: "Малые",
              category_id: 41,
              active: ref(false),
            },
            {
              path: require("@/assets/Betononasos.png"),
              name: "Средние",
              category_id: 42,
              active: ref(false),
            },
            {
              path: require("@/assets/Betononasos.png"),
              name: "Большие",
              category_id: 43,
              active: ref(false),
            },
            {
              path: require("@/assets/Betononasos.png"),
              name: "Иные",
              category_id: 44,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/avtovyshka.png"),
          name: "Автовышки",
          subcategories: [
            {
              path: require("@/assets/avtovyshka.png"),
              name: "Малые",
              category_id: 45,
              active: ref(false),
            },
            {
              path: require("@/assets/avtovyshka.png"),
              name: "Легкие",
              category_id: 46,
              active: ref(false),
            },
            {
              path: require("@/assets/avtovyshka.png"),
              name: "Средние",
              category_id: 47,
              active: ref(false),
            },
            {
              path: require("@/assets/avtovyshka.png"),
              name: "Тяжелые",
              category_id: 48,
              active: ref(false),
            },
            {
              path: require("@/assets/avtovyshka.png"),
              name: "Иные",
              category_id: 49,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/Asphaltoucladchic.png"),
          name: "Асфальтоукладчики",
          subcategories: [
            {
              path: require("@/assets/Asphaltoucladchic.png"),
              name: "Гусеничные",
              category_id: 50,
              active: ref(false),
            },
            {
              path: require("@/assets/Asphaltoucladchic.png"),
              name: "Колесные",
              category_id: 51,
              active: ref(false),
            },
            {
              path: require("@/assets/Asphaltoucladchic.png"),
              name: "Иные",
              category_id: 52,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/DoroznyeKatki.png"),
          name: "Дорожные катки",
          subcategories: [
            {
              path: require("@/assets/DoroznyeKatki.png"),
              name: "Легкие",
              category_id: 53,
              active: ref(false),
            },
            {
              path: require("@/assets/DoroznyeKatki.png"),
              name: "Средние",
              category_id: 54,
              active: ref(false),
            },
            {
              path: require("@/assets/DoroznyeKatki.png"),
              name: "Тяжелые",
              category_id: 55,
              active: ref(false),
            },
            {
              path: require("@/assets/DoroznyeKatki.png"),
              name: "Иные",
              category_id: 56,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/Doroznye.png"),
          name: "Дорожные фрезы",
          subcategories: [
            {
              path: require("@/assets/Doroznye.png"),
              name: "Самоходные",
              category_id: 57,
              active: ref(false),
            },
            {
              path: require("@/assets/Doroznye.png"),
              name: "Навесные и полунавесные (полуприцепные)",
              category_id: 58,
              active: ref(false),
            },
            {
              path: require("@/assets/Doroznye.png"),
              name: "Прицепные",
              category_id: 59,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/PeregruzatelAsfalt.png"),
          name: "Перегружатель асфальтобетонной смеси",
          subcategories: [
            {
              path: require("@/assets/PeregruzatelAsfalt.png"),
              name: "Негабаритные",
              category_id: 60,
              active: ref(false),
            },
            {
              path: require("@/assets/PeregruzatelAsfalt.png"),
              name: "Низкорамные",
              category_id: 61,
              active: ref(false),
            },
            {
              path: require("@/assets/PeregruzatelAsfalt.png"),
              name: "Малый",
              category_id: 62,
              active: ref(false),
            },
            {
              path: require("@/assets/PeregruzatelAsfalt.png"),
              name: "Иные",
              category_id: 63,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/Gudronator.png"),
          name: "Гудронатор",
          subcategories: [
            {
              path: require("@/assets/Gudronator.png"),
              name: "Негабаритные",
              category_id: 60,
              active: ref(false),
            },
            {
              path: require("@/assets/Gudronator.png"),
              name: "Низкорамные",
              category_id: 61,
              active: ref(false),
            },
            {
              path: require("@/assets/Gudronator.png"),
              name: "Малый",
              category_id: 62,
              active: ref(false),
            },
            {
              path: require("@/assets/Gudronator.png"),
              name: "Иные",
              category_id: 63,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/traly.png"),
          name: "Тралы",
          subcategories: [
            {
              path: require("@/assets/traly.png"),
              name: "Негабаритные",
              category_id: 60,
              active: ref(false),
            },
            {
              path: require("@/assets/traly.png"),
              name: "Низкорамные",
              category_id: 61,
              active: ref(false),
            },
            {
              path: require("@/assets/traly.png"),
              name: "Малый",
              category_id: 62,
              active: ref(false),
            },
            {
              path: require("@/assets/traly.png"),
              name: "Иные",
              category_id: 63,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/komm-doro.png"),
          name: "Коммунально-Дорожные Машины",
          subcategories: [
            {
              path: require("@/assets/komm-doro.png"),
              name: "Мусоровозы",
              category_id: 60,
              active: ref(false),
            },
            {
              path: require("@/assets/komm-doro.png"),
              name: "Снегоуборочные",
              category_id: 61,
              active: ref(false),
            },
            {
              path: require("@/assets/komm-doro.png"),
              name: "Пескоуборочные",
              category_id: 62,
              active: ref(false),
            },
            {
              path: require("@/assets/komm-doro.png"),
              name: "Водовоз",
              category_id: 63,
              active: ref(false),
            },
            {
              path: require("@/assets/komm-doro.png"),
              name: "Иные",
              category_id: 63,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/byrAndSvai.png"),
          name: "Машины для буровых и свайных работ",
          subcategories: [
            {
              path: require("@/assets/byrAndSvai.png"),
              name: "Тяжелые",
              category_id: 60,
              active: ref(false),
            },
            {
              path: require("@/assets/byrAndSvai.png"),
              name: "Средние",
              category_id: 61,
              active: ref(false),
            },
            {
              path: require("@/assets/byrAndSvai.png"),
              name: "Малые",
              category_id: 62,
              active: ref(false),
            },
            {
              path: require("@/assets/byrAndSvai.png"),
              name: "Иные",
              category_id: 63,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/sedlovyeTyagochi.png"),
          name: "Седельные тягачи",
          subcategories: [
            {
              path: require("@/assets/sedlovyeTyagochi.png"),
              name: "С полуприцепом",
              category_id: 60,
              active: ref(false),
            },
            {
              path: require("@/assets/sedlovyeTyagochi.png"),
              name: "С тонаром",
              category_id: 61,
              active: ref(false),
            },
            {
              path: require("@/assets/sedlovyeTyagochi.png"),
              name: "Иные",
              category_id: 62,
              active: ref(false),
            },
          ],
        },
        {
          path: require("@/assets/tractory.png"),
          name: "Тракторы",
          subcategories: [],
        },
        {
          path: require("@/assets/kombainy.png"),
          name: "Комбайны",
          subcategories: [],
        },
        {
          path: require("@/assets/opriskivateli.png"),
          name: "Опрыскиватели",
          subcategories: [],
        },
      ],
    };
  },
  computed: {
    canLoadMore() {
      return this.displayedProducts.length < this.LengthAds;
    },
  },
  async created() {
    this.loading = true;

    try {
      const response = await axios.post(
        "http://localhost:8080/sortProductListHourlyRate",
        {
          List: 1,
          Size: 2,
          Category: [],
          LowNum: 1,
          HigNum: 9999999,
          LowDate: 1452585372,
          HigDate: 1489308972,
          Position: [1, 2],
          Location: "",
          Distance: 999999,
          Rating: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("ShowMoreData", this.sortRadio)

      console.log("sort = ",response);
      console.log("response.data.status = ",response.data.status);
      console.log("response.data.Lenght = ",response.data.Lenght);
      if (response.data.status == "fatal" || response.data.Lenght == 0) {
        this.displayedProducts = [];
        this.LengthAds = 0;
      } else {
        console.log("displayedProducts")
        this.displayedProducts = response.data.data;
        this.LengthAds = response.data.Lenght;
        this.showMoreData = {
          nowPage: 1,
          category_id: [],
          priceFrom: 1,
          priceTo: 9999999,
          partsDateFrom: 1452585372,
          partsDateTo: 1489308972,
          region: [1, 2],
          Distance: 999999,
          rating: 0,
          sortRadio: this.sortRadio
        };

        console.log("1ShowMoreData = ", this.showMoreData)

      }
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
    } finally {
      this.loading = false;
    }

    console.log("2ShowMoreData = ", this.showMoreData)


    try {
      console.log("groupFavByRecent");

      const response = await axios.get("http://localhost:8080/groupFavByRecent", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.data.data.status == "fatal") {
        this.favorite = [];
      } else {
        this.favorite = response.data.data;
      }
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
    } finally {
    }
  },
  methods: {
    async getCityData(cityName) {
    const username = "your_geonames_username"; // Замените на ваш GeoNames username
    const apiUrl = `http://api.geonames.org/searchJSON?formatted=true&q=${cityName}&maxRows=1&username=${username}`;
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      const data = await response.json();
      if (data.geonames && data.geonames.length > 0) {
        const city = data.geonames[0];
        return {
          city: cityName,
          coordinate: [parseFloat(city.lat), parseFloat(city.lng)],
        };
      } else {
        console.error("Город не найден:", cityName);
        return null;
      }
    } catch (error) {
      console.error("Ошибка при запросе данных:", error);
      return null;
    }
  },

  getPosition(){
    // Пример использования
    getCityData("Москва").then((cityData) => {
      if (cityData) {
        console.log("Данные города:", cityData);
      } else {
        console.log("Данные не найдены");
      }
    })
  },

    sortSelectedRadio(radio){
      this.sortRadio = radio;
      console.log(this.sortRadio);
    },
    favoriteStateF() {
      return false;
    },
    // clickFavorite() {
    //   console.log(`ClickFav detail.Ads_id = ${this.detail.Ads_id}`)
    //   console.log(this.favorite)
    //   if (this.favorite.find((prod) => prod.Ads_id === this.detail.Ads_id) === undefined) {
    //     this.addFavorite(this.detail.Ads_id);
    //   } else {
    //     this.removeFavorite(this.detail.Ads_id);
    //   }
    // },
    // async addFavorite(idProduct) {
    //   console.log(`addFavorite ${idProduct}`);
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:8080/sigFavAds",
    //       {
    //         Ads_id: idProduct
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         withCredentials: true, // для отправки куки
    //       }
    //     );
    //     console.log(response)

    //     if (response.data.status === "fatal") {
    //       alert("Error addFavorite status:fatal");
    //     } else {
    //       this.getFavoritList();
    //     }
    //   } catch (error) {
    //     console.error("Ошибка при добавлении в избранное:", error);
    //   }
    // },
    // async removeFavorite(idProduct) {
    //   console.log(`removeFavorite ${idProduct}`);
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:8080/delFavAds",
    //       {
    //         Ads_id: idProduct,
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         withCredentials: true, // для отправки куки
    //       }
    //     );
    //     console.log(response)

    //     if (response.data.status === "fatal") {
    //       alert("Error removeFavirite status:fatal");
    //     } else {
    //       this.getFavoritList();
    //     }
    //   } catch (error) {
    //     console.error("Ошибка при удалении из избранного:", error);
    //   }
    // },
    async getFavoritList() {
      try {
        const response = await axios.get("http://localhost:8080/groupFavByRecent", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response)
        if (response.data.data.status == "fatal") {
          this.favorite = [];
        } else {
          this.favorite = response.data.data.slice(0, this.perPage);
          this.adsFav =
            this.favorite.find((prod) => prod.Ads_id === this.detail.Ads_id) != undefined;
        }
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      }
    },
    CategoriaSliderClick(index) {
      console.log("subcategories", sldiers[index].subcategories);
      // if(sldiers[index].subcategories)
      // Переключаем отображение подкатегорий
      if (this.selectedIndex === index) {
        this.selectedIndex = null; // Скрыть подкатегории
      } else {
        this.selectedIndex = index; // Показать подкатегории для выбранного слайда
        this.selectedPodcategory = null; // Сбросить выбранную подкатегорию при выборе нового слайда
      }
    },
    // selectSubcategory(subSlide) {
    //   // Переключаем активный статус подкатегории и устанавливаем category_id
    //   subSlide.active = !subSlide.active;

    //   if(subSlide.active) this.category_id.push(subSlide.category_id);

    //   console.log("Selected Subcategory:", subSlide.name);
    //   console.log("Category ID:");
    //   console.log("Category ID:", this.category_id);
    // },

    formatCreationTime(createdAt) {
      const date = new Date(createdAt);

      if (isToday(date)) {
        return formatDistanceToNow(date, { addSuffix: true, locale: ru }); // Например, "2 часа назад"
      } else if (isYesterday(date)) {
        return "вчера";
      } else {
        return format(date, "dd.MM.yyyy", { locale: ru }); // Например, "25.12.2023"
      }
    },
    loadMore() {
      this.currentPage++;
      const start = this.displayedProducts.length;
      const end = start + this.perPage;
      this.displayedProducts.push(...this.prods.slice(start, end));
    },
    // selectCategory(category) {
    //   this.category_id.push(category);
    // },
    setRating(star) {
      if(star == this.rating) this.rating = 0;
      else this.rating = star;
    },

    async showMore() {
      this.showMoreData.nowPage++;
      console.log("this.showMoreData = ", this.showMoreData);
      if(this.showMoreData.sortRadio) {
        try {
          const response = await axios.post(
            "http://localhost:8080/sortProductListDailyRate",
            {
              List: this.showMoreData.nowPage,
              Size: 2,
              Category: this.showMoreData.category_id,
              LowNum: this.showMoreData.priceFrom,
              HigNum: this.showMoreData.priceTo,
              LowDate: this.showMoreData.partsDateFrom,
              HigDate: this.showMoreData.partsDateTo,
              Position: this.showMoreData.region,
              Location: "",
              Distance: 999999,
              Rating: this.rating,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("response  = ",response);
          if (response.data.status == "fatal" || response.data.Lenght == 0) {
            this.displayedProducts = [];
            this.LengthAds = 0;
          } else {
            this.LengthAds = response.data.Lenght;
            this.displayedProducts.push(...response.data.data);
          }
        } catch (error) {
          console.error("Ошибка при загрузке продуктов:", error);
        } finally {
          this.loading = false;
        }
      } else {
        try{
          const response = await axios.post(
            "http://localhost:8080/sortProductListHourlyRate",
            {
              List: this.showMoreData.nowPage,
              Size: 2,
              Category: this.showMoreData.category_id,
              LowNum: this.showMoreData.priceFrom,
              HigNum: this.showMoreData.priceTo,
              LowDate: this.showMoreData.partsDateFrom,
              HigDate: this.showMoreData.partsDateTo,
              Position: this.showMoreData.region,
              Location: "",
              Distance: 999999,
              Rating: this.rating,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("response = ",response);
          if (response.data.status == "fatal" || response.data.Lenght == 0) {
            this.displayedProducts = [];
            this.LengthAds = 0;
          } else {
            this.LengthAds = response.data.Lenght;
            this.displayedProducts.push(...response.data.data);
          }
        } catch (error) {
          console.error("Ошибка при загрузке продуктов:", error);
        } finally {
          this.loading = false;
        }
      }
    },

    // async applyFilters() {
    //   let partsDateFrom = this.rentalFrom.split(".");
    //   let partsDateTo = this.rentalTo.split(".");
    //   if (partsDateFrom.length === 3) {
    //     const formattedDate = `${partsDateFrom[2]}-${partsDateFrom[1]}-${partsDateFrom[0]}`;
    //     partsDateFrom = Date.parse(formattedDate) / 1000;
    //   } else {
    //     partsDateFrom = 1452585372;
    //   }

    //   if (partsDateTo.length === 3) {
    //     const formattedDate = `${partsDateTo[2]}-${partsDateTo[1]}-${partsDateTo[0]}`;
    //     partsDateTo = Date.parse(formattedDate) / 1000;
    //   } else {
    //     partsDateTo = 1489308972;
    //   }
    //   console.log("this.sortRadio");
    //   console.log(this.sortRadio);

    //   if(this.sortRadio) {
    //     try {
    //     const response = await axios.post(
    //       "http://localhost:8080/sortProductListDailyRate",
    //       {
    //         List: 1,
    //         Size: 2,
    //         Category: this.category_id,
    //         LowNum: this.priceFrom,
    //         HigNum: this.priceTo,
    //         LowDate: partsDateFrom,
    //         HigDate: partsDateTo,
    //         Position: this.region,
    //         Distance: 999999,
    //         Rating: this.rating,
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     console.log(response);
    //     if (response.data.status === "fatal") {
    //       this.displayedProducts = [];
    //     } else {
    //       this.showMoreData = {
    //         category_id: this.category_id,
    //         priceFrom: this.priceFrom,
    //         priceTo: this.priceTo,
    //         partsDateFrom: partsDateFrom,
    //         partsDateTo: partsDateTo,
    //         region: this.region,
    //         Distance: 999999,
    //         rating: this.rating,
    //       };
    //       this.displayedProducts = response.data.data;
    //     }
    //   } catch (error) {
    //     console.error("Ошибка при загрузке продуктов:", error);
    //   } finally {
    //     this.loading = false;
    //   }

    //   } else {
    //     try {
    //       const response = await axios.post(
    //         "http://localhost:8080/sortProductListHourlyRate",
    //         {
    //           List: 1,
    //           Size: 2,
    //           Category: this.category_id,
    //           LowNum: Number(this.priceFrom),
    //           HigNum: Number(this.priceTo),
    //           LowDate: Number(partsDateFrom),
    //           HigDate: Number(partsDateTo),
    //           Position: [1, 2],
    //           Distance: 999999,
    //           Rating: Number(this.rating),
    //         },
    //         {
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );
    //       console.log(response);
    //       if (response.data.status == "fatal") {
    //         this.prods = [];
    //         this.displayedProducts = [];
    //       } else {
    //         this.showMoreData = {
    //           category_id: this.category_id,
    //           priceFrom: this.priceFrom,
    //           priceTo: this.priceTo,
    //           partsDateFrom: partsDateFrom,
    //           partsDateTo: partsDateTo,
    //           region: this.region,
    //           Distance: 999999,
    //           rating: this.rating,
    //         };
    //         // this.prods = response.data.data;
    //         this.displayedProducts = this.prods.slice(0, this.perPage);
    //       }
    //     } catch (error) {
    //       console.error("Ошибка при загрузке продуктов:", error);
    //     } finally {
    //       this.loading = false;
    //     }
    //   }
      

      /*try {
        const response = await axios.post("http://localhost:8080", filters);
        console.log("Filters applied:", response.data);
      } catch (error) {
        console.error("Error applying filters:", error);
      }*/
    // },

    async applyFilters() {
      let partsDateFrom = this.rentalFrom.split(".");
      let partsDateTo = this.rentalTo.split(".");
      if (partsDateFrom.length === 3) {
        const formattedDate = `${partsDateFrom[2]}-${partsDateFrom[1]}-${partsDateFrom[0]}`;
        partsDateFrom = Date.parse(formattedDate) / 1000;
      } else {
        partsDateFrom = 1452585372;
      }

      if (partsDateTo.length === 3) {
        const formattedDate = `${partsDateTo[2]}-${partsDateTo[1]}-${partsDateTo[0]}`;
        partsDateTo = Date.parse(formattedDate) / 1000;
      } else {
        partsDateTo = 1489308972;
      }
      console.log("this.sortRadio");
      console.log(this.sortRadio);

      if(this.sortRadio) {
        console.log("sortProductListDailyRate")
        console.log(this.category_id)
        console.log(this.priceFrom)
        console.log(this.priceTo)
        console.log(partsDateFrom)
        console.log(partsDateTo)
        console.log(this.rating)
        try {
        const response = await axios.post(
          "http://localhost:8080/sortProductListDailyRate",
          {
            List: 1,
            Size: 2,
            Category: this.category_id,
            LowNum: this.priceFrom,
            HigNum: this.priceTo,
            LowDate: partsDateFrom,
            HigDate: partsDateTo,
            Position: this.region,
            Location: "",
            Distance: 999999,
            Rating: this.rating,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("sortProductListDailyRate = ",response);
        console.log("response.data.status = ",response.data.status);
        console.log("response.data.Lenght = ",response.data.Lenght);
        if (response.data.status == "fatal" || response.data.Lenght == 0) {
          this.displayedProducts = [];
          this.LengthAds = 0;
        } else {
          this.LengthAds = response.data.Lenght;
          this.showMoreData = {
            nowPage: 1,
            category_id: this.category_id,
            priceFrom: this.priceFrom,
            priceTo: this.priceTo,
            partsDateFrom: partsDateFrom,
            partsDateTo: partsDateTo,
            region: this.region,
            Distance: 999999,
            rating: this.rating,
            sortRadio: this.sortRadio
          };
          // this.prods = response.data.data;
          this.displayedProducts = response.data.data;
        }
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
      } finally {
        this.loading = false;
      }

      } else {
        console.log("sortProductListHourlyRate")
        console.log(this.category_id)
        console.log(this.priceFrom)
        console.log(this.priceTo)
        console.log(partsDateFrom)
        console.log(partsDateTo)
        console.log(this.rating)
        try {
          const response = await axios.post(
            "http://localhost:8080/sortProductListHourlyRate",
            {
              List: 1,
              Size: 2,
              Category: this.category_id,
              LowNum: Number(this.priceFrom),
              HigNum: Number(this.priceTo),
              LowDate: Number(partsDateFrom),
              HigDate: Number(partsDateTo),
              Position: [1, 2],
              Location: "",
              Distance: 999999,
              Rating: Number(this.rating),
            },
          //   {
          //   Category: [1],
          //   LowNum: this.priceFrom,
          //   HigNum: this.priceTo,
          //   LowDate: 1452585372,
          //   HigDate: 1489308972,
          //   Position: [1, 2],
          //   Distance: 999999,
          //   Rating: this.rating,
          // },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("sortProductListHourlyRate = ",response);
          console.log("response.data.status = ",response.data.status);
          console.log("response.data.Lenght = ",response.data.Lenght);
          console.log("response.data.status == fatal && response.data.Lenght == 0 =", response.data.status == "fatal" && response.data.Lenght == 0);
          if (response.data.status == "fatal" || response.data.Lenght == 0) {
            this.displayedProducts = [];
            this.LengthAds = 0;
          } else {
            this.LengthAds = response.data.Lenght;
            this.showMoreData = {
              nowPage: 1,
              category_id: this.category_id,
              priceFrom: this.priceFrom,
              priceTo: this.priceTo,
              partsDateFrom: partsDateFrom,
              partsDateTo: partsDateTo,
              region: this.region,
              Distance: 999999,
              rating: this.rating,
              sortRadio: this.sortRadio
            };
            // this.prods = response.data.data;
            this.displayedProducts = response.data.data;
          }
        } catch (error) {
          console.error("Ошибка при загрузке продуктов:", error);
        } finally {
          this.loading = false;
        }
      }
      

      /*try {
        const response = await axios.post("http://localhost:8080", filters);
        console.log("Filters applied:", response.data);
      } catch (error) {
        console.error("Error applying filters:", error);
      }*/
    },

    selectProduct(product) {
      console.log("product.Id")
      console.log(product.Id)
      this.$emit("selectProduct", product.Id);
    },
    CategoriaSliderClick(index) {
      console.log("subcategories index", index);
      if(this.sldiers[index].subcategories.length > 0) {
        // Переключаем отображение подкатегорий
        if (this.selectedIndex === index) {
          this.selectedIndex = null; // Скрыть подкатегории
        } else {
          this.selectedIndex = index; // Показать подкатегории для выбранного слайда
          this.selectedPodcategory = null; // Сбросить выбранную подкатегорию при выборе нового слайда
        }
      } else {
        if(this.category_id.indexOf(index) == -1){
          console.log('push')
          this.category_id.push(index)
          this.selectedIndex = null;
          // this.selectedIndex = index;
        }
        else{
          console.log('remove');
          this.category_id = this.category_id.filter(item => item != index);
          this.selectedIndex = null;
        } 

        console.log("Category ID:", this.category_id);
        this.category_id.forEach(e=>(console.log(e)))
      }
    },
    selectSubcategory(subSlide) {
      // this.selectedPodcategory = subSlide;
      // subSlide.active = !subSlide.active;
      // this.category_id = subSlide.category_id;
      // console.log("Selected Subcategory:", this.selectedPodcategory);
      // console.log(this.category_id);


       // Переключаем активный статус подкатегории и устанавливаем category_id
      subSlide.active = !subSlide.active;
      console.log(subSlide.active);
      if(subSlide.active){
        console.log('push')
        this.category_id.push(subSlide.category_id)
      }
      else{
        console.log('remove');
        this.category_id = this.category_id.filter(item => item != subSlide.category_id);
      } 

      console.log("Selected Subcategory:", subSlide.name);
      console.log("Category ID:");
      console.log("Category ID:", this.category_id);
      this.category_id.forEach(e=>(console.log(e)))
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
  background-color: #f9cc33;
  /* Цвет активного слайда */
}

.slider_con_el.active {
  background-color: #f9cc33;
  /* Цвет активного слайда */
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
  height: 9vw !important;
}

main {
  margin: 0;
  padding: 0;
}

.swiper {
  padding: 1vw 0;
  height: 9vw;
  margin-top: -2vw;
  width: 100%;
}

.swiper-el {
  width: 15% !important;
  padding-left: 1.5vw;
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
  cursor: pointer;
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
  cursor: pointer;
  border-radius: 10px;
  padding: 8px 40px;
}

.product_button_date {
  margin-top: 1vw;
  box-sizing: border-box;
  background-color: white;
  border: solid 0.2vw #f9cc33;
  border-radius: 1vw;
  cursor: pointer;
  padding: 0.6vw 2.5vw;
}

.product_status_r {
  color: #c70000;
  font-size: 11px;
}

.product_status_g {
  color: #04c700;
  font-size: 11px;
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
  width: 36vw;
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
  font-size: var(--fs-25);
  margin-bottom: 2.5vw;
  padding-top: 2vw;
}

.shop {
  display: flex;
  justify-content: center;
  padding: 0 7vw;
}

.shop_product {
  margin-left: 4vw;
  width: 36vw;
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
  cursor: pointer;
  text-align: center;
  padding: 1vw 0;
  margin: 30px 0 30px 0;
}

.shop_filter_block {
  display: flex;
  margin: 3% 0 4.5% 0;
  justify-content: space-between;
  width: 35%;
}

.shop_filter_block p {
  font-size: 12px;
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

/* h3 {
  margin: 0.2vw 0;
} */

.slider_con_el h3 {
  display: flex;
  justify-content: end;
  font-size: var(--fs-14);
  margin: 0;
  text-align: end;
  padding: 0;
  padding-top: 1vw;
}

.slider_con_el img {
  position: absolute;
  left: -2vw;
  height: 6vw;
  bottom: -1.2vw;
}

.slider_con_el {
  position: relative;
  background: #f9f9e2;
  border-radius: 0.5vw;
  box-shadow: 0.2vw 0.3vw 5px rgba(0, 0, 0, 0.4);
  margin: 0 1vw;
  padding-right: 0.6vw;
  height: 7vw;
  width: 13vw;
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
  cursor: pointer;
  width: 8%;
  margin-right: 2%;
}

.block-desc{
  width: 50%;
  height: 235px;
  margin-left: 2%;
}

@media (max-width: 768px)  {
  .card-profile-photo {
    width: 30px;
    height: 30px;
  }

  .slider_con_el {
    height: 75px;
    width: 95%;
  }

  .slider_con_el img {
    position: absolute;
    left: -2vw;
    height: 78%;
    bottom: -1.2vw;
  }

  #min-swiper {
    height: 78px !important;
  }

  .slider_con_el h3 {
    font-size: 15px;
  }

  .swiper-el {
    width: 50% !important;
    padding-left: 1.5vw;
    height: 85px;
  }

  .swiper {
    padding: 1vw 0;
    height: 80px;
    margin-top: -2vw;
    width: 100%;
  }

  .flex-filter-input input {
    font-size: 11px;
    padding: 0 3% 0 23%;
  }

  .cost-content-card {
    font-size: 12px;
    margin: 1% 0 2% 0;
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
    height: 239px;
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

</style>
