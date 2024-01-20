const { Router } = require('express');
const getAllHandler = require('../handlers/getAllDriversHandler');
const getByIDHandler = require('../handlers/getDriverIDHandler');
const getByNameHandler = require('../handlers/getDriverBiNameHendler');
const createDriverHandler = require('../handlers/postDriverHandler');


const driversRouter = Router();

//peticiones de GET
driversRouter.get('/', getAllHandler);
driversRouter.get('/idDriver/:id', getByIDHandler);
driversRouter.get('/name', getByNameHandler);

//peticion de POST
driversRouter.post('/', createDriverHandler)

module.exports = driversRouter;