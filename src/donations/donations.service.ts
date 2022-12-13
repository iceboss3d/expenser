import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paystack } from 'src/helpers/paystack';
import { Repository } from 'typeorm';
import { DonationEntity } from './donations.entity';
import { NewDonationsDTO } from './dto/donations.dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectRepository(DonationEntity)
    private donationRepo: Repository<DonationEntity>,
    private paystack: Paystack,
  ) {}

  async newDonation(data: NewDonationsDTO) {
    const { amount, email, reoccurring, frequency, fullName } = data;

    try {
      const transaction = await this.paystack.initializedTransaction({
        amount: amount * 100,
        email,
        metadata: { reoccurring, frequency, fullName },
      });

      if (!transaction.status) {
        throw new Error(transaction.message);
      }

      return { authorization_url: transaction.data.authorization_url };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async verifyDonation(trxref: string) {
    try {
      const transaction = await this.paystack.verifyTransaction(trxref);

      if (!transaction.status) {
        throw new Error(transaction.message);
      }

      if (transaction.data.status !== 'success') {
        throw new Error(transaction.data.gateway_response);
      }

      const {
        amount,
        reference,
        customer: { email },
        metadata: { fullName, reoccurring, frequency },
      } = transaction.data;

      const donation = this.donationRepo.create({
        fullName,
        amount: amount / 100,
        email,
        reference,
        reoccurring: reoccurring === 'true' ? true : false,
        frequency,
      });

      await this.donationRepo.save(donation);

      return { donation };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
