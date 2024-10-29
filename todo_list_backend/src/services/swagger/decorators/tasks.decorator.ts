import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/web/v1/auth/guards/jwt.guard';
import { Task } from 'src/databases/postgres/entities/tasks.entity';

export function TasksControllerDocs() {
  return applyDecorators(
    ApiTags('tasks'),
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard),
  );
}

export function getAllTasksDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieve all tasks for the authenticated user' }),
    ApiResponse({
      status: 200,
      description: 'List of tasks retrieved successfully',
      type: [Task],
    }),
    ApiResponse({ status: 401, description: 'Unauthorized access' }),
  );
}

export function createTaskDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new task for the authenticated user' }),
    ApiResponse({
      status: 201,
      description: 'Task created successfully',
      type: Task,
    }),
    ApiResponse({ status: 400, description: 'Bad request, validation failed' }),
    ApiResponse({ status: 401, description: 'Unauthorized access' }),
  );
}

export function getTaskDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a specific task by ID for the authenticated user',
    }),
    ApiResponse({
      status: 200,
      description: 'Task retrieved successfully',
      type: Task,
    }),
    ApiResponse({ status: 404, description: 'Task not found' }),
    ApiResponse({ status: 401, description: 'Unauthorized access' }),
  );
}

export function updateTaskDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a specific task by ID for the authenticated user',
    }),
    ApiResponse({
      status: 200,
      description: 'Task updated successfully',
      type: Task,
    }),
    ApiResponse({ status: 404, description: 'Task not found' }),
    ApiResponse({ status: 400, description: 'Bad request, validation failed' }),
    ApiResponse({ status: 401, description: 'Unauthorized access' }),
  );
}

export function deleteTaskDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a specific task by ID for the authenticated user',
    }),
    ApiResponse({ status: 204, description: 'Task deleted successfully' }),
    ApiResponse({ status: 404, description: 'Task not found' }),
    ApiResponse({ status: 401, description: 'Unauthorized access' }),
  );
}
