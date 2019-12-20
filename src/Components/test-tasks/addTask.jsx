import React, { Component } from "react";
import {
  Button,
  Col,
  Row,
  FormControl,
  InputGroup,
  Form
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import baseURL from "../../services/base";

export default class addTask extends Component {
  constructor(props) {
    super(props);
    this.taskInput = React.createRef();
    this.state = {
      title: ""
    };
  }

  componentDidMount() {
    this.taskInput.current.focus();
  }

  handleAddTask = event => {
    event.preventDefault();
    const title = this.state.title;
    const duration = 60
    if (title) {
      axios
        .post(
          `${baseURL}/api/tasks`,
          { title, duration },
          { withCredentials: true }
        )
        .then(() => {
          // this.props.getData();
          this.props.fetchData();
          this.props.filterList("active");
          this.props.showAddTaskMenu();
          this.setState({ title: "", description: "" });
          // this.props.history.push("/tasks");
        })
        .catch(error => console.log(error));
    }
  };
  handleChange = event => {
    // console.log(event, event.target, event.target.value);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Row>
        <Col>
          <Form onSubmit={this.handleAddTask}>
            <InputGroup>
              <FormControl
                type="text"
                name="title"
                value={this.state.title}
                onChange={e => this.handleChange(e)}
                required={true}
                placeholder="Add a task"
                aria-label="Add a task"
                aria-describedby="basic-addon2"
                ref={this.taskInput}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={this.handleAddTask}
                >
                  <FontAwesomeIcon icon={faSave} /> Save
                </Button>
                {/* <Button variant="outline-secondary"><FontAwesomeIcon icon={} /> Cancel</Button> */}
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}
