import React from "react";
import { HeaderTop } from "./headerTop/headerTop";
import { HeaderBottom } from "./headerBottom/headerBottom";
import "./header.css";

/* Código referente al encabezado de la página. */

export const Header = (props) => {
  return (
    <header>
      <div id="background">
        <HeaderTop sessionName={props.sessionName} handleLogout={props.handleLogout} />
        <HeaderBottom />
      </div>
    </header>
  );
};
