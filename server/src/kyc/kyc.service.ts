import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { KycDTO } from 'src/auth/dto/kyc.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KycService {
  constructor(private readonly prisma: PrismaService) {}
  async validateKycVerification(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // if (!user.verified) {
    //   throw new ForbiddenException('Fill in KYC Form');
    // }
    const findKyc = await this.prisma.kyc.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!findKyc) {
      throw new ForbiddenException('Fill in KYC Form');
    }
  }
}
