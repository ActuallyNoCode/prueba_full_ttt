import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import User from 'src/databases/postgres/entities/users.entity';
import { TaskStatus } from 'src/databases/postgres/entities/tasks.entity';
import {
  createTaskDocs,
  deleteTaskDocs,
  getAllTasksDocs,
  getTaskDocs,
  TasksControllerDocs,
  updateTaskDocs,
} from 'src/services/swagger/decorators/tasks.decorator';

@TasksControllerDocs()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // tasks.controller.ts
  @createTaskDocs()
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const user = req.user as User;
    return this.tasksService.create(createTaskDto, user.id);
  }

  @getAllTasksDocs()
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Req() req: Request,
    @Query('search') search?: string,
    @Query('filter') filter?: TaskStatus,
  ) {
    const user = req.user as User;
    return this.tasksService.findAll(user.id, search, filter);
  }

  @getTaskDocs()
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    return this.tasksService.findOne(id, user.id);
  }

  @updateTaskDocs()
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.tasksService.update(id, updateTaskDto, user.id);
  }

  @deleteTaskDocs()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as User;
    return this.tasksService.remove(id, user.id);
  }
}
