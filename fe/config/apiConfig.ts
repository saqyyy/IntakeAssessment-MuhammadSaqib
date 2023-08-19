import { ApiEndpoints } from "../interfaces";

const BASE_URL = 'http://localhost:8000/api';

export const apiEndpoints: ApiEndpoints = {
  signup: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,
  getUser: `${BASE_URL}/auth/current-user`,
  createExpense: `${BASE_URL}/expense`,
  getExpenses: `${BASE_URL}/expense`,
  getUserExpenses: `${BASE_URL}/expense/user`,
  updateStatus: (id) => `${BASE_URL}/expense/${id}`,
  uploadImage: `${BASE_URL}/image/upload`,
};
