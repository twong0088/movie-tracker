<template>
  <div id="display">
    <h2 v-if='page === "results" && movies.length === 0'>Type in movie name above to begin search</h2>
    <div id='card' v-for='movie in movies' :key='movie.Title'>
      <div id='card-inner'>
        <div id='card-front'>
          <img
            :src='movie.Poster === "N/A" ?
              "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" : movie.Poster'
          />
        </div>
        <div id="card-back">
          <h2>{{movie.Title}} ({{movie.Year}})</h2>
          <p>Rating: {{movie.imdbRating}}</p>
          <p>{{movie.Plot}}</p>
          <button
            v-if='page==="results"'
            @click='() => {addToWatchList(movie)}'
          >
            Add to watch list
          </button>
          <button
            v-if='page==="watchList"'
            @click='() => {addToSeen(movie.imdbID)}'
          >
            Add to seen
          </button>
          <button
            v-if='page==="watchList"'
            @click='() => {remove(movie.imdbID)}'
          >
            Remove from watch list
          </button>
          <button
            v-if='page==="seen"'
            @click='() => {rewatch(movie.imdbID)}'
          >
            Rewatch movie
          </button>
        </div>
      </div>
      <!-- <h1>{{movie.Title}}</h1>
      <div>score: {{movie.Rated === 'N/A' ? 'Score unavailable' : movie.Rated}}</div> -->
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Display',
    props: {
      movies: Array,
      page: String,
      reload: Function,
      changeStatus: Function
    },
    methods: {
      async addToWatchList(movie) {
        await axios.post(`http://${window.location.hostname}:3000/addtowatch`, movie)
          .then(() => {
            console.log('success')
            const watchListEntry = {...movie, status: "watchList"};
            this.reload(watchListEntry);
          })
          .catch((err) => {console.log(err)});
      },
      async addToSeen(movieid) {
        await axios.put(`http://${window.location.hostname}:3000/seen/${movieid}`)
          .then(() => {
            console.log('success')
            this.changeStatus(movieid, 'seen');
          })
          .catch((err) => {console.log(err)});
      },
      async remove(movieid) {
        await axios.delete(`http://${window.location.hostname}:3000/remove/${movieid}`)
          .then(() => {
            console.log('success')
            this.changeStatus(movieid, null);
          })
          .catch((err) => {console.log(err)});
      },
      async rewatch(movieid) {
        await axios.put(`http://${window.location.hostname}:3000/rewatch/${movieid}`)
          .then(() => {
            console.log('success')
            this.changeStatus(movieid, 'watchList');
          })
          .catch((err) => {console.log(err)});
      }

    }
  }
</script>

<style scoped>
  /* Display {
    overflow: scroll;
  } */
  #display {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 89vh;
    overflow: scroll;
    align-content: flex-start;
    width: 100%;
  }
  #card {
    border: 1px solid #c9d1da;
    border-radius: 5%;
    margin: 15px;
    margin-top: 0px;
    width: 300px;
    height: 350px;
    overflow: hidden;
    perspective: 1000px;
  }

  #card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  #card:hover #card-inner {
    transform: rotateY(180deg);
  }

  #card-front, #card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }

  #card-back {
    transform: rotateY(180deg);
    -webkit-transform:rotateY(180deg);
    -moz-transform:rotateY(180deg);
    -o-transform:rotateY(180deg);
    -ms-transform:rotateY(180deg);
  }

  button {
    height: 31px;
    background-color: #21272d;
    color: #c9d1da;
    font-weight: bold;
    cursor: pointer;
    margin-left: 5px;
  }

  button:hover {
    transition: 0.2s;
    background-color: #414d59;
  }
</style>
