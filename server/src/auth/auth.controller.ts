import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Param,
  Get,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseFilePipeBuilder,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDTO, AuthSignUpDTO } from './dto/auth.dto';
import { ROLE } from '@prisma/client';
import { Tokens } from './types';
import { Response } from 'express';
import { DeleteBackImageDto, KycDTO } from './dto/kyc.dto';
import { GetCurrentUserId, Public, TokenUser } from 'src/common/decorators';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiTags,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import {
  PasswordResetDTO,
  ResetPasswordDTO,
  UpdatePasswordDTO,
} from './dto/password.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('AuthController')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiOperation({
    summary: 'User has been created ',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          description: 'users first Name',
          example: 'Peter',
        },
        lastName: {
          type: 'string',
          description: 'users last Name',
          example: 'Parker',
        },
        email: {
          type: 'email',
          description: 'users email address',
          example: 'peterParker@gmail.com',
        },
        password: {
          type: 'password',
          description: 'users password',
          example: 'password',
        },
        confirmPassword: {
          type: 'password',
          description: 'users password confirmation',
          example: 'password',
        },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  // @UseInterceptors(FileInterceptor('file'))
  signUp(
    @Body() dto: AuthSignUpDTO,
    // @UploadedFile(
    //   new ParseFilePipeBuilder()
    //     .addFileTypeValidator({
    //       fileType: /(jpg|jpeg|png|gif|avif)$/,
    //     })
    //     .addMaxSizeValidator({ maxSize: 5000000 })
    //     .build({}),
    // )
    // file: Express.Multer.File,
  ): Promise<Tokens> {
    return this.authService.signup(dto, ROLE.ADMIN);
  }

  @Patch('/account/update')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Body() passwordDto: UpdatePasswordDTO,
    @GetCurrentUserId() userId: TokenUser,

    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif|avif)$/,
        })
        .addMaxSizeValidator({ maxSize: 5000000 })
        .build({}),
    )
    file: Express.Multer.File,
  ) {
    return this.authService.update(passwordDto, +userId, file);
  }
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async sigin(
    @Body() dto: AuthSignInDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Tokens> {
    const tokens = await this.authService.signin(dto, response);
    response.cookie('access_token', tokens.access_token, {
      sameSite: 'none',
      secure: process.env.PRODUCTION === 'true' ? true : false,
      httpOnly: process.env.httpOnly ? true : false,
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 180),
    });
    response.cookie('refresh_token', tokens.access_token, {
      sameSite: 'none',
      secure: process.env.PRODUCTION === 'true' ? true : false,
      httpOnly: process.env.httpOnly ? true : false,
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 180),
    });
    return tokens;
  }

  @Post('kyc')
  @UseInterceptors(FilesInterceptor('files', 2))
  kycForm(
    @GetCurrentUserId() userId: TokenUser,
    @Body() dto: KycDTO,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    // const [profile, citizenship] = files;
    return this.authService.kyc(dto, +userId, files);
  }
  @Patch('updatekyc')
  @UseInterceptors(FilesInterceptor('files', 2))
  kycUpdateForm(
    @GetCurrentUserId() userId: TokenUser,
    @Body() dto: KycDTO,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    // const [profile, citizenship] = files;
    return this.authService.kycUpdateForm(dto, +userId, files);
  }

  @Patch('kyc/delete/front')
  deleteKycFront(@GetCurrentUserId() userId: TokenUser) {
    return this.authService.deleteKycFront(+userId);
  }
  @Patch('kyc/delete/back')
  deleteKycBack(
    // @Body() dto: DeleteBackImageDto,
    @GetCurrentUserId() userId: TokenUser,
  ) {
    return this.authService.deleteKycBack(+userId);
  }

  @Get('kyc')
  getKyc(@GetCurrentUserId() userId: TokenUser) {
    return this.authService.getKyc(+userId);
  }
  @Post('logout')
  logout(@GetCurrentUserId() userId: TokenUser) {
    return this.authService.logout(+userId);
  }

  @Post('change_password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change Password' })
  @ApiForbiddenResponse({ description: 'User not found' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        current_password: {
          type: 'password',
          description: 'current password of the account',
          example: 'password',
        },
        password: {
          type: 'password',
          description: 'new password for the account',
          example: 'newpassword',
        },
      },
    },
  })
  async changepassword(
    @Body() dto: PasswordResetDTO,
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.changepassword(userId, dto);
    response.cookie('access_token', tokens.access_token, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    });
    return tokens;
  }

  @Public()
  @ApiOperation({ summary: 'Password Reset' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'email',
          description: 'The user registered email',
          example: 'client4ever@gmail.com',
        },
      },
    },
  })
  @Post('reset_password')
  @HttpCode(HttpStatus.OK)
  async reset_password(@Body() dto: ResetPasswordDTO) {
    return await this.authService.resetPassword(dto);
  }

  @Get('admin')
  getUsers() {
    return this.authService.getUsers();
  }

  @Get('user')
  async getUser(@GetCurrentUserId() userId: TokenUser) {
    return this.authService.getUser(+userId);
  }
  @Get('userandkyc')
  getUserAndKyc(@GetCurrentUserId() userId: TokenUser) {
    return this.authService.getUserAndKyc(+userId);
  }

  @Delete('admin/:id')
  async delUser(
    @GetCurrentUserId() userId: TokenUser,
    @Param('id') toBeDeletedUser: string,
  ) {
    return await this.authService.delUser(+userId, +toBeDeletedUser);
  }
}
