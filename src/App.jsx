import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Dashboard from "./containers/Dashboard";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import firebase, { provider } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  const signInWithRedirect = () => {
    firebase.auth().signInWithRedirect(provider);
  };

  const getUser = () => {
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
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        alert("You have signed out");
      })
      .catch(error => {
        alert("Oh no an error :(");
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
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
  );
}

export default App;
