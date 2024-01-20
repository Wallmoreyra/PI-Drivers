const getAllConstroller = require('../controllers/getAllController');

const getAllHandler = async (req, res) => {
    try{
        const response = await getAllConstroller();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports = getAllHandler;