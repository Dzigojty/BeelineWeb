<template>
  <div class="v-popup-change-deal">
    <v-popup-text-owner v-if="textPopupOwner" @closePopup="closeMinPopup" />
    <div class="center">
      <div class="popup-header">
        <img src="../../assets/close.png" @click="closeInfoPopup" alt="" />
      </div>
      <div class="padding">
        <div class="title">Изменить время аренды</div>
        <div class="time-block" v-if="!edit">
          <div class="end_date_time" @click="changeActive()">
            <div class="date date-second-2">
              {{
                getDayOfWeek(
                  selectedDate.year,
                  selectedDate.month,
                  selectedDate.day
                )
              }}, {{ selectedDate.day }}
              {{ monthNames[selectedDate.month - 1] }}
            </div>
            <div  class="time">
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
            <div class="time">
              {{ formatTime(selectedTime.hours) }} :
              {{ formatTime(selectedTime.minutes) }}
            </div>
          </div>
        </div>
        <div class="time-block-edit" v-if="edit">
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
        </div>
        </div>
        <div class="line-grey"></div>
        <div class="finaly_price-block">
          <samp class="finaly_text">Итоговая стоимость:</samp>
          <samp class="price">50 202 ₽</samp>
          <samp class="finaly_price">+ 500 ₽</samp>
        </div>
        <div class="button-block" v-if="!edit">
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
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

export default {
  data() {
    return {
        edit: false,
      startDate: this.startDate,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    changeEdit(){
        this.edit = !this.edit;
    },

    changeActive() {
      this.isActive = !this.isActive;
      console.log(this.isActive);
    },

    closeInfoPopup() {
      this.$emit("closePopup");
    },
  },
  setup() {
    let isActive = ref(true);

    let todayDate = new Date();
    //Конечная дата
    let endDate = ref({
      day: todayDate.getDate(),
      month: todayDate.getMonth() + 1, // getMonth() returns month index starting from 0
      year: todayDate.getFullYear(),
      hours: todayDate.getHours(),
      minutes: todayDate.getMinutes(),
    });
    //Стартовая дата
    let startDate = ref({
      day: todayDate.getDate(),
      month: todayDate.getMonth() + 1, // getMonth() returns month index starting from 0
      year: todayDate.getFullYear(),
      hours: todayDate.getHours(),
      minutes: todayDate.getMinutes(),
    });
    const selectedDate = ref({
      day: todayDate.getDate(),
      month: todayDate.getMonth() + 1, // getMonth() returns month index starting from 0
      year: todayDate.getFullYear(),
    });

    const days = ref(Array.from({ length: 31 }, (_, i) => i + 1));
    const monthNames = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
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
      const daysInMonth = getDaysInMonth(
        selectedDate.value.year,
        selectedDate.value.month
      );
      return days.value.slice(0, daysInMonth);
    });

    watch(selectedDate, (newDate, oldDate) => {
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
      selectedDate.value.day = filteredDays.value[swiper.realIndex];
    };

    const updateMonth = (swiper) => {
      selectedDate.value.month = filteredMonths.value[swiper.realIndex];
    };

    const updateYear = (swiper) => {
      selectedDate.value.year = years.value[swiper.realIndex];
    };

    const getDayOfWeek = (year, month, day) => {
      const date = new Date(year, month - 1, day);
      return dayOfWeekNames[date.getDay()];
    };

    const selectedTime = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    });

    const hours = ref(Array.from({ length: 24 }, (_, i) => i));
    const minutes = ref(Array.from({ length: 60 }, (_, i) => i));

    //Для добавления нуля перед цифрами
    const formatTime = (time) => {
      return time < 10 ? `0${time}` : `${time}`;
    };

    const updateHours = (swiper) => {
      selectedTime.value.hours = hours.value[swiper.realIndex];
    };

    const updateMinutes = (swiper) => {
      selectedTime.value.minutes = minutes.value[swiper.realIndex];
    };

    return {
      isActive,
      selectedDate,
      days,
      monthNames,
      months,
      years,
      filteredDays,
      filteredMonths,
      selectedTime,
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
}

.v-popup-change-deal {
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
</style>