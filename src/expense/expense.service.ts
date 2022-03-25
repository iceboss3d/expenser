import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse, IGenericResponse } from 'src/helpers/apiResponse';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { ExpenseRequestDto, ExpenseResponseDto } from './dtos/expense.dto';
import { ExpenseEntity } from './expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private expensesRepository: Repository<ExpenseEntity>,
    private userService: UserService,
  ) {}

  async createExpense(
    username: string,
    data: ExpenseRequestDto,
  ): Promise<IGenericResponse<ExpenseResponseDto>> {
    try {
      const user = await this.userService.getUser(username);
      const expense = this.expensesRepository.create({ ...data, user });
      
      const savedExpense = await this.expensesRepository.save(expense);

      const { id, amount, category, description, createdAt, updatedAt } = savedExpense;
      return ApiResponse.success<ExpenseResponseDto>(
        'Expense created',
        HttpStatus.CREATED,
        {amount, category, description, createdAt, updatedAt, id},
      );
    } catch (error) {
      return ApiResponse.fail<ExpenseResponseDto>(
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
