import React, { Component } from "react";
// import axios from "axios";
// import { NavLink } from 'react-router-dom';
// import AddTask from "./addTask";
// import LogInMenu from './logInMenu';
import Menu from "../Menu/Menu";
import { Button, Container, Row } from "react-bootstrap";
// import AddTaskModal from "./addTaskModal";
// import EditTaskModal from "./editTaskModal";
// import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
// import Signup from "../SignUp/Signup";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import baseURL from "../../services/base";

// import AddTask from "./addTask";
export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddTaskMenu: false
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
    //   this.props.history.push("/tasks");
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
    console.log("Add Task Menu");
    this.setState({ showAddTaskMenu: true });
    // const mainList = document.getElementById("main-task-list");
    // const newTask = document.createElement("div")
    // newTask.setAttribute("name","task")
    // newTask.setAttribute("class","row")
    // const addTaskHTML = "<div class='col'><input type='text' name='task'></div><div class='col'><button class='btn btn-primary fa fa-ellipsis-v'></button><button class='btn btn-warning fa fa-save' onClick='saveTask()'></button><button class='btn btn-danger fa fa-trash'></button></div>"
    // newTask.innerHTML = addTaskHTML;
    // mainList.appendChild(newTask)
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
    // console.log('inside of render', this.props)
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
              <h2>
                Welcome{" "}
                <span>
                  {this.props.userObj.firstName
                    ? this.props.userObj.firstName
                    : this.props.userObj.email}
                </span>
              </h2>
              {/* <AddTask /> */}
              <Row style={{ margin: "5px" }}>
                <Col sm={3}>
                  <Link to="/task/add">Add Task (New Componenet)</Link>
                  <br />
                </Col>
                <Col sm={3}>
                  <Button onClick={this.addTaskMenu}>
                    Add Task (New Line)
                  </Button>
                </Col>
                <Col sm={6}>
                  <input
                    placeholder="Search for a task"
                    name="search"
                    onChange={this.props.searchTasksInput}
                  />
                </Col>
              </Row>
              {this.showAddTaskMenu ? (
                <Row>
                  <Col>Add Task</Col>
                </Row>
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
