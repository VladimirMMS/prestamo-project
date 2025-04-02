import axios from "axios";

export const fetchAccounts = async (userId: number) => {
    const url = `http://localhost:3000/api/cuenta-banco/by/${userId}`;
    const response = await axios.get(url);
    return response.data;
  };