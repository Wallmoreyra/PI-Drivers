const createDriverDB = require('../controllers/postController');


const createDriverHandler = async (req, res) => {
    const {name, surname, description, image, nationality, birthdate, teams } = req.body;

    try {
        const response = await createDriverDB(name, surname, description, image, nationality, birthdate, teams);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports = createDriverHandler;