import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary/cloudinary';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { RoomService } from './room/room.service';
import { LandService } from './land/land.service';
import { HouseService } from './house/house.service';
import { KycService } from 'src/kyc/kyc.service';

@Module({
  imports: [CloudinaryModule],
  providers: [
    PropertyService,
    PrismaService,
    CloudinaryProvider,
    CloudinaryService,
    RoomService,
    LandService,
    HouseService,
    KycService,
  ],
  controllers: [PropertyController],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class PropertyModule {}
