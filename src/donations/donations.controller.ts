import {
  Body,
  Controller,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { NewDonationsDTO } from './dto/donations.dto';
import { Response } from 'express';

@Controller('api/donations')
export class DonationsController {
  constructor(private donationService: DonationsService) {}

  @Post('new')
  @UsePipes(new ValidationPipe())
  async newDonation(@Body() data: NewDonationsDTO, @Res() res: Response) {
    const result = await this.donationService.newDonation(data);
    return res.status(201).send(result);
  }

  @Post('verify')
  async verifyDonation(@Query('trxref') trxref: string, @Res() res: Response) {
    const result = await this.donationService.verifyDonation(trxref);
    return res.status(200).send(result);
  }
}
