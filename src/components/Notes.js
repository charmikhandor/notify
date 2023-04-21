import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import React from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const [show, setShow] = useState(false);
  useEffect(() => {
    getNotes();
  }, []);
  setTimeout(1000);
  const ref = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = async (currentnote) => {
    ref.current.click();
    await setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
    props.showAlert("updated note successfully", "success");
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onUpdate = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      editNote(note.id, note.etitle, note.edescription, note.etag);
      setShow(false);
      props.showAlert("note updated", "success");
    }
  };
  return (
    <div>
      <AddNote showAlert={props.showAlert} />
      <Button
        className="d-none"
        variant="primary"
        ref={ref}
        onClick={handleShow}
      >
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="etitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="etitle"
                name="etitle"
                placeholder="Enter title"
                onChange={onUpdate}
                value={note.etitle}
                minLength={3}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="edescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="edescription"
                name="edescription"
                placeholder="Enter a desc"
                onChange={onUpdate}
                value={note.edescription}
                minLength={5}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="etag">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="etag"
                name="etag"
                placeholder="add a tag"
                onChange={onUpdate}
                value={note.etag}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {" "}
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <h1>Your notes</h1>
      {notes.length === 0 && "No notes to display"}
      <Row lg={4}>
        {notes?.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
            />
          );
        })}
      </Row>
    </div>
  );
}
