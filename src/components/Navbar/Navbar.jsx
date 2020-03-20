import React from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <>
      <nav className={styles.nav}>
        <h1>GET THINGS DONE</h1>
        <p>Login</p>
      </nav>
    </>
  );
};

export default Navbar;
