<template>
  <div class="search-field">
    <!-- <input
    class="header_panel_finder"
      type="text"
     
    /> -->
    <div class="input-fon">
        <input  v-model="query" @input="inputFinder" class="input-poisk" type="text">
        <button class="input-button" >Найти</button>
    </div>
    <ul v-if="filteredItems.length">
      <li @click="selectProduct(item)" v-for="item in filteredItems" :key="item.Ads_id">
        {{ item.Title }}
      </li>
    </ul>
  </div>
  <div v-if="filteredItems.length" class="close_panel" @click="closeInfoPopup()"></div>
</template>

<script>
import axios from 'axios';

export default {
  created() {
    console.log("this.items");
    console.log(this.items);
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      query: "",
      filteredItems: [],
    };
  },
  methods: {
    closeInfoPopup(){
      this.filteredItems = [];
    },
    selectProduct(product) {
      console.log('selectProduct Serch product.Ads_id');
      console.log(product.Ads_id);
      this.$emit("selectProduct", product.Ads_id);
    },
    async inputFinder(){
      console.log("inputFinder");
      this.filteredItems = [];

      if (this.query.trim() === "") {
        this.filteredItems = [];
      } else {
        console.log(this.query);
        try {
          const response = await axios.post('http://185.112.83.36:8080/searchForTech',
          {
            "Title": this.query,
          }, 
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
          );
          console.log(response);
          for (let index = 0; index < 5; index++) {
            console.log(response.data.data[index]);
            this.filteredItems.push({Ads_id: response.data.data[index].Ads_id, Title: response.data.data[index].Title});
          }

          console.log(this.filteredItems)
        } catch (error) {
          console.error('Ошибка при загрузке продуктов:', error);
        } 
      }
    },

    filterResults() {
      if (this.query.trim() === "") {
        this.filteredItems = [];
      } else {
        const queryLower = this.query.toLowerCase();
        this.filteredItems = this.items.filter((item) =>
          item.toLowerCase().includes(queryLower)
        );
      }
    },
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
  z-index: 1;
}

.search-field ul {
  z-index: 10;
}

.search-field {
  position: relative;
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
}

/* input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
} */

ul {
  position: absolute;
  border: 2px solid rgba(247, 202, 50, 1);
  margin: 0;
  width: 78%;
  background-color: white;
  top: 25px;
  left: 6px;
  padding: 0;
  list-style-type: none;
  border-radius: 0 0 5px 5px;
}

li {
  padding: 10px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}

.finder_button {
  cursor: pointer;
  position: absolute;
  border-radius: 0.5vw;
  padding: 0.2vw 1vw;
  font-size: var(--fs-20);
  font-weight: 100;
  width: min-content;
  border: solid 0.1vw #5b3700;
  box-sizing: border-box;
  align-self: center;
  right: -5px;
  background-color: #ffc500;
}

.header_panel_finder {
  display: block;
  position: relative;
  border: solid 1px #5b3700;
  width: 31vw;
  height: calc(0.056 * 31vw);
  display: flex;
  border-radius: 0.5vw;
  padding: 0.3vw 0;
  background-color: #f7ead6;
}

@media (max-width: 768px)  {
  .search-field {
    position: relative;
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
  }

  .input-button {
    box-sizing: border-box;
    background-color: rgba(247, 202, 50, 1);
    border: none;
    width: 56px;
    height: 20px;
    transition: all 500ms;
    font-family: "NotoSans";
    font-weight: 400;
    font-size: 12px;
  }
}
</style>