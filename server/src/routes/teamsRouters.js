const { Router } = require('express');
const  teamsHandler  = require('../handlers/getTeamsHandler');

const teamsRouter = Router();

// peticion de GET
teamsRouter.get('/', teamsHandler);
// teamsRouter.get('/', (req, res) => {
//     res.status(200).send("Llegue al endpoint");
// });

module.exports = teamsRouter;