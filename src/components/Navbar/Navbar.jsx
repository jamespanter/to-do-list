import React from "react";
import styles from "./Navbar.module.scss";

const Navbar = props => {
  const { title, signOut, signInWithRedirect, user } = props;

  const getSignInButtons = () => {
    if (user) {
      return (
        <>
          <div>
            <p>Welcome {user.displayName}</p>
            <img src={user.photoURL} alt={`${user.displayName}'s Face`} />
            <button onClick={signOut}>Sign-out</button>
          </div>
        </>
      );
    } else {
      return <button onClick={signInWithRedirect}>Sign-in</button>;
    }
  };

  return (
    <>
      <nav class="navbar navbar-light bg-info">
        <span class="navbar-brand mb-0 h1">{title}</span>
        {getSignInButtons()}
      </nav>
    </>
  );
};

export default Navbar;
