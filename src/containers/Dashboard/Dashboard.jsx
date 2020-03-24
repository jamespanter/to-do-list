import React from "react";
import styles from "./Dashboard.module.scss";
import List from "../../components/List";

const Dashboard = props => {
  const { user } = props;
  return (
    <section className={styles.dashboard}>
      <div className={styles.listContainer}>
        <List user={user} />
      </div>
    </section>
  );
};

export default Dashboard;
