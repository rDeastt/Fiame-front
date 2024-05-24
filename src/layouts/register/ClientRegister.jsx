import "./registerClient.css"
import {useState} from "react";
import axios from "axios";
import {urlGlobal} from "../../environment/env.js";
export const ClientRegister = () => {

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        dni: '',
        credit_limit:30,
        email: '',
        password: ''
    });
    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita la recarga de la página
        const { name, lastname,dni,credit_limit,email,password } = formData;
        const type = "Cliente";
        try {
            // Registra el usuario
            const userResponse = await axios.post(urlGlobal + 'User/signup', { email, password, type });
            const userId = userResponse.data.id;

            // Registra el negocio asociado al usuario
            await axios.post(urlGlobal + 'client', { name, lastname,dni,credit_limit, user: { id: userId } });

            console.log('Registro exitoso');
            // Puedes redirigir al usuario a una página de éxito aquí
        } catch (error) {
            console.error('Error al registrar:', error);
            // Maneja errores aquí (por ejemplo, muestra un mensaje de error)
        }
    };
    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <div className="container">
                <div className="image"></div>
                <div className="form-wrapper">
                    <div className="form-container">
                        <h2>Registro de Cliente</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text"
                                   name={"name"}
                                   value={formData.name}
                                   onChange={handleChange}
                                   placeholder="Nombre" required/>
                            <input type="text"
                                   name={"lastname"}
                                   value={formData.lastname}
                                   onChange={handleChange}
                                   placeholder="Apellido" required/>
                            <input type="text"
                                   name={"dni"}
                                   value={formData.dni}
                                   onChange={handleChange}
                                   placeholder="DNI" required/>
                            <input type="email"
                                   name={"email"}
                                   value={formData.email}
                                   onChange={handleChange}
                                   placeholder="Correo electrónico" required/>
                            <input type="password"
                                   name={"password"}
                                   value={formData.password}
                                   onChange={handleChange}
                                   placeholder="Contraseña" required/>
                            <button type="submit">Registrarte</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
