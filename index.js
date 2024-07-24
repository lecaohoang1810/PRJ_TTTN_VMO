const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const configViewEngine = require('./src/configs/viewEngine');
const authRoutes = require('./src/routes/authRoute');
const categoryRoutes = require('./src/routes/categoryRoute');
const itemRoutes = require('./src/routes/itemRoute');
const orderRoutes = require('./src/routes/orderRoute');
const voucherRoutes = require('./src/routes/voucherRoute');
const flashsaleRoutes = require('./src/routes/flashsaleRoute');
// const flashsaleItemRoutes = require('./src/routes/flashsaleItemRoute');
// const notificationRoutes = require('./src/routes/notificationRoute');
require('dotenv').config();
// Tích hợp cron job
require('./src/cronjobs/flashsaleNotificationCron'); 


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
app.use('/v1', categoryRoutes);
app.use('/v2', itemRoutes);
app.use('/v3', orderRoutes);
app.use('/v4', voucherRoutes);
app.use('/v5', flashsaleRoutes);
// app.use('/api6', notificationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
