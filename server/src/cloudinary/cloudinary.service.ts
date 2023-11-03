// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');

@Injectable()
// export class CloudinaryService {
//   uploadFiles(files: Express.Multer.File[]): Promise<CloudinaryResponse[]> {
//     const uploadPromises = files.map((file) => {
//       return new Promise<CloudinaryResponse>((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           (error, result) => {
//             if (error) return reject(error);
//             resolve(result);
//           },
//         );

//         streamifier.createReadStream(file.buffer).pipe(uploadStream);
//       });
//     });

//     return Promise.all(uploadPromises);
//   }
// }
export class CloudinaryService {
  uploadFiles(files: Express.Multer.File[]): Promise<CloudinaryResponse[]> {
    const uploadPromises = files.map((file) => {
      return new Promise<CloudinaryResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
            // const url = result.secure_url;
            // return url;
          },
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    });

    return Promise.all(uploadPromises);
  }
}
