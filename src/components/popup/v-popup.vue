<template>
  <div class="v-popup">
    <div class="center">
      <div class="container">
        <div class="block-flex">
          <div class="end_date_time" >
            <div :class="{ time_select: isActiveDate }" class="date" @click="changeActiveDate()">
              {{
                getDayOfWeek(
                  selectedDate.year,
                  selectedDate.month,
                  selectedDate.day
                )
              }}, {{ selectedDate.day }}
              {{ monthNames[selectedDate.month - 1] }}
            </div>
            <div :class="{ time_select: isActiveTime }" @click="changeActiveTime()" class="time">
              {{ formatTime(selectedTime.hours) }} :
              {{ formatTime(selectedTime.minutes) }}
            </div>
          </div>
          <img class="arrow_right" src="../../assets/arrow_right.svg" alt="" />
          <div class="end_date_time">
            <div :class="{ time_select: isActiveDate2 }" class="date" @click="changeActiveDate2()">
              {{
                getDayOfWeek(
                  selectedDate2.year,
                  selectedDate2.month,
                  selectedDate2.day
                )
              }}, {{ selectedDate2.day }}
              {{ monthNames[selectedDate2.month - 1] }}
            </div>
            <div :class="{ time_select: isActiveTime2 }"  @click="changeActiveTime2()" class="time">
              {{ formatTime(selectedTime2.hours) }} :
              {{ formatTime(selectedTime2.minutes) }}
            </div>
          </div>
        </div>
        <div class="clock-container">
          <div class="grey-line line_margin"></div>
          <div class="sliders">
            <swiper
              class="swiper-container"
              direction="vertical"
              :slides-per-view="3"
              centeredSlides="true"
              loop="true"
              @slideChange="updateDay"
            >
              <swiper-slide v-for="day in filteredDays" :key="day">{{
                day
              }}</swiper-slide>
            </swiper>
            <samp class="razm">:</samp>
            <swiper
              class="swiper-container"
              direction="vertical"
              :slides-per-view="3"
              centeredSlides="true"
              loop="true"
              @slideChange="updateMonth"
            >
              <swiper-slide v-for="month in filteredMonths" :key="month">{{
                monthNames[month - 1]
              }}</swiper-slide>
            </swiper>
            <samp class="razm">:</samp>
            <swiper
              class="swiper-container"
              direction="vertical"
              :slides-per-view="3"
              centeredSlides="true"
              @slideChange="updateYear"
            >
              <swiper-slide v-for="year in years" :key="year">{{
                year
              }}</swiper-slide>
            </swiper>
          </div>

          <div class="grey-line line_margin"></div>
          <div class="clock-container">
            <div class="sliders">
              <swiper
                class="swiper-container"
                direction="vertical"
                :slides-per-view="3"
                centeredSlides="true"
                loop="true"
                @slideChange="updateHours"
              >
                <swiper-slide v-for="hour in hours" :key="hour">{{
                  hour
                }}</swiper-slide>
              </swiper>
              <samp class="razm">:</samp>
              <swiper
                class="swiper-container"
                direction="vertical"
                :slides-per-view="3"
                centeredSlides="true"
                loop="true"
                @slideChange="updateMinutes"
              >
                <swiper-slide v-for="minute in minutes" :key="minute">{{
                  minute
                }}</swiper-slide>
              </swiper>
            </div>
          </div>
          <div class="grey-line line_margin2"></div>
        </div>
        <div class="container_place">
          <img class="place_img" src="../../assets/place_point.svg" alt="" />
          <samp class="place_text">Место</samp>
        </div>
        <div class="grey-line line_margin3"></div>
        <div class="container_summa">
          <div v-if="isActiveTime || isActiveTime2">По часовая оплата</div>
          <div v-if="isActiveTime || isActiveTime2">
            <p>Количество часов: {{ durationHours }}</p>
          </div>
          <div  v-if="isActiveDate || isActiveDate2 ">
            <p>Количество дней: {{ durationDays }}</p>
          </div>
          <div v-if="isActiveDate || isActiveDate2">Дневная оплата</div>
          <div class="summa_text">Сумма к оплате:</div>
          <div class="summa">{{ totalCost }} ₽</div>
        </div>
        <div class="container_center">
          <button @click="toOrder" class="button_yellow_border">Заказать</button>
        </div>
      </div>
    </div>
    <div class="close_panel" @click="closeInfoPopup()"></div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import axios from "axios";

export default {
  data() {
    return {
      startDate: this.startDate,
      isActiveDate: true,
      isActiveDate2: false,
      isActiveTime: false,
      isActiveTime2: false,
      // hourlyRate: 500, // Стоимость за час
      // dailyRate: 2000, // Стоимость за день
      durationHours: 4, // Примерное количество часов (можно вычислять)
      durationDays: 1, // Примерное количество дней (можно вычислять)
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    idProduct: {
      type: Number,
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    dailyRate: {
      type: Number,
      required: true,
    },
  },
  computed: {
    durationDays() {
      const startDate = new Date(
        this.selectedDate.year,
        this.selectedDate.month - 1, // Учитываем, что месяцы начинаются с 0
        this.selectedDate.day
      );

      const endDate = new Date(
        this.selectedDate2.year,
        this.selectedDate2.month - 1,
        this.selectedDate2.day
      );
      console.log("DATE duration")
      console.log(startDate)
      console.log(endDate)
      // Вычисляем разницу в миллисекундах и переводим в дни
      const differenceInMs = endDate - startDate;
      const days = differenceInMs / (1000 * 60 * 60 * 24);

      return Math.ceil(days); // Округляем вверх до ближайшего целого дня
    },

    durationHours() {
      const startDate = new Date(
        0, // Год не важен, используем "нулевой" для расчётов
        0, // Месяц
        0, // День
        this.selectedTime.hours,
        this.selectedTime.minutes
      );

      const endDate = new Date(
        0, // Год
        0, // Месяц
        0, // День
        this.selectedTime2.hours,
        this.selectedTime2.minutes
      );

      // Вычисляем разницу в миллисекундах и переводим в часы
      const differenceInMs = endDate - startDate;

      // Если разница отрицательная, добавляем 24 часа (для случаев, когда время конца раньше начала)
      const hours = differenceInMs >= 0
        ? differenceInMs / (1000 * 60 * 60)
        : (differenceInMs + 24 * 60 * 60 * 1000) / (1000 * 60 * 60);
      this.durationHours = Math.round(hours * 100) / 100;
      return Math.round(hours * 100) / 100; // Округляем до 2-х знаков
    },

    totalCost() {
      if (this.isActiveTime || this.isActiveTime2) {
        // Рассчитать стоимость за часы
        return this.hourlyRate * this.durationHours;
      } else if (this.isActiveDate || this.isActiveDate2) {
        // Рассчитать стоимость за дни
        return this.dailyRate * this.durationDays;
      }
      return 0; // Если ничего не выбрано
    },
  },

  methods: {
    async toOrder() {
      // Преобразуем selectedDate и selectedDate2 в объекты Date
      const startDate = new Date(
          this.selectedDate.year,
          this.selectedDate.month - 1, // Месяцы в Date начинаются с 0
          this.selectedDate.day,
          this.selectedTime.hours,
          this.selectedTime.minutes
        );

        const endDate = new Date(
          this.selectedDate2.year,
          this.selectedDate2.month - 1,
          this.selectedDate2.day,
          this.selectedTime2.hours,
          this.selectedTime2.minutes
        );

        // Генерируем Unix Timestamp
        const startsAt = Math.floor(startDate.getTime() / 1000);
        const endsAt = Math.floor(endDate.getTime() / 1000);

        console.log(this.isActiveTime)
        console.log(this.isActiveTime2)

      if(this.isActiveTime || this.isActiveTime2){
        try {
          // Выполняем запрос
          const response = await axios.post(
            "http://127.0.0.1:8080/regOrderHourly",
            {
              Ads_id: this.idProduct,
              Starts_at: startsAt,
              Ends_at: endsAt,
              PositionX: 1.1,
              PositionY: 1.1,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          console.log(response);

          if (response.data.status === "fatal") {
            alert("Error regOrderHourly status:fatal");
          } else {
            alert(response.data.message)
          }
        } catch (error) {
          console.error("Ошибка при регистрации заказа:", error);
        }
      } else if(this.isActiveDate || this.isActiveDate2) {
        try {
          // Выполняем запрос
          const response = await axios.post(
            "http://127.0.0.1:8080/regOrderDaily",
            {
              Ads_id: this.idProduct,
              Starts_at: startsAt,
              Ends_at: endsAt,
              PositionX: 1.1,
              PositionY: 1.1,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          console.log(response);

          if (response.data.status === "fatal") {
            alert("Error regOrderDaily status:fatal");
          } else {
            alert(response.data.message)
          }
        } catch (error) {
          console.error("Ошибка при регистрации заказа:", error);
        }
      }
      
    },
    changeActiveDate() {
      this.isActiveDate = true;
      this.isActiveDate2 = false;
      this.isActiveTime = false;
      this.isActiveTime2 = false;
    },

    changeActiveDate2() {
      this.isActiveDate = false;
      this.isActiveDate2 = true;
      this.isActiveTime = false;
      this.isActiveTime2 = false;
    },

    changeActiveTime() {
      this.isActiveDate = false;
      this.isActiveDate2 = false;
      this.isActiveTime = true;
      this.isActiveTime2 = false;
    },

    changeActiveTime2() {
      this.isActiveDate = false;
      this.isActiveDate2 = false;
      this.isActiveTime = false;
      this.isActiveTime2 = true;
    },

    closeInfoPopup() {
      this.$emit("closePopup");
    },
  },
  setup() {
    let isActiveDate = ref(true);
    let isActiveDate2 = ref(false);
    let isActiveTime = ref(false);
    let isActiveTime2 = ref(false);

    let todayDate = new Date();
    // Добавляем три года
    let futureDate = new Date(
      todayDate.getFullYear() + 3, // Увеличиваем год на 3
      todayDate.getMonth(),       // Сохраняем текущий месяц
      todayDate.getDate(),        // Сохраняем текущий день
      todayDate.getHours(),       // Сохраняем текущий час
      todayDate.getMinutes(),     // Сохраняем текущую минуту
      todayDate.getSeconds(),     // Сохраняем текущую секунду
      todayDate.getMilliseconds() // Сохраняем текущие миллисекунды
    );

    // Конечная дата
    let endDate = ref({
      day: todayDate.getDate(),
      month: todayDate.getMonth() + 1, // getMonth() возвращает индекс месяца с 0
      year: todayDate.getFullYear(),
      hours: todayDate.getHours(),
      minutes: todayDate.getMinutes(),
    });

    // Стартовая дата
    let startDate = ref({
      day: todayDate.getDate(),
      month: todayDate.getMonth() + 1, // getMonth() возвращает индекс месяца с 0
      year: todayDate.getFullYear(),
      hours: todayDate.getHours(),
      minutes: todayDate.getMinutes(),
    });

    const selectedDate = ref({
      day: todayDate.getDate(),
      month: todayDate.getMonth() + 1,
      year: todayDate.getFullYear(),
    });

    const selectedDate2 = ref({
      day: todayDate.getDate()+1,
      month: todayDate.getMonth()+1,
      year: todayDate.getFullYear(),
    });

    const activeDate = computed(() =>
      isActiveDate.value ? selectedDate.value : selectedDate2.value
    );

    const days = ref(Array.from({ length: 31 }, (_, i) => i + 1));
    const monthNames = [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
    ];

    const dayOfWeekNames = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
    const months = ref(Array.from({ length: 12 }, (_, i) => i + 1));
    const years = ref(
      Array.from({ length: 3 }, (_, i) => todayDate.getFullYear() + i)
    );

    const getDaysInMonth = (year, month) => {
      return new Date(year, month, 0).getDate();
    };

    const filteredDays = computed(() => {
      const daysInMonth = getDaysInMonth(selectedDate.value.year, selectedDate.value.month);
      return days.value.slice(0, daysInMonth);
    });

    watch(selectedDate, (newDate) => {
      const daysInMonth = getDaysInMonth(newDate.year, newDate.month);
      if (newDate.day > daysInMonth) {
        selectedDate.value.day = daysInMonth;
      }
    });

    const filteredMonths = computed(() => {
      if (selectedDate.value.year === todayDate.getFullYear()) {
        return months.value.slice(todayDate.getMonth());
      }
      return months.value;
    });

    const updateDay = (swiper) => {
      if (isActiveDate.value) {
        selectedDate.value.day = filteredDays.value[swiper.realIndex];
      }
      if (isActiveDate2.value) {
        selectedDate2.value.day = filteredDays.value[swiper.realIndex];
      }
    };

    const updateMonth = (swiper) => {
      if (isActiveDate.value) {
        selectedDate.value.month = filteredMonths.value[swiper.realIndex];
      }
      if (isActiveDate2.value) {
        selectedDate2.value.month = filteredMonths.value[swiper.realIndex];
      }
    };

    const updateYear = (swiper) => {
      if (isActiveDate.value) {
        selectedDate.value.year = years.value[swiper.realIndex];
      }
      if (isActiveDate2.value) {
        selectedDate2.value.year = years.value[swiper.realIndex];
      }
    };

    const getDayOfWeek = (year, month, day) => {
      const date = new Date(year, month - 1, day);
      return dayOfWeekNames[date.getDay()];
    };

    const selectedTime = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    });

    const selectedTime2 = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    });

    const activeTime = computed(() =>
      isActiveTime.value ? selectedTime.value : selectedTime2.value
    );

    const hours = ref(Array.from({ length: 24 }, (_, i) => i));
    const minutes = ref(Array.from({ length: 60 }, (_, i) => i));

    // Для добавления нуля перед цифрами
    const formatTime = (time) => {
      return time < 10 ? `0${time}` : `${time}`;
    };

    const updateHours = (swiper) => {
      if (isActiveTime.value) {
        selectedTime.value.hours = hours.value[swiper.realIndex];
      }
      if (isActiveTime2.value) {
        selectedTime2.value.hours = hours.value[swiper.realIndex];
      }
    };

    const updateMinutes = (swiper) => {
      if (isActiveTime.value) {
        selectedTime.value.minutes = minutes.value[swiper.realIndex];
      }
      if (isActiveTime2.value) {
        selectedTime2.value.minutes = minutes.value[swiper.realIndex];
      }
    };

    return {
      isActiveDate,
      isActiveDate2,
      isActiveTime,
      isActiveTime2,
      activeDate,
      selectedDate,
      selectedDate2,
      days,
      monthNames,
      months,
      years,
      filteredDays,
      filteredMonths,
      selectedTime,
      selectedTime2,
      activeTime,
      startDate,
      endDate,
      hours,
      minutes,
      formatTime,
      updateHours,
      updateMinutes,
      updateDay,
      updateMonth,
      updateYear,
      getDayOfWeek,
      getDaysInMonth,
    };
  },
};
</script>

<style scoped>
.title{
    font-size: var(--fs-20);
    text-align: center;
    padding-bottom: 2vw;
}


.price_line{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8vw 0vw 0vw 0vw;
}

.price_line span {
  font-size: var(--fs-14)
}

#local {
  width: 12vw;
  height: 1.2vw;
  font-size: var(--fs-14);
}

#cost{
    width: 7vw;
    height: 1.2vw;
    font-size: var(--fs-14);
}

.close_panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.button_yellow_border {
  border: 1px #FFC500 solid;
  color: black;
  cursor: pointer;
  align-content: center;
  border-radius: 0.3vw;
  padding: 0.2vw 1vw;
  margin: 2vw 0;
  text-decoration: underline;
  background-color: #FFDF71;
  font-size: 15px;
}

.arrow_right{
  width: 25px;
}

.container_center {
  display: flex;
  justify-content: center;
}

.summa_text {
  margin-right: 1vw;
}

.container_summa {
  font-size: var(--fs-20);
}

.container_place {
  display: flex;
  height: 2vw;
  align-items: center;
}

.place_img {
  width: 1vw;
}

.place_text {
  margin: 1vw;
  font-size: 15px;
  color: #d9d9d9;
}

.clock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.time-display {
  font-size: 2em;
  margin-bottom: 2vw;
}

.time,
.date {
  font-size: 15px;
  text-align: center;
}

.time {
  width: 100%;
  margin: 0 auto;
}

.start_date_time img{
  width: 25vw;
}

.end_date_time {
  width: 34%;
}

.time_select {
  background-color: #d9d9d9;
  border-radius: 1.5vw;
}

.container {
  width: 90%;
}

.block-flex {
  display: flex;
  justify-content: space-around;
}

.swiper-container {
  height: 17vw;
  width: 9vw;
}

.line_margin3 {
  margin: 0.5vw 0 1vw 0;
}

.line_margin2 {
  margin: 1.2vw 0 0.5vw 0;
}

.line_margin {
  margin: 0vw 0;
}

.grey-line {
  height: 1px;
  width: 100%;
  background-color: #d9d9d9;
}

.clock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.date-display {
  font-size: 2em;
  margin-bottom: 2vw;
}

.sliders {
  display: flex;
  justify-content: space-around;
  width: 20vw;
}

.swiper-container {
  height: 75px;
  width: max-content;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  color: #d9d9d9;
  font-weight: 500;
}

.swiper-slide-active {
  font-size: 14px;
  font-weight: 500;
  color: black;
}

.digitalCalendar {
  display: flex;
  padding: 1vw 2vw;
}

.swiper-el {
  width: 10vw;
  height: 100%;
  background-color: yellow;
}

.v-popup {
  position: fixed;
  z-index: 12;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100vw;
  height: 50vw;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0);
}

.razm {
  align-content: center;
  margin: 0 6px;
  font-size: 21px;
}

.center {
  width: 500px;
  padding-top: 20px;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: white;
  border: 1px solid black;
  box-shadow: 0vw 3px 12px rgba(0, 0, 0, 1);
}
</style>