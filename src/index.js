const express = require('express');
const { 
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
  writeFile } = require('./utils/fsUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_FAIL = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkers = await readTalkerData();
  if (!talkers) {
    return response.status(HTTP_OK_STATUS).json([]);
  } 
  return response.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const idTalker = await getTalkerById(id);
  if (!idTalker) {
    return response.status(HTTP_FAIL).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(idTalker); 
});

app.post('/login', validationEmail, validationPassword, (_request, response) => {
  const token = tokenGenerator();
  console.log(token);
  return response.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', 
validationToken,
validationName,
validationAge,
validationTalk,
validationwatchedAt,
validationRate,
validationRate2, async (request, response) => {
  try {
    const { body } = request;
  const talkers = await readTalkerData();
  const id = talkers.length + 1;
  const newTalker = { id, ...body };
  await writeFile(newTalker);
  return response.status(201).json(newTalker);
    } catch (err) {
      console.log(err);
    }
});

app.listen(PORT, () => {
  console.log('Online');
});