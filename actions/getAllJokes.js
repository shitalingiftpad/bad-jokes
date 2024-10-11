const { readJokesFromFile } = require('../utils/fileUtils');

/**
 * Retrieves all jokes from the jokes.txt file.
 * @returns {Promise<Array<string>>} - An array of jokes.
 * @throws {Error} - Throws an error if unable to read jokes.
 */
const getAllJokes = async () => {
    try {
        const jokes = await readJokesFromFile();
        return jokes;
    } catch (error) {
        console.error('Error fetching jokes:', error);
        throw new Error('Failed to load jokes.');
    }
};

module.exports = getAllJokes;
