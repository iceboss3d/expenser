import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonationEntity } from './donations.entity';
import { Paystack } from 'src/helpers/paystack';

@Module({
  providers: [DonationsService, Paystack],
  controllers: [DonationsController],
  imports: [TypeOrmModule.forFeature([DonationEntity])],
})
export class DonationsModule {}
