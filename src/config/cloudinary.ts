// import * as cloudinary from "cloudinary";
// import { ConfigOptions } from "cloudinary";

// export default class CloudinaryConfig {
//   private cloudName: string;
//   private apiKey: string;
//   private apiSecret: string;

//   constructor(cloudName: string, apiKey: string, apiSecret: string) {
//     this.cloudName = cloudName;
//     this.apiKey = apiKey;
//     this.apiSecret = apiSecret;
//   }

//   public getCloudinaryConfig(): ConfigOptions {
//     return cloudinary.v2.config({
//       cloud_name: this.cloudName,
//       api_key: this.apiKey,
//       api_secret: this.apiSecret,
//     });
//   }
// }

// export default class CloudinaryConfig {
// private cloudinaryConfig: ConfigOptions;

//   constructor() {
//     this.cloudinaryConfig = {
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     };
//   }

//   public getCloudinaryConfig() {
//     return cloudinary.v2.config(this.cloudinaryConfig);
//   }
// }

import * as cloudinary from "cloudinary";
import { ConfigOptions } from "cloudinary";

const cloudinaryConfig = (
  cloudName: string,
  apiKey: string,
  apiSecret: string
): ConfigOptions => {
  return cloudinary.v2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
};

export default cloudinaryConfig;
