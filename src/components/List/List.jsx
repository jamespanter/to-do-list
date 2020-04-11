import React, { useState, useEffect } from "react";
import styles from "./List.module.scss";
import { Card, Button, Form } from "react-bootstrap";
import { firestore } from "../../firebase.js";

const List = (props) => {
  const { user } = props;
  const [toDoList, updateList] = useState([]);
  const [newItem, setNewItem] = useState({
    Title: "New to-do",
    ImgUrl: "https://www.worldipreview.com/media/image/dovapi.jpg",
    Date: "No date",
  });

  useEffect(() => {
    fetchToDoList();
  }, [user]);

  const fetchToDoList = () => {
    if (user) {
      firestore
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          const retrievedItem = doc.data().toDoList;
          updateList(retrievedItem);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    updateList([]);
  };

  const addToDb = () => {
    const newItems = [newItem, ...toDoList];
    firestore
      .collection("users")
      .doc(user.uid)
      .set({
        toDoList: newItems,
      })
      .then(() => {
        fetchToDoList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFromDb = (item) => {
    const newArray = [...toDoList];
    const position = newArray.indexOf(item);
    newArray.splice(position, 1);

    const newDoc = {
      toDoList: newArray,
    };

    firestore
      .collection("users")
      .doc(user.uid)
      .set(newDoc)
      .then(() => {
        fetchToDoList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayInJsx = () => {
    return toDoList.map((item, index) => {
      return (
        <Card
          className="bg-light"
          style={{
            margin: "10px",
            width: "300px",
            height: "400px",
            boxShadow:
              "0 4px 7px rgba(0, 0, 0, 0.2), 0 4px 7px rgba(0, 0, 0, 0.27)",
          }}
          key={item + index}
        >
          <Card.Img
            style={{ height: "60%", objectFit: "cover" }}
            variant="top"
            src={item.ImgUrl}
            alt="thumbnail"
          />
          <Card.Body style={{ height: "40%" }} className="text-center">
            <Card.Title>{item.Title}</Card.Title>
            <Card.Text>{item.Date}</Card.Text>
            <Button onClick={() => deleteFromDb(item)} variant="danger">
              Delete
            </Button>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <>
      <div className={styles.newCard}>
        <h2>Create New Item</h2>
        <Form className="d-flex justify-content-center text-center">
          <Form.Group style={{ maxWidth: "300px" }} controlId="formBasicEmail">
            <Form.Label className="m-0">Title</Form.Label>
            <Form.Control
              type="email"
              placeholder="item title"
              onInput={(event) => {
                setNewItem({ ...newItem, Title: event.target.value });
              }}
            />
            <Form.Label className="m-0">Image URL</Form.Label>
            <Form.Control
              type="email"
              placeholder="image url"
              onInput={(event) => {
                setNewItem({ ...newItem, ImgUrl: event.target.value });
              }}
            />
            <Form.Label className="m-0">Date</Form.Label>
            <Form.Control
              type="email"
              placeholder="date"
              onInput={(event) => {
                setNewItem({ ...newItem, Date: event.target.value });
              }}
            />
            <Button onClick={addToDb} variant="success" className="m-2">
              Add
            </Button>
          </Form.Group>
        </Form>
      </div>
      <section style={{ display: "flex" }}>{displayInJsx()}</section>
    </>
  );
};

export default List;
