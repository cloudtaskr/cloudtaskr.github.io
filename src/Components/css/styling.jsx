import React, { Component } from "react";
import "./styling.css";

import NavBar from "./navBar";

import { Jumbotron, Button } from "react-bootstrap";

export default class Style extends Component {
  render() {
    return (
      <div>
        <NavBar />

        
        <div className="landing-home" >
          <div className="welcome" >

          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary btn-prp2">Learn more</Button>
          </p>
          </div>
          
          <div className="bg-img"></div>
        </div>
      </div>
    );
  }
}
