export const loginUser = async (payload: { email: string; password: string }) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
    });

    if (!response.ok) {
      return response.json();
    }

    return await response.json();
  } catch (error) {
    console.error("Error en loginUser:", error);
    throw error;
  }
};
