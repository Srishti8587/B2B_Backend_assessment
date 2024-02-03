const mongoose=require("mongoose");
const {MONGO_URL} = require('./serverconfig');

const connectDB = async() => {
    try{
        await mongoose.connect(MONGO_URL)
        console.log(`Connected to MONGODB database ${mongoose.connection.host}`)
    }
    catch(error)
    {
        console.log(`MONGO CONNECTION ERROR ${error}`)
    }
}

module.exports = connectDB;