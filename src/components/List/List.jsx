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
        const retrievedItem = doc.data().toDo;
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
        toDo: newItems
      })
      .then(() => {
        fetchToDoList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const createNewItem = () => {};

  const displayInJsx = () => {
    return toDoList.map(item => {
      return (
        <div>
          <h2>{item.Title}</h2>
          <p>{item.Date}</p>
          <img src={item.ImgUrl} alt="image thumbnail" />
        </div>
      );
    });
  };

  return (
    <>
      <input
        type="text"
        placeholder="Title"
        onInput={event => {
          setNewItem({ ...newItem, Title: event.target.value });
        }}
      />
      <input
        type="text"
        placeholder="image url"
        onInput={event => {
          setNewItem({ ...newItem, ImgUrl: event.target.value });
        }}
      />
      <input
        type="text"
        placeholder="date"
        onInput={event => {
          setNewItem({ ...newItem, Date: event.target.value });
        }}
      />
      <button onClick={addToDb}>Add</button>
      {displayInJsx()}
    </>
  );
};

export default List;

// TO DO APP
// User can create new todos with info on task, date created, date to be completed and an img url
// 8:51
// 2. User can see all their previously made todos
// 3. User can delete todos
// Extension:
// 5. Make it look nice
// 8:51
// 6. Hosted live
