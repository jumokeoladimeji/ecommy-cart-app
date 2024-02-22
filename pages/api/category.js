import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";


export const getCategories = async () => {
    const response = await axios.get(`${backendUrl}/api/v1/categories`);
    return response.data.data;
};
export const getOneCategory = async () => {
    const response = await axios.get(`${backendUrl}/api/v1/categories/:categoryId`);
    return response.data.data;
};
export const createCategory = async () => {
    const response = await axios.post(`${backendUrl}/api/v1/categories`);
    return response;
};
export const updateCategory = async () => {
    const response = await axios.put(`${backendUrl}/api/v1/categories/:categoryId`);
    return response.data.data;
};
export const deleteCategory = async () => {
    const response = await axios.delete(`${backendUrl}/api/v1/categories/:categoryId`);
    return response.data.data;
}
