import React from "react";
import { Container, FormLabel } from "react-bootstrap";
import baseURL from "../../../services/base";
import Axios from "axios";
//components
// import ZoneSearchInput from "../../ZoneSearchInput/ZoneSearchInput"

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import "../../../services/googleapi";

// Styling
import "../Account.css";
import { Form, FormControl, Button } from "react-bootstrap";

export default class Zones extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autocompleteInput: "",
      zones: {
        name: this.props.userObj.zones.name,
        address: this.props.userObj.zones.address,
        lat: this.props.userObj.zones.lat,
        lng: this.props.userObj.zones.lng
      },
      ready: true
    };
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
        this.props.setFlashMessage("Zones are set", true);
        // this.props.history.push("/tasks");
        // this.props.setUser(response.data);
        this.setState({
          autocompleteInput: ""
        });
        this.props.getUser();
        console.log("Zone Updated");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleZonesChange = event => {
    let zones = { ...this.state.zones };
    zones[event.target.name] = event.target.value;
    console.log(zones);
    this.setState({ zones: zones });
    // this.props.getUser();
  };

  handleChange = address => {
    console.log(address);
    this.setState({ zones: { address: address } });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log("Success", latLng);
        this.setState({
          autocompleteInput: address,
          zones: {
            name: this.state.zones.name,
            address: address,
            lat: latLng.lat,
            lng: latLng.lng
          }
        });
        console.log(this.state);
      })
      .catch(error => console.error("Error", error));
  };
  render() {
    return (
      <Form onSubmit={this.handleZoneUpdate}>
        <Form.Group controlId="zones">
          <h3>Zones</h3>
          <FormLabel>Home:</FormLabel>
          <PlacesAutocomplete
            // name="autocompleteInput"
            value={this.state.zones.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <FormControl
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input"
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          {/* <ZoneSearchInput /> */}
          <FormControl
            type="hidden"
            name="name"
            value={this.state.zones.name}
            // defaultValue={this.props.userObj && this.props.userObj.zones.name}
            onChange={e => this.handleZonesChange(e)}
            placeholder="Home"
          />
          <FormControl
            type="hidden"
            name="address"
            value={this.state.zones.address}
            // defaultValue={this.props.userObj && this.props.userObj.zones.address}
            onChange={e => this.handleZonesChange(e)}
            placeholder="Enter a address"
          />
          <FormControl
            type="hidden"
            name="lat"
            value={this.state.zones.lat}
            // defaultValue={this.props.userObj && this.props.userObj.zones.lat}
            onChange={e => this.handleZonesChange(e)}
            placeholder="Enter a number"
          />
          <FormControl
            type="hidden"
            name="lng"
            value={this.state.zones.lng}
            // defaultValue={this.props.userObj && this.props.userObj.zones.lng}
            onChange={e => this.handleZonesChange(e)}
            placeholder="Enter a number"
          />
        </Form.Group>
        <div>
          <Button type="submit">Update</Button>
        </div>
      </Form>
    );
  }
}
