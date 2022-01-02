const express = require('express');
const path = require('path');
const { db, syncAndSeed } = require('./db');
const router = require('./routes');

const app = express();

app.use('/api', router);

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

app.use('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

const init = async() => {
  try {
    await db.authenticate();
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch(err) {
    console.log(err);
  };
};

init();
