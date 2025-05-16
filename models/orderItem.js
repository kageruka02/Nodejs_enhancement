const Sequelize = require('sequelize');
const sequelize = require('../util/database');



const orderItem = sequelize.define('orderItem', {
    id: { 
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    quantity: {
        type: Sequelize.INTEGER
    }


})
module.exports = orderItem;