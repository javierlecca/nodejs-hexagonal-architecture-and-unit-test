'use strict';

const   express     = require('express'),
        router      = express.Router(),
        magic       = require('../util/magic'),
        users       = require('../domain/services/service-user');

console.log('[[ USERS ]]'); 
magic.LogInfo('[GET] = /users/')
magic.LogInfo('[GET] = /users/:id')
magic.LogSuccess('[POST] = /users/')
magic.LogWarning('[PATCH] = /users/:id')
magic.LogDanger('[DELETE] = /users/:id')

router.get('/users/', users.GetAll);
router.get('/users/:id', users.GetById);
router.post('/users/', users.Store);
router.delete('/users/:id', users.DeleteById);
router.patch('/users/:id', users.UpdateById);

module.exports = router;