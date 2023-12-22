import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { AtGuard, UserCheckGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { PropertyModule } from './property/property.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),

    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    PrismaModule,
    AuthModule,
    PropertyModule,
    CloudinaryModule,
    MailModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserCheckGuard,
    },
  ],
})
export class AppModule {}
