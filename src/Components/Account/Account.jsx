import React, { Component } from "react";
import { Container, FormLabel } from "react-bootstrap";
import baseURL from "../../services/base";

// Custom componenets
import Menu from "../Menu/Menu";
import Loading from "../Loading/Loading";

// Styling
import "./Account.css";
import { Form, FormControl, Button } from "react-bootstrap";
import Axios from "axios";
import Zones from "./Zones/Zones";

let pageBackground = {
  backgroundImage:
    "url(" + process.env.PUBLIC_URL + "/images/light-sun-cloud-japan-45848.jpg)"
};
export default class Account extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      // zones: {
      //   name: '',
      //   address: '',
      //   lat: '',
      //   lng: ""
      // },
      ready: true
    }
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
        
        this.props.setFlashMessage("Username is set", true)
        // this.props.history.push("/tasks");
        // this.props.setUser(response.data);
        // this.props.getUser();
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
        this.props.setFlashMessage("Name is set", true)
        // this.props.history.push("/tasks");
        // this.props.setUser(response.data);
        // this.props.getUser();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    console.log(this.state)
    this.setState({ [event.target.name]: event.target.value });
  };

  // handleZoneUpdate = event => {
  //   event.preventDefault();

  //   let updateZones = {
  //     zones: {
  //       name: this.state.zones.name,
  //       address: this.state.zones.address,
  //       lat: this.state.zones.lat,
  //       lng: this.state.zones.lng
  //       // name: "1", address: "2", lat: "3", lng: "4"
  //     }
  //   };

  //   Axios.post(`${baseURL}/api/editprofile/zones`, updateZones, {
  //     withCredentials: true
  //   })
  //     .then(response => {
        
  //       this.props.setFlashMessage("Zones are set", true)
  //       // this.props.history.push("/tasks");
  //       // this.props.setUser(response.data);

  //       this.props.getUser();
  //       console.log("Zone Updated");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // handleZonesChange = event => {
  //   console.log(this.state)
  //   let zones = { ...this.state.zones };
  //   zones[event.target.name] = event.target.value;
  //   console.log(event.target.vale);
  //   this.setState({ zones: zones });
  //   // this.props.getUser();
  // };
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
              Welcome{" "}
              {this.props.userObj && this.props.userObj.firstName}
            </h1>
            <section>
              <Form onSubmit={this.handleUsernameUpdate}>
                <Form.Group controlId="username">
                  <FormLabel>Set a Username:</FormLabel>
                  <FormControl
                    type="text"
                    name="username"
                    defaultValue={this.props.userObj && this.props.userObj.username}
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
                    defaultValue={this.props.userObj && this.props.userObj.firstName}
                    onChange={e => this.handleChange(e)}
                    placeholder="Enter your first name"
                  />
                  <FormLabel>Last name:</FormLabel>
                  <FormControl
                    type="text"
                    name="lastName"
                    defaultValue={this.props.userObj && this.props.userObj.lastName}
                    onChange={e => this.handleChange(e)}
                    placeholder="Enter your last name"
                  />
                </Form.Group>
                <div>
                  <Button type="submit">Update</Button>
                </div>
              </Form>

              <hr />
              <hr />

              <Zones setFlashMessage={this.props.setFlashMessage} getUser={this.props.getUser} 
                userObj={this.props.userObj} zoneName="home" />

          <Zones setFlashMessage={this.props.setFlashMessage} getUser={this.props.getUser} 
                userObj={this.props.userObj} zoneName="work" />
            
              <hr />
              <hr />

            
            </section>
          </Container>
        </>
      );
    } else {
      return <Loading />;
    }
  }
}
