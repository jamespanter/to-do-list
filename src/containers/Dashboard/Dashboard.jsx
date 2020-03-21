import React from "react";
import styles from "./Dashboard.module.scss";
import List from "../../components/List";

const Dashboard = () => {
  return (
    <section className={styles.dashboard}>
      <div className={styles.listContainer}>
        <List />
      </div>
    </section>
  );
};

export default Dashboard;
