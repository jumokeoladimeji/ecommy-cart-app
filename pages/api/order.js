import axios from 'axios';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const createOrder = async (orderData) => {
	const response = await axios.post(
		`${backendUrl}/api/v1/orders`,
		orderData,
	);
	return response;
};

export const getOrders = async () => {
	const response = await axios.get(
		`${backendUrl}/api/v1/orders`,
	);
	return response;
};
export const getUserOrders = async ({ id }) => {
	const response = await axios.get(
		`${backendUrl}/api/v1/users/${id}/orders`,
	);
	return response;
};
export const getOneOrder = async () => {
	const response = await axios.get(
		`${backendUrl}/orders/:orderId`,
	);
	return response.data;
};
export const updateOrder = async (orderId, orderData) => {
	const response = await axios.put(
		`${backendUrl}/api/v1/orders/${orderId}`,
		orderData,
	);
	return response.data;
};
export const deleteOrder = async () => {     
    const response = await axios.delete(`${backendUrl}/orders/:orderId`);
    return response.data;
};

 