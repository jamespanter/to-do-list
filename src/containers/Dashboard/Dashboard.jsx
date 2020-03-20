import React from "react";
import styles from "./Dashboard.module.scss";
import List from "../../components/List";

const Dashboard = () => {
  return (
    <>
      <h2>Items to do</h2>
      <List />
    </>
  );
};

export default Dashboard;
