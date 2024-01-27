import mongoose from "mongoose";
const databaseConnect = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(`\n MongoDB connected !! DB HOST: ${connect.connection.host}`);
  } catch (error) {
    console.log("DB connection failed: " + error);
    process.exit(1);
  }
};
export default databaseConnect;
