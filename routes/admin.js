const express = require('express');
const router = express.Router();

const { getAddProduct, postAddProduct, getProductsAdmin, getEditProduct, postEditProduct, postDeleteProduct } = require('../controllers/admin');


router.get('/add-product', getAddProduct)

router.get('/products', getProductsAdmin ); 
router.post('/add-product', postAddProduct);
router.get('/edit-product/:productId', getEditProduct);
router.post('/edit-product', postEditProduct);
router.post('/delete-product', postDeleteProduct);

module.exports = { router};