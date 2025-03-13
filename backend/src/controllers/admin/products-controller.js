import { imageUploadUtils } from "../../config/cloudinary.js";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtils(url);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log("Error in handleImageUpload", error);
    res.status(400).json({
      success: false,
      message: "Unable to upload image",
    });
  }
};
