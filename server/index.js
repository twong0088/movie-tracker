/* eslint-disable no-unused-vars */
const Hapi = require('@hapi/hapi');
const axios = require('axios');
const { dummy } = require('./dummyData.js');
const psql = require('./DB/controller/index.js');

const init = async () => {

    const server = new Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
          cors: {
            origin: ["http://localhost:8080"],
            headers: ["Accept", "Content-Type"],
            additionalHeaders: ["X-Requested-With"]
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/search/{title}',
      handler: async(request, h) => {
        // console.log('title searched: ', request.params.title);
          const result = await axios.get(`http://www.omdbapi.com/?s=${request.params.title}&type=movie&page=1&apikey=55578ba5`);

          if (!result) {
            return null;
          } else {
            const results = [];
            const data = result.data.Search;

            for (let i = 0; i < data.length; i++) {
              const movieDetails = await axios.get(`http://www.omdbapi.com/?i=${data[i].imdbID}&apikey=55578ba5`);
              results.push(movieDetails.data)
            }
            return results;
          }
        }
    });

    server.route({
      method: 'GET',
      path: '/personal-list',
      handler: async(request, h) => {
        let result;
        try {
          result = await psql.getPersonalList()
        } catch(e) {
          console.log(e);
        }

        console.log('result: ', result.rows)
        return result.rows;
      }
    });

    server.route({
      method: 'GET',
      path: '/top10',
      handler: async(request, h) => {
        return dummy;
      }
    });

    server.route({
      method: 'POST',
      path: '/addtowatch',
      handler: async(request, h) => {
        let result;
        try {
          result = await psql.addToWatchList(request.payload);
        } catch(err) {
          console.log(err);
        }
        return result ? '201' : 'err';
        // psql.addToWatchList(request.body, (err) => {
        //   if (err) {
        //     return err;
        //   } else {
        //     return '201';
        //   }
        // })
      }
    })

    server.route({
      method: 'PUT',
      path: '/seen/{movieid}',
      handler: async(request, h) => {
        console.log(request.params.user, request.params.movieid);
        let result;
        try {
          result = psql.addToSeen(request.params.movieid);
        } catch(err) {
          console.log(err)
        }
        return result ? '200' : 'err'
      }
    })

    server.route({
      method: 'PUT',
      path: '/rewatch/{movieid}',
      handler: async(request, h) => {
        psql.rewatch(request.params.movieid, (err) => {
          if (err) {
            return err;
          } else {
            return '200';
          }
        });
      }
    })

    server.route({
      method: 'DELETE',
      path: '/remove/{movieid}',
      handler: async(request, h) => {
        psql.removeFromLists(request.params.movieid, (err) => {
          if (err) {
            return err;
          } else {
            return '200';
          }
        });
      }
    })

    await server.start();

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();