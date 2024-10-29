import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import User from './users.entity';

export enum TaskStatus {
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
  PENDING = 'Pending',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  @ApiProperty({ description: 'Unique identifier for the task', type: String })
  id: string;

  @Column()
  @ApiProperty({ description: 'Title of the task', type: String })
  title: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'Detailed description of the task',
    type: String,
    required: false,
  })
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  @ApiProperty({
    description: 'Current status of the task',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({
    description: 'Due date for the task',
    type: String,
    format: 'date',
    required: false,
  })
  dueDate: Date;

  @CreateDateColumn()
  @ApiProperty({
    description: 'Timestamp when the task was created',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'Timestamp when the task was last updated',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty({
    description: 'Timestamp when the task was deleted (soft delete)',
    type: String,
    format: 'date-time',
    required: false,
  })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  @ApiProperty({
    description: 'User who created the task',
    type: User,
  })
  user: User;
}
