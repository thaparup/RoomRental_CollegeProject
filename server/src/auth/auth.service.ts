import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthSignInDTO, AuthSignUpDTO } from './dto/auth.dto';
import { ROLE } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { Response } from 'express';
import { KycDTO } from './dto/kyc.dto';
import { MailService } from 'src/mail/mail.service';
import {
  PasswordResetDTO,
  ResetPasswordDTO,
  UpdatePasswordDTO,
} from './dto/password.dto';
import { retry } from 'rxjs';

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from '../cloudinary/cloudinary-response';
import { CloudinarySingleService } from 'src/cloudinary/cloudinarysingle.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { GetCurrentUserId } from 'src/common/decorators';
import { Exception } from 'handlebars';
const streamifier = require('streamifier');

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,

    private readonly cloudinarySingle: CloudinarySingleService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async signup(dto: AuthSignUpDTO, role: ROLE) {
    // const cloudImage = await this.cloudinarySingle.uploadFile(file);
    // const url = cloudImage.map((i) => {
    //   return i.secure_url;
    // });
    if (dto.password !== dto.confirmPassword) {
      throw new ForbiddenException('Password doesnot match');
    }
    try {
      const hash = await this.hashData(dto.password);

      const newUser = await this.prisma.user.create({
        data: {
          role,
          password: hash,
          email: dto.email,
          name: dto.firstName + ' ' + dto.lastName,
          // profileImage: url,
        },
      });
      const newProperty = await this.prisma.property.create({
        data: {
          userId: newUser.id, // Connect the Property to the User
          // ... other Property fields ...
        },
      });
      const tokens = await this.signToken(
        newUser.id,
        newUser.email,
        newUser.role,
      );
      await this.updateRtHash(newUser.id, tokens.refresh_token);
      return tokens;
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new ForbiddenException('user already exist');
      }
    }
  }
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async update(
    passwordDto: UpdatePasswordDTO,
    userId: number,
    file?: Express.Multer.File,
  ) {
    const cloudImage = await this.cloudinarySingle.uploadFile(file);
    if (passwordDto.password !== passwordDto.confirmPassword) {
      throw new ForbiddenException('Password doesnot match');
    }
    const findUser = file
      ? await this.prisma.user.findUnique({
          where: {
            id: userId,
          },
        })
      : null;
    if (!findUser) {
      throw new Exception("You dont't have access to update this profile");
    } else {
      const hash = await this.hashData(passwordDto.password);
      const updateProfile = await this.prisma.user.update({
        where: {
          id: findUser.id,
        },
        data: {
          profileImage: cloudImage.secure_url,
          password: hash,
        },
      });
      return { sucess: true };
    }
  }

  async getUser(userId: number) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!findUser) {
      throw new Exception("You dont't have access to update this profile");
    } else {
      return findUser;
    }
  }
  async signToken(userId: number, email: string, role: ROLE): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
          role,
        },
        {
          expiresIn: 60 * 15 * 60,
          secret: 'at-secret',
        },
      ),
      this.jwtService.signAsync(
        { id: userId, email, role },
        { expiresIn: 60 * 60 * 24 * 7, secret: 'rt-secret' },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRt: hash,
      },
    });
  }

  async signin(dto: AuthSignInDTO, response: Response): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('User not found');
    if (user.disable_by_admin) throw new ForbiddenException('User not allowed');
    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches)
      throw new ForbiddenException("Username and Password didn't match");
    const tokens = await this.signToken(user.id, user.email, user.role);
    response.cookie('token', tokens.access_token, {
      httpOnly: process.env.httpOnly === 'true' ? true : false,
      sameSite: 'none',
      secure: process.env.PRODUCTION === 'true' ? true : false,
    });
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async kyc(
    kycDTO: KycDTO,
    userId: number,
    // profile: Express.Multer.File,
    // citizenship: Express.Multer.File,
    files: Array<Express.Multer.File>,
  ) {
    const checkVerify = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    // if (checkVerify.verified == true) {
    //   throw new ForbiddenException('Your kyc is already verified');
    // }
    // const createKyc = await this.prisma.user.update({
    //   where: {
    //     id: userId,
    //   },
    //   data: {
    //     verified: true,
    //     kyc: {
    //       create: {
    //         name: kycDTO.name,
    //         occupation: kycDTO.occupation,
    //         city: kycDTO.city,
    //         fatherName_husbandName: kycDTO.fatherName_husbandName,
    //         grandFather_fatherInLaw: kycDTO.grandFather_fatherInLaw,
    //         spouseName: kycDTO.spouseName,
    //         panNumber: kycDTO.panNumber,
    //         landlineNumber: kycDTO.landlineNumber,
    //         district: kycDTO.district,
    //         mobileNumber: kycDTO.mobileNumber,
    //         permanentAddress: kycDTO.permanentAddress,
    //         temporaryAddress: kycDTO.temporaryAddress,
    //         documentImage: kycDTO.documentImage,
    //         province: kycDTO.province,
    //         gender: kycDTO.gender,
    //         dob: kycDTO.dob,
    //       },
    //     },
    //   },
    // });
    // return createKyc;
    // const citizenshipImage = await this.cloudinarySingle.uploadFile(
    //   citizenship,
    // );
    // const profileImage = await this.cloudinarySingle.uploadFile(profile);
    const cloudImages = await this.cloudinaryService.uploadFiles(files);
    const urls = cloudImages.map((i) => {
      return i.secure_url;
    });

    if (checkVerify.verified === true) {
      throw new ForbiddenException('You already have your KYC');
    }
    if (checkVerify.verified === false) {
      const kycFill = await this.prisma.kyc.create({
        data: {
          name: kycDTO.name,
          occupation: kycDTO.occupation,
          city: kycDTO.city,
          fatherName_husbandName: kycDTO.fatherName_husbandName,
          grandFather_fatherInLaw: kycDTO.grandFather_fatherInLaw,
          spouseName: kycDTO.spouseName,
          panNumber: kycDTO.panNumber,
          landlineNumber: kycDTO.landlineNumber,
          district: kycDTO.district,
          mobileNumber: kycDTO.mobileNumber,
          permanentAddress: kycDTO.permanentAddress,
          temporaryAddress: kycDTO.temporaryAddress,
          profileImage: urls[1],
          documentImage: urls[0],
          province: kycDTO.province,
          gender: kycDTO.gender,
          dob: kycDTO.dob,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    const updUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        verified: true,
      },
    });
  }
  async kycUpdateForm(
    kycDTO: KycDTO,
    userId: number,

    files: Array<Express.Multer.File>,
  ) {
    const checkVerify = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    const cloudImages = await this.cloudinaryService.uploadFiles(files);
    const urls = cloudImages.map((i) => {
      return i.secure_url;
    });

    const kycUpdate = await this.prisma.kyc.update({
      where: {
        userId: checkVerify.id,
      },
      data: {
        name: kycDTO.name,
        occupation: kycDTO.occupation,
        city: kycDTO.city,
        fatherName_husbandName: kycDTO.fatherName_husbandName,
        grandFather_fatherInLaw: kycDTO.grandFather_fatherInLaw,
        spouseName: kycDTO.spouseName,
        panNumber: kycDTO.panNumber,
        landlineNumber: kycDTO.landlineNumber,
        district: kycDTO.district,
        mobileNumber: kycDTO.mobileNumber,
        permanentAddress: kycDTO.permanentAddress,
        temporaryAddress: kycDTO.temporaryAddress,
        profileImage: urls[1],
        documentImage: urls[0],
        province: kycDTO.province,
        gender: kycDTO.gender,
        dob: kycDTO.dob,
      },
    });

    return { success: true };
  }

  async getKyc(userId: number) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const findKyc = await this.prisma.kyc.findUnique({
      where: {
        userId: findUser.id,
      },
    });
    return findKyc;
  }

  async deleteKycFront(userId: number) {
    const finduser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const nullProfileImage = await this.prisma.kyc.update({
      where: {
        userId: finduser.id,
      },
      data: {
        profileImage: null,
      },
    });

    return { success: true };
  }

  async deleteKycBack(userId: number) {
    const finduser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const nullCitizenshipImage = await this.prisma.kyc.update({
      where: {
        userId: finduser.id,
      },
      data: {
        documentImage: null,
      },
    });

    return { success: true };
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashRt: {
          not: null,
        },
      },
      data: {
        hashRt: null,
      },
    });
    return 'Logged out';
  }

  async changepassword(userId: number, dto: PasswordResetDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('User not found');
    // if (user.disabled_by_admin)
    //   throw new ForbiddenException('User not allowed');
    const passwordMatches = await bcrypt.compare(
      dto.current_password,
      user.password,
    );
    if (!passwordMatches)
      throw new UnauthorizedException('Password did not match');

    const hash = await this.hashData(dto.password);

    const updateUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hash,
        password_reset: false,
      },
    });
    const tokens = await this.signToken(
      updateUser.id,
      updateUser.email,
      updateUser.role,
    );
    await this.updateRtHash(updateUser.id, tokens.refresh_token);
    return tokens;
  }

  async resetPassword(dto: ResetPasswordDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    // if (user.disabled_by_admin) {
    //   throw new ForbiddenException(
    //     'Could not send email. Please contact admin',
    //   );
    // }
    const plainPassword = Math.random().toString(36).substring(2, 10);
    const pwd = await this.hashData(plainPassword);
    await this.prisma.user.update({
      where: {
        email: dto.email,
      },
      data: {
        password: pwd,
        password_reset: true,
      },
    });
    await this.mailService.sendResetEmail(user, plainPassword);
    return { success: true };
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        verified: true,
      },
    });

    return users;
  }

  async getUserAndKyc(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        id: true,
      },
    });
    const kyc = await this.prisma.kyc.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        // profileImage: true,
      },
    });
    return { user, kyc };
  }

  async delUser(userId: number, toBeDeletedUser: number) {
    const checkSuperAdmin = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (checkSuperAdmin.role === 'SUPERADMIN') {
      await this.prisma.user.delete({
        where: {
          id: toBeDeletedUser,
        },
      });
    } else {
      throw new ForbiddenException(`You dont't have the access to do that`);
    }

    // if (checkSuperAdmin.role === 'ADMIN') {
    //   const del = await this.prisma.user.delete({
    //     where: {
    //       id: toBeDeletedUser,
    //     },
    //   });
    // }

    //  else {

    //   throw new ForbiddenException(`You dont't have the access to do that`);
    // }
    // return checkSuperAdmin;
  }
}
