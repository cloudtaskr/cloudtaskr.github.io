import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";

// Custom Components
import Welcome from "../../Components/Messages/Welcome";
import ShowTasks from "../../Components/Task/ShowTasks";
import AddTask from "../../Components/test-tasks/addTask"

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddButton: false
    };
  }

  toogleTaskMenu = () => {
    this.setState({ 
      showAddButton: !this.state.showAddButton 
    });
  };

  render() {
    return (
      <Container>
        <Welcome {...this.props} />
        <Button onClick={this.toogleTaskMenu}>Add Task</Button>
        {this.state.showAddButton ? (
          <AddTask fetchData={this.props.fetchData} showAddTaskMenu={this.addTaskMenu}/>
        ) : (
          ""
        )}

        <ShowTasks tasks={this.props.viewableTasks} />
      </Container>
    );
  }
}
