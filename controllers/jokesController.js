const { readJokesFromFile } = require('../utils/fileUtils');

const getAllJokes = async (req, res) => {
    try {
        const jokes = await readJokesFromFile();
        res.json(jokes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to load jokes.' });
    }
};

module.exports = {
    getAllJokes,
};
