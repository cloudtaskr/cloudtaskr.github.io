import React from "react";
import { FormLabel, InputGroup, Row, Col } from "react-bootstrap";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faStopCircle } from "@fortawesome/free-solid-svg-icons";

export default class Zones extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // autocompleteInput: "",
      zones: {
        name: this.props.userObj.zones.name && this.props.zoneName,
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
        this.props.getUser();
        // console.log("Zone Updated");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleZonesChange = event => {
    let zones = { ...this.state.zones };
    zones[event.target.name] = event.target.value;
    // console.log(zones);
    this.setState({ zones: zones });
    // this.props.getUser();
  };

  clearHandleZoneChange = () => {
    this.setState({
      zones: {
        name: "",
        address: "",
        lat: "",
        lng: ""
      }
    });
  };

  handleChange = address => {
    // console.log(address);
    this.setState({ zones: { address: address } });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log("Success", latLng);
        this.setState({
          // autocompleteInput: address,
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
    // console.log(this.props);
    console.log(this.state);
    // console.log("userObj zones.name",this.props.userObj.zones.name)
    // console.log("state zones.name",this.props.zones.name)
    return (
      <Row>
        <Col>
          <Form onSubmit={this.handleZoneUpdate}>
            <PlacesAutocomplete
              name="address"
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
                <>
                  <FormLabel>{this.props.zoneName.toUpperCase()}: </FormLabel>
                  <InputGroup>
                    <FormControl
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input"
                      })}
                    />
                    <FormControl
                      type="hidden"
                      name="name"
                      value={this.state.zones.name}
                      // defaultValue={this.props.userObj && this.props.userObj.zones.name}
                      // onChange={e => this.handleZonesChange(e)}
                      // placeholder="Home"
                    />
                    <FormControl
                      type="hidden"
                      name="lat"
                      value={this.state.zones.lat}
                      // defaultValue={this.props.userObj && this.props.userObj.zones.lat}
                      // onChange={e => this.handleZonesChange(e)}
                      // placeholder="Enter a number"
                    />
                    <FormControl
                      type="hidden"
                      name="lng"
                      value={this.state.zones.lng}
                      // defaultValue={this.props.userObj && this.props.userObj.zones.lng}
                      // onChange={e => this.handleZonesChange(e)}
                      // placeholder="Enter a number"
                    />

                    <InputGroup.Append>
                      <Button
                        variant="outline-secondary"
                        onClick={this.handleZoneUpdate}
                      >
                        <FontAwesomeIcon icon={faSave} /> Save
                      </Button>
                    </InputGroup.Append>
                    <InputGroup.Append>
                      <Button
                        variant="outline-secondary"
                        onClick={this.clearHandleZoneChange}
                      >
                        <FontAwesomeIcon icon={faStopCircle} /> Clear
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
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
                </>
              )}
            </PlacesAutocomplete>
            {/* <ZoneSearchInput /> */}
          </Form>
        </Col>
      </Row>
    );
  }
}
