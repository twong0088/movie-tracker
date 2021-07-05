// const Path = require('path');
// const Hapi = require('@hapi/hapi');
// const Inert = require('@hapi/inert');                    // [1]
// const server = new Hapi.Server();
// server.connection({ port: 3000 });
// server.register(Inert, (err) => {                  // [2]
//   server.route({
//     method: 'GET',
//     path: '/{param*}',
//     handler: {                                     // [3]
//       directory: {                                 // [3]
//         path: Path.join(__dirname, 'public'),      // [3]
//         listing: true                              // [3]
//       }                                            // [3]
//     }                                              // [3]
//   });
//   server.start((err) => {
//     console.log(`Server running at: ${server.info.uri}`);
//   });
// });



const Hapi = require('@hapi/hapi');
const axios = require('axios');

const init = async () => {

    const server = new Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
          // files: {
          //     relativeTo: Path.join(__dirname, '../public/index.html')
          // }
          cors: {
            origin: ["http://localhost:8080"],
            headers: ["Accept", "Content-Type"],
            additionalHeaders: ["X-Requested-With"]
        }
      }
    });

    // console.log(Path.join(__dirname, '../dist'))
    // await server.register(Inert);

    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     handler: {
    //       directory: {
    //           path: Path.join(__dirname, '../public'),
    //           index: ['index.html', 'default.html']
    //       }
    //   }
    // });

    // server.route({
    //     method: 'GET',
    //     path: '/top10',
    //     handler: (request, h) => {
    //         axios.get(`http://www.omdbapi.com/?apikey=55578ba&`)
    //         return 'Hello World!';
    //     }
    // });

    server.route({
      method: 'GET',
      path: '/search/{title}',
      handler: async(request, h) => {
          const result = await axios.get(`http://www.omdbapi.com/?s=${request.params.title}&page=1&apikey=55578ba5`);

          if (!result) {
            return null;
          } else {
            return result.data;
          }
      }
  });

    await server.start();

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();