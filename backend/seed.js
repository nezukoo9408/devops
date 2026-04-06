const User = require('./models/User');
const Product = require('./models/Product');
const { connectDB, sequelize } = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const products = [
  {
    name: 'Standard Cargo Ship',
    image: '/api/images/cargo_ship.png',
    description: 'A reliable cargo ship for multi-cloud deployments.',
    brand: 'DevOps Fleet',
    category: 'Logistics',
    price: 99.99,
    countInStock: 10,
  },
  {
    name: 'High-Speed Ferry',
    image: '/api/images/ferry.png',
    description: 'Fast shipping for your containers with low latency.',
    brand: 'Vitesse',
    category: 'Logistics',
    price: 149.99,
    countInStock: 5,
  },
  {
    name: 'Premium Tugboat',
    image: '/api/images/tugboat.png',
    description: 'Powerful tugboat to guide your pods into port.',
    brand: 'TugMaster',
    category: 'Maintenance',
    price: 199.99,
    countInStock: 2,
  },
  {
    name: 'Cloud-Scale Container',
    image: '/api/images/container.png',
    description: 'Indestructible container for self-healing demos.',
    brand: 'Hercule',
    category: 'Hardware',
    price: 29.99,
    countInStock: 100,
  }
];

const importData = async () => {
  try {
    await connectDB();

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await User.destroy({ where: {}, truncate: true });
    await Product.destroy({ where: {}, truncate: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      isAdmin: true,
    });

    await User.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      isAdmin: false,
    });

    await Product.bulkCreate(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
