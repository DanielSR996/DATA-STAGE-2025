const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lck', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize; 