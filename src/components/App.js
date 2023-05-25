import React, { useState, useEffect } from "react";
import { Body } from "./body/body";
import { Header } from "./header/header";
import "./App.css";

/* Código principal de la aplicación */

function App() {
  const user = "oakachach";
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);

  // no hace falta parsear a json. ya viene en json
  useEffect(() => {
    fetch(`/users/${user}`)
      .then((response) => response.json())
      .then((data) => {
        setSession(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1></h1>;
  }

  return (
    <div className="App">
      <div id="container">
        <Header sessionName={`${session.fullName} (${session.role})`} />
        <Body
          currentEnrollment={
            session.enrollments[session.enrollments.length - 1]
          }
        />
      </div>
    </div>
  );
}

export default App;
