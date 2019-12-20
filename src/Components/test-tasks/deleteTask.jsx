import React from "react";
import axios from "axios";
import baseURL from "../../services/base";
import Loading from "../Loading/Loading";

export default class deleteTask extends React.Component {
  componentDidMount() {
    axios
      .delete(`${baseURL}/api/task/delete/${this.props.match.params.id}`, {
        withCredentials: true
      })
      .then(() => {
        // this.props.getData();
        // this.setState({ title: "", description: "" });
        this.props.fetchData();
        this.props.history.push("/task");
      })
      .catch(error => console.log(error));
  }

  render() {
    return (<div><Loading /></div>);
  }
}
