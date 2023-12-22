import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendResetEmail(user: User, password: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'New password for Room Rental',
      template: process.cwd() + '/src/mail/templates/resetpassword.hbs',
      context: {
        name: user.name,
        password,
      },
    });
  }

}
