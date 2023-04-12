const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.db);
    console.log("data base is Successfuly Connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDb;
