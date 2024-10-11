const { readJokesFromFile, updateJokesFile, logDeleteHistory } = require('../utils/fileUtils');

const deleteJoke = async (id, req) => {
    const jokes = await readJokesFromFile();
    if (id >= jokes.length) {
        throw new Error('Joke not found.');
    }
    const deletedJoke = jokes[id];
    jokes.splice(id, 1);
    await updateJokesFile(jokes);

    const ip = req.ip || req.connection.remoteAddress || 'Unknown IP';
    const deleteInfo = {
        id,
        deletedJoke,
        ip,
        timestamp: new Date().toISOString()
    };
    await logDeleteHistory(deleteInfo);
};

module.exports = deleteJoke;
