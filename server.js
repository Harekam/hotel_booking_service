/**
 * Created by harekam on 17/03/18.
 */
'use strict';
const Hapi = require('hapi'),
    { serverConfig, dbConfig } = require('./Configs'),
    Plugins = require('./Plugins'),
    Routes = require('./Routes'),
    mongoose = require('mongoose');
// mongoose.set('debug', true);
const { PORT } = serverConfig;
const { mongodbURI } = dbConfig;
const server = new Hapi.Server();

let connectionOptions = {
    port: PORT,
    routes: {
        cors: true
    }
};

server.connection(connectionOptions);

/**
 * Plugins
 */
server.register(Plugins, function (err) {
    if (err) {
        server.error('Error while loading Plugins : ' + err)
    } else {
        server.log('info', 'Plugins Loaded')
        _init();
    }

});

function _init() {

    // API Routes
    Routes.forEach(function (api) {
        server.route(api);
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            return reply('Welcome to Hotel Booking Service!');
        }
    });
    //Connect to MongoDB
    mongoose.connect(mongodbURI, (err) => {
        if (err) {
            server.log("DB Error: ", err);
            process.exit(1);
        } else {
            server.log('MongoDB Connected at', mongodbURI);
            startServer();
        }
    });
    // Start the server
    function startServer() {
        server.start((err) => {
            if (err) {
                throw err;
            }
            server.log('Server running at:', server.info.uri);
            server.log('Server running at env:', (process.env.NODE_ENV === 'production') ? 'prod env' : 'non prod env');

        });
    }
}