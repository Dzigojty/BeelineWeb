<template>
  <div class="v-popup-change-deal">
    <v-popup-text-owner v-if="textPopupOwner" @closePopup="closeMinPopup" />
    <div class="center">
      <div class="popup-header">
        <img src="../../assets/close.png" @click="closeInfoPopup" alt="" />
      </div>
      <div class="padding">
        <div class="title">Изменить время аренды</div>
        <div class="time-block">
          <div class="end_date_time">
            <div class="date date-second-2" :class="{ time_select: isActiveDate }" @click="changeActiveDate()">
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
                  selectedDate.year,
                  selectedDate.month,
                  selectedDate.day
                )
              }}, {{ selectedDate.day }}
              {{ monthNames[selectedDate.month - 1] }}
            </div>
            <div :class="{ time_select: isActiveTime2 }"  @click="changeActiveTime2()" class="time">
              {{ formatTime(selectedTime.hours) }} :
              {{ formatTime(selectedTime.minutes) }}
            </div>
          </div>
        </div>
        <!-- <div class="time-block-edit" v-if="edit">
          <div class="block-flex">
          <div class="end_date_time" @click="changeActive()">
            <div class="date">
              {{
                getDayOfWeek(
                  selectedDate.year,
                  selectedDate.month,
                  selectedDate.day
                )
              }}, {{ selectedDate.day }}
              {{ monthNames[selectedDate.month - 1] }}
            </div>
            <div :class="{ time_select: !isActive }" class="time">
              {{ formatTime(selectedTime.hours) }} :
              {{ formatTime(selectedTime.minutes) }}
            </div>
          </div>
          <img class="arrow_right" src="../../assets/arrow_right.svg" alt="" />
          <div class="end_date_time" @click="changeActive()">
            <div class="date">
              {{
                getDayOfWeek(
                  selectedDate.year,
                  selectedDate.month,
                  selectedDate.day
                )
              }}, {{ selectedDate.day }}
              {{ monthNames[selectedDate.month - 1] }}
            </div>
            <div :class="{ time_select: isActive }" class="time">
              {{ formatTime(selectedTime.hours) }} :
              {{ formatTime(selectedTime.minutes) }}
            </div>
          </div>
        </div> -->
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
        </div>
        <div class="line-grey"></div>
        <div class="finaly_price-block">
          <samp class="finaly_text">Итоговая стоимость:</samp>
          <samp class="price">{{ total }} ₽</samp>
          <samp class="finaly_price">+ {{ totalEdit }} ₽</samp>
        </div>
        <div class="button-block">
          <button class="yellow_button" @click="closeInfoPopup">
            Запросить
          </button>
          <a class="link" @click="changeEdit">Редактировать</a>
        </div>
        <div class="button-block" v-if="edit">
          <button class="yellow_button link" @click="changeEdit">
            Ок
          </button>
        </div>
      </div>
    </div>
    <div class="close_panel" @click="closeInfoPopup()"></div>
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
      totalEdit: 0,
      total: 0,
      hourlyRate: 10000, // Стоимость за час
      dailyRate: 0, // Стоимость за день
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

    async adTotal() {
      try {
        // Выполняем запрос
        const response = await axios.post(
          "http://localhost:8080/printAds",
          {
            Ads_id: 2
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            // withCredentials: true,
          }
        );

        console.log(response);

        if (response.data.status === "fatal") {
          console.error("Error openChat status:fatal");
          return;
        }

        this.hourlyRate = response.Hourly_rate;

      } catch (error) {
        console.error("Ошибка при регистрации заказа:", error);
      }
    }
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
            "http://localhost:8080/regOrderHourly",
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
            "http://localhost:8080/regOrderDaily",
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
.close_panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.button_yellow_border {
  border: 1px #f8cb32 solid;
  color: #f8cb32;
  align-content: center;
  border-radius: 1vw;
  cursor: pointer;
  padding: 0.6vw 3vw;
  margin: 4vw 0;
}

.arrow_right{
  width: 2vw;
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
  display: flex;
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
  font-size: var(--fs-15);
  color: #d9d9d9;
}

.clock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vw;
}

.time-display {
  font-size: 2em;
  margin-bottom: 2vw;
}

.time,
.date {
  font-size: var(--fs-25);
  text-align: center;
}

.time {
  width: 8vw;
  margin: 0 auto;
}

.start_date_time img{
  width: 25vw;
}

.end_date_time {
  width: 15vw;
}

.time_select {
  background-color: #d9d9d9;
  border-radius: 1.5vw;
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
  margin: 0.5vw 0;
}

.grey-line-1 {
  height: 1px;
  background-color: black;
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
  margin-top: 1vw;
}

.date-display {
  font-size: 2em;
  margin-bottom: 2vw;
}

.sliders {
  display: flex;
  justify-content: space-around;
  width: 35vw;
}

.swiper-container {
  height: 7vw;
  width: max-content;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--fs-20);
  cursor: pointer;
  color: #d9d9d9;
  font-weight: 500;
}

.swiper-slide-active {
  font-size: var(--fs-20);
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

.razm {
  align-content: center;
  margin: 0 0.6vw;
  font-size: var(--fs-30);
}


.finaly_price {
  color: #009a0f;
  margin-left: 1vw;
}

.price {
  margin-left: 0.4vw;
}

.finaly_price-block {
  text-align: center;
  margin-top: 0.5vw;
}

.time-title {
  color: #0000008f;
}

.end_date_time {
  align-content: end;
}

.arrow_right {
  width: 1.8vw;
}

.time {
  margin-top: 1.8vw;
}

.green-text {
  color: #009a0f;
}

.red-text {
  color: #d34242;
}

.time-block-edit {
  margin-top: 2vw;
  justify-content: space-around;
}

.time-block {
  display: flex;
  margin-top: 2vw;
  justify-content: space-around;
}

.yellow_button {
  height: 3vw;
  cursor: pointer;
  width: 9.5vw;
  margin-right: 2vw;
  font-size: var(--fs-20);
  background-color: #ffdb5f;
  border-radius: 0.4vw;
  border: 1px #5b3700 solid;
}

.button-block {
  display: flex;
  cursor: pointer;
  justify-content: space-evenly;
  padding: 0 10vw;
  margin-top: 2vw;
}

.date {
  margin-top: 0.5vw;
}

.date-second {
  color: #0000008f;
}

.up-line {
  height: 9vw;
  width: 1px;
  background-color: #949494;
  margin: 0 2vw;
}

.center-block {
  align-content: center;
  margin-bottom: 1vw;
  align-items: center;
}

.user img {
  display: block;
  width: 4vw;
  align-self: center;
  height: 4vw;
  margin: 0 auto;
  border-radius: 50%;
}

.user {
  width: 10vw;
  align-content: center;
  align-items: center;
  align-self: center;
}

.user .name {
  text-align: center;
  background-color: #f9cc33;
  border: 1px #5b3700 solid;
  font-size: var(--fs-20);
  font-weight: 200;
  padding: 1vw;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 0.8vw;
}

.padding {
  padding: 1vw 1.5vw;
}

.users {
  display: flex;
  justify-content: center;
}

.popup-header {
  display: flex;
  justify-content: end;
  margin-bottom: 0.2vw;
}

.popup-header img {
  width: 2vw;
  height: 2vw;
}

.line-grey{
  height: 1px;
  background-color: black;
  margin-top: 2vw;
}

.link {
  font-size: var(--fs-20);
  text-decoration: underline;
  align-content: center;
}

.title {
  text-align: center;
  font-size: var(--fs-30);
}

.grey-min-text {
  font-size: var(--fs-15);
  color: #929292;
  margin-bottom: 1vw;
}

#desc::placeholder {
  font-size: var(--fs-20);
  color: #959595;
}

#desc {
  font-size: var(--fs-20);
  background-color: #e0e0e0;
  border-radius: 1.2vw;
  padding: 1vw;
  margin-top: 1.2vw;
  margin-bottom: 0.2vw;
}

.center {
  width: 44vw;
  padding: 2vw;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 1.5vw;
  background-color: white;
  border: 0.1vw solid black;
  box-shadow: 0vw 0.6vw 12px rgba(0, 0, 0, 1);
}

.v-popup-change-deal {
  position: fixed;
  z-index: 11;
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
</style>