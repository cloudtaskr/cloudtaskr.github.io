// NPM Installs
import React from "react";
import { Switch, Route } from "react-router-dom";
import Axios from "axios";
import baseURL from "./services/base";
// Project Components
import Landing from "./Components/Landing/Landing";
import Signup from "./Components/SignUp/Signup";
import Account from "./Components/Account/Account";
import LogIn from "./Containers/Login/Login";
import LogInTest from "./Components/Login/Login";
import Task from "./Components/Task/Task";

// Testing Components
import TaskList from "./Components/test-tasks/taskList";
import AddTask from "./Components/test-tasks/addTask";
import EditTask from "./Components/test-tasks/editTask";
import DeleteTask from "./Components/test-tasks/deleteTask";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Alert } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: null,
      taskDataIsReady: false,
      listOfTasks: [],
      filterTaskList: []
    };
  }

  /**
   * run these functions when the component renders
   * */
  componentDidMount() {
    console.log("yolo");

    // if theres a user logged in then don't make a call to the server, else make a call to check if theres a user logged in
    if (!this.state.userLoggedIn) {
      this.getUser();
    }
    // if theres a user logged in then fetch the user data from the server
    if (this.state.userLoggedIn) {
      this.fetchData();
    }
  }

  /**
   * get the user info and set the state
   * */
  getUser = () => {
    Axios.get(`${baseURL}/api/isLoggedIn`, { withCredentials: true })
      .then(res => {
        if (this.state.userLoggedIn) console.log("user state exists");

        if (!this.state.userLoggedIn) console.log("user doens't exists");
        this.setUser(res.data);
        this.setFeedbackMessage(`User data retrieved, user: ${res}`, true);
        console.log(res, this.state.userLoggedIn);
      })
      .catch(err => {
        this.setFeedbackMessage(`User data not retrieved, err: ${err}`, false);
      });
  };

  // make call to server to fetch user data
  fetchData = () => {
    Axios.get(`${baseURL}/api/tasks`, { withCredentials: true })
      .then(responseFromApi => {
        this.setState({
          listOfTasks: responseFromApi.data,
          filterTaskList: responseFromApi.data
        });
        this.setState({ taskDataIsReady: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  searchTaskInput = e => {
    const keyPress = e.target.value;
    let tasksCopy = [...this.state.listOfTasks];
    console.log(tasksCopy);
    let searchedTasks = tasksCopy.filter(eachTask => {
      return eachTask.title.toLowerCase().includes(keyPress.toLowerCase());
    });

    this.setState({
      search: e.target.value,
      filterTaskList: searchedTasks
    });
  };

  setUser = userObj => {
    this.setState({
      userLoggedIn: userObj
    });
  };

  logout = () => {
    // console.log("logout function");
    Axios.get(`${baseURL}/api/logout`, { withCredentials: true })
      .then(response => {
        console.log("You logged out", response.data);
        this.setUser(null);
        this.setState({ listOfTasks: [], filterTaskList: [] });
        this.setFeedbackMessage("Logout successful", true);
      })
      .catch(err => {
        // console.log("You logged out", err);
        this.setFeedbackMessage("Logout failed", false);
      });
  };

  setFeedbackMessage = (arg, itIsSuccess) => {
    this.setState({ error: null, message: null });

    if (itIsSuccess) {
      this.setState({ message: arg });
    } else {
      this.setState({ error: arg });
    }

    setTimeout(() => {
      this.setState({ error: null, message: null });
    }, 5500);
  };

  render() {
    // console.log("in app.js", this.state.userLoggedIn);
    return (
      <>
        {this.state.message && (
          <Alert variant={"success"}>{this.state.message}</Alert>
        )}

        {this.state.error && (
          <Alert variant={"danger"}>{this.state.error}</Alert>
        )}

        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Landing
                {...props}
                userObj={this.state.userLoggedIn}
                logout={this.logout}
                setUser={this.setUser}
                fetchData={this.fetchData}
                setFlashMessage={this.setFeedbackMessage}
              />
            )}
          />

          <Route
            exact
            path="/signup"
            render={props => (
              <Signup
                {...props}
                userObj={this.state.userLoggedIn}
                logout={this.logout}
                setUser={this.setUser}
                setFlashMessage={this.setFeedbackMessage}
                fetchData={this.fetchData}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <LogIn
                {...props}
                userObj={this.state.userLoggedIn}
                logout={this.logout}
                setUser={this.setUser}
                fetchData={this.fetchData}
              />
            )}
          />
          <Route
            exact
            path="/login-test"
            render={props => (
              <LogInTest
                {...props}
                userObj={this.state.userLoggedIn}
                logout={this.logout}
                setUser={this.setUser}
              />
            )}
          />
          <Route
            exact
            path="/account"
            render={props => (
              <Account
                {...props}
                userObj={this.state.userLoggedIn}
                logout={this.logout}
                setUser={this.setUser}
                taskDataIsReady={this.state.taskDataIsReady}
              />
            )}
          />
          <Route
            exact
            path="/task"
            render={props => (
              <Task
                {...props}
                userObj={this.state.userLoggedIn}
                logout={this.logout}
                setUser={this.setUser}
                fetchData={this.fetchData}
              />
            )}
          />
          <Route
            exact
            path="/tasks"
            render={props => (
              <TaskList
                {...props}
                userObj={this.state.userLoggedIn}
                logout={this.logout}
                setUser={this.setUser}
                filterTaskList={this.state.filterTaskList}
                searchTasksInput={this.searchTaskInput}
                setFlashMessage={this.setFeedbackMessage}
                fetchData={this.fetchData}
              />
            )}
          />
          <Route
            exact
            path="/task/add"
            render={props => (
              <AddTask
                {...props}
                userObj={this.state.userLoggedIn}
                logout={this.logout}
                setUser={this.setUser}
                filterTaskList={this.state.filterTaskList}
                searchTasksInput={this.searchTaskInput}
                fetchData={this.fetchData}
              />
            )}
          />
          <Route
            exact
            path="/task/edit/:id"
            render={props => (
              <EditTask
                {...props}
                userObj={this.state.userLoggedIn}
                logout={this.logout}
                setUser={this.setUser}
                filterTaskList={this.state.filterTaskList}
                searchTasksInput={this.searchTaskInput}
                fetchData={this.fetchData}
              />
            )}
          />
          <Route
            exact
            path="/task/delete/:id"
            render={props => (
              <DeleteTask
                {...props}
                userObj={this.state.userLoggedIn}
                logout={this.logout}
                setUser={this.setUser}
                filterTaskList={this.state.filterTaskList}
                searchTasksInput={this.searchTaskInput}
                fetchData={this.fetchData}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}

export default App;
