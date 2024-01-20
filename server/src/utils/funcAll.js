const {Op, Sequelize} = require('sequelize');
const axios = require('axios');
require('dotenv').config();
const {DRIVER_API, IMAG_LOGO_F1}  = process.env;
const {drivers} = require('../db');
const {getDriverByID} = require('./funID')


const getAllDriverDB = async () => {
    const allDriverDB = await drivers.findAll();
    const driverID = allDriverDB.map(driver => driver.id)
    const arrayDrivers = [];
    const detail = 'no';
    for(const id of driverID){
        try{
            const driverInfo = await getDriverByID(id, detail);
            arrayDrivers.push(driverInfo);
            //console.log(driverInfo)
        } catch (error) {
            console.error(`Error al obtener datos del driver con ID: ${id}: ${error.message}`)
        }
    }
    return arrayDrivers;
    //console.log(driverID)
};

const getAllDriverAPI = async () => {
    try{
        const infoApi = (await axios.get(`${DRIVER_API}`)).data;

        //console.log(infoApi);

        const arrayAPI = await infoCleaner(infoApi);
        //console.log(arrayAPI);
        return arrayAPI;

    } catch (error) {
        console.error(`Error al obtener datos del driver con ID: ${id}: ${error.message}`)
    }
};

const infoCleaner = async (arr) => {
    return arr.map((driver) => {
        //Colocamos una img default para los driver que no tienen!!!
        const imgDefault = IMAG_LOGO_F1;
        const imgDriver = driver.image.url;
        const imagenDriver = (imgDriver === '' || imgDriver === null) ? imgDefault : imgDriver ;
        //Caso que no tengan team les vamos a poner uno por default

        const teamsDefault = ['No Tiene', 'Equipo'];
        const teamsDriver = driver.teams;
        const drivTeam = (teamsDriver === undefined || teamsDriver === null) ? teamsDefault : teamsDriver.split(',');
        
        return {
            id:driver.id,
            name:driver.name.forename, 
            surname:driver.name.surname,
            image:imagenDriver,
            birthdate:driver.dob,
            team:drivTeam,
            created:false
        }
    })
}


module.exports = {getAllDriverDB, getAllDriverAPI};