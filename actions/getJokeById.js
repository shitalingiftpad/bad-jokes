const { readJokesFromFile } = require('../utils/fileUtils');

/**
 * Retrieves a specific joke by its ID.
 * @param {number} id - The ID of the joke to retrieve.
 * @returns {Promise<string>} - The joke at the specified ID.
 * @throws {Error} - Throws an error if the joke is not found or if unable to read jokes.
 */
const getJokeById = async (id) => {
    try {
        const jokes = await readJokesFromFile();

        // Validate if the joke ID is within range
        if (isNaN(id) || id < 0 || id >= jokes.length) {
            throw new Error('Joke not found.');
        }

        return jokes[id];
    } catch (error) {
        console.error('Error fetching joke by ID:', error);
        throw new Error('Failed to fetch joke.');
    }
};

module.exports = getJokeById;
