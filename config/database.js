const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lck', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;