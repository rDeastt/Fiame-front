import React from 'react';
import {Link} from "react-router-dom";
import './mainpage.css'
export const MainPage = () => {
    return (
        <>
            <div className="main-page">
                <div className="main-content">
                    <div className="overlay"></div>
                    <div className="button-container">
                        <Link to="/Client/register">
                            <button className="register-button">Regístrate como cliente</button>
                        </Link>
                        <Link to="/Business/register">
                            <button className="register-button">Registra tu negocio</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

