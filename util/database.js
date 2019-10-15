const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete2', 'root', 'ultrapassword', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;