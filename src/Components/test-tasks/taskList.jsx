import React, { Component } from "react";
import Menu from "../Menu/Menu";
import { Button, Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import AddTask from "./addTask";

// import AddTask from "./addTask";
export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddTaskMenu: false,
      title: ""
    };
  }

  // filterTasksByTag = tag => {
  //   let tasksCopy = [...this.state.listOfTasks];
  //   let filterTasksByTag = tasksCopy.filter(eachTask => {
  //     return eachTask.title.toLowerCase().includes(tag.toLowerCase());
  //   });

  //   this.setState({
  //     filterTasks: filterTasksByTag
  //   });
  // };
  deleteTask = taskID => {
    console.log(taskID);
    // axios.post(`${baseURL}/api/task/delete/${taskID}`,{withCredentials: true})
    // .then(res=>{
    //   this.props.fetchData()
    //   this.props.history.push("/task");
    // })
  };
  displayAllTasks = () => {
    // console.log(this.props.filterTaskList)
    return this.props.filterTaskList.map(task => {
      return (
        <Row
          key={task._id}
          name="task"
          // style={{
          //   display: "flex",
          //   padding: "5px",
          //   justifyContent: "space-between"
          // }}
        >
          <Col>
            <h5>{task.title}</h5>
          </Col>
          <Col>
            <h6>{task.description}</h6>
          </Col>
          <Col>
            {/* <Link to={"/task/edit/" + task._id}> */}
            <Button style={{ margin: "5px" }}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </Button>
            {/* </Link> */}
            <Link to={"/task/edit/" + task._id} variant="warning">
              <Button style={{ margin: "5px" }}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Link>
            <Link to={"/task/delete/" + task._id}>
              <Button style={{ margin: "5px" }} variant="danger">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Link>
          </Col>
        </Row>
      );
    });
  };

  addTaskMenu = () => {
    // console.log("Add Task Menu");
    this.setState({ showAddTaskMenu: !this.state.showAddTaskMenu });
  };

  // componentDidMount() {
  //   // if (this.props.userObj === "") {
  //   //   return this.props.history.push("/signup");
  //   // } else {
  //     this.displayAllTasks();
  //   // }
  // }

  // notAuthorized = () => {
  //       return this.props.history.push('/signup')
  // }

  render() {
    console.log("Render taskList");

    return (
      <div>
        {this.props.userObj ? (
          <div>
            <Menu
              id="landingMenuSticky"
              {...this.props}
              logout={this.props.logout}
              setUser={this.props.setUser}
              fetchData={this.props.fetchData}
            />
            <Container>
              {this.props.userObj.firstName ? (
                <h2>Welcome {this.props.userObj.firstName}</h2>
              ) : (
                <h2>Welcome {this.props.userObj.username}</h2>
              )}

              <Row style={{ margin: "5px" }}>
                <Col sm={4}>
                  <Button onClick={this.addTaskMenu}>Add Task</Button>
                </Col>
                <Col sm={8}>
                  <input
                    placeholder="Search for a task"
                    name="search"
                    onChange={this.props.searchTasksInput}
                  />
                </Col>
              </Row>

              {this.state.showAddTaskMenu ? (
                <AddTask
                  fetchData={this.props.fetchData}
                  showAddTaskMenu={this.addTaskMenu}
                />
              ) : (
                ""
              )}
              {/* <button onClick={this.displayAllTasks}>Filter</button> */}
              <div id="main-task-list">
                {this.props && this.displayAllTasks()}
              </div>
            </Container>
          </div>
        ) : (
          <div>
            <Menu
              id="landingMenuSticky"
              {...this.props}
              logout={this.props.logout}
              setUser={this.props.setUser}
              fetchData={this.props.fetchData}
            />
            <h1>Not authorized, sign up to make your first task</h1>
            <LinkContainer to="/signup">
              <Button>Sign Up</Button>
            </LinkContainer>
          </div>
        )}
      </div>
    );
  }
}
