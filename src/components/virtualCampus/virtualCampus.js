import React, { useState, useEffect } from "react";
import { Body } from "../body/body";
import { Header } from "../header/header";
import "./virtualCampus.css";

/* Código principal de la aplicación */

export const VirtualCampus = (props) => {
  const user = "oakachach";
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      <div id="container">
        <Header 
          sessionName={`${props.session.fullName} (${props.session.role})`}
          handleLogout={props.handleLogout} />
        <Body
          currentEnrollment={
            props.session.enrollments[props.session.enrollments.length - 1]
          }
        />
      </div>
    </div>
  );
};
