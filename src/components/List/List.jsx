import React, { useState, useEffect } from "react";
import styles from "./List.module.scss";

import { firestore } from "../../firebase.js";

const List = () => {
  const [toDoList, updateList] = useState([]);
  const [newItem, setNewItem] = useState({});

  useEffect(() => {
    fetchToDoList();
  }, []);

  const fetchToDoList = () => {
    firestore
      .collection("users")
      .doc("0qy4ME2XQdSPstRPSlxL")
      .get()
      .then(doc => {
        const retrievedItem = doc.data().toDoList;
        console.log(retrievedItem);
        updateList(retrievedItem);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addToDb = () => {
    const newItems = [newItem, ...toDoList];
    firestore
      .collection("users")
      .doc("0qy4ME2XQdSPstRPSlxL")
      .set({
        toDoList: newItems
      })
      .then(() => {
        fetchToDoList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteFromDb = item => {
    const newArray = [...toDoList];
    const position = newArray.indexOf(item);
    newArray.splice(position, 1);

    const newDoc = {
      toDoList: newArray
    };

    firestore
      .collection("users")
      .doc("0qy4ME2XQdSPstRPSlxL")
      .set(newDoc)
      .then(() => {
        fetchToDoList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const displayInJsx = () => {
    return toDoList.map(item => {
      return (
        <li className={styles.listItem}>
          <img src={item.ImgUrl} alt="image thumbnail" />
          <h2>{item.Title}</h2>
          <p>{item.Date}</p>
          <button onClick={() => deleteFromDb(item)}>Delete</button>
        </li>
      );
    });
  };

  return (
    <section className={styles.list}>
      <div className={styles.inputContainer}>
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="item title"
            onInput={event => {
              setNewItem({ ...newItem, Title: event.target.value });
            }}
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            placeholder="image url"
            onInput={event => {
              setNewItem({ ...newItem, ImgUrl: event.target.value });
            }}
          />
        </div>

        <div>
          <label>Date</label>
          <input
            type="text"
            placeholder="date"
            onInput={event => {
              setNewItem({ ...newItem, Date: event.target.value });
            }}
          />
        </div>
        <button onClick={addToDb}>Add</button>
      </div>
      <h2>To-do's</h2>

      {displayInJsx()}
    </section>
  );
};

export default List;
