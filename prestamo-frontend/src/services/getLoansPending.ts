import axios from "axios";

export const fetchLoansPending = async () => {
    const url = `http://localhost:3000/api/solicitud/loan/pending`;
    const response = await axios.get(url);
    return response.data;
  };