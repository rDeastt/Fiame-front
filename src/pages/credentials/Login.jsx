import React, {useState} from 'react';
import './login.css'
export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    <h2>Iniciar Sesión</h2>
                    <form>
                        <div className="form-group">
                            <input type="email" id="email" name="email" placeholder="Ingrese su correo electrónico"/>
                        </div>
                        <div className="form-group">
                            <input type="password" id="password" name="password" placeholder="Ingrese su contraseña"/>
                        </div>
                        <button className={'button-login'} type="submit">Ingresar</button>
                    </form>
                </div>
            </div>
        </>
    );
};


