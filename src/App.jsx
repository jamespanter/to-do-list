import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Dashboard from "./containers/Dashboard";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

import firebase, { provider } from "./firebase";

const App = () => {
  const [user, setUser] = useState(null);
  const [isShown, toggleShown] = useState(false);

  const signInWithRedirect = () => {
    // sessionStorage.setItem("showLoading", true);
    firebase.auth().signInWithRedirect(provider);
  };

  const getUser = () => {
    // if (sessionStorage.getItem("showLoading") === "true") {
    //   toggleShown(true);
    //   setTimeout(() => (user ? null : toggleShown(false)), 3000);
    // }

    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          const token = result.credential.accessToken;
        }
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
  };

  const signOut = () => {
    // toggleShown(false);
    // sessionStorage.removeItem("showLoading", true);

    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert("Oh no an error :(" + error);
      });
  };

  const displayLoadingBox = isShown ? (
    <div className={styles.loadingBox}>
      <h3 className="text-center">Loading...please wait...</h3>
      <div className={styles.loader}></div>
    </div>
  ) : (
    <>
      <Modal.Header className="justify-content-center">
        <Modal.Title className="text-center">To-do List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="m-0 text-center">
          Please login with google to see your custom to-do list
        </p>
      </Modal.Body>
      <Button variant="success" onClick={signInWithRedirect}>
        Login with google
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
};

export default App;
