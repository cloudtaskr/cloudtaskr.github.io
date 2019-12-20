import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
// import Axios from "axios";
import { Link } from "react-router-dom";
// Custom Components
// import baseURL from "../../services/base";
import actions from "../../services/index";

// Styling
import "../Login/Login.css";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: String,
      password: String,
      classesAndIds: {},
      labels: true
    };
  }

  componentDidMount() {
    this.classesAndIds(this.props.formType);
  }
  handleInput = e => this.setState({ [e.target.name]: e.target.value });

  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.email) {
      let user = {
        email: this.state.email,
        password: this.state.password
      };

      // Axios.post(`${baseURL}/api/login`, user, {
      //   withCredentials: true
      // })
      actions
        .logIn(user)
        .then(response => {
          // console.log("handleFormSubmit");
          this.setState({
            email: "",
            password: ""
          });
          this.props.setUser(response.data);
          this.props.history.push("/task");
          this.props.fetchData();
          this.props.setFlashMessage("Login successful", true);
        })
        .catch(err => {
          // console.log(err);
        });
    } else {
      // figure out how to flash message
      // console.log("please input both email and password");
      this.toggleLoginButtonOff();
    }
  };
  //   form-class-name, formGroupEmailId, formGroupEmailClass, formGroupPasswordId, formGroupPasswordClass
  classesAndIds = formType => {
    let values, labels;
    if (formType === "menu") {
      values = {
        formClassName: "menu-login-form",
        formGroupEmailId: "menuEmail",
        formGroupEmailClass: "menu-form-el",
        formGroupPassword: "menuPassword",
        formGroupPasswordClass: "menu-form-el",
        formButtonClass: "menu-form-el delay-show"
      };
      labels = false;
    } else if (formType === "form") {
      values = {
        formClassName: "login-form",
        formGroupEmailId: "loginFormEmail",
        formGroupEmailClass: "login-form-el",
        formGroupPassword: "loginPassword",
        formGroupPasswordClass: "login-form-el",
        formButtonClass: ""
      };
      labels = true;
    }
    this.setState({
      classesAndIds: { ...values },
      labels: labels
    });
  };
  render() {
    let styles = {
      borderRadius: "20px",
  backgroundColor: "#2F0152",
  borderColor: "#2F0152",
  width: "100px"
    }
    return (
      <>
        <Form
          className={this.state.classesAndIds.formClassName}
          onSubmit={this.handleFormSubmit}
        >
          <Form.Group
            controlId={this.state.classesAndIds.formGroupEmailId}
            className={this.state.classesAndIds.formGroupEmailClass}
          >
            {this.state.labels && <Form.Label>Email</Form.Label>}
            <Form.Control style={{width:"500px"}}
              name="email"
              type="email"
              placeholder="Enter email"
              defaultValue={this.state.email}
              onChange={this.handleInput}
            />
          </Form.Group>

          <Form.Group
            controlId={this.state.classesAndIds.formGroupPassword}
            className={this.state.classesAndIds.formGroupPasswordClass}
          >
            {this.state.labels && <Form.Label>Password</Form.Label>}
            <Form.Control style={{width:"500px"}}
              name="password"
              type="password"
              placeholder="Password"
              defaultValue={this.state.password}
              onChange={this.handleInput}
            />
          </Form.Group>

          <Form.Group>
            <Button style={styles}
              className={this.state.classesAndIds.formButtonClass}
              type="submit"
            >
              Login
            </Button>
            <Link to="/signup">Don't have an account? Sign up</Link>
          </Form.Group>
        </Form>
      </>
    );
  }
}
