const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const connectDB = async (retries = 5) => {
  while (retries > 0) {
    try {
      // Create database if it doesn't exist
      const mysql = require('mysql2/promise');
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
      await connection.end();

      await sequelize.authenticate();
      console.log('MySQL Connected using Sequelize...');
      // Sync models
      await sequelize.sync({ alter: true });
      break; // Success!
    } catch (error) {
      console.error(`Error: ${error.message}. Retrying in 5 seconds... (${retries} retries left)`);
      retries -= 1;
      if (retries === 0) process.exit(1);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

module.exports = { sequelize, connectDB };
