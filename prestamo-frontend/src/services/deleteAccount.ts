import axios from 'axios';

export const deleteAccount = async (accountId: number) => {
  try {
    const response = await await axios.delete(`http://localhost:3000/api/cuenta-banco/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};