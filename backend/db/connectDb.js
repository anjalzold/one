const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();





const connectDb = async () => {
    try {
        if(!process.env.MONGO_URI) throw new Error("MONGO_URI not defined in .env file")
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDb