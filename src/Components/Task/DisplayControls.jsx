import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// Project Components
import DeleteTask from "./DeleteTask";

// Style Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export default function DisplayControls(props) {
  return (
    <>
      <LinkContainer to={"/task/edit/" + props.theId}>
        <Button>
          <FontAwesomeIcon icon={faEllipsisV} />
        </Button>
      </LinkContainer>
      {/* <LinkContainer to={"/task/delete/" + props.theId}> */}
      <Button onClick={() => props.handleDelete(props.theId)}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      {/* </LinkContainer> */}
    </>
  );
}
