import React, { Component } from "react";
import { Container } from "react-bootstrap";

// Custom Components
import BackgroundWithOverlay from "../../Components/BackgroundWithOverlay/BackgroundWithOverlay";
import LoginForm from "../../Components/LoginForm/LoginForm";

export default class Login extends Component {
  checkUser = () => {
    if (this.props.userObj) {
      this.props.history.push("/tasks");
    }
  };
  render() {
    this.checkUser();
    return (
      <Container>
        <BackgroundWithOverlay
          imgUrl="books-business-computer-connection-459654.jpg"
          alpha=".2"
        />
        <LoginForm {...this.props} formType="form" />
      </Container>
    );
  }
}
