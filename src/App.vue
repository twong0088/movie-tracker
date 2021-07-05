<template>
  <div id='container'>
    <div id="header">
      <div id="title">
        Movie Tracker
      </div>
      <Searchbar :setSearchTerm="searchMovie"/>
    </div>
    <div id='body'>
      <Sidebar :page="page" :changePage="changePage"/>
      <Display :movies="movies" :page="page" />
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar';
  import Display from './components/Display';
  import Searchbar from './components/Searchbar';
  import axios from 'axios';
  export default {
    name: 'App',
    components: {
      Sidebar,
      Display,
      Searchbar
    },
    data() {
      return {
        movies: this.top10,
        page: 'home',
        top10: [],
        personalList: []
      }
    },
    methods: {
      changePage(page) {
        this.page = page;
        this.filterMovies();
      },
      filterMovies() {
        switch(this.page) {
          case 'home':
            if (this.searched.length === 0) {
              console.log('blank triggered', )
              this.movies = this.top10;
            } else {
              console.log('triggered');
              this.movies = this.searched;
              console.log('movie:', this.movie);
            }
            break;
          case 'favorites':
            this.movies = this.personalList.filter(movie => movie.favorite === true);
            break;
          case 'watchList':
            this.movies = this.personalList.filter(movie => movie.status === 'watchList');
            break;
          case 'seen':
            this.movies = this.personalList.filter(movie => movie.status === 'seen');
            break;
        }
      },
      // setSearchTerm(term) {
      //   console.log(term);
      //   this.searchMovie(term);
      // },
      async onLoad() {
        await axios.get(`http://${window.location.hostname}:3000/top10`)
          .then(res => {
            this.top10 = res.data;
          })
          .catch(err => {
            console.log(err);
          });

        await axios.get(`http://${window.location.hostname}:3000/personal-list`)
          .then(res => {
            this.personalList = res.data
          })
          .catch(err => {
            console.log(err);
          });
      },
      async searchMovie(title) {
        // axios.defaults.baseURL = 'http://api.openweathermap.org';
        await axios.get(`http://${window.location.hostname}:3000/search/${title}`)
          .then(res => {
            console.log('res.data:', res.data)
            this.searched = res.data.Search;
            this.changePage('home');
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #c9d1da;
  margin-top: 0px;
  margin-bottom: 0px;
  background-color: #0e1218;
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow:hidden;
}

#header {
  height: 60px;
  background-color: #21272d;
  display:flex;
  flex-direction: row;
  align-items: center;
}

#title {
  font-size: x-large;
  padding-left: 20px;
  font-weight: bolder;
}

#body {
  padding-top: 30px;
  display: flex;
  flex-direction: row;
}
</style>
