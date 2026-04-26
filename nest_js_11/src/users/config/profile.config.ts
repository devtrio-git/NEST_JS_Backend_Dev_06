import { registerAs } from '@nestjs/config';

export default registerAs('profileConfig', () => ({
  api_token: process.env.PROFILE_API_TOKEN,
}));
