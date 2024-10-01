// Connect to mongo DB

const mongoose = require('mongoose');
const db = process.env.MONGO_CONNECTION_URI || "mongodb://localhost:27017/csecsp";

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Successfully Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;