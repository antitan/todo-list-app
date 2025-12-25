import axios from "axios";

/** @typedef {import("../dtos/taskDto").TaskDto} TaskDto */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: { 'Content-Type': 'application/json' },
});

 
/**
 * @typedef {Object} FetchTodosOptions
 * @property {number} [page]
 * @property {number} [pageSize]
 */

/**
 * @param {FetchTodosOptions} [options]
 * @returns {Promise<{todos: TaskDto[], total: number}>}
 */
export const fetchTodos = async ({ page = 1, pageSize } = {}) => {
  const response = await apiClient.get('/todos/lists', {
    params: { page, pageSize },
  });

  const data = response.data;

  if (Array.isArray(data)) {
    return { todos: data, total: data.length };
  }

  const todos = data?.items ?? data?.todos ?? [];
  const total = Number.isFinite(data?.total) ? data.total : todos.length;

  return { todos, total };
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
