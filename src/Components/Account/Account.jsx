import React, { Component } from "react";
import { Container, FormLabel } from "react-bootstrap";
import baseURL from "../../services/base"

// Custom componenets
import Menu from "../Menu/Menu";
import Loading from "../Loading/Loading";

// Styling
import "./Account.css";
import { Form, FormControl, Button } from "react-bootstrap";
import Axios from "axios";

let pageBackground = {
  backgroundImage:
    "url(" + process.env.PUBLIC_URL + "/images/light-sun-cloud-japan-45848.jpg)"
};
export default class Account extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: ""
  };
  constructor(props) {
    super(props);

    this.state = { ...this.state, ...props.userObj };
  }

  handleUsernameUpdate = event => {
    event.preventDefault();

    let update = {
      username: this.state.username
    };

    Axios.post(`${baseURL}/api/editprofile/username`, update, {
      withCredentials: true
    })
      .then(response => {
        this.setState({
          username: ""
        });
        this.props.history.push("/tasks");
        this.props.setUser(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleNameUpdate = event => {
    event.preventDefault();

    let update = {
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };

    Axios.post(`${baseURL}/api/editprofile/name`, update, {
      withCredentials: true
    })
      .then(response => {
        this.setState({
          firstName: "",
          lastName: ""
          // homeZone: "",
          // workZone: "",
          // customZone: "",
        });
        this.props.history.push("/tasks");
        this.props.setUser(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (this.props.taskDataIsReady) {
      return (
        <>
          <Menu
            id="landingMenuSticky"
            {...this.props}
            logout={this.props.logout}
            setUser={this.props.setUser}
          />
          <div className="account-page" style={pageBackground}>
            <div className="account-overlay"></div>
          </div>
          <Container className="account-container">
            <h1>
              Welcome {this.props.username ? this.props.username : "User"}
            </h1>
            <section>
              <Form onSubmit={this.handleUsernameUpdate}>
                <Form.Group controlId="username">
                  <FormLabel>Set a Username:</FormLabel>
                  <FormControl
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={e => this.handleChange(e)}
                    placeholder="Set a username"
                  />
                </Form.Group>

                <div>
                  <Button type="submit">Update</Button>
                </div>
              </Form>

              <Form onSubmit={this.handleNameUpdate}>
                <Form.Group controlId="name">
                  <FormLabel>First Name:</FormLabel>
                  <FormControl
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={e => this.handleChange(e)}
                    placeholder="Enter your first name"
                  />
                  <FormLabel>Last name:</FormLabel>
                  <FormControl
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={e => this.handleChange(e)}
                    placeholder="Enter your last name"
                  />
                </Form.Group>
                <div>
                  <Button type="submit">Update</Button>
                </div>
              </Form>

              <hr />

              <Form onSubmit={this.handleZoneUpdate}>
                <Form.Group controlId="zones">
                  <h3>Zones</h3>
                  <FormLabel>Home:</FormLabel>
                  <FormControl
                    type="text"
                    name="homeZone"
                    value={this.state.homeZone}
                    onChange={e => this.handleChange(e)}
                    placeholder="Enter your home address"
                  />

                  <FormLabel>Work:</FormLabel>
                  <FormControl
                    type="text"
                    name="workZone"
                    value={this.state.workZone}
                    onChange={e => this.handleChange(e)}
                    placeholder="Enter your work address"
                  />
                  {/* <FormLabel>Custom (coming soon):</FormLabel>
                  <FormControl
                    type="text"
                    name="customZone"
                    value={this.state.customZone}
                    onChange={e => this.handleChange(e)}
                    placeholder="Enter an address"
                  /> */}
                </Form.Group>
                <div>
                  <Button type="submit">Update</Button>
                </div>
              </Form>
            </section>
          </Container>
        </>
      );
    } else {
      return <Loading />;
    }
  }
}
