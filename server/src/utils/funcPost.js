require('dotenv').config();
const axios = require('axios');
const {DRIVER_API} = process.env;
const {drivers, teams} = require('../db');
const { Sequelize, Op } = require('sequelize');
const {teamsFromAPI} = require('./funcTeams');


const searchTeamsInDB = async (teamsPost) => {

    const teamsDriver = await teamsPost.split(',').map(item => item.trim());
    const teamsCont = await teams.count();
    if(teamsCont === 0){
        const teamsAPI = await teamsFromAPI();
        const lowerTeams = teamsDriver.map(element => element.toLowerCase());
        const teamsFiltered = teamsAPI.filter(item => lowerTeams.includes(item.toLowerCase()));
        
        return teamsFiltered;
    } else {
        const teamsDB = await teams.findAll({
            where: {
                name: {[Op.iLike]: {[Op.any]: teamsDriver}}
            }
        });
        //console.log(teamsCont)
        return teamsDB.map(team => team.name);

    }
}

const searchNameSurname = async (name, surname) => {
    const NySAPI = await searchInAPI(name, surname);
    const NySDB = await searchInDB(name, surname);
    //console.log(name + " " + surname)
    //console.log(NySAPI)
    //console.log(NySDB)
    if(NySAPI === true || NySDB === 'si'){
        //retorno si existe el conductor!!!
        return 'si'
    } else {
        return 'no'
    }
    
}

const searchInAPI = async (name, surname) => {
    //let findName = 'no';
    let namSurConcat = name + surname;

    const infoApi = (await axios.get(DRIVER_API)).data;

    //console.log(infoApi);
    const infoFiltered =  await nameAndSurnameFiltered(infoApi);
    //const comonInfo = infoFiltered.filter

    //console.log(infoFiltered.includes(namSurConcat.toLowerCase()));
    //return surnameFilted(infoApi);
    return infoFiltered.includes(namSurConcat.toLowerCase())
}

const nameAndSurnameFiltered = async (array) => {
    //primer filtro de extracion de los names y surname de cada driver de la api
    const array1 = array.map((drivers) => {
        return {
            name:drivers.name.forename + drivers.name.surname
        }
    });

    const array2 = [...new Set(array1.flatMap(driver => driver.name))];
    const array3 = array2.map(element => element.toLowerCase());
    return array3.sort()
}

const searchInDB = async (name, surname) => {
    const driver = await drivers.findOne({
        where: {
            name,
            surname,
        },
    });
    //console.log(name + " " + surname);
    //console.log(driver);
    return driver !== null ? 'si' : 'no';
}

const createDriverInDB = async (name, surname, description, image, nationality, birthdate, teamsDB) => {

    try {
        
        const driver = await drivers.create({
            name,
            surname,
            description,
            image,
            nationality,
            birthdate
        });
        
        driver.addTeams(teamsDB);

        //const teamsDriver = await driver.getTeams();
        //console.log(teamsDB);

        const driverAndTeams = {
            name:driver.name,
            surname:driver.surname,
            description:driver.description,
            image:driver.image,
            nationality:driver.nationality,
            birthdate:driver.birthdate,
            teams:teamsDB.map(team => team.name)
            
        }
        return driverAndTeams
    } catch (error) {
        throw new Error('Error al crear el Driver en la DB: ' + error.message);
    }
}

const searchTeamsIDInDB = async (teamsDB) => {
    //console.log(teamsDB)
    const teamIDS = await teams.findAll({
        where: {
            name: {[Op.iLike]: {[Op.any]: teamsDB}}
        }
    });
    //console.log(teamIDS)
    return teamIDS
}


module.exports = {createDriverInDB, searchTeamsInDB, searchNameSurname, searchTeamsIDInDB};