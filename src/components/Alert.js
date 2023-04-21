import React from "react";
import Alert from "react-bootstrap/Alert";

export default function Alertcomp(props) {
  console.log(props.alert);
  return (
    <div>
      {props.alert && (
        <Alert variant={props.alert.type}>{props.alert.msg}!</Alert>
      )}
    </div>
  );
}
