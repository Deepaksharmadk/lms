import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env/",
});
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.NAME,
  api_key: process.env.KEY,
  api_secret: process.env.SECRET,
  secure: true,
});

// async function uploadToCloudinary(filePath) {
//   try {
//     const response = await cloudinary.uploader.upload(filePath, {
//       resource_type: "auto",
//       // Detect file type automatically
//       // Optional: Set additional upload options (transformations, etc.)
//     });
//     fs.unlinkSync(filePath);
//     return response;
//     console.log("Uploaded successfully:", response);
//     // return response;
//   } catch (error) {
//     fs.unlinkSync(filePath); // remove the locally saved temporary file as the upload operation got failed
//     return null;
//     console.error("Upload failed:", error);
//     throw error; // Rethrow to handle the error in your application logic
//   }
// }
// export default uploadToCloudinary;
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
