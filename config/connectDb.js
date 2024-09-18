const mongoose = require ('mongoose');

const connectDb = async connectionUrl => {
    try {
        const conn = await mongoose.connect(connectionUrl);
        console.log(`Db connect on ${conn.connection.host}`);
    } catch (error) { // prevent crash
        console.log(`Error connecting db: ${error}`); 
        process.exit(1); 
    }
};

module.exports = { connectDb };