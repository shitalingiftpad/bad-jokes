const fs = require('fs').promises;
const path = require('path');

const jokesFilePath = path.join(__dirname, '../jokes.txt');
const updateHistoryPath = path.join(__dirname, '../updateHistory.txt');
const storeHistoryPath = path.join(__dirname, '../storeHistory.txt'); 
const deleteHistoryPath = path.join(__dirname, '../deleteHistory.txt');

const readJokesFromFile = async () => {
    try {
        const data = await fs.readFile(jokesFilePath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading jokes file:', error);
        return [];
    }
};

const updateJokesFile = async (jokes) => {
    try {
        await fs.writeFile(jokesFilePath, JSON.stringify(jokes, null, 2));
    } catch (error) {
        console.error('Error updating jokes file:', error);
        throw error;
    }
};

const logUpdateHistory = async (updateInfo) => {
    const logEntry = `Joke ID: ${updateInfo.id}, Updated Joke: "${updateInfo.updatedJoke}", IP: ${updateInfo.ip}, Timestamp: ${updateInfo.timestamp}\n`;
    try {
        await fs.appendFile(updateHistoryPath, logEntry);
    } catch (error) {
        console.error('Error logging update history:', error);
        throw error;
    }
};

const logStoreHistory = async (storeInfo) => {
    const logEntry = `Joke: "${storeInfo.joke}", IP: ${storeInfo.ip}, Timestamp: ${storeInfo.timestamp}\n`;
    try {
        await fs.appendFile(storeHistoryPath, logEntry);
    } catch (error) {
        console.error('Error logging store history:', error);
        throw error;
    }
};

const logDeleteHistory = async (deleteInfo) => {
    const logEntry = `Joke ID: ${deleteInfo.id}, IP: ${deleteInfo.ip}, Timestamp: ${deleteInfo.timestamp}\n`;
    try {
        await fs.appendFile(deleteHistoryPath, logEntry);
    } catch (error) {
        console.error('Error logging delete history:', error);
        throw error;
    }
}


module.exports = {
    readJokesFromFile,
    updateJokesFile,
    logUpdateHistory,
    logStoreHistory,
    logDeleteHistory,
};
