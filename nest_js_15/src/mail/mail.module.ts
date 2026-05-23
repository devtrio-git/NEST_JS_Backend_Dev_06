import { Global, Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import {join} from 'node:path';


@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],

      useFactory:(config: ConfigService)=>({
        transport: {
          host: config.get('environment.mailHost'),
          port: 587,
          secure: false,
          auth: {
            user: config.get('environment.smtpUserName'),
            pass: config.get('environment.smtpPassword'),
          }
        },

        defaults: {
          from: `"nest js" <${config.get('environment.smtpUserName')}>`,
        },

        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            engine: 'ejs',
            strict: false
          }
        }

      }),
    }),
  ],

  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
