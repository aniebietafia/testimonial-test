// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import CloudinaryConfig from "./cloudinary";

// interface CustomParams {
//   folder: string;
//   allowedFormats: string[];
// }

// class CloudinaryService {
//   private cloudinary;

//   constructor() {
//     this.cloudinary = new CloudinaryConfig().getCloudinaryConfig();
//   }

//   public getCloudinary() {
//     return this.cloudinary;
//   }
// }

// export default class MulterConfig {
//   private storage: CloudinaryStorage;
//   private FILE_SIZE: number = 1024 * 1024 * 2; // 2MB
//   private cloudinaryService: CloudinaryService;

//   constructor() {
//     this.cloudinaryService = new CloudinaryService();
//     this.storage = new CloudinaryStorage({
//       cloudinary: this.cloudinaryService.getCloudinary(),
//       params: {
//         folder: "images",
//         allowedFormats: ["jpg", "png", "jpeg"],
//       } as CustomParams,
//     });
//   }

//   public getMulter() {
//     return multer({
//       storage: this.storage,
//       limits: { fileSize: this.FILE_SIZE },
//       fileFilter: (_req, file, cb) => {
//         if (
//           !file.originalname.match(/\.(jpg|jpeg|png)$/) ||
//           !file.mimetype.startsWith("image/")
//         ) {
//           return cb(new Error("File is not supported"));
//         }
//         if (file.size > this.FILE_SIZE) {
//           return cb(new Error("File is too large. Image size should be 2MB"));
//         }
//         cb(null, true);
//       },
//     });
//   }

//   public getCloudinaryService() {
//     return this.cloudinaryService;
//   }

//   public getStorage() {
//     return this.storage;
//   }

//   public getFileSize() {
//     return this.FILE_SIZE;
//   }
// }

import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryConfig from "./cloudinary";
import * as dotenv from "dotenv";
dotenv.config();

interface CustomParams {
  folder: string;
  allowedFormats: string[];
}

const cloudinaryConfigOptions = cloudinaryConfig(
  process.env["CLOUDINARY_CLOUD_NAME"] as string,
  process.env["CLOUDINARY_API_KEY"] as string,
  process.env["CLOUDINARY_API_SECRET"] as string
);

cloudinary.config(cloudinaryConfigOptions);

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images",
    allowedFormats: ["jpg", "png", "jpeg"],
  } as CustomParams,
});

const FILE_SIZE = 1024 * 1024 * 2; // 2MB

export const multerConfig = multer({
  storage,
  limits: {
    fileSize: FILE_SIZE,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images are allowed"));
    }
    if (file.size > FILE_SIZE) {
      return cb(new Error("Image should not be more than 4MB"));
    }
    cb(null, true);
  },
});

export { cloudinary };
