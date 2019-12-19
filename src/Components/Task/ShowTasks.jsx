import React from "react";
import { Container } from "react-bootstrap";

// Custom Components
import ShowTask from "./ShowTask";

export default function ShowTasks(props) {
  let displayAllTasks = () => {
    if (Object.keys(props.tasks).length < 1) {
      return <h3>No Tasks</h3>;
    }

    return props.tasks.map(task => {
      return <ShowTask task={task} key={task._id} />;
    });
  };
  return <Container>{displayAllTasks()}</Container>;
}
