const { Sequelize } = require('sequelize');

module.exports = new Sequelize('test1', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port:3307,
  });
 