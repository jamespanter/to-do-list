import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import Dashboard from "./containers/Dashboard";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Navbar>
        <Navbar.Brand href="#home">TO-DO LIST</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {/* Signed in as: <a href="#login">Mark Otto</a> */}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <div className="dashboardContainer">
        <Dashboard />
      </div>
    </>
  );
}

export default App;
