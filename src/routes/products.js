const express = require('express');
const productsController = require('../controllers/products');
const router = express.Router();
const RESOURCE_ROUTE = '/products';

router.get(RESOURCE_ROUTE, productsController.getProductList);

router.post(RESOURCE_ROUTE, productsController.createProduct);

router.get(`${RESOURCE_ROUTE}/:productId`, productsController.getProduct);

router.put(`${RESOURCE_ROUTE}/:productId`, productsController.updateProduct);

router.delete(`${RESOURCE_ROUTE}/:productId`, productsController.deleteProduct);

router.patch(`${RESOURCE_ROUTE}/:productId`, productsController.activateProduct);

module.exports = router;