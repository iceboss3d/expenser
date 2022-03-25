import { Body, Controller, Get, Param, Post, Query, Res, UseGuards, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { User } from 'src/user/user.decorator';
import { ExpenseRequestDto } from './dtos/expense.dto';
import { TCategory } from './expense.entity';
import { ExpenseService } from './expense.service';

@Controller('api/expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  async create(
    @User('username') username: string,
    @Body() data: ExpenseRequestDto,
    @Res() response: Response,
  ) {
    console.log(data);

    const result = await this.expenseService.createExpense(username, data);
    response.status(result.statusCode).send(result);
    return;
  }

  @Get(':id')
  @UseGuards(new AuthGuard())
  async getExpense(
    @User('username') username: string,
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    const result = await this.expenseService.getExpense(username, id);
    response.status(result.statusCode).send(result);
  }

  @Get('category/:category')
  @UseGuards(new AuthGuard())
  async getExpensesByCategory(
    @User('username') username: string,
    @Param('category') category: TCategory,
    @Res() response: Response,
  ) {
    const result = await this.expenseService.getExpensesByCategory(
      category,
      username,
    );
    response.status(result.statusCode).send(result);
  }

  @Get()
  @UseGuards(new AuthGuard())
  async getExpenses(
    @User('username') username: string,
    @Res() response: Response,
  ) {
    const result = await this.expenseService.getExpenses(
      username
    );
    response.status(result.statusCode).send(result);
  }
}
