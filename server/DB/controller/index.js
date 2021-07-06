const pool = require('../model/index.js');

const getPersonalList = () => {
  console.log('pool method triggered');
  return pool.query(`SELECT * FROM movielist`);
};

const addToWatchList = (movie) => {
  let title = movie.Title.slice();
  title = title.replace("'","''");
  let plot = movie.Plot.slice();
  plot = plot.replace("'", "''");
  pool.query(`INSERT INTO movielist (title, release_year, imdbID, plot, poster, rating, movie_status) VALUES ('${title}', '${movie.Year}', '${movie.imdbID}', '${plot}', '${movie.Poster}', '${movie.imdbRating}', 'watchList') RETURNING imdbID`)
}

const addToSeen = (movieId) => {
  pool.query(`UPDATE movielist SET movie_status = 'seen' WHERE movielist.imdbID = '${movieId}' RETURNING imdbid`);
};

const rewatch = (movieId) => {
  pool.query(`UPDATE movielist SET movie_status = 'watchList' WHERE movielist.imdbID = '${movieId}' RETURNING imdbid`);
};

const removeFromLists = (movieId) => {
  pool.query(`DELETE FROM movielist WHERE movielist.imdbID = '${movieId}' RETURNING *`);
}


module.exports.getPersonalList = getPersonalList;
module.exports.addToWatchList = addToWatchList;
module.exports.addToSeen = addToSeen;
module.exports.rewatch = rewatch;
module.exports.removeFromLists = removeFromLists;