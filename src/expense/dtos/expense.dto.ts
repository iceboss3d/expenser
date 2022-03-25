import { IsNumber, IsString } from "class-validator";
import { TCategory } from "../expense.entity";

export class ExpenseRequestDto {
  @IsNumber()
  amount: number;

  @IsString()
  category: TCategory;

  @IsString()
  description: string;
}

export class ExpenseResponseDto {
  id: string;
  amount: number;
  category: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}