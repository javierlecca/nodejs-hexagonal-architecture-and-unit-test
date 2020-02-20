'use strict';

const apiServices = require('../controller/index');

const routers = (app) =>{
    app.use('/api/v1',apiServices);
};

module.exports = routers;