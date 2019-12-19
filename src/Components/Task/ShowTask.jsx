import React from "react";
import { Card, Container } from "react-bootstrap";

// Customer Components
import DisplayTaskDetails from "./DisplayTaskDetails";
import DisplayControls from "./DisplayControls";

export default function ShowTask(props) {
  return (
    <Card className="task-card" key={props.task._id}>
      <Container className="task-title">
        <DisplayTaskDetails
          title={props.task.title}
          description={props.task.description}
        />
      </Container>
      <Container className="task-controls">
        <DisplayControls theId={props.task._id} />
      </Container>
    </Card>
  );
}
