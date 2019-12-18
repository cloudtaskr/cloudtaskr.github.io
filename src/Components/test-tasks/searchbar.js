import React from "react";

class SearchBar extends React.Component {
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
        console.log(this.state);
      }
      // By placing the console.log as a callback function the log will print immediately after the state is set.
    );
  };

  render() {
    return (
      <div>
        <input
          placeholder="Find a task"
          name="taskTitleSearch"
          onChange={this.updateInput}
        />
      </div>
    );
  }
}
export default SearchBar;
