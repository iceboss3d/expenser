import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ExpenseEntity } from 'src/expense/expense.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ name: 'username', nullable: false, unique: true })
  username: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @OneToMany(() => ExpenseEntity, expense => expense.user)
  expenses: ExpenseEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject() {
    const { id, username, createdAt, updatedAt } = this;
    return { id, username, createdAt, updatedAt};
  }
}
