<template>
  <div class="v-popup">
    <div class="center">
      <div
        :class="{ active: category.active }"
        class="element"
        v-for="(category, index) in sldiers"
        :key="index"
        @click="SelectCategory(index)"
      >
        <samp> {{ category.name }}</samp>
        <img src="../../assets/arrow_right_category.svg" alt="" />
        
        <!-- Анимация для подкатегорий -->
        <transition class="subcategory-absolute" name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <div v-if="category.active" class="subcategories">
            <div
              v-for="(subcategory, subIndex) in category.subcategories"
              :key="subIndex"
              class="subcategory"
            >
              {{ subcategory.name }}
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
  <div class="close_panel" @click="closeInfoPopup"></div>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      isActive: true,
      sldiers: [
        {
          name: "Самосвалы",
          active: ref(false),
          subcategories: [
            {
              name: "Малые самосвалы",
              category_id: 0,
              active: ref(false),
            },
            {
              name: "Легкие самосвалы",
              category_id: 1,
              active: ref(false),
            },
            {
              name: "Средние самосвалы",
              category_id: 2,
              active: ref(false),
            },
            {
              name: "Большие самосвалы",
              category_id: 3,
              active: ref(false),
            },
          ],
        },
        {
          name: "Экскаваторы",
          active: ref(false),
          subcategories: [
            {
              name: "Малые экскаваторы",
              category_id: 4,
              active: ref(false),
            },
            {
              name: "Средние экскаваторы",
              category_id: 5,
              active: ref(false),
            },
            {
              name: "Большие экскаваторы",
              category_id: 6,
              active: ref(false),
            },
            {
              name: "Сверхбольшие экскаваторы",
              category_id: 7,
              active: ref(false),
            },
          ],
        },
        {
          name: "Экскаваторы – Погрузчики",
          active: ref(false),
          subcategories: [
            {
              name: "Малые экскаваторы",
              category_id: 8,
              active: ref(false),
            },
            {
              name: "Средние экскаваторы",
              category_id: 9,
              active: ref(false),
            },
            {
              name: "Большие экскаваторы",
              category_id: 10,
              active: ref(false),
            },
          ],
        },
        {
          name: "Бульдозеры",
          active: ref(false),
          subcategories: [
            {
              name: "Малые бульдозеры",
              category_id: 11,
              active: ref(false),
            },
            {
              name: "Легкие бульдозеры",
              category_id: 12,
              active: ref(false),
            },
            {
              name: "Средние бульдозеры",
              category_id: 13,
              active: ref(false),
            },
            {
              name: "Тяжелые бульдозеры",
              category_id: 14,
              active: ref(false),
            },
            {
              name: "Иные бульдозеры",
              category_id: 15,
              active: ref(false),
            },
          ],
        },
        {
          name: "Самоходные greyderы",
          active: ref(false),
          subcategories: [
            {
              name: "Легкие",
              category_id: 16,
              active: ref(false),
            },
            {
              name: "Средние",
              category_id: 17,
              active: ref(false),
            },
            {
              name: "Тяжелые",
              category_id: 18,
              active: ref(false),
            },
            {
              name: "Сверхтяжелые",
              category_id: 19,
              active: ref(false),
            },
          ],
        },
        {
          name: "Землеройно-фрезерные машины",
          active: ref(false),
          subcategories: [
            {
              name: "Бобкат",
              category_id: 20,
              active: ref(false),
            },
            {
              name: "Вилочные",
              category_id: 21,
              active: ref(false),
            },
            {
              name: "Ковшовые",
              category_id: 22,
              active: ref(false),
            },
            {
              name: "Платформенные",
              category_id: 23,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 24,
              active: ref(false),
            },
          ],
        },
        {
          name: "Фронтальные Погрузчики",
          active: ref(false),
          subcategories: [
            {
              name: "Бобкат",
              category_id: 25,
              active: ref(false),
            },
            {
              name: "Вилочные",
              category_id: 26,
              active: ref(false),
            },
            {
              name: "Ковшовые",
              category_id: 27,
              active: ref(false),
            },
            {
              name: "Платформенные",
              category_id: 28,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 29,
              active: ref(false),
            },
          ],
        },
        {
          name: "Краны",
          active: ref(false),
          subcategories: [
            {
              name: "Манипуляторы",
              category_id: 30,
              active: ref(false),
            },
            {
              name: "Малые",
              category_id: 31,
              active: ref(false),
            },
            {
              name: "Легкие",
              category_id: 32,
              active: ref(false),
            },
            {
              name: "Средние",
              category_id: 33,
              active: ref(false),
            },
            {
              name: "Тяжелые",
              category_id: 34,
              active: ref(false),
            },
            {
              name: "Башеные",
              category_id: 35,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 36,
              active: ref(false),
            },
          ],
        },
        {
          name: "Бетономешалки",
          active: ref(false),
          subcategories: [
            {
              name: "Малые",
              category_id: 37,
              active: ref(false),
            },
            {
              name: "Средние",
              category_id: 38,
              active: ref(false),
            },
            {
              name: "Большие",
              category_id: 39,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 40,
              active: ref(false),
            },
          ],
        },
        {
          name: "Бетононасосы",
          active: ref(false),
          subcategories: [
            {
              name: "Малые",
              category_id: 41,
              active: ref(false),
            },
            {
              name: "Средние",
              category_id: 42,
              active: ref(false),
            },
            {
              name: "Большие",
              category_id: 43,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 44,
              active: ref(false),
            },
          ],
        },
        {
          name: "Автовышки",
          active: ref(false),
          subcategories: [
            {
              name: "Малые",
              category_id: 45,
              active: ref(false),
            },
            {
              name: "Легкие",
              category_id: 46,
              active: ref(false),
            },
            {
              name: "Средние",
              category_id: 47,
              active: ref(false),
            },
            {
              name: "Тяжелые",
              category_id: 48,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 49,
              active: ref(false),
            },
          ],
        },
        {
          name: "Асфальтоукладчики",
          active: ref(false),
          subcategories: [
            {
              name: "Гусеничные",
              category_id: 50,
              active: ref(false),
            },
            {
              name: "Колесные",
              category_id: 51,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 52,
              active: ref(false),
            },
          ],
        },
        {
          name: "Дорожные катки",
          active: ref(false),
          subcategories: [
            {
              name: "Легкие",
              category_id: 53,
              active: ref(false),
            },
            {
              name: "Средние",
              category_id: 54,
              active: ref(false),
            },
            {
              name: "Тяжелые",
              category_id: 55,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 56,
              active: ref(false),
            },
          ],
        },
        {
          name: "Дорожные фрезы",
          active: ref(false),
          subcategories: [
            {
              name: "Самоходные",
              category_id: 57,
              active: ref(false),
            },
            {
              name: "Навесные и полунавесные (полуприцепные)",
              category_id: 58,
              active: ref(false),
            },
            {
              name: "Прицепные",
              category_id: 59,
              active: ref(false),
            },
          ],
        },
        {
          name: "Перегружатель асфальтобетонной смеси",
          active: ref(false),
          subcategories: [
            {
              name: "Негабаритные",
              category_id: 60,
              active: ref(false),
            },
            {
              name: "Низкорамные",
              category_id: 61,
              active: ref(false),
            },
            {
              name: "Малый",
              category_id: 62,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 63,
              active: ref(false),
            },
          ],
        },
        {
          name: "Гудронатор",
          active: ref(false),
          subcategories: [
            {
              name: "Негабаритные",
              category_id: 60,
              active: ref(false),
            },
            {
              name: "Низкорамные",
              category_id: 61,
              active: ref(false),
            },
            {
              name: "Малый",
              category_id: 62,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 63,
              active: ref(false),
            },
          ],
        },
        {
          name: "Тралы",
          active: ref(false),
          subcategories: [
            {
              name: "Негабаритные",
              category_id: 60,
              active: ref(false),
            },
            {
              name: "Низкорамные",
              category_id: 61,
              active: ref(false),
            },
            {
              name: "Малый",
              category_id: 62,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 63,
              active: ref(false),
            },
          ],
        },
        {
          name: "Коммунально-Дорожные Машины",
          active: ref(false),
          subcategories: [
            {
              name: "Мусоровозы",
              category_id: 60,
              active: ref(false),
            },
            {
              name: "Снегоуборочные",
              category_id: 61,
              active: ref(false),
            },
            {
              name: "Пескоуборочные",
              category_id: 62,
              active: ref(false),
            },
            {
              name: "Водовоз",
              category_id: 63,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 63,
              active: ref(false),
            },
          ],
        },
        {
          name: "Машины для буровых и свайных работ",
          active: ref(false),
          subcategories: [
            {
              name: "Тяжелые",
              category_id: 60,
              active: ref(false),
            },
            {
              name: "Средние",
              category_id: 61,
              active: ref(false),
            },
            {
              name: "Малые",
              category_id: 62,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 63,
              active: ref(false),
            },
          ],
        },
        {
          name: "Седельные тягачи",
          active: ref(false),
          subcategories: [
            {
              name: "С полуприцепом",
              category_id: 60,
              active: ref(false),
            },
            {
              name: "С тонаром",
              category_id: 61,
              active: ref(false),
            },
            {
              name: "Иные",
              category_id: 62,
              active: ref(false),
            },
          ],
        },
        {
          name: "Тракторы",
          active: ref(false),
          subcategories: [],
        },
        {
          name: "Комбайны",
          active: ref(false),
          subcategories: [],
        },
        {
          name: "Опрыскиватели",
          active: ref(false),
          subcategories: [],
        },
      ],
    };
  },
  methods: {
    SelectCategory(index) {
      // console.log(this.sldiers)
      // Делаем активной выбранную категорию, другие скрываем
      // this.categories = this.categories.forEach((category, i) => {
      //   category.active = i === index;
      // });
      this.$emit("changeRoute");
    },
    closeInfoPopup() {
      this.$emit("closePopup");
    },
    beforeEnter(el) {
      el.style.height = 0;
    },
    enter(el, done) {
      el.offsetHeight; // Reflow to apply transition
      el.style.transition = "height 0.3s ease-in-out";
      el.style.height = `${el.scrollHeight}px`;
      done();
    },
    leave(el, done) {
      el.style.transition = "height 0.3s ease-in-out";
      el.style.height = 0;
      done();
    },

  },
  setup() {},
};
</script>

<style scoped>
.element {
  position: relative;
  padding: 0.3vw 0.5vw;
  margin-bottom: 1vw;
  display: flex;
  justify-content: space-between;
}

.active {
  background-color: #d9d9d9;
  border-radius: 0.8vw;
}

.element:last-child {
  margin-bottom: 0;
}

.center {
  width: 27vw;
  padding: 2vw;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 1.5vw;
  background-color: white;
}

.v-popup {
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
  z-index: 1;
}

/* Добавим стили для подкатегорий и анимации */
.subcategories {
  overflow: hidden;
}

.subcategory {
  margin-bottom: 5px;
  cursor: pointer;
}

.subcategory:hover {
  color: #007bff;
}

/* Анимация плавного появления/исчезновения */
.fade-enter-active, .fade-leave-active {
  transition: height 0.3s ease-in-out;
}

.fade-enter, .fade-leave-to {
  height: 0;
}

.subcategory-absolute{
  position: absolute;
  background: #f4f4f4;
  padding: 0.2vw 2vw;
  border-radius: 1vw;
  top: 0;
  z-index: 10;
  left: 10vw;

}
</style>