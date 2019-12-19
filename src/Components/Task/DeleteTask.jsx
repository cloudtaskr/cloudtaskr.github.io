import React from "react";
import axios from "axios";
import baseURL from "../../services/base";
import Loading from "../Loading/Loading";

export default function deleteTask(theId) {
  let deleteRequest = () => {
    axios
      .delete(`${baseURL}/api/task/delete/${theId}`, {
        withCredentials: true
      })
      .then(() => {
        console.log("delete request sent");
        // this.props.getData();
        // this.props.update();
        // this.props.history.push("/task");
      })
      .catch(error => console.log(error));
  };

  deleteRequest();
  return console.log(theId);
}
