import axios from 'axios';
const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";

export default {
    async createOrder() {
		const response = await axios.post(`${backendUrl}/orders`);
		return response;
    },
    async getOrders() {
		const response = await axios.get(`${backendUrl}/orders`);
		return response;
    },
    async getOrders() {
		const response = await axios.get(`${backendUrl}/users/:userId/orders`);
		return response;
    },
    async getOneOrder(){
        const response = await axios.get(`${backendUrl}/orders/:orderId`);
        return response.data;
    },
    async updateOrder(){
        const response = await axios.put(`${backendUrl}/orders/:orderId`);
        return response.data;
    },
    async deleteOrder(){
        const response = await axios.delete(`${backendUrl}/orders/:orderId`);
        return response.data;
    }

}