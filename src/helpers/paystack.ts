import axios from 'axios';

export interface IInitializeTransaction {
  amount: number;
  email: string;
  reference?: string;
  callback_url?: string;
  metadata?: Record<string, any>;
}

export class Paystack {
  API_URL = 'https://api.paystack.co';
  API_KEY = process.env.PAYSTACK_SECRET_KEY;

  async initializedTransaction(data: IInitializeTransaction) {
    const response = await axios.post(
      `${this.API_URL}/transaction/initialize`,
      data,
      {
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }

  async verifyTransaction(reference: string) {
    const response = await axios.get(
      `${this.API_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }
}
