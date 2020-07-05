const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const DB = process.env.MONGODB_URI.replace(
      '<PASSWORD>',
      process.env.MONGODB_PASSWORD
    );
    const conn = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected successfully on ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
