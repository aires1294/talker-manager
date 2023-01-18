// const express = require('express');
// const { readTalkerData } = require('./utils/fsUtils');

// const app = express();
// app.use(express.json());

// const HTTP_OK_STATUS = 200;
// const PORT = '3010';

// // não remova esse endpoint, e para o avaliador funcionar
// app.get('/', (_request, response) => {
//   response.status(HTTP_OK_STATUS).send();
// });

// app.get('/talker', async (request, response) => {
//   const talkers = await readTalkerData();
//   return response.status(HTTP_OK_STATUS).json({ talkers });
// });

// app.listen(PORT, () => {
//   console.log('Online');
// });

const express = require('express');
// const { readTalkerData } = require('./utils/fsUtils');
const talkers = require('./talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (request, response) => {
  return response.status(HTTP_OK_STATUS).json(talkers);
});

app.listen(PORT, () => {
  console.log('Online');
});
