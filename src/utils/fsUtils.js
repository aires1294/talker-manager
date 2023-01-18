// const fs = require('fs').promises;
// const path = require('path');

// const pathName = 'talker.json';

// async function readTalkerData() {
//     try {
//         const data = await fs.readFile(path.resolve(__dirname, pathName));
//         const talker = JSON.parse(data);
//         // console.log(talker);
//         return talker;
//     } catch (er) {
//         return console.log(`Erro na leitura do arquivo ${er.message}`);
//     }
// }

// module.exports = {
//     readTalkerData,
// };

// const fs = require('fs').promises;
// // const path = require('path');
// // const talker = require('../talker.json');

// // const pathName = 'talker.json';

// async function readTalkerData() {
//     try {
//         const data = await fs.readFile('../talker.json');
//         const dataTalkerJson = JSON.parse(data);
//         return dataTalkerJson;
//         // console.log(talker);
//     } catch (er) {
//         return console.log(`Erro na leitura do arquivo ${er.message}`);
//     }
// }

// module.exports = {
//     readTalkerData,
// };