import React from 'react';
import './NavBarClient.css'
import {Link} from "react-router-dom";
export const NavBarClient = (props) => {
    const storedUser = sessionStorage.getItem("Usuario")
    const user = JSON.parse(storedUser);
    const { children } = props
    const handleClearSessionStorage = () => {
        // Borra el elemento 'Usuario' del sessionStorage
        sessionStorage.removeItem('Usuario');
        // Puedes agregar cualquier otra lógica que necesites después de borrar el elemento
    };
    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src="src/assets/logo.png" alt="Logo" className="logo-image"/>
                    </Link>
                    <h1>FiaMe</h1>
                </div>
                <div className="user-info">
                    <img src="src/assets/user.png" alt="User Avatar" className="user-avatar"/>
                    <span>{user.name + " " + user.lastname}</span>
                </div>
                <button onClick={handleClearSessionStorage} className="logout-button">
                    <Link to="/">Cerrar Sesión</Link>
                </button>
            </nav>
            <div>{children}</div>
        </>
    );
};

