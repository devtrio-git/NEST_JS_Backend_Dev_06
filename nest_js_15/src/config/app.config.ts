import { registerAs } from '@nestjs/config';

export default registerAs('environment', () => ({
  environment: process.env.ENV === 'development' ? 'development' : 'production',

  // aws config env
  awsPublicBucket: process.env.AWS_PUBLIC_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
  awsCloudfrontUrl: process.env.AWS_CLOUDFRONT_URL,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

  mailHost: process.env.MAIL_HOST,
  smtpUserName: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
}));
