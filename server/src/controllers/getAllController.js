const {getAllDriverDB, getAllDriverAPI} = require('../utils/funcAll');

const getAllConstroller = async () => {
    try {
        let allDriver = [];

        const arrayDriverDB = await getAllDriverDB();
        //console.log(arrayDriverDB)
        const arrayDriverAPI = await getAllDriverAPI();
        //console.log(arrayDriverAPI)
        allDriver = ([...arrayDriverDB, ...arrayDriverAPI]);

        if(allDriver.length === 0){
            throw new Error('No se pudieron traer los Drivers!!!');
        }

        return allDriver;

    } catch (error) {
        throw new Error(`Error al tratar de buscar todos los drivers: ${error.message}`);
    }
    //return 'Va a retornar todos los drivers =)'
}

module.exports = getAllConstroller;