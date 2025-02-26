import axios from "axios";
import { MenuItem } from "../types";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const menuService = {
  getAll: () => api.get<MenuItem[]>("/menu"),
};
