const express = require('express');
const sequelize = require('./db');

sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
})

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  console.log(req.query);
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});