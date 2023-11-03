import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CloudinaryService } from './../../cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { RoomDto } from '../dto/room.dto';
import { v2 as cloudinary } from 'cloudinary';
import { url, waitForDebugger } from 'inspector';
import { KycService } from 'src/kyc/kyc.service';
import { ReservationDto } from '../dto/reservations.dto';
import { CommentDto } from '../dto/comment.dto';

@Injectable()
export class RoomService {
  constructor(
    private prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private kycService: KycService,
  ) {}

  async addRoom(
    roomDto: RoomDto,
    userId: number,
    file: Array<Express.Multer.File>,
  ) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!findUser) {
      throw new NotFoundException('User doesnot exist');
    }
    // this.kycService.validateKycVerification(userId);

    const prop = await this.prisma.property.findUnique({
      where: {
        userId: findUser.id,
      },
      select: {
        id: true,
      },
    });

    const findKyc = await this.prisma.kyc.findUnique({
      where: {
        userId: findUser.id,
      },
    });

    if (!findKyc) {
      throw new ForbiddenException('Fill in the KYC Form First');
    }
    const cloudImages = await this.cloudinaryService.uploadFiles(file);
    const urls = cloudImages.map((i) => {
      return i.secure_url;
    });

    const newRoom = await this.prisma.room.create({
      data: {
        title: roomDto.title,
        type: roomDto.type,
        occupancy: roomDto.occupancy,
        bathRoom: roomDto.bathRoom,
        cost: roomDto.cost,
        address: roomDto.address,
        size: roomDto.size,
        description: roomDto.description,
        feature: roomDto.feature,
        facilities: roomDto.facilities,
        facilitiesArray: roomDto.facilitiesArray,
        termsAndConditions: roomDto.termsAndConditions,
        roomtype: roomDto.roomtype,
        property: { connect: { id: prop.id } },
        latitude: roomDto.latitude,
        myLat: roomDto.myLat,
        myLong: roomDto.myLong,
      },
    });

    const newId: number = newRoom.id;

    for (let i = 0; i < urls.length; i++) {
      const createImage = await this.prisma.image.create({
        data: {
          image: urls[i],
          Room: {
            connect: { id: newId }, // Setting  the roomId for each image
          },
        },
      });
    }
  }
  async createImagesRoom(
    userId: number,
    roomId: number,
    file: Array<Express.Multer.File>,
  ) {
    const findProperty = await this.prisma.property.findFirst({
      where: {
        userId: userId,
      },
    });
    console.log(findProperty);

    const findRoom = await this.prisma.room.findFirst({
      where: {
        id: roomId,
      },
      select: {
        propertyId: true,
      },
    });
    console.log(findRoom);

    if (!findProperty) {
      throw new NotFoundException('Property doesnot exist');
    }
    if (!findRoom) {
      throw new NotFoundException('Room doesnot exist');
    } else if (findRoom.propertyId != findProperty.id) {
      throw new NotFoundException('Room dosnot exist');
    }
    const cloudImages = await this.cloudinaryService.uploadFiles(file);
    const urls = cloudImages.map((i) => {
      return i.secure_url;
    });
    for (let i = 0; i < urls.length; i++) {
      const createImage = await this.prisma.image.create({
        data: {
          image: urls[i],
          Room: {
            connect: { id: roomId },
          },
        },
      });
    }
  }

  async getRoom() {
    const allRoom = await this.prisma.room.findMany({});
    return allRoom;
  }
  async updateRoom(roomDto: RoomDto, roomId: number, userId: number) {
    const findProperty = await this.prisma.property.findFirst({
      where: {
        userId: userId,
      },
    });

    const findRoom = await this.prisma.room.findFirst({
      where: {
        id: roomId,
      },
      select: {
        propertyId: true,
      },
    });

    if (!findProperty) {
      throw new NotFoundException('Property does not exist');
    }

    if (!findRoom) {
      throw new NotFoundException('Room does not exist');
    } else if (findRoom.propertyId != findProperty.id) {
      throw new NotFoundException('Room does not exist');
    }

    const updRoom = await this.prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        title: roomDto.title,
        type: roomDto.type,
        occupancy: roomDto.occupancy,
        bathRoom: roomDto.bathRoom,
        cost: roomDto.cost,
        address: roomDto.address,
        size: roomDto.size,
        description: roomDto.description,
        feature: roomDto.feature,
        facilities: roomDto.facilities,
        facilitiesArray: roomDto.facilitiesArray,
        termsAndConditions: roomDto.termsAndConditions,
        roomtype: roomDto.roomtype,
        property: { connect: { id: findProperty.id } },
        latitude: roomDto.latitude,
        myLat: roomDto.myLat,
        myLong: roomDto.myLong,
      },
    });

    return { success: true };
  }

  async roomReservation(
    reservationDto: ReservationDto,
    id: number,
    receiverId: number,
    userId: number,
  ) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const findRoom = await this.prisma.room.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        cost: true,
      },
    });
    const reserve = await this.prisma.reservation.create({
      data: {
        reservations: reservationDto.reservations,
        accepted: true,
        User: { connect: { id: userId } },
        room: { connect: { id: findRoom.id } },
      },
    });
    const findReceiver = await this.prisma.user.findUnique({
      where: {
        id: receiverId,
      },
      select: {
        id: true,
        name: true,
      },
    });
    const findSender = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const senderKyc = await this.prisma.kyc.findUnique({
      where: {
        userId: userId,
      },
      select: {
        mobileNumber: true,
      },
    });
    reservationDto.text = `Hi , my name is ${findSender.name} and I would like to reserve your room. You can react me through my e-mail : ${findSender.email} or you can directly call me on this number:  ${senderKyc.mobileNumber}`;
    const message = await this.prisma.messages.create({
      data: {
        message: reservationDto.text,
        sender: { connect: { id: userId } },
        receiver: { connect: { id: receiverId } },
        senderName: findSender.name,
        receiverName: findReceiver.name,
      },
    });
    return { success: true };
  }

  async getRoomReservation(id: number, userId: number) {
    const reservations = await this.prisma.reservation.findMany({
      where: {
        roomId: id,
      },
    });
    return reservations;
  }
  async getImagesRoom(userRoomId: number, userId: number) {
    const findProp = await this.prisma.property.findUnique({
      where: {
        userId: userId,
      },
    });
    if (findProp) {
      const findRoom = await this.prisma.room.findUnique({
        where: {
          id: findProp.id,
        },
      });
    }
    const findImages = await this.prisma.image.findMany({
      where: {
        roomId: userRoomId,
      },
    });
    return findImages;
  }

  async getSingleImageForRoom(userId: number) {
    const findRoomOwned = await this.prisma.room.findMany();

    const array = findRoomOwned.map((i) => i.id);

    const imageArray = [];

    for (let i = 0; i < array.length; i++) {
      const findAllImageByLandId = await this.prisma.image.findFirst({
        where: {
          roomId: array[i],
        },
      });
      if (findAllImageByLandId) {
        imageArray.push(findAllImageByLandId);
      }
    }
    console.log(imageArray);
    return imageArray;
  }

  async bookRoom(
    text: string,
    roomId: number,
    receiverId: number,
    userId: number,
  ) {
    const findRoom = await this.prisma.room.findFirst({
      where: {
        id: roomId,
      },
      select: {
        propertyId: true,
        id: true,
      },
    });

    const updRoomData = await this.prisma.room.update({
      where: {
        id: findRoom.id,
      },

      data: {
        tenantId: userId,
        booked: true,
        accepted: true,
      },
    });
    const findReceiver = await this.prisma.user.findUnique({
      where: {
        id: receiverId,
      },
      select: {
        id: true,
        name: true,
      },
    });
    const findSender = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const senderKyc = await this.prisma.kyc.findUnique({
      where: {
        userId: userId,
      },
      select: {
        mobileNumber: true,
      },
    });
    text = `Hi , my name is ${findSender.name} and I would like to book your room. You can react me through my e-mail : ${findSender.email} or you can directly call me on this number:  ${senderKyc.mobileNumber}`;
    const message = await this.prisma.messages.create({
      data: {
        message: text,
        sender: { connect: { id: userId } },
        receiver: { connect: { id: receiverId } },
        senderName: findSender.name,
        receiverName: findReceiver.name,
      },
    });
    return { success: true };
  }

  async getMyRoom(userId: number) {
    const findProperty = await this.prisma.property.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!findProperty) {
      return "You don't have any property yet";
    }
    const findProp = await this.prisma.property.findUnique({
      where: {
        userId: userId,
      },
    });

    const allRoom = await this.prisma.room.findMany({
      where: {
        propertyId: findProp.id,
      },
    });
    return allRoom;
  }

  async getMyRoomById(roomId: number, userId: number) {
    const findProperty = await this.prisma.property.findFirst({
      where: {
        userId: userId,
      },
    });

    // const findRoom = await this.prisma.room.findMany({
    //   where: {
    //     propertyId: findProperty.id,
    //   },
    //   include: {
    //     property: {
    //       include: {
    //         room: {
    //           select: {
    //             cost: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    const roomById = await this.prisma.room.findFirst({
      where: {
        id: roomId,
      },
    });
    return roomById;
  }

  async getRoomById(userId: number, roomId: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      throw new ForbiddenException("You don't have room");
    }

    const findProp = await this.prisma.property.findUnique({
      where: {
        id: room.propertyId,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: findProp.userId,
      },
    });
    const kyc = await this.prisma.kyc.findUnique({
      where: {
        userId: user.id,
      },
    });
    return { room, user, kyc };
  }

  async getRoooom() {
    const allRoom = await this.prisma.room.findMany({});
    return allRoom;
  }

  async delRoom(roomId: number, userId: number) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      return 'user is invalid';
    }
    const findProperty = await this.prisma.property.findUnique({
      where: {
        userId: userId,
      },
    });
    if (findProperty) {
      const findRoom = await this.prisma.room.findMany({
        where: { propertyId: roomId },
      });

      if (findRoom) {
        const delRoom = await this.prisma.room.delete({
          where: {
            id: roomId,
          },
        });
      }
    }
    return { success: true };
  }

  async deleteImage(userId: number, imageId: number) {
    const delImage = await this.prisma.image.delete({
      where: {
        id: imageId,
      },
    });

    return { success: true };
  }

  async addMul(
    // roomDto: RoomDto,
    userId: number,
    file: Array<Express.Multer.File>,
  ) {
    const cloudImages = await this.cloudinaryService.uploadFiles(file);
    const urls = cloudImages.map((i) => {
      return i.secure_url;
    });
    // console.log(urls);
    // console.log(typeof urls);

    for (let i = 0; i < urls.length; i++) {
      const createImage = await this.prisma.image.create({
        data: {
          image: urls[i],
        },
      });
      console.log(createImage);
    }

    // console.log(cloudImages);
  }

  async comments(userId: number, id: number, commentDto: CommentDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const room = await this.prisma.room.findUnique({
      where: {
        id: id,
      },
    });
    const comment = await this.prisma.comment.create({
      data: {
        text: commentDto.text,
        commenterName: user.name, // Assign the user's name
        commenterProfileImage: user.profileImage, // Assign the user's profileImage
        userId: user.id,
        roomId: id,
      },
    });
    return { success: true };
  }

  async getComments(userId: number, id: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        id: id,
      },
    });
    const comment = await this.prisma.comment.findMany({
      where: {
        roomId: id,
      },
    });
    return comment;
  }
}
