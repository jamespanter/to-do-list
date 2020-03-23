import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import Dashboard from "./containers/Dashboard";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <nav class="navbar navbar-light bg-info">
        <span class="navbar-brand mb-0 h1">Navbar</span>
      </nav>
      <div className="dashboardContainer">
        <Dashboard />
      </div>
    </>
  );
}

export default App;
