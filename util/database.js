const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'Ikln2003!!!!', {
    dialect: "mysql",
    host: 'localhost'
});

module.exports = sequelize;
