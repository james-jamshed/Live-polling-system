const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://james_jamshed:iVR9nSKX7BJQPULI@pollingapp.c7brmj1.mongodb.net/pollingDB?retryWrites=true&w=majority&appName=PollingApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
