import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../../users/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly  mail:MailerService) {}


  public async sendUserWelcomeMail(user: User) {
    console.log({user});

    await this.mail
      .sendMail({
        to: user.email,
        from: 'devtrio.team@gmail.com',
        subject: 'Welcome to Devtrio!',
        template: './welcome',
        context: {
          name: user.firstName,
        }
      })
  }
}
