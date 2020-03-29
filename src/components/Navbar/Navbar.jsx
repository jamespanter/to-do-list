import React from "react";
import styles from "./Navbar.module.scss";
import { Button } from "react-bootstrap";

const Navbar = props => {
  const { title, signOut, signInWithRedirect, user } = props;

  const getSignInButtons = () => {
    if (user) {
      return (
        <>
          <div>
            <p>Welcome {user.displayName}</p>
            <img src={user.photoURL} alt={`${user.displayName}'s Face`} />
            <Button onClick={signOut} variant="danger">
              Sign Out
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <Button onClick={signInWithRedirect} variant="success">
          Sign-in
        </Button>
      );
    }
  };

  return (
    <>
      <nav class="navbar fixed-top navbar-light bg-info">
        <span class="navbar-brand mb-0 h1">{title}</span>
        {getSignInButtons()}
      </nav>
    </>
  );
};

export default Navbar;
