import React, { Component } from "react";
import { Container, Button, Form } from "react-bootstrap";

// Custom Components
import Menu from "../Menu/Menu";

// Styling
import "../Login/Login.css";

import actions from "../../services/index";

export default class LogIn extends Component {
  state = {};
  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  handleFormSubmit = async e => {
    e.preventDefault();
    let user = await actions.logIn(this.state);
    this.props.history.push("/task");
    this.props.setUser({ ...user.data });
  };

  render() {
    return (
      <>
        {/* <Menu
          id="landingMenuSticky"
          {...this.props}
          logOut={this.props.logOut}
          setUser={this.props.setUser}
        /> */}
        <div className="login-page" style={this.backgroundImage}>
          <div className="login-overlay"></div>
        </div>
        <Container className="login-container">
          <h1></h1>
          <Form className="login-form" onSubmit={this.handleFormSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                defaultValue={this.state.email}
                onChange={this.handleInput}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                defaultValue={this.state.password}
                onChange={this.handleInput}
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit">Login</Button>
            </Form.Group>
          </Form>
        </Container>
      </>
    );
  }
}
