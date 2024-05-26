import React from 'react';
import './NavBarClient.css'
export const NavBarClient = (props) => {
    const storedUser = sessionStorage.getItem("Usuario")
    const user = JSON.parse(storedUser);
    const { children } = props
    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo">
                    <a href="/">
                        <img src="src/assets/logo.png" alt="Logo" className="logo-image"/>
                    </a>
                    <h1>FiaMe</h1>
                </div>
                <div className="user-info">
                    <img src="src/assets/user.png" alt="User Avatar" className="user-avatar"/>
                    <span>{user.name + " " + user.lastname}</span>
                </div>
                <a href="/logout">
                    <button className="logout-button">Cerrar Sesión</button>
                </a>
            </nav>
            <div> {children}</div>
        </>
    );
};

