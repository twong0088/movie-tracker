<template>
  <div id='sidebar'>
    <button
      value='home'
      :class='page==="home" ? "selected": "notSelected"'
      @click="handlePageChange"
    >
      Home
    </button>
    <button
      value='results'
      :class='page==="results" ? "selected": "notSelected"'
      @click="handlePageChange"
    >
      Search Results
    </button>
    <button
      value='watchList'
      :class='page==="watchList" ? "selected": "notSelected"'
      @click="handlePageChange"
    >
      Watch List
    </button>
    <button
      value='seen'
      :class='page==="seen" ? "selected": "notSelected"'
      @click="handlePageChange"
    >
      Seen
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Sidebar',
    props: {
      page: String,
      changePage: Function
    },
    methods: {
      handlePageChange(e) {
        this.changePage(e.target.value);
      }
    }
  }
</script>

<style scoped>
  #sidebar{
    display: flex;
    flex-direction: column;
    height: 98.5vh;
  }
  button {
    background-color: Transparent;
    background-repeat:no-repeat;
    color: #c9d1da;
    margin-bottom: 10px;
    font-size: 20px;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
    width: 250px;
  }
  button.selected {
    color: #58a6ff;
  }
  button:hover {
    text-decoration: underline;
  }
</style>