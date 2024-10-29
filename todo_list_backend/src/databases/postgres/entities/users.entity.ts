import {
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from './tasks.entity';

@Entity()
export default class User {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The uuid id of the User',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @ApiProperty({
    example: 'S3cur3P@ssw0rd',
    description:
      'The password of the User. This can be auto-generated if the user is created by an admin',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'user@example.com',
    description:
      'The email address of the User. Optional field | Unique field for a company',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'john_doe',
    description:
      'The username of the User. This field is optional and may represent an ID or alias | Unique field for a company',
  })
  @Column()
  username: string;

  @ApiProperty({
    example: '2023-09-30T18:00:00.000Z',
    description: 'Timestamp indicating when the User was created',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2023-10-01T18:00:00.000Z',
    description: 'Timestamp indicating when the User was last updated',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Timestamp indicating when the User was soft deleted',
  })
  @DeleteDateColumn()
  deletedAt: Date;

  // Convert email to lowercase before inserting
  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
