import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { ExpenseController } from './expense.controller';
import { ExpenseEntity } from './expense.entity';
import { ExpenseService } from './expense.service';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService, UserService],
  imports: [TypeOrmModule.forFeature([ExpenseEntity, UserEntity])]
})
export class ExpenseModule {}
