export const signUpUser = async (formData: any) => {
    const formDataToSend = new FormData();
    formDataToSend.append("file", formData.fotoCedula as File);
    formDataToSend.append("nombre", formData.nombre);
    formDataToSend.append("apellido", formData.apellido);
    formDataToSend.append("cedula", formData.cedula);
    formDataToSend.append("correo", formData.correo);
    formDataToSend.append("contrasena", formData.contraseña);
    formDataToSend.append("fechaNacimiento", formData.fechaNacimiento?.toISOString() || "");
    formDataToSend.append("direccion", formData.direccion);
    formDataToSend.append("nacionalidadId", String(formData.nacionalidadId));
    formDataToSend.append("provinciaId", String(formData.provinciaId));

    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        return response.json()
      }

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };