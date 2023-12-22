import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AtStrategy, RtStrategy } from './strategy';
import { MailModule } from 'src/mail/mail.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary/cloudinary';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

import { CloudinarySingleService } from 'src/cloudinary/cloudinarysingle.service';

@Module({
  imports: [JwtModule.register({}), CloudinaryModule, PrismaModule, MailModule],
  controllers: [AuthController],
  providers: [
    AtStrategy,
    RtStrategy,
    AuthService,
    CloudinaryProvider,

    CloudinarySingleService,
  ],
  exports: [AuthService, CloudinaryProvider, CloudinarySingleService],
})
export class AuthModule {}
