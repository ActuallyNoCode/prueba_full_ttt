import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from 'src/databases/postgres/entities/tasks.entity';
import { Repository } from 'typeorm';
import User from 'src/databases/postgres/entities/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // tasks.service.ts
  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    if (!createTaskDto.status) {
      createTaskDto.status = TaskStatus.PENDING;
    }
    if (createTaskDto.dueDate === '') {
      createTaskDto.dueDate = null;
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const task = this.taskRepository.create({ ...createTaskDto, user });
    return await this.taskRepository.save(task);
  }
  async findAll(
    userId: string,
    search?: string, // Optional parameter
    filter?: TaskStatus, // Optional parameter
  ): Promise<Task[]> {
    const query = this.taskRepository
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId }) // Filter by user
      .orderBy('task.updatedAt', 'DESC'); // Order by updatedAt

    // Add search functionality if a search term is provided
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {
          search: `%${search.toLowerCase()}%`, // Convert search term to lowercase
        },
      );
    }

    // Add filter functionality if a filter is provided
    if (filter) {
      query.andWhere('task.status = :filter', { filter });
    }

    return await query.getMany(); // Execute the query and return results
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    await this.taskRepository.update(id, updateTaskDto);
    return this.taskRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    await this.taskRepository.remove(task);
  }
}
