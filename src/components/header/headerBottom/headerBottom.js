import React from "react";
import { Home } from "../../images/images";
import "./headerBottom.css";

/* Código referente al encabezado inferior de la página. */

export const HeaderBottom = () => {
    return (
        <section id="header-bottom">
            <div className="cuadro-exterior"></div>
            <Ribbon />
            <div className="cuadro-exterior"></div>
        </section>
    );
};

/* Botonera del menú */
const Ribbon = () => {
    return (
        <div className="header-content">
            <HomeButton />
            <div className="actual menu-button" id="aulas">
                Aulas
            </div>
            <div className="boton menu-button" id="espacio-personal">
                Espacio Personal
            </div>
            <div className="boton menu-button" id="tramites">
                Trámites
            </div>
            <div className="boton menu-button" id="biblioteca">
                Biblioteca
            </div>
            <div className="boton menu-button" id="mas-uoc">
                Más UOC
            </div>
            <div className="cuadro-extra"></div>
        </div>
    );
};

/* Botón home del menú */
const HomeButton = () => {
    return (
        <div className="boton menu-button" id="home">
            <Home />
        </div>
    );
};
