const { readJokesFromFile, updateJokesFile, logUpdateHistory } = require('../utils/fileUtils');

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

// GET a specific joke by ID
const getJokeById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const jokes = await readJokesFromFile();
        if (isNaN(id) || id < 0 || id >= jokes.length) {
            return res.status(404).json({ message: 'Joke not found.' });
        }
        const joke = jokes[id];
        res.json({ joke });
    } catch (error) {
        console.error('Error fetching joke:', error);
        res.status(500).json({ message: 'Failed to fetch joke.' });
    }
};

const updateJokeById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { joke } = req.body;
    try {
        const jokes = await readJokesFromFile();
        if (isNaN(id) || id < 0 || id >= jokes.length) {
            return res.status(404).json({ message: 'Joke not found.' });
        }

        if (!joke || typeof joke !== 'string' || joke.trim() === '') {
            return res.status(400).json({ message: 'Invalid joke content.' });
        }
        jokes[id] = joke.trim();
        await updateJokesFile(jokes);
        const ip = req.ip || req.connection.remoteAddress || 'Unknown IP';
        const updateInfo = {
            id,
            updatedJoke: joke.trim(),
            ip,
            timestamp: new Date().toISOString()
        };
        await logUpdateHistory(updateInfo);
        res.json({ message: 'Joke updated successfully.' });
    } catch (error) {
        console.error('Error updating joke:', error);
        res.status(500).json({ message: 'Failed to update joke.' });
    }
};

module.exports = {
    getAllJokes,
    deleteJoke,
    getJokeById,
    updateJokeById,
};
