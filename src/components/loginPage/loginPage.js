import React, { useState } from "react";
import "./loginPage.css";

import { LogoIcon } from "../images/images";


export const LoginPage = (props) => {
    return (
        <div id="login-page">
            <LogoIcon className="cosa" />
            <LoginForm 
                handleSubmit={props.handleSubmit}
                loginErrorMessage={props.loginErrorMessage}
            />
        </div>
    );
};


export const LoginForm = (props) => {
    const [username, setUsername] = useState("oakachach");
    const [password, setPassword] = useState("494658");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSubmit(username, password);
    }

    return(
        <form id="login-form" onSubmit={handleSubmit}>
            <h1>Iniciar sesión</h1>
            <div>
                <label>Usuario</label>
                <input 
                    id="username-input" 
                    name="username-input" 
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                >
                </input>
            </div>
            <div>
                <label>Contraseña</label>
                <input 
                    id="password-input" 
                    name="password-input"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                >
                </input>
                
            </div>
            <p id="login-error-message">{props.loginErrorMessage}</p>
            <button 
                id="login-button" 
                type="submit" 
                onClick={(e) => handleSubmit(e)}
            >
                Iniciar sesión
            </button>
        </form>
    );
}