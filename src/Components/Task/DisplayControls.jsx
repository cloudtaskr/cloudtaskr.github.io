import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// Style Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DisplayControls(props) {
  return (
    <>
      <LinkContainer to={"/task/edit/" + props.theId}>
        <Button>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </LinkContainer>
      <LinkContainer to={"/task/delete/" + props.theId}>
        <Button>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </LinkContainer>
    </>
  );
}
