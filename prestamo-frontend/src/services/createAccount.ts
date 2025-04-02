export const createAccount = async (formData: any) => {
    try {
      console.log(formData)
      const response = await fetch('http://localhost:3000/api/cuenta-banco', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountNumber: formData.accountNumber,
          bankName: formData.bankName,
          userId: formData.userId,
          currencyType: formData.currencyType,
          accountType: formData.accountType,
        }),
      });
      if (!response.ok) {
        return response.json()
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };