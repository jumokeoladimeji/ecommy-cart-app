import axios from 'axios';
const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";


export const getCategories = async () => {
    const response = await axios.get(`${backendUrl}/api/v1/categories`);
    // console.log('response', response.data.data)
    return response.data.data;
};
export const getOneCategory = async () => {
    console.log(process.env)
    const response = await axios.get(`${backendUrl}/api/v1/categories/:categoryId`);
    return response.data;
};
export const createCategory = async () => {
    const response = await axios.post(`${backendUrl}/api/v1/categories`);
    return response;
};
export const updateCategory = async () => {
    console.log(process.env)
    const response = await axios.put(`${backendUrl}/api/v1/categories/:categoryId`);
    return response.data;
};
export const deleteCategory = async () => {
    console.log(process.env)
    const response = await axios.delete(`${backendUrl}/api/v1/categories/:categoryId`);
    return response.data;
}
