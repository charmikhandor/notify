import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://127.0.0.1:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          sessionStorage.getItem("token"),
      },
    });
    const json = await response.json();

    setNotes(json);
  };

  //add a note
  const addNote = async (tit, desc, ta) => {
    const body = {
      title: tit,
      description: desc,
      tag: ta,
    };
    const bodyJson = JSON.stringify(body);
    const response = await fetch("http://127.0.0.1:5000/api/notes/addnote", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "http://sessionhost:3000",
        "Content-Type": "application/json",
        "auth-token":
          sessionStorage.getItem("token"),
      },
      body: bodyJson,
    });
    const note = await response.json();

    setNotes(notes.concat(note));
  };
  //delete a note
  const deleteNote = async (id) => {
    //Api call
    const response = await fetch(
      `http://127.0.0.1:5000/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            sessionStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //edit a note
  const editNote = async (id, tit, desc, ta) => {
    //API call

    const body = {
      title: tit,
      description: desc,
      tag: ta,
    };
    const bodyJson = JSON.stringify(body);
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          sessionStorage.getItem("token"),
      },
      body: bodyJson,
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = tit;
        newNotes[index].description = desc;
        newNotes[index].tag = ta;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    //send all the props/states
    <NoteContext.Provider
      value={{ notes, getNotes, deleteNote, addNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
