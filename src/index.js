const express = require('express')
const { PORT } = require('./config/serverconfig');
const  connectDB  = require('./config/db');
const bodyParser = require('body-parser');
const ApiRoutes = require('./routes/index');
// const { ProductModel } = require('../models/Product');
// const ProductRepository = require("./repository/product-repository");
// const ProductModel = require('./models/Product');

const setupAndStartServer = async () => {
    const app=express();
    connectDB();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',ApiRoutes);
    app.listen(PORT,()=>{
      console.log(`Server is running on PORT ${PORT}`);
    });
}

setupAndStartServer();