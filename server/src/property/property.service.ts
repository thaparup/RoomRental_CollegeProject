import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertyDto } from './dto/property.dto';
import { RoomDto } from './dto/room.dto';
import { NotFoundError } from 'rxjs';
import { truncate } from 'fs';
import { domainToASCII } from 'url';
import { HouseDto } from './dto/house.dto';
import { LandDto } from './dto/land.dto';
import { MessageDto } from './dto/message.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Prisma } from '@prisma/client';
import { GetCurrentUser } from 'src/common/decorators';

@Injectable()
export class PropertyService {
  constructor(
    private prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // ****************************************** HOUSE **********************************

  //*************************************************** Hostel ******************************************

  async getUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
  async updateHosetl() {}
  async createText(messageDto: MessageDto, userId: number, id: number) {
    const findReceiver = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    const findSender = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const text = await this.prisma.messages.create({
      data: {
        message: messageDto.message,
        sender: { connect: { id: userId } },
        receiver: { connect: { id: id } },
        senderName: findSender.name,
        receiverName: findReceiver.name,
      },
    });
    return { success: true };
  }
  async createTexts(messageDto: MessageDto, userId: number, id: number) {
    const text = await this.prisma.messages.create({
      data: {
        message: messageDto.message,
        sender: { connect: { id: userId } },
        receiver: { connect: { id: 2 } },
        senderName: 'Peter Parker',
        receiverName: 'Harry Potter',
      },
    });
    return { success: true };
    return userId;
  }

  async getConverstationBetweenTwoOnly(userId: number, id: number) {
    const user = await this.prisma.user.findMany({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });
    const messages = await this.prisma.messages.findMany({
      where: {
        OR: [
          { senderId: id, receiverId: userId },
          { senderId: userId, receiverId: id },
        ],
      },
    });
    return messages;
  }

  async viewAllMessages(userId: number) {
    const currentUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const all = await this.prisma.messages.findMany({
      where: {
        OR: [
          {
            receiverId: userId,
          },
          {
            senderId: userId,
          },
        ],
      },
    });
    return { all, currentUser };
  }
}
