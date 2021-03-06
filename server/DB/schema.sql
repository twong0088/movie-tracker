DROP DATABASE IF EXISTS movies;

CREATE DATABASE movies;
-- USE suggestions;
\c movies;

-- FOR FUTURE USE (AUTHENTICATION PURPOSES)
-- CREATE TABLE userlist (
--   id SERIAL GENERATED ALWAYS AS IDENTITY,
--   user VARCHAR(50),
--   password SERIAL,
--   PRIMARY KEY(id),
-- );
CREATE TABLE movielist (
  id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  -- userid SERIAL REFERENCES userlist(id),
  title VARCHAR(50),
  release_year VARCHAR(50),
  imdbID VARCHAR(20),
  poster TEXT,
  plot TEXT,
  rating VARCHAR(10),
  movie_status VARCHAR(10)
);