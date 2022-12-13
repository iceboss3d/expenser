import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class NewDonationsDTO {
  @IsString()
  fullName: string;

  @IsString()
  email: string;

  @IsNumber()
  amount: number;

  @IsBoolean()
  reoccurring: boolean;

  @IsOptional()
  @IsString()
  frequency: 'month' | 'year';
}
