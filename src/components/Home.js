import React from "react";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes";
import { useEffect } from "react";

export default function Home(props) {
  let showAlert = props.showAlert;
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (token == null) {
      navigate("../login", { replace: true });
    }
  }, []);
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
}
