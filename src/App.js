// NPM Installs
import React from "react";
import { Switch, Route } from "react-router-dom";
import Axios from "axios";
import baseURL from "./services/base";

// Project Components
import Landing from "./Components/Landing/Landing";
import Signup from "./Components/SignUp/Signup";
import Account from "./Components/Account/Account";
import LogIn from "./Containers/LoginPage/Login";
// import LogInTest from "./Components/Login/Login";
import Task from "./Containers/TaskPage/Task";

// Testing Components
import TaskList from "./Components/test-tasks/taskList";
import AddTask from "./Components/test-tasks/addTask";
import EditTask from "./Components/test-tasks/editTask";
import DeleteTask from "./Components/test-tasks/deleteTask";
import CompleteTask from "./Components/test-tasks/completeTask";
import Loading from "./Components/Loading/Loading";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Alert } from "react-bootstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: null,
      listOfTasks: [],
      filterTaskList: [],
      taskDataIsReady: false,
      errorMsg: null,
      successMsg: null,
      apiIsAwake: false, 
      userLocation: {
        latitude: 0,
        longitude: 0
      },
    };
  }

  /**
   * after the first render react will run the functions in componentDidMount()
   * any time setState() is called React will render the components again
   */
  componentDidMount() {
    console.log("Mount App");
    this.getUser();
    this.getUserLocation();
  }


  getUserLocation = () => {
    let geo_success = position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    };

    let geo_error = () => {
      console.log("Sorry, no position available.");
    };

    let geo_options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 7000
    };

    navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
  }

  // calculate distance of user and task zone lat/lng
  distanceFunction = (lat1, lon1, lat2, lon2, unit)=>{
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit==="K") { dist = dist * 1.609344 }
      if (unit==="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  /**
   * make call to server to get the user data and save to set state
   */
  getUser = () => {
    Axios.get(`${baseURL}/api/isLoggedIn`, { withCredentials: true })
      .then(res => {
        // if there is a user logged in then fetch the user data and set the state
        if (res.data) {
          this.setUser(res.data);
          this.fetchData();
          this.setFeedbackMessage(
            `${res.data.username} successfully logged in`,
            true
          );
          setTimeout(() => {
            this.setState({apiIsAwake: true})
          },4000)
        } else {
          this.setFeedbackMessage(`No user is currently logged in`, false);
          setTimeout(() => {
            this.setState({apiIsAwake: true})
          },4000)
        }
        this.setState({apiIsAwake: true})
      })
      .catch(err => {
        this.setFeedbackMessage(
          `Failed to verify if there is a user logged in. Error: ${err}`,
          false
        );
      });
  };

  /**
   * make call to server to fetch user tasks and save to set state
   */
  fetchData = () => {
    Axios.get(`${baseURL}/api/tasks`, { withCredentials: true })
      .then(res => {
        this.setState({
          listOfTasks: res.data,
          filterTaskList: res.data,
          taskDataIsReady: true
        });
        this.setFeedbackMessage(`User's data was successfully fetched`, true);
      })
      .catch(err => {
        this.setFeedbackMessage(
          `Failed to retrieve user data. Error: ${err}`,
          false
        );
      });
  };

  /**
   * save the user data to the state
   */
  setUser = userObj => {
    this.setState({
      userLoggedIn: userObj
    });
  };

  /**
   * logout the user from the backend and delete all user data from state
   */
  logout = () => {
    Axios.get(`${baseURL}/api/logout`, { withCredentials: true })
      .then(res => {
        this.setUser(null);
        this.setState({
          listOfTasks: [],
          filterTaskList: [],
          taskDataIsReady: false
        });
        this.setFeedbackMessage(`${res.data.message}`, true);
      })
      .catch(err => {
        this.setFeedbackMessage(`Failed to logout user. Error: ${err}`, false);
      });
  };

  /**
   * displays flash messages to the user
   * maybe later we can make this a component but you still will need something in state
   * to decide when to show the component so is it worth it to make a component
   */
  setFeedbackMessage = (message, itIsSuccess) => {
    if (itIsSuccess) {
      this.setState({
        successMsg: message
      });
    } else {
      this.setState({
        errorMsg: message
      });
    }

    // only display message for x amount of time
    setTimeout(() => {
      this.setState({
        errorMsg: null,
        successMsg: null
      });
    }, 5500);
  };

  /**
   * filter the tasks list based on the search input and save the filtered list to state
   */
  searchTaskInput = e => {
    const currentSearchValue = e.target.value;
    let tasksListCopy = [...this.state.listOfTasks];
    let filteredTasks = tasksListCopy.filter(eachTask => {
      return eachTask.title
        .toLowerCase()
        .includes(currentSearchValue.toLowerCase());
    });

    this.setState({
      filterTaskList: filteredTasks
    });
  };

  render() {
    console.log("Render App", this.state.apiIsAwake);

    if (this.state.apiIsAwake) {
      return (
        <>
          {this.state.successMsg && (
            <Alert variant={"success"}>{this.state.successMsg}</Alert>
          )}

          {this.state.errorMsg && (
            <Alert variant={"danger"}>{this.state.errorMsg}</Alert>
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
              path="/account"
              render={props => (
                <Account
                  {...props}
                  userObj={this.state.userLoggedIn}
                  logout={this.logout}
                  getUser={this.getUser}
                  setFlashMessage={this.setFeedbackMessage}
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
                  ready={this.state.ready}
                  filterTaskList={this.state.filterTaskList}
                  searchTasksInput={this.searchTaskInput}
                  setFlashMessage={this.setFeedbackMessage}
                  fetchData={this.fetchData}
                  userLocation={this.state.userLocation}
                  distanceFunction={this.distanceFunction}
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
                  userLocation={this.state.userLocation}
                  distanceFunction={this.distanceFunction}
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
                  fetchData={this.fetchData}
                />
              )}
            />
            <Route
              exact
              path="/task/complete/:id"
              render={props => (
                <CompleteTask
                  {...props}
                  userObj={this.state.userLoggedIn}
                  fetchData={this.fetchData}
                />
              )}
            />
          </Switch>
        </>
      );
    } else {
      return <Loading />;
    }
  }
}

export default App;
