import { registerAs } from '@nestjs/config';

export default registerAs('cloudinary', () => ({
  cloudName: 'YOUR_CLOUD_NAME',
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET',
}));
