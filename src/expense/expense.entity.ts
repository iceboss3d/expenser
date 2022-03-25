import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('expense')
export class ExpenseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column('numeric', {
    name: 'amount',
    nullable: false,
    precision: 10,
    scale: 2,
  })
  amount: number;

  @Column({ name: 'category', nullable: false })
  category: TCategory;

  @ManyToOne(() => UserEntity, (user) => user.expenses)
  @JoinColumn()
  user: UserEntity;
}

export type TCategory =
  | 'grocery'
  | 'clothing'
  | 'housing'
  | 'dorime'
  | 'entertainment'
  | 'other';
