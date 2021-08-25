const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

const app = express();
const api = process.env.API_URL;
const mongodbconnect = process.env.MONGO_URL;

//Router Imports
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');

app.use(cors());
app.options('*', cors());

//Middleware
app.use(express.json());
app.use(morgan('dev'));

//Routers
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);

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
