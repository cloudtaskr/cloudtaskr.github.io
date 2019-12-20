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
import EditTask from "./editTask";

export default class AddTaskModal extends Component {
  

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
             <EditTask />
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
