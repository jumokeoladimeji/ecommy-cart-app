import axios from 'axios';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const createOrder = async (orderData, token) => {
	try {
		const response = await axios.post(
			`${backendUrl}/api/v1/orders`,
			orderData);
		return response.data.data;
	} catch (error) {
		console.log('error in orders', error);
	}
};

export const getOrders = async (token) => {
	const response = await axios.get(
		`${backendUrl}/api/v1/orders`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	console.log(response);
	return response.data;
};
export const getUserOrders = async (id, token) => {
	const response = await axios.get(
		`${backendUrl}/api/v1/users/${id}/orders`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return response.data;
};
export const getOneOrder = async (id, token) => {
	const response = await axios.get(
		`${backendUrl}/api/v1/orders/${id}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return response.data.data;
};

export const updateOrder = async (
	orderId,
	orderData,
	token,
) => {
	try {
		const response = await axios.put(
			`${backendUrl}/api/v1/orders/${orderId}`,
			orderData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		console.log(response);
		return response.data;
	} catch (error) {
		console.log(error.response.data);
	}
};
export const deleteOrder = async () => {
	const response = await axios.delete(
		`${backendUrl}/api/v1/orders/:orderId`,
	);
	return response.data;
};

 