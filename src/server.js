// import module module yg diperlukan 
const Hapi = require("@hapi/hapi");

// module routes 
const routes = require('./routes');

// method yg dijalankan untuk membuat server
const init = async () => {
    // buat server
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

    // panggil method route untuk mengakses route, jangan lupa import dulu 
    server.route(routes);

    // start server
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

// eksekusi method server
init();
