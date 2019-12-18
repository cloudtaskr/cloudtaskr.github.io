import React, { Component } from "react";
import './loading.css'

export default class loading extends Component {
  render() {
    return (
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
