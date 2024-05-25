import React from 'react';
import './initialPageLayout.css'
import {Link} from "react-router-dom";
const InitialPageLayout = (props) => {
    const { children } = props
    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to={"/"}>
                        <img src="src/assets/logo.png" alt="Logo" className="logo-image"/>
                    </Link>
                    <h1>FiaMe</h1>
                </div>
                <Link to={"/login"}>
                    <button className="login-button">Iniciar Sesión</button>
                </Link>
            </nav>
            <div> {children}</div>
        </>
    );
};

export default InitialPageLayout;
