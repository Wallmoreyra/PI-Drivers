const axios = require('axios');
const {getDriverByID, getDriverByIDAPI} = require('../utils/funID');

const getDriverByIDController = async (id, source) => {
    try{
        const detail = 'si';
        const driver = source === 'bdd'
            ?await getDriverByID(id, detail)
            :await getDriverByIDAPI(id)
        return driver;

    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};

module.exports = getDriverByIDController;