// import multer from "multer";
// import multerStorageCloudinary from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = multerStorageCloudinary({
//   cloudinary,
//   params: async (req, file) => {
//     return {
//       folder: "portfolio/projects",
//       public_id: `${file.fieldname}-${Date.now()}`,
//       allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
//     };
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 },
// });

// export default upload;

// Commented out: Admin now provides image URLs directly
export default null;
