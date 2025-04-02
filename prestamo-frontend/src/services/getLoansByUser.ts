import axios from "axios";

export const fetchLoans = async (userId: number) => {
    const url = `http://localhost:3000/api/solicitud/por-usuario/${userId}`;
    const response = await axios.get(url);
    return response.data;
  };