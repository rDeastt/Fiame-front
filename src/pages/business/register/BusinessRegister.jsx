import "./register.busines.css"
import {useState} from 'react';
import axios from 'axios';
import {urlGlobal} from "../../../environment/env.js";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export const BusinessRegister = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
            name: '',
            ruc: '',
            address: '',
            email: '',
            password: ''
    });
    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita la recarga de la página
        const { name, ruc, address, email, password } = formData;
        const type = "Negocio";
        const validateEmail = await axios.get(urlGlobal + 'User/exist/' + email);
        console.log(validateEmail);
        if (validateEmail.data){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Este correo ya está en uso",
                footer: 'Prueba usando un correo distinto',
                customClass: {
                    confirmButton:'my-custom-button'
                },
                buttonsStyling: false
            })
        }else {
            try {
                // Registra el usuario
                const userResponse = await axios.post(urlGlobal + 'User/signup', { email, password, type });
                const userId = userResponse.data.id;

                // Registra el negocio asociado al usuario
                await axios.post(urlGlobal + 'business', { name, ruc, address, user: { id: userId } });

                console.log('Registro exitoso');
                // Puedes redirigir al usuario a una página de éxito aquí
                navigate("/login")
            } catch (error) {
                console.error('Error al registrar:', error);
                // Maneja errores aquí (por ejemplo, muestra un mensaje de error)
            }
        }
    };
    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <div className="container-reg">
                <div className="image-reg"></div>
                <div className="form-wrapper-reg">
                    <div className="form-container">
                        <h2>Registro de Negocio</h2>
                        <form onSubmit={handleSubmit} method="post">
                            <input type="text"
                                   name={"name"}
                                   value={formData.name}
                                   onChange={handleChange}
                                   placeholder="Nombre del negocio" required/>
                            <input type="text"
                                   name={"ruc"}
                                   value={formData.ruc}
                                   onChange={handleChange}
                                   placeholder="RUC" required/>
                            <input type="text"
                                   name={"address"}
                                   value={formData.address}
                                   onChange={handleChange}
                                   placeholder="Dirección" required/>
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
                            <button type="submit"
                                    onSubmit={handleSubmit}
                            >Registrar Negocio</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

