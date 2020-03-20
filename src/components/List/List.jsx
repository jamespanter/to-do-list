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
        <div className={styles.listItem}>
          <img src={item.ImgUrl} alt="image thumbnail" />
          <h2>{item.Title}</h2>
          <p>{item.Date}</p>
          <button onClick={() => deleteFromDb(item)}>Delete</button>
        </div>
      );
    });
  };

  return (
    <section className={styles.list}>
      <h2>Add new item to list</h2>
      <div className={styles.inputContainer}>
        <h3>Title</h3>
        <input
          type="text"
          placeholder="Title"
          onInput={event => {
            setNewItem({ ...newItem, Title: event.target.value });
          }}
        />
        <h3>Image url</h3>
        <input
          type="text"
          placeholder="Image url"
          onInput={event => {
            setNewItem({ ...newItem, ImgUrl: event.target.value });
          }}
        />
        <h3>Creation date</h3>
        <input
          type="date"
          placeholder="Creation date"
          onInput={event => {
            setNewItem({ ...newItem, Date: event.target.value });
          }}
        />
      </div>
      <button onClick={addToDb}>Add</button>
      {displayInJsx()}
    </section>
  );
};

export default List;
