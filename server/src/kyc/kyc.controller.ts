import { Body, Controller, Post } from '@nestjs/common';
import { KycService } from './kyc.service';
import { KycDTO } from 'src/auth/dto/kyc.dto';
import { GetCurrentUserId, TokenUser } from 'src/common/decorators';

@Controller('auth/kyc')
export class Kyc {
  constructor(private kycService: KycService) {}

  //   @Post('')
  //   addKyc(@Body() kycDto: KycDTO, @GetCurrentUserId() userId: TokenUser) {
  //     return this.kycService.addKyc(kycDto, +userId);
  //   }
}
