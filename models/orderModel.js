const Sequelize = require('sequelize');
const sequelize = require('../util/database');



const Order = sequelize.define('order', {
    id: { 
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
    },


})
module.exports = Order;