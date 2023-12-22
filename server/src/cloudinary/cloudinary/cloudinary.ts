import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dzql7ngcm',
      api_key: '773778227414951',
      api_secret: 'oTx5_k3TvojcAzQqFawqpokMf1A',
    });
  },
};
