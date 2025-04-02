import axios from 'axios';

export const updateAccountUser = async (formData: any) => {
  try {
    const response = await axios.patch(`http://localhost:3000/bank-accounts/${formData.id}`, formData);
    console.log('User updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

