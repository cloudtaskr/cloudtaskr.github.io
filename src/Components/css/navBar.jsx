import React, { Component } from 'react'
import "./navBar.css"

import {Link} from "react-router-dom"
// import SearchBox from "../search-box/searchBox"

import { Button } from "react-bootstrap";

export default class NavBar extends Component {
  render() {
    return (
      <div className="container-fluid nav-style">

        <div className="nav-left">
          <Link to="/">
            <img className="logo" src="./images/logo.png" alt="logo" />
          </Link>
          {/* <Link to="/" className="nav-heading">Home</Link> */}
          {/* <Link to="/" className="nav-heading">CloudTaskr</Link> */}
          {/* <Link to="/" className="nav-heading">Create</Link> */}
        </div>

        <div className="nav-middle">
        </div>

        <div className="nav-right">
        <Link to="/" className="nav-heading nav-heading2">Home</Link>
        <Link to="/" className="nav-heading nav-heading2">About</Link>
        <Link to="/" className="nav-heading">
          <Button variant="primary btn-prp">Login</Button>
        </Link>
        <Link to="/" className="nav-heading">
          <Button variant="primary btn-prp">Sign up</Button>
        </Link>
        </div>

      </div>
    )
  }
}
