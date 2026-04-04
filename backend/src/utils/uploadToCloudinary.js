import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (fileBuffer, folder = "products") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    stream.end(fileBuffer);
    console.log("Cloudinary config:", cloudinary.config());
  });
};

export default uploadToCloudinary;
