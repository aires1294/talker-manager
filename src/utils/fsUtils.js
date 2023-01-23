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

const writeFile = async (talkers) => {
    await fs.writeFile('src/talker.json', JSON.stringify(talkers));
};

const getTalkerById = async (id) => {
    try {
        const talkers = await readTalkerData();
        return talkers.find((talker) => talker.id === Number(id));
    } catch (er) {
        return console.log('Id não encontrado');
    }
};

const deleteTalkerById = async (id) => {    
    try {
        const talkers = await readTalkerData();
        const filteredTalkers = talkers.filter((talkerDelete) => talkerDelete.id !== Number(id));
        const updatedTalkers = JSON.stringify(filteredTalkers, null, 2);
        await writeFile(updatedTalkers);
    } catch (err) {
        console.log(err);
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

const validationToken = (request, response, next) => {
    const { authorization } = request.headers;
    // console.log(authorization);
    if (!authorization) {
        return response.status(401)
        .json({ message: 'Token não encontrado' });
    }
    if (typeof authorization !== 'string') {
        return response.status(401)
        .json({ message: 'Token inválido' });
    }
    if (authorization.length < 16) {
        return response.status(401)
        .json({ message: 'Token inválido' });
    }
    next();
};

const validationName = (request, response, next) => {
    const { name } = request.body;
    if (!name) {
        return response.status(400)
        .json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return response.status(400)
        .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const validationAge = (request, response, next) => {
    const { age } = request.body;
    if (!age) {
        return response.status(400)
        .json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
        return response.status(400)
        .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const validationTalk = (request, response, next) => {
    const { talk } = request.body;
    if (!talk) {
        return response.status(400)
        .json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
};

const validationwatchedAt = (request, response, next) => {
    const { watchedAt } = request.body.talk;
    console.log(watchedAt);
    const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    const dateConfirmed = regex.test(watchedAt);
    if (!watchedAt) {
        return response.status(400)
        .json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!dateConfirmed) {
        return response.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const validationRate = (request, response, next) => {
    const { rate } = request.body.talk;
    console.log(rate);
    if (rate === 0) {
        return response.status(400)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    if (!rate) {
        return response.status(400)
        .json({ message: 'O campo "rate" é obrigatório' });
    }
    if (typeof rate !== 'number') {
        return response.status(400)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

    const validationRate2 = (request, response, next) => {
        const { rate } = request.body.talk;
        console.log(rate);
        if (!Number.isInteger(rate)) {
                    return response.status(400)
                    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
                }
        if (rate < 1 || rate > 5) {
                    return response.status(400)
                    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
                }
        next();
};

// const validateQuery = (request, response) => {
//     const { q } = request.query;
//   const talkers = readTalkerData();
//   const talker = talkers.filter((element) => element.name.includes(q));
//   if (!q) {
//     return response.status(200).json(talkers);
//   }
//   if (!talker) {
//     return response.status(200).json([]);
//   }
//   return response.status(200).json(talker);
// };

module.exports = {
    readTalkerData,
    getTalkerById,
    validationEmail,
    validationPassword,
    tokenGenerator,
    validationToken,
    validationName,
    validationAge,
    validationTalk,
    validationwatchedAt,
    validationRate,
    validationRate2,
    writeFile,
    deleteTalkerById,
                };