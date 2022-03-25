import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse, IGenericResponse } from 'src/helpers/apiResponse';
import { UserService } from 'src/user/user.service';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ExpenseRequestDto, ExpenseResponseDto } from './dtos/expense.dto';
import { ExpenseEntity, TCategory } from './expense.entity';

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

      return ApiResponse.success<ExpenseResponseDto>(
        'Expense created',
        HttpStatus.CREATED,
        savedExpense.toResponseObject(),
      );
    } catch (error) {
      return ApiResponse.fail<ExpenseResponseDto>(
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getExpense(
    username: string,
    id: string,
  ): Promise<IGenericResponse<ExpenseResponseDto>> {
    const expense = await this.expensesRepository.findOne({
      where: { id, user: { username } },
    });
    if (!expense) {
      return ApiResponse.fail<ExpenseResponseDto>('Expense not found');
    }

    return ApiResponse.success(
      'Expense Fetched',
      HttpStatus.OK,
      expense.toResponseObject(),
    );
  }

  async getExpensesByCategory(
    category: TCategory,
    username: string,
  ): Promise<IGenericResponse<ExpenseResponseDto[]>> {
    const expenses = await this.expensesRepository.find({
      where: { category, user: { username } },
    });
    const res: ExpenseResponseDto[] = [];
    expenses.forEach((expense) => {
      res.push(expense.toResponseObject());
    });
    return ApiResponse.success('Expenses fetched', HttpStatus.OK, res);
  }

  async getExpenses(
    username: string,
  ): Promise<IGenericResponse<ExpenseResponseDto[]>> {
    const expenses = await this.expensesRepository.find({
      where: { user: { username } },
    });
    const res: ExpenseResponseDto[] = [];
    expenses.forEach((expense) => {
      res.push(expense.toResponseObject());
    });
    return ApiResponse.success('Expenses fetched', HttpStatus.OK, res);
  }
}
