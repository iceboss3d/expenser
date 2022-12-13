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

    response.data;
  }
}
