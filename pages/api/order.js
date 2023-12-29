import axios from 'axios';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const createOrder = async () => {     
  const response = await axios.post(`${backendUrl}/orders`);
  return response;
};
export const getOrders = async () => {     
const response = await axios.get(`${backendUrl}/orders`);
return response;
};
export const getUserOrders = async () => {     
const response = await axios.get(`${backendUrl}/users/:userId/orders`);
return response;
};
export const getOneOrder = async () => {     
    const response = await axios.get(`${backendUrl}/orders/:orderId`);
    return response.data;
};
export const updateOrder = async () => {     
    const response = await axios.put(`${backendUrl}/orders/:orderId`);
    return response.data;
};
export const deleteOrder = async () => {     
    const response = await axios.delete(`${backendUrl}/orders/:orderId`);
    return response.data;
};

