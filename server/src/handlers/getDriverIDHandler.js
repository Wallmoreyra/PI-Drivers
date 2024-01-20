const getDriverByIDController = require('../controllers/getIDController');

const getByIDHandler = async (req, res) => {
    const {id} = req.params;

    try {
        const source = isNaN(id) ? "bdd" : "api";
        const response = await getDriverByIDController(id, source);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports = getByIDHandler;