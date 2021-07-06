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
      <Display :movies="movies" :page="page" :reload="reload" :changeStatus="changeStatus"/>
    </div>
  </div>
</template>

<script>
  // import Vue from 'vue'
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
        personalList: [],
        searched: [],
      }
    },
    created() {
      this.onLoad();
    },
    methods: {
      changePage(page) {
        this.page = page;
        this.filterMovies();
      },
      filterMovies() {
        switch(this.page) {
          case 'home':
            this.movies = this.top10;
            break;
          case 'results':
              this.movies = this.searched;
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
      async onLoad() {
        await axios.get(`http://${window.location.hostname}:3000/top10`)
          .then(res => {
            this.top10 = res.data;
          })
          .then(() => {
            this.changePage('home');
          })
          .catch(err => {
            console.log(err);
          });

        await axios.get(`http://${window.location.hostname}:3000/personal-list`)
          .then(res => {
            const list = [];
            res.data.forEach(movie => {
              const obj = {
                Title: movie.title,
                Year: movie.release_year,
                imdbID: movie.imdbid,
                imdbRating: movie.rating,
                Plot: movie.plot,
                status: movie.movie_status,
                Poster: movie.poster
              }
              list.push(obj);
            })
            this.personalList = list;
          })
          .catch(err => {
            console.log(err);
          });
      },
      async searchMovie(title) {
        await axios.get(`http://${window.location.hostname}:3000/search/${title}`)
          .then(res => {
            this.searched = res.data;
            this.changePage('results');
          })
          .catch(err => {
            console.log(err);
          })
      },
      reload(movie) {
        this.personalList.splice(this.personalList.length, 0, movie);
        this.changePage(this.page);
      },
      changeStatus(movieid, status) {
        let idx;
        for (let i = 0; i < this.personalList.length; i++) {
          if (this.personalList[i].imdbID === movieid) {
            idx = i;
            break;
          }
        }
        const updatedEntry = {
          ...this.personalList[idx],
          status: status
        }
        this.personalList.splice(idx, 1, updatedEntry);
        this.changePage(this.page);
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
