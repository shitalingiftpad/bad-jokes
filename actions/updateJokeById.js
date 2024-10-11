const { readJokesFromFile, updateJokesFile, logUpdateHistory } = require('../utils/fileUtils');


const updateJokeById = async (id, joke, req) => {
    const jokes = await readJokesFromFile();
    if (id >= jokes.length) {
        throw new Error('Joke not found.');
    }
    jokes[id] = joke;
    await updateJokesFile(jokes);

    const ip = req.ip || req.connection.remoteAddress || 'Unknown IP';
    const updateInfo = {
        id,
        updatedJoke: joke,
        ip,
        timestamp: new Date().toISOString()
    };
    await logUpdateHistory(updateInfo);
};

module.exports = updateJokeById;
