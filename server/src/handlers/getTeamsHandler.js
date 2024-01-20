const teamsController = require('../controllers/getTeamsController');

const teamsHandler = async(req, res) => {
    try {
        const teamsAPI = await teamsController();
        res.status(200).json(teamsAPI);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

module.exports = teamsHandler;