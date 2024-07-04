const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const configViewEngine = require('./src/configs/viewEngine');
const authRoutes = require('./src/routes/authRoute');
const categoryRoutes = require('./src/routes/categoryRoute');
const itemRoutes = require('./src/routes/itemRoute');
const orderRoutes = require('./src/routes/orderRoute');
require('dotenv').config();

const app = express();

configViewEngine(app);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use('/api1', categoryRoutes);
app.use('/api2', itemRoutes);
app.use('/api3', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
