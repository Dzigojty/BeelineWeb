<template>
  <div class="v-popup">
    <div class="center">
      <div
        :class="{ active: category.active }"
        class="element"
        v-for="(category, index) in categories"
        :key="index"
        @click="SelectCategory(index)"
      >
        <samp> {{ category.name }}</samp>
        <img src="../../assets/arrow_right_category.svg" alt="" />
      </div>
    </div>
  </div>
  <div class="close_panel" @click="closeInfoPopup"></div>
</template>

<script>
export default {
  data() {
    return {
      isActive: true,
      categories: [
        { name: "Грузовики", active: false },
        { name: "Фургоны", active: false },
        { name: "Пикапы", active: false },
        { name: "Тягачи", active: false },
        { name: "Самосвалы", active: false },
        { name: "Автовозы", active: false },
        { name: "Рефрижераторы", active: false },
        { name: "Цистерны", active: false },
        { name: "Промышленные автомобили", active: false },
        { name: "Микроавтобусы", active: false },
      ],
    };
  },
  methods: {
    SelectCategory(index){
       this.categories.forEach((category, i) => {
        category.active = i === index;
      });
      this.$emit("changeRoute");
    },
    closeInfoPopup() {
      this.$emit("closePopup");
    },
  },
  setup() {},
};
</script>

<style scoped>
.element {
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
</style>