const {createDriverInDB, searchTeamsInDB, searchNameSurname, searchTeamsIDInDB} = require('../utils/funcPost');
const teamsController = require('./getTeamsController');


const createDriverDB = async (name, surname, description, image, nationality, birthdate, teams) => {

    try{
        await teamsController();

        const teamsDB = await searchTeamsInDB(teams);
        const nameAndSurname = await searchNameSurname(name, surname);
        //console.log(nameAndSurname)
        if(nameAndSurname === 'si') {
            throw new Error(`Ya existe el Conductor ${name} ${surname} en la DB o en la API`);
        }
        if(teamsDB.length < 2){
            throw new Error(`Necesita mas de un equipo!!!`);
        }
        const teamsID = await searchTeamsIDInDB(teamsDB);
        //console.log(teams);
        //console.log(teamsDB.length);
        //console.log(teamsID);
        const driverCreate = await createDriverInDB(name, surname, description, image, nationality, birthdate, teamsID);

        return driverCreate;
        //return `vamos a crear el driver con ${name} ${surname} ${description} ${image} ${nationality} ${teamsDB}`
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }



};

module.exports = createDriverDB;