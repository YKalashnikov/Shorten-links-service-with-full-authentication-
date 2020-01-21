const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
    try {
      mongoose.Promise = global.Promise;
      const connection = await mongoose.connect(config.get('mongoUri'), {
        useMongoClient: true,
      });
      console.log(`MongoDB Connected: ${config.get('mongoUri')}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB;