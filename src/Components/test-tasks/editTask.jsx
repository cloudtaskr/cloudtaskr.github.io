import React, { Component } from "react";
// import Axios from 'axios';

// import { Row } from "react-bootstrap";
// import { Col } from "react-bootstrap";
import {
  FormControl,
  Form,
  FormGroup,
  FormLabel,
  Container
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import Menu from "../Menu/Menu";
import axios from "axios";
import baseURL from "../../services/base";

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }

  componentDidMount() {
    console.log(this);

    axios
      .get(`${baseURL}/api/task/edit/${this.props.match.params.id}`, {
        withCredentials: true
      })
      .then(res => {
        console.log(res.data);
        this.setState(res.data);
      });
  }

  handleUpdateTask = event => {
    event.preventDefault();

    const title = this.state.title;
    const description = this.state.description;
    axios
      .post(
        `${baseURL}/api/task/edit/${this.props.match.params.id}`,
        { title, description },
        { withCredentials: true }
      )
      .then(() => {
        // this.props.getData();
        this.setState({ title: "", description: "" });
        this.props.fetchData();
        this.props.history.push("/tasks");
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    // console.log(event, event.target, event.target.value);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div>
        <Menu
          id="landingMenuSticky"
          {...this.props}
          logout={this.props.logout}
          setUser={this.props.setUser}
          fetchData={this.props.fetchData}
        />
        <Container>
          <Form onSubmit={this.handleUpdateTask}>
            <FormLabel>
              {" "}
              <FontAwesomeIcon icon={faList} /> Title:
            </FormLabel>
            <FormControl
              type="text"
              name="title"
              value={this.state.title}
              onChange={e => this.handleChange(e)}
              required
            />
            <FormLabel>Description:</FormLabel>
            <FormControl
              type="text"
              name="description"
              value={this.state.description}
              onChange={e => this.handleChange(e)}
            />
            <FormGroup>
              <button className="btn btn-warning">Update</button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default EditTask;
