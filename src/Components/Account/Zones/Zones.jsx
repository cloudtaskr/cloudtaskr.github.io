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
      address: "",
      zones: {
        home: {
          name: this.props.userObj.zones.home.name,
          address: this.props.userObj.zones.home.address,
          lat: this.props.userObj.zones.home.lat,
          lng: this.props.userObj.zones.home.lng
        },
        work: {
          name: this.props.userObj.zones.work.name,
          address: this.props.userObj.zones.work.address,
          lat: this.props.userObj.zones.work.lat,
          lng: this.props.userObj.zones.work.lng
        }
      },
      ready: true
    };
  }
  handleZoneUpdate = (event, location) => {
    event.preventDefault();

    let updateZones = {
      zones: {
        home: {
          name: this.state.zones.home.name,
          address: this.state.zones.home.address,
          lat: this.state.zones.home.lat,
          lng: this.state.zones.home.lng
        },
        work: {
          name: this.state.zones.work.name,
          address: this.state.zones.work.address,
          lat: this.state.zones.work.lat,
          lng: this.state.zones.work.lng
        }
      }
    };

    Axios.post(`${baseURL}/api/editprofile/zones`, updateZones, {
      withCredentials: true
    })
      .then(response => {
        this.props.setUser(response.data);
        console.log("Zone Updated");
        this.props.setFlashMessage("Zones are set", true);
        this.props.history.push("/account");
      })
      .catch(err => {
        console.log(err);
      });
  };

  clearHandleZoneChange = location => {
    this.setState({
      address: ""
    });
  };

  handleChange = address => {
    // console.log(address);
    this.setState({ address: address });
  };

  handleSelect = (address, location) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        // console.log("Success", latLng);
        if (location === "home") {
          this.setState({
            address: address,
            zones: {
              home: {
                name: "home",
                address: address,
                lat: latLng.lat,
                lng: latLng.lng
              },
              work: {
                name: this.props.userObj.zones.work.name,
                address: this.props.userObj.zones.work.address,
                lat: this.props.userObj.zones.work.lat,
                lng: this.props.userObj.zones.work.lng
              }
            }
          });
        }
        if (location === "work") {
          this.setState({
            address: address,
            zones: {
              home: {
                name: this.props.userObj.zones.home.name,
                address: this.props.userObj.zones.home.address,
                lat: this.props.userObj.zones.home.lat,
                lng: this.props.userObj.zones.home.lng
              },
              work: {
                name: "work",
                address: address,
                lat: latLng.lat,
                lng: latLng.lng
              }
            }
          });
        }
        // console.log(this.state);
      })
      .catch(error => console.error("Error", error));
  };
  render() {
    // console.log(this.props);
    // console.log(this.state);
    // console.log("userObj zones.name",this.props.userObj.zones.name)
    // console.log("state zones.name",this.props.zones.name)
    console.log(this.state.zones.home);
    console.log(this.state);

    return (
      <Row>
        <Col>
          <Form
            onSubmit={event => {
              this.handleZoneUpdate(event, this.props.zoneName);
            }}
          >
            <PlacesAutocomplete
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={address => {
                this.handleSelect(address, this.props.zoneName);
              }}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }) => (
                <>
                  <FormLabel>
                    {this.props.zoneName.toUpperCase()}:{" "}
                    {this.props.zoneName==="custom" ? "Custom" : this.props.userObj.zones[this.props.zoneName].address }
                  </FormLabel>
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
                        onClick={event => {
                          this.handleZoneUpdate(event, this.props.zoneName);
                        }}
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
