import React from "react";

export default function DisplayTaskDetails(props) {
  return (
    <>
      <h5>{props.title}</h5>
      <h6>{props.description}</h6>
    </>
  );
}
