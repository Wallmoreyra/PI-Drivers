const {teamsFromAPI, teamsEnDB, teamsFromDB} = require('../utils/funcTeams');

let teamsAgregados = null;

const teamsController = async() => {
    try {
        //Cuando la base de datos este vacia el primer array es de la api
        if(teamsAgregados === null){
            const teams = await teamsFromAPI();
            await teamsEnDB(teams);
            teamsAgregados = teams;
            return teams;
        }else {
            //el segundo array ya viene directo de la base de datos!!!
            return teamsFromDB();
        }
        

    } catch (error) {
        throw new Error('Error al pedir los Teams!!!');
    }
} 

module.exports = teamsController;