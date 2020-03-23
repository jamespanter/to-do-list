import React, { useState, useEffect } from "react";
import styles from "./List.module.scss";
import { Card, Button, Form, CardDeck } from "react-bootstrap";
import { firestore } from "../../firebase.js";

const List = () => {
  const [toDoList, updateList] = useState([]);
  const [newItem, setNewItem] = useState({
    Title: "New to-do",
    ImgUrl: "https://i.ya-webdesign.com/images/png-image-clipboard-2.png",
    Date: "No date"
  });

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
        <>
          <Card style={{ margin: "10px", width: "150px", height: "250px" }}>
            <Card.Img
              style={{ height: "40%" }}
              variant="top"
              src={item.ImgUrl}
              alt="thumbnail"
            />
            <Card.Body style={{ height: "60%" }} className="text-center">
              <Card.Title>{item.Title}</Card.Title>
              <Card.Text>{item.Date}</Card.Text>
              <Button onClick={() => deleteFromDb(item)} variant="danger">
                Delete
              </Button>
            </Card.Body>
          </Card>
        </>
      );
    });
  };

  return (
    <>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="email"
            placeholder="item title"
            onInput={event => {
              setNewItem({ ...newItem, Title: event.target.value });
            }}
          />
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="email"
            placeholder="image url"
            onInput={event => {
              setNewItem({ ...newItem, ImgUrl: event.target.value });
            }}
          />
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="email"
            placeholder="date"
            onInput={event => {
              setNewItem({ ...newItem, Date: event.target.value });
            }}
          />
          <Button onClick={addToDb} variant="success">
            Add
          </Button>
        </Form.Group>
      </Form>
      <section style={{ display: "flex" }}>{displayInJsx()}</section>
    </>
  );
};

export default List;
