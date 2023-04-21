import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>{note.title}</Card.Title>
            <i
              className="fa-sharp fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
            <i
              className="fa-sharp fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            <Card.Text>{note.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}
