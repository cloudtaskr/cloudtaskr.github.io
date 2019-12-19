import React, { Component } from "react";
import { Container } from "react-bootstrap";

// Custom Components
import Welcome from "../../Components/Messages/Welcome";
import ShowTasks from "../../Components/Task/ShowTasks";

export default class TaskList extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Container>
        <Welcome {...this.props} />
        <ShowTasks tasks={this.props.viewableTasks} />
      </Container>
    );
  }
}
