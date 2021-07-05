DROP DATABASE IF EXISTS movies;

CREATE DATABASE movies;
-- USE suggestions;
\c movie;

-- FOR FUTURE USE (AUTHENTICATION PURPOSES)
-- CREATE TABLE userlist (
--   id SERIAL GENERATED ALWAYS AS IDENTITY,
--   user VARCHAR(50),
--   password SERIAL,
--   PRIMARY KEY(id),
-- );
CREATE TABLE movielist (
  id SERIAL GENERATED ALWAYS AS IDENTITY,
  -- userid SERIAL REFERENCES userlist(id),
  title VARCHAR(50),
  release_year VARCHAR(50),
  imdbID VARCHAR(20),
  poster VARCHAR(100),
  plot VARCHAR(255),
  rating VARCHAR(10),
  movie_status VARCHAR(10),
  PRIMARY KEY(id)
);