import React, { Component } from "react";
import { Modal, FormLabel } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Axios from "axios";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";

import baseURL from "../../services/base"

export default class AddTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }
  handleFormSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    Axios.post(`${baseURL}/api/tasks`, { title, description }, {withCredentials: true})
      .then(() => {
        // this.props.getData();
        this.setState({ title: "", description: "" });
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
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}
          <Row>
            <Col>
              <Form onSubmit={this.handleFormSubmit}>
                <FormLabel>Title:</FormLabel>
                <FormControl
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={e => this.handleChange(e)}
                />
                <FormLabel>Description:</FormLabel>
                <FormControl
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={e => this.handleChange(e)}
                />
                <FormGroup>
                <button className="btn btn-danger" onClick={this.props.onHide}>
                  Create
                </button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
