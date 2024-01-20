const { Router } = require("express");
const driversRouter = require('./driversRouters');
const teamsRouter = require('./teamsRouters');

const router = Router();

//rutas de Drivers
router.use('/drivers', driversRouter);

//rutas de Teams
router.use('/teams', teamsRouter);

module.exports = router;
