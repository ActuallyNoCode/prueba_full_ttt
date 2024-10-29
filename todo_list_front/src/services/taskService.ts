import { config } from "@/config";
import axios from "axios";

enum TaskStatus {
  IN_PROGRESS = "EN_PROGRESO",
  DONE = "COMPLETADO",
  PENDING = "PENDIENTE",
}

interface Task {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
}

export async function fetchTasks(
  token: string,
  search: string,
  filter: string
) {
  const response = await axios.get(`${config.API.BASE_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      search,
      filter,
    },
  });

  return response.data;
}

export async function getTaskById(id: string, token: string) {
  const response = await axios.get(`${config.API.BASE_URL}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

// Adjusted createTask function
export async function createTask(data: Task, token: string) {
  const response = await axios.post(`${config.API.BASE_URL}/tasks`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

// Adjusted updateTask function
export async function updateTask(id: string, data: Task, token: string) {
  const response = await axios.put(`${config.API.BASE_URL}/tasks/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

// Adjusted deleteTask function
export async function deleteTask(id: string, token: string) {
  const response = await axios.delete(`${config.API.BASE_URL}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
