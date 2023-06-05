import React from "react";
import { Profile } from "./profile/profile";
import { LogoIcon } from "../../images/images";
import { AttentionService } from "./attentionService/attentionService";
import "./headerTop.css";

/* Código referente al encabezado superior de la página. */

export const HeaderTop = (props) => {
    return (
        <section id="header-top">
            <Logo />
            <div id="servicio-atencion-perfil">
                <AttentionService />
                <Profile sessionName={props.sessionName} handleLogout={props.handleLogout} />
            </div>
        </section>
    );
};

/* Logo de la página */
const Logo = () => {
    return (
        <div id="logo-uoc">
            <LogoIcon />
        </div>
    );
};
