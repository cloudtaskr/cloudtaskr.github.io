import React from "react";
import axios from "axios";
import baseURL from "../../services/base";
import Loading from "../Loading/Loading";

export default class completeTask extends React.Component {
  componentDidMount() {
      
      axios
        .post(
          `${baseURL}/api/task/edit/${this.props.match.params.id}`,
          { status: "complete" },
          { withCredentials: true }
        )
        .then(res => {
          console.log(res);
          // this.props.getData();
          // this.setState({ title: "", description: "" });
          this.props.fetchData();
          this.props.history.push("/task");
        })
        .catch(error => console.log(error));
    };
  

  render() {
    return (<div><Loading /></div>);
  }
}
