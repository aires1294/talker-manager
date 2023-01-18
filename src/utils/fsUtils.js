const fs = require('fs').promises;
const path = require('path');

const DataPathName = '../talker.json';

async function readTalkerData() {
    try {
        const data = await fs.readFile(path.resolve(__dirname, DataPathName));
        const talker = JSON.parse(data);
        // console.log(talker);
        return talker;
    } catch (er) {
        return console.log(`Erro na leitura do arquivo ${er.message}`);
    }
}

module.exports = {
    readTalkerData,
};