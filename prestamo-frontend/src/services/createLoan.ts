import axios from "axios";

const API_URL = "http://localhost:3000/api/solicitud";

interface LoanRequestPayload {
  userId: number;
  bankAccountId: number;
  amountRequested: number;
  termInMonths: number;
  paymentFrequency: string;
  totalLoanAmount: number;
  installments: number;
  installmentAmount: number;
}

export const createLoanRequest = async (payload: LoanRequestPayload) => {
    const response = await axios.post(API_URL, payload);
   if (response.status === 200) {
      return response.data;
    }
    return response;

};
