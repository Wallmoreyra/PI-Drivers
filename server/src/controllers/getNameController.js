const axios = require('axios');
const {driverFromDB, driverFromAPI} = require('../utils/funName');

const getDriverByNameController = async (name) => {
    try {
        //const mensaje = `Aca vamos a retornar el driver de name: ${name}`;
        let driverByName = [];
        const arrayDriverDB = await driverFromDB(name);
        const arrayDriverAPI = await driverFromAPI(name);
        //console.log(arrayDriverDB)
        //console.log(arrayDriverAPI)

        driverByName = ([...arrayDriverDB, ...arrayDriverAPI]).slice(0, 15);

        if(driverByName.length === 0) {
            throw new Error(`No se encontro ningun Driver de nombre: ${name}`);
        }
        return driverByName;

    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};

module.exports = getDriverByNameController;