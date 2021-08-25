const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

require('dotenv/config');

const app = express();
const api = process.env.API_URL;
const mongodbconnect = process.env.MONGO_URL;

//Router Imports
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const usersRouter = require('./routes/users');

app.use(cors());
app.options('*', cors());

//Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(authJwt());
app.use(errorHandler);

//Routers
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`{api}/users`, usersRouter);

//Connect to DB
mongoose
  .connect(mongodbconnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected......');
  })
  .catch((err) => {
    console.log(`Error connecting to DB - ${err}`);
  });

//Setup server to listen on port 3000 - update to use environment
app.listen(3000, () => {
  console.log('Server is running http://localhost:3000');
});
