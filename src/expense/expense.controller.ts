import { Body, Controller, Get, Param, Post, Res, UseGuards, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { User } from 'src/user/user.decorator';
import { ExpenseRequestDto } from './dtos/expense.dto';
import { ExpenseService } from './expense.service';

@Controller('api/expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) { }
  
  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  async create(@User('username') username: string, @Body() data: ExpenseRequestDto, @Res() response: Response) {
    console.log(data);
    
    const result = await this.expenseService.createExpense(username, data);
    response.status(result.statusCode).send(result);
    return;
  }

  @Get(":id")
  @UseGuards(new AuthGuard())
  async getExpense(@User('username') username: string, @Param("id") id: string, @Res() response: Response) {
    const result = await this.expenseService.getExpense(username, id);
    response.status(result.statusCode).send(result);
  }
}
