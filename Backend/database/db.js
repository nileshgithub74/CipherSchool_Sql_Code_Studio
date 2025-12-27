import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected Successfully ...");
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDB;