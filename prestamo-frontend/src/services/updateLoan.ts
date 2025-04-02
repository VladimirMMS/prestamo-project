import axios from "axios";

export async function updateLoanStatus(id: number, status: string, reason?: string) {
    try {
        const response = await axios.patch(`http://localhost:3000/api/solicitud/gestionar/solicitudes-pendientes/${id}`, {
            observacion: reason,
            status,
        });
        console.log('User updated:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
  }