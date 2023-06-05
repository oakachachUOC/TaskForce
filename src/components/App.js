import React, { useState } from "react";
import { VirtualCampus } from "./virtualCampus/virtualCampus";
import { LoginPage } from "./loginPage/loginPage";
import "./App.css";

/**
 * Main app code.
 * @returns render of the app.
 */
function App() {
  const [session, setSession] = useState({});
  const [loggedSuccessfully, setLoggedSuccessfully] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState(""); 

  const handleSubmit = async (username, password) => {
    if (username === undefined && password === undefined) { return; }

    const response = await fetch(`/users/${username}/${password}`);

    try {
      const session = await response.json();
      setSession(session);
      setLoggedSuccessfully(true);
    } catch {
      setLoginErrorMessage("El usuario o contraseña introducidos son incorrectos.");
    }
  }

  const handleLogout = () => {
    setLoggedSuccessfully(false);
  }

  if (!loggedSuccessfully) {
    return (
        <LoginPage  
          handleSubmit={(username, password) => handleSubmit(username, password)}
          loginErrorMessage={loginErrorMessage}
        />
    );
  }

  return (
      <VirtualCampus 
        session={session}
        handleLogout={() => handleLogout()}
      />
  );
}

export default App;
