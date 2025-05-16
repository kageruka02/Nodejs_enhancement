const express = require('express')
const router = express.Router()
const { getProducts, getIndex, getCart, getCheckout, getOrders, getProduct, postCart, postCartDeleteProduct, postOrder } = require('../controllers/shop');
router.get('/', getIndex)
router.get('/products', getProducts);
router.get('/products/:productId', getProduct);
router.get('/cart', getCart);
router.post('/cart', postCart);
router.post('/cart-delete-item', postCartDeleteProduct);
router.post('/create-order', postOrder);
router.get('/checkout', getCheckout);
router.get('/orders', getOrders )
module.exports = router;