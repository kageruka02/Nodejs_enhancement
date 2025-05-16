const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const { router:adminRoutes} = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const path = require('path');
const { errorPage } = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const Cart = require('./models/cartModel');
const CartItem = require('./models/cartItem');
const Order = require('./models/orderModel');
const orderItem = require('./models/orderItem');
 



app.set('view engine', 'ejs'); // setting view engine 

app.set('views', 'views'); //shows where template files are stored . views is the default one so we had to set view that we want
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();

    }).catch(error => console.log(error));
})
app.use('/admin', adminRoutes);
app.use('/', shopRoutes);
app.use(errorPage);




Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });//1
User.hasMany(Product);//1
User.hasOne(Cart);//2
Cart.belongsTo(User);//2
Cart.belongsToMany(Product, { through: CartItem });//3
Product.belongsToMany(Cart, { through: CartItem });//3
Order.belongsTo(User);//4
User.hasMany(Order);//4
Order.belongsToMany(Product, { through: orderItem });//5
Product.belongsToMany(Order, { through: orderItem });//5


 

sequelize.sync().then(result => {
    return User.findByPk(1);
}).then(user => {
    if (!user) return User.create({ name: 'Max', email: 'test@test.com' })
    return user;
}).then(user => {
    return user.getCart().then(cart => {
        if (!cart) return user.createCart()
        else return null;
    });
}).then(cart => {
    console.log("Database connected successfully");
    const PORT = 3000;
    app.listen(PORT, () => console.log("running on the port " + PORT));
}).catch(err => {
    console.log(err);
})



