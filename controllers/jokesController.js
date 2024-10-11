const { readJokesFromFile, updateJokesFile } = require('../utils/fileUtils');

const getAllJokes = async (req, res) => {
    try {
        const jokes = await readJokesFromFile();
        res.json(jokes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to load jokes.' });
    }
};

const deleteJoke = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const jokes = await readJokesFromFile();
        if (isNaN(id) || id < 0 || id >= jokes.length) {
            return res.status(404).json({ message: 'Joke not found.' });
        }
        jokes.splice(id, 1);
        await updateJokesFile(jokes);
        res.json({ message: 'Joke deleted successfully.' });
    } catch (error) {
        console.error('Error deleting joke:', error);
        res.status(500).json({ message: 'Failed to delete joke.' });
    }
};

module.exports = {
    getAllJokes,
    deleteJoke,
};
