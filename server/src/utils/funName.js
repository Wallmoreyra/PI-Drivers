require('dotenv').config();
const axios = require('axios');
const {Op, Sequelize} = require('sequelize');
const {drivers} = require('../db');
const {DRIVER_API}  = process.env;

const {getDriverByID, getDriverByIDAPI} = require('./funID');


const driverFromDB = async (name) => {
    const driverDB = await drivers.findAll({
        where:{
            [Op.or]: [
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')),{
                [Op.iLike]: `%${name.toLowerCase()}%`
            })    
            ]
        }
    });

    const driverID = driverDB.map(driver => driver.id);
    const arrayDriv = [];
    for(const id of driverID){
        try{
            const detail = 'no';
            const driverInfo = await getDriverByID(id, detail);
            arrayDriv.push(driverInfo);
            //console.log(driverInfo);
        } catch (error) {
            console.error(`Error al obtener datos del driver con ID: ${id}: ${error.message}`);
        }
    }
    //console.log(driverID);
    return arrayDriv;
};
const driverFromAPI = async (name) => {

    try{
        const arrayDriv = [];

        const infoApi = (await axios.get(`${DRIVER_API}`)).data;
        const infoFiltered = infoApi.map((driver) => {return {id:driver.id, name:driver.name.forename}})
        const driversIDS = infoFiltered.filter(driver => driver.name.toLowerCase().includes(name.toLowerCase()))

        //console.log(driversIDS.map(driver => driver.id));
        const idsDrivers = driversIDS.map(driver => driver.id);

        for(const id of idsDrivers){
            const detail = 'no';
            const driverInfo = await getDriverByIDAPI(id, detail);
            arrayDriv.push(driverInfo);
            //console.log(driverInfo);
        }
        //console.log(arrayDriv);
        
        return arrayDriv;

    } catch (error) {
        console.error(`Error al obtener datos del driver: ${name} de la API`)
    }
    //return name
};



module.exports = {driverFromDB, driverFromAPI}