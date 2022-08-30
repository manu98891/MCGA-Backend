const express = require('express')
const products = require('./data/product.json')
const app = express()
const port = 3002


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/product', (req, res) => {
  res.json(products)
})

app.get('/products/id/:id', (req, res) => {
    let sentID = req.params.id

    const productByID = products.filter((product) => product.id == sentID)

    console.log(productByID)

    res.send(productByID)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/*
 app.get('/product/id/:id', (req, res) => {
  res.json({
    name:'Manuel',
    id: req.params.id
  });
})
*/