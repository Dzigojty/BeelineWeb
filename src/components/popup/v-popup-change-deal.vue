<template>
  <div class="v-popup-change-deal">
    <v-popup-text-owner  v-if="textPopupOwner" @closePopup="closeMinPopup"/>
    <div class="center">
      <div class="popup-header">
        <img src="../../assets/info.png"  @click="showTextPopupOwner"  alt="" />
        <samp class="link">Отложить.</samp>
      </div>
      <div class="padding">
        <div class="title">Чью сторону принимает медиатор?</div>
          <div class="time-block">
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
            <img
              class="arrow_right"
              src="../../assets/arrow_right.svg"
              alt=""
            />
            <div class="end_date_time" @click="changeActive()">
              <div class="time-title">Было:</div>
              <div class="date date-second">
                {{
                  getDayOfWeek(
                    selectedDate.year,
                    selectedDate.month,
                    selectedDate.day
                  )
                }}, {{ selectedDate.day }}
                {{ monthNames[selectedDate.month - 1] }}
              </div>
              <div :class="{ time_select: isActive }" class="time red-text">
                {{ formatTime(selectedTime.hours) }} :
                {{ formatTime(selectedTime.minutes) }}
              </div>
            </div>
            <img
              class="arrow_right"
              src="../../assets/arrow_right.svg"
              alt=""
            />
            <div class="end_date_time" @click="changeActive()">
              <div class="time-title">Стало:</div>
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
              <div :class="{ time_select: isActive }" class="time green-text">
                {{ formatTime(selectedTime.hours) }} :
                {{ formatTime(selectedTime.minutes) }}
              </div>
            </div>
          </div>
          <div class="finaly_price-block">
            <samp class="finaly_text">Итоговая стоимость:</samp>
            <samp class="price">50 202 ₽</samp>
            <samp class="finaly_price">+ 500 ₽</samp>
          </div>
          <div class="button-block">
            <button class="yellow_button" @click="closeInfoPopup">Да</button>
            <button class="yellow_button">Нет</button>
          </div>
      </div>
    </div>
    <div class="close_panel" @click="closeInfoPopup()"></div>
  </div>
</template>

<script>
import { ref, computed} from "vue";
import vPopupTextOwner from "./v-popup-text-owner.vue";

export default {
  data() {
    return {
      textPopupOwner: false,
    };
  },
  components: {
    vPopupTextOwner,
  },
  methods: {
    closeInfoPopup() {
      this.$emit("closePopup");
    },
    showTextPopupOwner() {
      this.textPopupOwner = true;
    },
    closeMinPopup() {
      this.textPopupOwner = false;
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
.finaly_price{
  color: #009A0F;
  margin-left: 1vw;
}

.price{
  margin-left: 0.4vw;
}


.finaly_price-block{
  text-align: center;
  margin-top: 3vw;
}

.time-title{
  color: #0000008f;
}

.end_date_time{
  align-content: end;
}

.time{
  margin-top: 0.5vw;
}

.green-text{
  color: #009A0F;
}

.red-text{
  color: #D34242;
}

.time-block {
  display: flex;
  margin-top: 2vw;
  justify-content: space-around;
}

.yellow_button{
  height: 3vw;
  width: 8vw;
  font-size: var(--fs-15);
  background-color: #f9cc33;
  border-radius: 0.4vw;
  border: 1px #5B3700 solid;
}

.button-block{
  display: flex;
  justify-content: space-evenly;
  padding: 0 10vw;
  margin-top: 2vw;
}

.date{
  margin-top: 0.5vw;
}

.date-second{
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
  justify-content: space-between;
  margin-bottom: 0.5vw;
}

.popup-header img {
  width: 2vw;
  height: 2vw;
}

.link {
  font-size: var(--fs-20);
  text-decoration: underline;
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