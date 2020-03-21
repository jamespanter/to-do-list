import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import Navbar from "./components/Navbar";
import Dashboard from "./containers/Dashboard";

function App() {
  return (
    <>
      <div className="navbarContainer">
        {/* <Navbar /> */}
      </div>
      <div className="dashboardContainer">
        <Dashboard />
      </div>
    </>
  );
}

export default App;
