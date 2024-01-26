require('dotenv').config();
const axios = require('axios');
const { drivers, teams } = require('../db');
const {DRIVER_API_ID, IMAG_LOGO_F1}  = process.env;


const getDriverByID = async (id, detail) => {
    const driv = await drivers.findByPk(id, {
        include: teams.name,
    });

    if (driv === '' || driv === null) {
        throw new Error('No se encontro el driver con esa ID en la DB!!!');
    }

    const teamsWhitDriver = (await driv.getTeams()).map(team => team.name);
    if (detail === 'si') {
        return driverAndTeam = {
            id:driv.id,
            name:driv.name,
            surname:driv.surname,
            description:driv.description,
            image:driv.image,
            nationality:driv.nationality,
            birthdate:driv.birthdate,
            teams:teamsWhitDriver,
        }
    } return drivAndTeam = {
            id:driv.id,
            name:driv.name,
            surname:driv.surname,
            image:driv.image,
            birthdate:driv.birthdate,
            teams:teamsWhitDriver,
    };
    //console.log(driv)
    //console.log(teamsWhitDriver)
}

const getDriverByIDAPI = async (id, detail) => {
    //console.log(detail)
    try{
        const infoAPI = (await axios.get(`${DRIVER_API_ID}${id}`)).data;

        const driverInfo = (detail === 'no') ? infoCleanerAPI2(infoAPI) : infoCleanerAPI(infoAPI);
        // console.log(id)
        // console.log(infoAPI)
        //console.log(driverInfo)
        
        return driverInfo

    } catch (error) {
        const notFound = new Error(`Error al obtener datos del driver de id: ${id}`);
        notFound.status = 400;
        throw notFound;
    }
}

const infoCleanerAPI = (info) => {

    //Colocamos una img default para los driver que no tienen!!!
    const imgDefault = IMAG_LOGO_F1;
    const imgDriver = info.image.url;
    const imagenDriver = (imgDriver === '' || imgDriver === null) ? imgDefault : imgDriver ;
    //Caso que no tengan team les vamos a poner uno por default
    const teamsDefault = ['No Tiene', 'Equipo'];
    const teamsDriver = info.teams.split(/,\s*/)
    const driverTeams = (teamsDriver.length >= 1) ? teamsDriver : teamsDefault;

    return {
        id:info.id,
        name:info.name.forename,
        surname:info.name.surname,
        description:info.description,
        image:imagenDriver,
        nationality:info.nationality,
        birthdate:info.dob,
        teams:driverTeams,
        create: false

    }
}
const infoCleanerAPI2 = (info) => {

    //Colocamos una img default para los driver que no tienen!!!
    const imgDefault = IMAG_LOGO_F1;
    const imgDriver = info.image.url;
    const imagenDriver = (imgDriver === '' || imgDriver === null) ? imgDefault : imgDriver ;
    //Caso que no tengan team les vamos a poner uno por default
    const teamsDefault = ['No Tiene', 'Equipo'];
    const teamsDriver = info.teams.split(',')
    const driverTeams = (teamsDriver.length >= 1) ? teamsDriver : teamsDefault;

    return {
        id:info.id,
        name:info.name.forename,
        surname:info.name.surname,
        image:imagenDriver,
        birthdate:info.dob,
        teams:driverTeams,
        create: false

    }
}

module.exports = {getDriverByID, getDriverByIDAPI}