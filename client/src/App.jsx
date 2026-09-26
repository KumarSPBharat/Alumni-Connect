import { useState } from "react";
import Login from "./login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import AlumniDirectory from "./AlumniDirectory";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [page, setPage] = useState("dashboard");

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <div>
        {showRegister ? <Register /> : <Login />}

        <button
          className="switch-button"
          onClick={() => setShowRegister(!showRegister)}
        >
          {showRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <h2>Alumni Connect</h2>

        <div>
          <button onClick={() => setPage("dashboard")}>
            Dashboard
          </button>

          <button onClick={() => setPage("directory")}>
            Alumni Directory
          </button>

          <button onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      {page === "dashboard" && <Dashboard />}

      {page === "directory" && <AlumniDirectory />}
    </div>
  );
}

export default App;