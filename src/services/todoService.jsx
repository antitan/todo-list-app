import axios from "axios";

/** @typedef {import("../dtos/taskDto").TaskDto} TaskDto */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: { 'Content-Type': 'application/json' },
});

export const fetchTodos = async () => {
  const response = await apiClient.get('/todos/lists');
  return response.data; // TaskDto[]
};

/** @param {Pick<TaskDto, "title">} dto */
export const createTodo = async (dto) => {
  const response = await apiClient.post('/todos/add', dto);
  return response.data; // TaskDto
};

/** @param {Pick<TaskDto, "id" | "completed">} dto */
export const updateTodoStatus = async (dto) => {
  const response = await apiClient.post('/todos/update-status', dto);
  return response.data; // TaskDto
};

export const removeTodo = async (id) => {
  const response = await apiClient.delete('/todos/delete', { params: { id } });
  return response.data;
};
