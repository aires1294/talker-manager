const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

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
        const regex = /\S+@\S+\.\S+/g;
        const emailConfirmed = regex.test(email);

        if (!email) {
            return response.status(400)
            .json({ message: 'O campo "email" é obrigatório' });
        }
        if (!emailConfirmed) {
            return response.status(400)
            .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
        }
        console.log('validation email');
        next();
};

const validationPassword = (request, response, next) => {
    const { password } = request.body;

    if (!password) {
        return response.status(400)
        .json({ message: 'O campo "password" é obrigatório' });
    }

    if (password.length < 6) {
        return response.status(400)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    console.log('validation password');
    next();
};

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

module.exports = {
    readTalkerData,
    getTalkerById,
    validationEmail,
    validationPassword,
    tokenGenerator,
};