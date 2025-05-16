const Sequelize = require('sequelize');
const sequelize = require('../util/database');



const CartItem = sequelize.define('cartItem', {
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
module.exports = CartItem;