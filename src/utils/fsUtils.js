const fs = require('fs').promises;
const crypto = require('crypto');
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

const getTalkerById = async (id) => {
    try {
        const talkers = await readTalkerData();
        return talkers.find((talker) => talker.id === Number(id));
    } catch (er) {
        return console.log('Id não encontrado');
    }
};

const validationEmail = (request, response, next) => {
        const { email } = request.body;
        const regex = /\S+@\S+\.\S+/;
        const emailConfirmed = regex.test(email);
        if (!email) {
            return response.status(400)
            .json({ message: 'Preencha seu email' });
        } if (!emailConfirmed) {
            return response.status(400)
            .json({ message: 'Digite um email valido: "email@email.com"' });
        }
        next();
};

// const validationPassword = (request, response, next) => {
//     const { password } = request.body;
//     if (!password) {
//         return response.status(400).json({ message: 'Preencha sua senha' });
//     }
//     if (password.length < 6) {
//         return response.status(400)
//         .json({ message: 'Senha precisa ter no mínimo 6 digitos' });
//     }
//     next();
// };

function tokenGenerator() {
    crypto.randomBytes(8).toString('hex');
}

module.exports = {
    readTalkerData,
    getTalkerById,
    validationEmail,
    // validationPassword,
    tokenGenerator,
};