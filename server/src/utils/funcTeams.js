require('dotenv').config();
const {DRIVER_API} = process.env;
const axios = require('axios');
const {teams} = require('../db');


//Funcion para obtener los datos desde la API!!!
const teamsFromAPI = async () => {
    const infoApi = (await axios.get(DRIVER_API)).data;
    //console.log(infoApi);
    return teamsFiltered(infoApi);
};

//Filtrado de los datos obtenidos desde la API!!!
const teamsFiltered = (arr) => {
    
    //primer filtro de extracion de los teams de cada driver de la api
    const arrayF1 = arr.map((driver) => {
        return {
            team:driver.teams
        }
    });
    
    //segundo filtro extrtaccion objetos vacios o null
    const arrayF2 = arrayF1.filter((item) => item.team !== undefined && item.team !== null);
    
    //ultimo filtro sacando repetidos y devolviendo un array con todos los equipos
    const arrayF3 = [...new Set(arrayF2.flatMap(driver => driver.team.split(',').map(component => component.trim())))];
    
    //retornamos un array con todos los equipos de la API ordenados
    return arrayF3.sort();
}

//Funcion para guardar los Teams en la base de datos!!!
const teamsEnDB = async (array) => {
    for (const item of array) {
        try {
            // comprobar si los teams ya existen en la DB
            const teamExist = await teams.findOne({ where: {name: item}});

            if (!teamExist) {
                // si no existe se crea
                const team = await teams.create({name: item});
            } else {
                console.error(`El team de nombre: ${item} ya existe!!!`);
            }
        } catch (error) {
            console.error(`Error al tratar de guardar los nombres`, error);
        }
    }
    // console.log(array)
    // return 'hola DB'
};

//Funcion para obtener los teams desde la base de datos!!!
const teamsFromDB = async () => {
    const allTeamsDB = await teams.findAll();
    return allTeamsDB.map(item => item.name);
}

module.exports = {teamsFromAPI, teamsEnDB, teamsFromDB}

