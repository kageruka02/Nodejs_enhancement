const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const { router:adminRoutes} = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const path = require('path');
const { errorPage } = require('./controllers/error');
const db = require('./util/database');
 



app.set('view engine', 'ejs'); // setting view engine 

app.set('views', 'views'); //shows where template files are stored . views is the default one so we had to set view that we want
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', adminRoutes);
app.use('/', shopRoutes);
app.use(errorPage);


const PORT = 3000
app.listen(PORT, () => console.log("running on the port " + PORT));