const { PORT, DATABASE_URL } = require('./config/environment');
const express = require('express');
const mongoose = require('mongoose');
const productsRouter = require('./routes/products');
const employeesRouter = require('./routes/employees');
const companiesRouter = require('./routes/companies');
const providersRouter = require('./routes/providers');

const app = express();

app.use(express.json());

app.get('', (req, res) => {
  res.send('<h1>Welcome</h1>');
});

app.use(productsRouter);
app.use(employeesRouter);
app.use(companiesRouter);
app.use(providersRouter);

mongoose.connect(DATABASE_URL).then(() => {
  console.log('DB connected')
  app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
}).catch(err => {
  console.log('There was an error on the DB connection')
  console.log(err)
})