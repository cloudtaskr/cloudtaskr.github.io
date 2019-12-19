import React from "react";
import { FormLabel } from "react-bootstrap";
import baseURL from "../../../services/base";
import Axios from "axios";
//components
import ZoneSearchInput from "../../ZoneSearchInput/ZoneSearchInput"

// Styling
import "../Account.css";
import { Form, FormControl, Button } from "react-bootstrap";

export default class Zones extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          firstName: '',
          lastName: '',
          username: '',
          zones: {
            name: '',
            address: '',
            lat: '',
            lng: ""
          },
          ready: true
        }
      }
    handleZoneUpdate = event => {
    event.preventDefault();

    let updateZones = {
      zones: {
        name: this.state.zones.name,
        address: this.state.zones.address,
        lat: this.state.zones.lat,
        lng: this.state.zones.lng
        // name: "1", address: "2", lat: "3", lng: "4"
      }
    };

    Axios.post(`${baseURL}/api/editprofile/zones`, updateZones, {
      withCredentials: true
    })
      .then(response => {
        
        this.props.setFlashMessage("Zones are set", true)
        // this.props.history.push("/tasks");
        // this.props.setUser(response.data);

        this.props.getUser();
        console.log("Zone Updated");
      })
      .catch(err => {
        console.log(err);
      });
  };



  handleZonesChange = event => {
    console.log(this.state)
    let zones = { ...this.state.zones };
    zones[event.target.name] = event.target.value;
    console.log(event.target.vale);
    this.setState({ zones: zones });
    // this.props.getUser();
  };
    render() {
        return (
            <Form onSubmit={this.handleZoneUpdate}>
                <Form.Group controlId="zones">
                  <h3>Zones</h3>
                  <FormLabel>Home:</FormLabel>

                  <ZoneSearchInput />
                  <FormControl
                    type="text"
                    name="name"
                    defaultValue={this.props.userObj && this.props.userObj.zones.name}
                    onChange={e => this.handleZonesChange(e)}
                    placeholder="Home"
                  />
                  <FormControl
                    type="text"
                    name="address"
                    defaultValue={this.props.userObj && this.props.userObj.zones.address}
                    onChange={e => this.handleZonesChange(e)}
                    placeholder="Enter a address"
                  />
                  <FormControl
                    type="text"
                    name="lat"
                    defaultValue={this.props.userObj && this.props.userObj.zones.lat}
                    onChange={e => this.handleZonesChange(e)}
                    placeholder="Enter a number"
                  />
                  <FormControl
                    type="text"
                    name="lng"
                    defaultValue={this.props.userObj && this.props.userObj.zones.lng}
                    onChange={e => this.handleZonesChange(e)}
                    placeholder="Enter a number"
                  />

                  {/* <FormLabel>Work:</FormLabel>
                  <FormControl
                    type="text"
                    name="workZone"
                    value={this.state.workZone}
                    onChange={e => this.handleZonesChange(e)}
                    placeholder="Enter your work address"
                  /> */}
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
        )
    }
}
