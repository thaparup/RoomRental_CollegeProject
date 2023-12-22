import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CloudinaryService } from './../../cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { LandDto } from '../dto/land.dto';
import { KycService } from 'src/kyc/kyc.service';
import { clearScreenDown } from 'readline';

@Injectable()
export class LandService {
  constructor(
    private prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private kycService: KycService,
  ) {}

  async addLand(
    landDto: LandDto,
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

    const newLand = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        property: {
          upsert: {
            create: {
              land: {
                create: {
                  title: landDto.title,
                  address: landDto.address,
                  area: landDto.area,
                  cost: landDto.cost,
                  type: landDto.type,
                  facedOn: landDto.facedOn,
                  distanceFromRoad: landDto.distanceFromRoad,
                  nameOfRoad: landDto.nameOfRoad,
                  description: landDto.description,
                  facilities: landDto.facilities,
                  reservations: landDto.reservations,
                },
              },
            },
            update: {
              land: {
                create: {
                  title: landDto.title,
                  address: landDto.address,
                  area: landDto.area,
                  cost: landDto.cost,
                  type: landDto.type,
                  facedOn: landDto.facedOn,
                  distanceFromRoad: landDto.distanceFromRoad,
                  nameOfRoad: landDto.nameOfRoad,
                  description: landDto.description,
                  facilities: landDto.facilities,
                  reservations: landDto.reservations,
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
            land: {
              select: {
                id: true,
              },
              orderBy: { id: 'desc' },
            },
          },
        },
      },
    });
    const newId = newLand.property.land;
    const latestId = newId[0];
    const newLandId: number = latestId.id;
    for (let i = 0; i < urls.length; i++) {
      const createImage = await this.prisma.image.create({
        data: {
          image: urls[i],
          Land: {
            connect: { id: newLandId }, // Setting  the houseid for each image
          },
        },
      });
    }
    return { success: true };
  }

  async getImagesForLand(landId: number, userId: number) {
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
    const findLandOwned = await this.prisma.land.findMany({
      where: {
        propertyId: findProp.id,
      },
      select: {
        id: true,
      },
    });
    const getImages = await this.prisma.image.findMany({
      where: {
        landId: landId,
      },
    });
    if (!getImages) {
      throw new BadRequestException('The image doesnot belong to you');
    }
    return getImages;
  }

  async createImagesLand(
    userId: number,
    landId: number,
    file: Array<Express.Multer.File>,
  ) {
    console.log(typeof userId);
    console.log('land ' + landId);

    const findProperty = await this.prisma.property.findFirst({
      where: {
        userId: userId,
      },
    });
    console.log(findProperty);

    const findLand = await this.prisma.land.findFirst({
      where: {
        id: landId,
      },
      select: {
        propertyId: true,
      },
    });
    console.log(findLand);

    if (!findProperty) {
      throw new NotFoundException('Property doesnot exist');
    }
    if (!findLand) {
      throw new NotFoundException('Land doesnot exist');
    } else if (findLand.propertyId != findProperty.id) {
      throw new NotFoundException(' Land dosnot exist');
    }
    const cloudImages = await this.cloudinaryService.uploadFiles(file);
    const urls = cloudImages.map((i) => {
      return i.secure_url;
    });
    for (let i = 0; i < urls.length; i++) {
      const createImage = await this.prisma.image.create({
        data: {
          image: urls[i],
          Land: {
            connect: { id: landId },
          },
        },
      });
    }
  }

  async updateLand(landDto: LandDto, landId: number, userId: number) {
    const findProperty = await this.prisma.property.findFirst({
      where: {
        userId: userId,
      },
    });

    const findLand = await this.prisma.land.findFirst({
      where: {
        id: landId,
      },
      select: {
        propertyId: true,
      },
    });

    if (!findProperty) {
      throw new NotFoundException('Property doesnot exist');
    }
    if (!findLand) {
      throw new NotFoundException('Land doesnot exist');
    } else if (findLand.propertyId != findProperty.id) {
      throw new NotFoundException(' Land dosnot exist');
    }

    const updLand = await this.prisma.land.update({
      where: {
        id: landId,
      },
      data: {
        title: landDto.title,
        address: landDto.address,
        area: landDto.area,
        cost: landDto.cost,
        type: landDto.type,
        facedOn: landDto.facedOn,
        distanceFromRoad: landDto.distanceFromRoad,
        nameOfRoad: landDto.nameOfRoad,
        description: landDto.description,
        facilities: landDto.facilities,
      },
    });
  }

  async getSingleImageForLand(userId: number) {
    const findLandOwned = await this.prisma.land.findMany();

    const array = findLandOwned.map((i) => i.id);

    const imageArray = [];

    for (let i = 0; i < array.length; i++) {
      const findAllImageByLandId = await this.prisma.image.findFirst({
        where: {
          landId: array[i],
        },
      });
      if (findAllImageByLandId) {
        imageArray.push(findAllImageByLandId);
      }
    }
    return imageArray;
  }

  async deleteImageLand(userId: number, imageId: number) {
    const delImage = await this.prisma.image.delete({
      where: {
        id: imageId,
      },
    });

    return { success: true };
  }

  async getLand() {
    const allLand = await this.prisma.land.findMany({});
    return allLand;
  }

  async getMyLand(userId: number) {
    const findProperty = await this.prisma.property.findFirst({
      where: {
        userId: userId,
      },
    });
    if (!findProperty) {
      throw new NotFoundException('Property doesnot exist');
    }

    const allLand = await this.prisma.land.findMany({
      where: {
        propertyId: findProperty.id,
      },
    });
    return allLand;
  }

  async getLandById(userId: number, landId: number) {
    const land = await this.prisma.land.findUnique({
      where: {
        id: landId,
      },
    });

    console.log(land.propertyId);
    const findProp = await this.prisma.property.findUnique({
      where: {
        id: land.propertyId,
      },
    });
    console.log(findProp);
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
    return { land, user, kyc };
  }

  async getMyLandById(landId: number, userId: number) {
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
    const findManyLand = await this.prisma.land.findMany({
      where: {
        propertyId: findProp.id,
      },
      select: {
        id: true,
      },
    });

    const findSingleLand = await this.prisma.land.findUnique({
      where: {
        id: landId,
      },
    });
    if (!findSingleLand) {
      throw new BadRequestException('This land doesnot belong to you');
    }
    return findSingleLand;
  }

  // async updateLand(
  //   landDto: LandDto,
  //   landId: number,
  //   userId: number,
  //   file: Array<Express.Multer.File>,
  // ) {
  //   const findProperty = await this.prisma.property.findFirst({
  //     where: {
  //       userId: userId,
  //     },
  //   });

  //   const findLand = await this.prisma.land.findFirst({
  //     where: {
  //       id: landId,
  //     },
  //     select: {
  //       propertyId: true,
  //     },
  //   });

  //   if (!findProperty) {
  //     throw new NotFoundException('Property doesnot exist');
  //   }
  //   if (!findLand) {
  //     throw new NotFoundException('Land doesnot exist');
  //   } else if (findLand.propertyId != findProperty.id) {
  //     throw new NotFoundException(' Land dosnot exist');
  //   }

  //   if (!file) {
  //     throw new BadRequestException('File is not an image');
  //   }
  //   const updLand = await this.prisma.land.update({
  //     where: {
  //       id: landId,
  //     },
  //     data: {
  //       title: landDto.title,
  //       address: landDto.address,
  //       area: landDto.area,
  //       cost: landDto.cost,
  //       type: landDto.type,
  //       facedOn: landDto.facedOn,
  //       distanceFromRoad: landDto.distanceFromRoad,
  //       nameOfRoad: landDto.nameOfRoad,
  //       description: landDto.description,
  //     },
  //   });
  //   const cloudImages = await this.cloudinaryService.uploadFiles(file);
  //   const urls = cloudImages.map((i) => {
  //     return i.secure_url;
  //   });

  //   for (let i = 0; i < urls.length; i++) {
  //     const createImage = await this.prisma.image.create({
  //       data: {
  //         image: urls[i],
  //         Land: {
  //           connect: { id: landId },
  //         },
  //       },
  //     });
  //   }
  // }

  async deleteLand(userId: number, landId: number) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (findUser) {
      const findLand = await this.prisma.land.findFirst({
        where: {
          id: landId,
        },
      });
      if (!findLand) {
        throw new NotFoundException('Land doesnot exist');
      }

      await this.prisma.land.delete({
        where: {
          id: landId,
        },
      });
    } else {
      const findProperty = await this.prisma.property.findFirst({
        where: {
          userId: userId,
        },
      });

      const findLand = await this.prisma.land.findFirst({
        where: {
          id: landId,
        },
        select: {
          propertyId: true,
        },
      });

      if (!findProperty) {
        throw new NotFoundException('Property doesnot exist');
      }
      if (!findLand) {
        throw new NotFoundException('Land doesnot exist');
      } else if (findLand.propertyId != findProperty.id) {
        throw new NotFoundException('Land doesnot exist');
      }
      await this.prisma.land.delete({
        where: {
          id: landId,
        },
      });
      return { success: true };
    }
  }
}
