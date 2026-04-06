const express = require('express');
const router = express.Router();
const { addOrderItems, getOrderById, getOrders } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, addOrderItems);
router.get('/', protect, admin, getOrders);
router.get('/:id', protect, getOrderById);

module.exports = router;
