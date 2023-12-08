import axios from 'axios';
const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

export default {
    async getCards() {
		const response = await axios.get(`${backendUrl}/cards`);
		return response;
    },
    async getOneCard(){
        console.log(process.env)
        const response = await axios.post(`${backendUrl}/cards/:cardId`);
        return response.data;
    },

}
