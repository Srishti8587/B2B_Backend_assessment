const express = require('express')
const { PORT } = require('./config/serverconfig');

const setupAndStartServer = async()=>{
    const app=express();
    app.use(PORT,()=>{
      console.log(`Server is running on PORT ${PORT}`);
    });
}

setupAndStartServer();