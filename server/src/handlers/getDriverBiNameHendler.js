const getDriverByNameController = require('../controllers/getNameController');

const getByNameHandler = async (req, res) => {
    const {name} = req.query;
    //const name = "Gato"
    try {
        const driverByName = await getDriverByNameController(name);
        res.status(200).json(driverByName);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports = getByNameHandler;