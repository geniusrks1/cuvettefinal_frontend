import axios from "axios";

const BASE_URL = "import.meta.env.VITE_BACKEND_URL"; 

// Configure Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email, password) => {
  const { data } = await axiosInstance.post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  return data.token;
};

export const registerUser = async (name, email, password) => {
  const { data } = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
  });
  return data;
};

export const getFolders = async () => {
  const { data } = await axiosInstance.get("/folders");
  return data;
};

export const createFolder = async (folderName) => {
  const { data } = await axiosInstance.post("/folders", { name: folderName });
  return data;
};

export const deleteFolder = async (folderId) => {
  await axiosInstance.delete(`/folders/${folderId}`);
};

export const createForm = async (folderId, formDetails) => {
  const { data } = await axiosInstance.post(`/forms/${folderId}`, formDetails);
  return data;
};

export const getFormResponses = async (formId) => {
  const { data } = await axiosInstance.get(`/forms/${formId}/responses`);
  return data;
};

export const submitForm = async (formId, submissionData) => {
  const { data } = await axiosInstance.post(`/forms/${formId}/submit`, submissionData);
  return data;
};
