import React from "react";
import { Body } from "../body/body";
import { Header } from "../header/header";
import "./virtualCampus.css";

// TODO: En función del rol del usuario, hay que renderizar un body u otro.
export const VirtualCampus = (props) => {
  const currentEnrollment = props.session.enrollments[props.session.enrollments.length - 1];

  return (
    <div className="App">
      <div id="container">
        <Header 
          sessionName={`${props.session.fullName} (${props.session.role})`}
          handleLogout={props.handleLogout} />
        <Body
          session={{
            username: props.username,
            currentEnrollment: currentEnrollment,
            year: currentEnrollment.year,
            semester: currentEnrollment.semester,
          }}
        />
      </div>
    </div>
  );
};
