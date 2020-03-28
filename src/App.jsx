import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Dashboard from "./containers/Dashboard";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

import firebase, { provider } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [isShown, toggleShown] = useState(false);

  const signInWithRedirect = () => {
    firebase.auth().signInWithRedirect(provider);
  };

  const getUser = () => {
    toggleShown(!isShown);

    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
        }
        // The signed-in user info.
        console.log(result);
        const user = result.user;
        setUser(user);
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  };

  const signOut = () => {
    toggleShown(!isShown);

    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        alert("Oh no an error :(" + error);
      });
  };

  const displayLoadingBox = isShown ? (
    <div className={styles.loadingBox}>
      <h3>Loading...please wait...</h3>
      <div className={styles.loader}></div>
    </div>
  ) : (
    <>
      <Modal.Header className="justify-content-center">
        <Modal.Title className="text-center">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="m-0 text-center">
          Please login with google to see your custom to-do list
        </p>
      </Modal.Body>
      <Button variant="success" onClick={signInWithRedirect}>
        Login
      </Button>
    </>
  );

  useEffect(() => {
    getUser();
  }, []);

  return user ? (
    <>
      <Navbar
        title="To-do List"
        signInWithRedirect={signInWithRedirect}
        signOut={signOut}
        user={user}
      />
      <div className="dashboardContainer">
        <Dashboard user={user} />
      </div>
    </>
  ) : (
    <div className={styles.loginContainer}>
      <Modal.Dialog>
        <Modal.Footer className="justify-content-center">
          {displayLoadingBox}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default App;
