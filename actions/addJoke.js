const { readJokesFromFile, updateJokesFile, logStoreHistory } = require('../utils/fileUtils');

const addJoke = async (joke, req) => {
    const jokes = await readJokesFromFile();
    jokes.push(joke);
    await updateJokesFile(jokes);

    const ip = req.ip || req.connection.remoteAddress || 'Unknown IP';
    const storeInfo = {
        joke,
        ip,
        timestamp: new Date().toISOString()
    };
    await logStoreHistory(storeInfo);
};

module.exports = addJoke;
