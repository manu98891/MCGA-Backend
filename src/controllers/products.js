const { Product } = require('../models/product');

const getProductList = async (req, res) => {
  const products = await Product.find({ isDeleted: false });
  return res.json({
    message: products.length > 0 ? 'Products found' : 'Products not found',
    data: products,
    error: false
  });
};

const createProduct = async (req, res) => {
  const product = {
    productId: req.body.productId,
    name: req.body.name,
    price: req.body.price
  };
  try {
    const newProduct = new Product(product);
    const result = await newProduct.save();
  
    return res.status(201).json({
      message: 'Product created!',
      data: result,
      error: false
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: product,
      error: true
    })
  }
};

const getProduct = async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findOne({ productId });
  if (!product) {
    return res.status(404).json({
      message: 'Product not found!',
      data: undefined,
      error: true
    });
  }

  return res.json({
    message: 'Product found',
    data: product,
    error: false
  });
}

const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const newData = {
    productId: req.body.productId,
    name: req.body.name,
    price: req.body.price
  }
  const product = await Product.findOne({ productId });
  if (!product) {
    return res.status(404).json({
      message: 'Product not found!',
      data: undefined,
      error: true
    });
  }
  product.name = newData.name;
  product.price = newData.price;
  try {
    const result = await product.save()

    return res.json({
      message: 'Product updated!',
      data: result,
      error: false
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: newData,
      error: true
    })
  }
}

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findOne({ productId })
  if (!product) {
    return res.status(404).json({
      message: 'Product not found!',
      data: undefined,
      error: true
    });
  }
  product.isDeleted = true;
  try {
    const result = await product.save();
    return res.status(204).json({
      message: 'Deleted product!',
      data: result,
      error: false
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: product,
      error: true
    })
  }
}

const activateProduct = async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findOne({ productId })
  if (!product) {
    return res.status(404).json({
      message: 'Product not found!',
      data: undefined,
      error: true
    });
  }
  product.isDeleted = false;
  try {
    const result = await product.save();
    return res.status(204).json({
      message: 'Activated product!',
      data: result,
      error: false
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      data: product,
      error: true
    })
  }
}

module.exports = {
  getProductList,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  activateProduct
};