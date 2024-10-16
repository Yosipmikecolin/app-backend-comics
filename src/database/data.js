import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(
      `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.cdtmz.mongodb.net/${process.env.DATANAME}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("database connect");
  } catch (error) {
    console.error("Error connect database", error);
  }
};

export default connectDB;
