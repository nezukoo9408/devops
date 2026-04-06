const { Order, OrderItem } = require('../models/Order');
const User = require('../models/User');

// @desc    Create new order
// @route   POST /api/orders
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    } else {
        try {
            const order = await Order.create({
                UserId: req.user.id,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });

            // Create associated order items
            const itemsToCreate = orderItems.map(item => ({
                ...item,
                OrderId: order.id,
                ProductId: item.product // Mapping frontend 'product' id to ProductId
            }));

            await OrderItem.bulkCreate(itemsToCreate);

            const createdOrder = await Order.findByPk(order.id, {
                include: [{ model: OrderItem, as: 'orderItems' }]
            });

            res.status(201).json(createdOrder);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res) => {
    const order = await Order.findByPk(req.params.id, {
        include: [
            { model: OrderItem, as: 'orderItems' },
            { model: User, attributes: ['name', 'email'] }
        ]
    });

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
const getOrders = async (req, res) => {
    const orders = await Order.findAll({
        include: [{ model: User, attributes: ['id', 'name'] }]
    });
    res.json(orders);
};

module.exports = { addOrderItems, getOrderById, getOrders };
