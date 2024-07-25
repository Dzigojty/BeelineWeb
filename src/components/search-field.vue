<template>
  <!-- <div class="search-field">
    
    
  </div> -->
  <div class="search-field">
    <input
    class="header_panel_finder"
      type="text"
      v-model="query"
      @input="filterResults"
    />
    <ul v-if="filteredItems.length">
      <li v-for="item in filteredItems" :key="item">{{ item }}</li>
    </ul>
    <div class="finder_button">Поиск</div>
  </div>
</template>

<script>
export default {
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
.search-field {
position: relative;
display: flex;
 margin-left: 2vw;
  margin-right: 2vw;
}

/* input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
} */

ul {
  position: absolute;
  border: 1px solid #ccc;
  margin: 0;
  width: 31.3vw;
  background-color: #ccc;
  top: 2.5vw;
  padding: 0;
  list-style-type: none;
  border-radius: 0 0 1vw 1vw;
}

li {
  padding: 10px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}

.finder_button {
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
</style>