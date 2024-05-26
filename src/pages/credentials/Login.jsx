import React, {useState} from 'react';
import axios from "axios";
import './login.css'
import {urlGlobal} from "../../environment/env.js";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {BusinessRegister} from "../business/register/BusinessRegister.jsx";
export const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (event) => {
        const Client = {
            id: 0,
            name: "string",
            lastname: "string",
            dni: "string",
            credit_limit: 0,
            user: {
                id: 0,
                email: "string",
                password: "string",
                type: "string"
            }
        };
        const Business = {
            id: 0,
            name: "string",
            ruc: "string",
            address: "string",
            user: {
                id: 0,
                email: "string",
                password: "string",
                type: "string"
            },
        };
        event.preventDefault(); // Evita la recarga de la página
        const {email,password} = formData;
        try {
            const userResponse = await axios.post(urlGlobal + 'User/login', { email, password });
            // Verificar si la solicitud fue exitosa (estado 2xx)
            if (userResponse.status === 200) {
                const user = {
                        id:0,
                        email:"",
                        password:"",
                        type: ""
                };
                let responseType = null;
                user.id = userResponse.data.id;
                user.email = userResponse.data.email;
                user.password = userResponse.data.password;
                user.type = userResponse.data.type;

                try {
                    switch (user.type){
                        case 'Cliente':
                            responseType = await axios.post(urlGlobal+'client/findbyuser',user)
                            Client.id = responseType.data.id
                            Client.name = responseType.data.name
                            Client.lastname = responseType.data.lastname
                            Client.dni = responseType.data.dni
                            Client.credit_limit = responseType.data.credit_limit
                            Client.user = responseType.data.user
                            sessionStorage.setItem("Usuario",JSON.stringify(Client))
                            console.log(sessionStorage.getItem("Usuario"))

                            break;
                        case 'Negocio':
                            responseType = await axios.post(urlGlobal+'business/findbyuser',user)
                            Business.id = responseType.data.id
                            Business.name = responseType.data.name
                            Business.ruc = responseType.data.ruc
                            Business.address = responseType.data.address
                            Business.user = responseType.data.user
                            sessionStorage.setItem("Usuario",JSON.stringify(Business))
                            console.log(sessionStorage.getItem("Usuario"))
                            break
                        default:
                            break;
                    }
                }catch (error){
                    console.log(error)
                }

            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Parece que las credenciales no son correctas",
                footer: 'Intenta verificar bien tus datos',
                customClass: {
                    confirmButton: 'my-custom-button'
                },
                buttonsStyling: false
            })
        }
    }
    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="login-form-group">
                            <input type="email"
                                   name="email"
                                   onChange={handleChange}
                                   value={formData.email}
                                   placeholder="Ingrese su correo electrónico"/>

                        </div>
                        <div className="login-form-group">
                            <input type="password"
                                   name="password"
                                   value={formData.password}
                                   onChange={handleChange}
                                   placeholder="Ingrese su contraseña"/>
                        </div>
                        <button className={'button-login'} type="submit">Ingresar</button>
                    </form>
                </div>
            </div>
        </>
    );
};


