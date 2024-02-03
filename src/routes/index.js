const express = require('express');

const router = express.Router();
const v1Product = require('./v1/index');
router.use('/v1',v1Product);

module.exports=router;
