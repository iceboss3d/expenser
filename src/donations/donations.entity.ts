import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('donation')
export class DonationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ name: 'fullName', nullable: false })
  fullName: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @Column({ name: 'reference', nullable: false })
  reference: string;

  @Column({ name: 'reoccurring', nullable: false, default: false })
  reoccurring: boolean;

  @Column({ name: 'frequency', nullable: true })
  frequency: 'month' | 'year';
}
