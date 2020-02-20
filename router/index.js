'use strict';
const config = require('config-yml');
const apiServices = require('../controller/index');

const routers = (app) =>{
    app.use(`api/${config.versionApi}`,apiServices);
};

module.exports = routers;