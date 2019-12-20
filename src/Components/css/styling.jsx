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

          <h1>To-Do Lists, Tasks, Reminders & more</h1>
          <p>
            Reprogram your brain and automate the important rituals in your life so you have more time for what really matters.
          </p>
          <p>
            <Button variant="primary btn-prp2">Try if for Free</Button>
          </p>
          </div>
          
          <div className="bg-img"></div>
        </div>
      </div>
    );
  }
}
