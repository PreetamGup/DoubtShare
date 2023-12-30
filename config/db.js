import mongoose from "mongoose";

const connectDB = async() =>{
    try {
      console.log("Connecting Database")
      await mongoose.connect(process.env.MONGODB_URI);
      console.log(`Mongodb connect`);
    } catch (error) {
      console.log(`Mongo DB Server Issue ${error}`);
    }
  };
  
  export default connectDB;