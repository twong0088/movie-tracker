const pool = require('../model/index.js');

const getPersonalList = (callback) => {
  pool.query(`SELECT * FROM movielist`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

const addToWatchList = (movie, callback) => {
  pool.query(`SELECT * FROM movielist WHERE movielist.imdbID = ${movie.imdbID}`, (err, res) => {
    if (err) {
      pool.query(`INSERT INTO movielist(title, release_year, imdbID, poster, plot, rating, movie_status) VALUES (${movie.Title}, ${movie.Year}, ${movie.imdbID}, ${movie.Plot}, ${movie.Poster}, ${movie.imdbRating}, 'watchList')`, (err, res) => {
        if (err) {
          callback(err);
        } else {
          callback(null, res);
        }
      })
    } else {
      if (res.data[0].movie_status !== 'watchList') {
        pool.query(`UPDATE movielist SET movie_status = 'watchList' WHERE movielist.imdbID = ${movie.imdbID}`, (err, res) => {
          if (err) {
            callback(err);
          } else {
            callback(null, res);
          }
        })
      }
      callback(null, res);
    }
  });
}

const addToSeen = (movieId, callback) => {
  pool.query(`UPDATE movielist SET movie_status = 'seen' WHERE movielist.imdbID = ${movieId}`, (err) => {
    if (err) {
      callback(err);
    }
  });
};

const rewatch = (movieId, callback) => {
  pool.query(`UPDATE movielist SET movie_status = 'watchList' WHERE movielist.imdbID = ${movieId}`, (err) => {
    if (err) {
      callback(err);
    }
  });
};

const removeFromLists = (movieId, callback) => {
  pool.query(`DELETE FROM movielist WHERE movielist.imdbID = ${movieId}`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
}


module.exports.getPersonalList = getPersonalList;
module.exports.addToWatchList = addToWatchList;
module.exports.addToSeen = addToSeen;
module.exports.rewatch = rewatch;
module.exports.removeFromLists = removeFromLists;