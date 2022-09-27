//const { PORT, DATABASE_URL } = require('./config/environment');
const express = require('express');
const mongoose = require('mongoose');
const productsRouter = require('./routes/products');
const employeesRouter = require('./routes/employees');
const companiesRouter = require('./routes/companies');
const providersRouter = require('./routes/providers');

//PORT = 3001;

const app = express();

app.use(express.json());

app.get('', (req, res) => {
  res.send('<h1>Bienvenuti</h1>');
});

app.use(productsRouter);
app.use(employeesRouter);
app.use(companiesRouter);
app.use(providersRouter);

mongoose.connect("mongodb+srv://manuel:manumanu1@bdmanuel.dm7tgd4.mongodb.net/?retryWrites=true&w=majority").then(() => {
  console.log('DB connected')
  app.listen(PORT, () => console.log(`Listening at http://localhost:3001`));
}).catch(err => {
  console.log('There was an error on the DB connection')
  console.log(err)
})