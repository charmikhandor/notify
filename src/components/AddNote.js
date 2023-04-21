import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  // const handleClick = (e) => {
  //   if (validated === true) {
  //     console.log("true")
  //     e.preventDefault();
  //     addNote(note.title, note.description, note.tag);
  //     setNote({ title: "", description: "", tag: "" });
  //   }
  // };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
      props.showAlert("note added", "success");
    }
  };
  return (
    <div>
      <div className="container my-3">
        <h1>Add a note</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="title"
              name="title"
              placeholder="Enter title"
              onChange={onChange}
              minLength={3}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="description"
              name="description"
              placeholder="Enter a desc"
              onChange={onChange}
              minLength={5}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="tag">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="tag"
              name="tag"
              placeholder="add a tag"
              onChange={onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
