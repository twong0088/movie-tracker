<template>
  <div id="display">
    <div id='card' v-for='movie in movies' :key='movie.name'>
      <img :src='movie.Poster'/>
      <h1>{{movie.Title}}</h1>
      <div>score: {{movie.Rated === 'N/A' ? 'Score unavailable' : movie.Rated}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Display',
  props: {
    movies: Array,
    page: String
  }
}
</script>

<style>
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
  }
</style>
