import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitleSearch: ""
    };
  }
  updateInput = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        console.log(this.state.taskTitleSearch);
        this.props.search(this.state.taskTitleSearch);
        // this.props.search(this.state.taskTitleSearch);
      }
      // By placing the console.log as a callback function the log will print immediately after the state is set.
    );
  };

  render() {
    return (
      <>
        <input
          placeholder="Search by..."
          name="taskTitleSearch"
          onChange={this.updateInput}
        />
        <p>Title</p>
      </>
    );
  }
}
