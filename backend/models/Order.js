const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    itemsPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
    },
    taxPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
    },
    shippingPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    paidAt: {
        type: DataTypes.DATE,
    },
    isDelivered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    deliveredAt: {
        type: DataTypes.DATE,
    },
});

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    qty: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

// Relationships
Order.belongsTo(User);
User.hasMany(Order);

Order.hasMany(OrderItem, { as: 'orderItems' });
OrderItem.belongsTo(Order);

const Product = require('./Product');
OrderItem.belongsTo(Product);
Product.hasMany(OrderItem);

module.exports = { Order, OrderItem };
