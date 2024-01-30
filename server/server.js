import databaseConnect from "./db/database.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env/",
});
// ./.env",
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
app.listen(process.env.PORT, async () => {
  try {
    const connectdb = await databaseConnect();
    console.log(`app listening on ${process.env.PORT}`);
  } catch (error) {
    console.log("app is not listening on ${process.env.PORT}", error);
  }
});
