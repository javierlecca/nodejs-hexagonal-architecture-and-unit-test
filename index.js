'use strict';
const   config = require('config-yml'),
        server = require('./server');

server.listen(config.port);
console.log('Servidor escuchando en puerto ' + config.port);

server.on('error', err => {
    console.error(err);
});