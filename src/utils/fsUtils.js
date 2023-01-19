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

const validationEmail = (request, response) => {
        const { email } = request.body;
        const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
        const emailConfirmed = regex.test(email);

        if (!email) {
            return response.status(400)
            .json({ message: 'O campo "email" é obrigatório' });
        }
        if (!emailConfirmed) {
            return response.status(400)
            .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
        }
};

const validationPassword = (request, response) => {
    const { password } = request.body;

    if (!password) {
        return response.status(400)
        .json({ message: 'O campo "password" é obrigatório' });
    }

    if (password.length < 6) {
        return response.status(400)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
};

const validation = (request, response, next) => {
    validationPassword(request, response);
    validationEmail(request, response);
    next();
};

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

module.exports = {
    readTalkerData,
    getTalkerById,
    validation,
    tokenGenerator,
};