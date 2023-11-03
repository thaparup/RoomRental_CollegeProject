import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CloudinaryService } from './../../cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { HouseDto } from '../dto/house.dto';
import { KycService } from 'src/kyc/kyc.service';

@Injectable()
export class HouseService {
  constructor(
    private prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private kycService: KycService,
  ) {}

  async createImagesHouse(
    userId: number,
    houseId: number,
    file: Array<Express.Multer.File>,
  ) {
    const findProperty = await this.prisma.property.findFirst({
      where: {
        userId: userId,
      },
    });

    const findLand = await this.prisma.house.findFirst({
      where: {
        id: houseId,
      },
      select: {
        propertyId: true,
      },
    });

    if (!findProperty) {
      throw new NotFoundException('Property doesnot exist');
    }
    if (!findLand) {
      throw new NotFoundException('House doesnot exist');
    } else if (findLand.propertyId != findProperty.id) {
      throw new NotFoundException('House doesnot exist');
    }
    const cloudImages = await this.cloudinaryService.uploadFiles(file);
    const urls = cloudImages.map((i) => {
      return i.secure_url;
    });
    for (let i = 0; i < urls.length; i++) {
      const createImage = await this.prisma.image.create({
        data: {
          image: urls[i],
          House: {
            connect: { id: houseId },
          },
        },
      });
    }
  }

  async addHouse(
    houseDto: HouseDto,
    userId: number,
    file: Array<Express.Multer.File>,
  ) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      throw new NotFoundException('User doesnot exist');
    }
    this.kycService.validateKycVerification(userId);
    const cloudImages = await this.cloudinaryService.uploadFiles(file);
    const urls = cloudImages.map((i) => {
      return i.secure_url;
    });

    const newHouse = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        property: {
          upsert: {
            create: {
              house: {
                create: {
                  title: houseDto.title,
                  type: houseDto.type,
                  occupancy: houseDto.occupancy,
                  bathRoom: houseDto.bathRoom,
                  bedRoom: houseDto.bedRoom,
                  address: houseDto.address,
                  diningRoom: houseDto.diningRoom,
                  kitchen: houseDto.kitchen,
                  livingRoom: houseDto.livingRoom,
                  hall: houseDto.hall,
                  area: houseDto.area,
                  yearBuilt: houseDto.yearBuilt,
                  price: houseDto.price,
                  listingDate: houseDto.listingDate,
                  closingDate: houseDto.closingDate,
                  description: houseDto.description,
                  feature: houseDto.feature,
                  facilities: houseDto.facilities,
                  facilitiesArray: houseDto.facilitiesArray,
                },
              },
            },
            update: {
              house: {
                create: {
                  title: houseDto.title,
                  type: houseDto.type,
                  occupancy: houseDto.occupancy,
                  bathRoom: houseDto.bathRoom,
                  bedRoom: houseDto.bedRoom,
                  address: houseDto.address,
                  diningRoom: houseDto.diningRoom,
                  kitchen: houseDto.kitchen,
                  livingRoom: houseDto.livingRoom,
                  hall: houseDto.hall,
                  area: houseDto.area,
                  yearBuilt: houseDto.yearBuilt,
                  price: houseDto.price,
                  listingDate: houseDto.listingDate,
                  closingDate: houseDto.closingDate,
                  description: houseDto.description,
                  feature: houseDto.feature,
                  facilities: houseDto.facilities,
                  facilitiesArray: houseDto.facilitiesArray,
                },
              },
            },
          },
        },
      },
      select: {
        id: true,
        property: {
          select: {
            house: {
              select: {
                id: true,
              },
              orderBy: { id: 'desc' },
            },
          },
        },
      },
    });
    const newId = newHouse.property.house;
    const latestId = newId[0];
    const newHouseId: number = latestId.id;
    for (let i = 0; i < urls.length; i++) {
      const createImage = await this.prisma.image.create({
        data: {
          image: urls[i],
          House: {
            connect: { id: newHouseId }, // Setting  the houseid for each image
          },
        },
      });
    }
    return { success: true };
  }

  async getImagesForHouse(houseId: number, userId: number) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!findUser) {
      throw new ForbiddenException('You are not authorized');
    }

    const findProp = await this.prisma.property.findUnique({
      where: {
        userId: findUser.id,
      },
    });
    if (!findProp) {
      throw new ForbiddenException('This property doesnot belong to you');
    }
    const findHouseOwned = await this.prisma.house.findMany({
      where: {
        propertyId: findProp.id,
      },
      select: {
        id: true,
      },
    });
    const getImages = await this.prisma.image.findMany({
      where: {
        houseId: houseId,
      },
    });
    if (!getImages) {
      throw new BadRequestException('The image doesnot belong to you');
    }
    return getImages;
  }

  async getSingleImageForHouse(houseId: number, userId: number) {
    const findRoomOwned = await this.prisma.house.findMany();

    const array = findRoomOwned.map((i) => i.id);

    const imageArray = [];

    for (let i = 0; i < array.length; i++) {
      const findAllImageByLandId = await this.prisma.image.findFirst({
        where: {
          houseId: array[i],
        },
      });
      if (findAllImageByLandId) {
        imageArray.push(findAllImageByLandId);
      }
    }
    console.log(imageArray);
    return imageArray;
  }

  async deleteImageHouse(userId: number, imageId: number) {
    const delImage = await this.prisma.image.delete({
      where: {
        id: imageId,
      },
    });

    return { success: true };
  }

  async getHouse() {
    const allHouse = await this.prisma.house.findMany({});
    return allHouse;
  }

  async getMyHouse(userId: number) {
    const findProperty = await this.prisma.property.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!findProperty) {
      throw new NotFoundException('Property doesnot exist');
    }

    const allHouse = await this.prisma.house.findMany({
      where: {
        propertyId: findProperty.id,
      },
    });
    return allHouse;
  }
  async bookHouse(book: boolean, houseId: number, userId: number) {
    const findHouse = await this.prisma.house.findFirst({
      where: {
        id: houseId,
      },
      select: {
        propertyId: true,
        id: true,
      },
    });

    const updHouseData = await this.prisma.house.update({
      where: {
        id: findHouse.id,
      },

      data: {
        booked: true,
      },
    });
    // return { success: true };
  }
  async getMyHouseById(houseId: number, userId: number) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!findUser) {
      throw new ForbiddenException('You are not authorized');
    }

    const findProp = await this.prisma.property.findUnique({
      where: {
        userId: findUser.id,
      },
    });
    if (!findProp) {
      throw new ForbiddenException('This property doesnot belong to you');
    }
    const findManyHouse = await this.prisma.house.findMany({
      where: {
        propertyId: findProp.id,
      },
      select: {
        id: true,
      },
    });

    const findSingleHouse = await this.prisma.house.findUnique({
      where: {
        id: houseId,
      },
    });
    if (!findSingleHouse) {
      throw new BadRequestException('This house doesnot belong to you');
    }
    return findSingleHouse;
  }

  async getHouseById(userId: number, houseId: number) {
    const house = await this.prisma.house.findUnique({
      where: {
        id: houseId,
      },
    });

    const findProp = await this.prisma.property.findUnique({
      where: {
        id: house.propertyId,
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
    return { house, user, kyc };
  }
  async updateHouse(houseDto: HouseDto, houseId: number, userId: number) {
    const findProperty = await this.prisma.property.findFirst({
      where: {
        userId: userId,
      },
    });

    const findHouse = await this.prisma.house.findFirst({
      where: {
        id: houseId,
      },
      select: {
        propertyId: true,
      },
    });

    if (!findProperty) {
      throw new NotFoundException('Property doesnot exist');
    }
    if (!findHouse) {
      throw new NotFoundException('House doesnot exist');
    } else if (findHouse.propertyId != findProperty.id) {
      throw new NotFoundException('House doesnot exist');
    }
    const updHouseData = await this.prisma.house.update({
      where: {
        id: houseId,
      },
      data: {
        title: houseDto.title,
        type: houseDto.type,
        occupancy: houseDto.occupancy,
        bathRoom: houseDto.bathRoom,
        bedRoom: houseDto.bedRoom,
        address: houseDto.address,
        diningRoom: houseDto.diningRoom,
        kitchen: houseDto.kitchen,
        livingRoom: houseDto.livingRoom,
        hall: houseDto.hall,
        area: houseDto.area,
        yearBuilt: houseDto.yearBuilt,
        price: houseDto.price,
        listingDate: houseDto.listingDate,
        closingDate: houseDto.closingDate,
        description: houseDto.description,
        feature: houseDto.feature,
        facilities: houseDto.facilities,
        facilitiesArray: houseDto.facilitiesArray,
      },
    });

    // if (files && files.length > 0) {
    //   const cloudImages = await this.cloudinaryService.uploadFiles(files);
    //   const urls = cloudImages.map((i) => i.secure_url);

    //   const createImages = [];
    //   for (let i = 0; i < urls.length; i++) {
    //     createImages.push({
    //       image: urls[i],
    //       Image: {
    //         connect: { id: houseId },
    //       },
    //     });
    //   }

    //   updHouseData.Image = {
    //     create: urls.map((url) => ({
    //       image: url,
    //     })),
    //   };
    // }

    // const updHouse = await this.prisma.house.update({
    //   where: {
    //     id: houseId,
    //   },
    //   data: updHouseData,
    // });

    return { sucdess: true };
  }

  async deleteHouse(userId: number, houseId: number) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (findUser) {
      const findHouse = await this.prisma.house.findFirst({
        where: {
          id: houseId,
        },
      });
      if (!findHouse) {
        throw new NotFoundException('House doesnot exist');
      }

      await this.prisma.house.delete({
        where: {
          id: houseId,
        },
      });
    } else {
      const findProperty = await this.prisma.property.findFirst({
        where: {
          userId: userId,
        },
      });

      const findHouse = await this.prisma.house.findFirst({
        where: {
          id: houseId,
        },
        select: {
          propertyId: true,
        },
      });

      if (!findProperty) {
        throw new NotFoundException('Property doesnot exist');
      }
      if (!findHouse) {
        throw new NotFoundException('House doesnot exist');
      } else if (findHouse.propertyId != findProperty.id) {
        throw new NotFoundException('House doesnot exist');
      }
      await this.prisma.house.delete({
        where: {
          id: houseId,
        },
      });
      return { success: true };
    }
  }
}
