import axios from 'axios';
const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";


export const getCards = async () => {      
  const response = await axios.get(`${backendUrl}/cards`);
  return response;
};

export const getOneCard = async (cardId) => {   
  const response = await axios.post(`${backendUrl}/cards/:cardId`);
  return response.data.data;
}

export const createCard = async (cardData) => {   
  const response = await axios.post(`${backendUrl}/cards`, cardData);
  return response.data;
}

export const updateCard = async (cardData) => {     
  const response = await axios.put(`${backendUrl}/cards/:cardId`, cardData);
  return response.data;
};
export const deleteCard = async () => {     
  const response = await axios.delete(`${backendUrl}/cards/:cardId`);
  return response.data;
};
