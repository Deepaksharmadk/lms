import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

cloudinary.config({
  cloud_name: "deepaksharma1",
  api_key: "243458188814438",
  api_secret: "COcz8X6g_syydgy4v98GrjDvOGM",
  secure: true,
});

async function uploadToCloudinary(filePath) {
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", // Detect file type automatically
      // Optional: Set additional upload options (transformations, etc.)
    });
    fs.unlinkSync(filePath);
    return response;
    // console.log("Uploaded successfully:", response);
    // return response;
  } catch (error) {
    fs.unlinkSync(filePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
    console.error("Upload failed:", error);
    throw error; // Rethrow to handle the error in your application logic
  }
}
export default uploadToCloudinary;
