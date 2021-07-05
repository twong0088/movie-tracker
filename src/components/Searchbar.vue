<template>
  <div id="searchbar">
    <input
      placeholder="Search.."
      v-model="searchTerm"
      lazy
    >
    <button
      id='clearForm'
      @click='clearForm'
    >
      clear
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Searchbar',
    data() {
      return {
        searchTerm: ''
      }
    },
    props: {
      setSearchTerm: Function
    },
    watch: {
      searchTerm: function(val) {
        // console.log(val);
        this.setSearchTerm(val);
      }
    },
    methods: {
      clearForm() {
        this.searchTerm = '';
      }
    }
  }
</script>

<style scoped>
  #searchbar {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  input {
    width: 400px;
    height: 25px;
    border-radius: 5%;
  }
  button {
    height: 31px;
    background-color: #21272d;
    color: #c9d1da;
    font-weight: bold;
    cursor: pointer;
  }

  button:hover {
    transition: 0.2s;
    background-color: #414d59;
  }

</style>