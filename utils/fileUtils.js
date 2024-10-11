const fs = require('fs').promises;
const path = require('path');

const jokesFilePath = path.join(__dirname, '../jokes.txt');

const readJokesFromFile = async () => {
    try {
        const data = await fs.readFile(jokesFilePath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading jokes file:', error);
        return [];
    }
};

module.exports = {
    readJokesFromFile,
};
