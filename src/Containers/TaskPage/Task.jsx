import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faHome,
  faBriefcase,
  faPlus,
  faCloud
} from "@fortawesome/free-solid-svg-icons";

// Project Components
import Menu from "../../Components/Menu/Menu";
import TaskList from "../../Containers/TaskPage/TaskList";
// import AddTaskModal from "../../Components/test-tasks/addTaskModal";

// Styling
import "../../Components/Task/Task.css";
import { LinkContainer } from "react-router-bootstrap";

export default class Task extends Component {
  checkForTasks = () => {
    if (this.props.filterTaskList.length > 0) {
      return this.props.filterTaskList;
    } else {
      return {};
    }
  };

  // addTasks = () => {
  //   return <AddTaskModal />;
  // };

  render() {
    return (
      <>
        <Menu
          id="landingMenuSticky"
          {...this.props}
          logout={this.props.logout}
          setUser={this.props.setUser}
          fetchData={this.props.fetchData}
        />
        <div id="task-page">
          <aside id="task-sidebar">
            <Container>
              <h2 className="sidebar-header">Sections</h2>
              <LinkContainer className="sidebar-item" to="/task/all">
                <ul className="fa-ul">
                  <li>
                    <h4>
                      <FontAwesomeIcon icon={faCloud} listItem />
                      Cloud Tasks
                    </h4>
                  </li>
                </ul>
              </LinkContainer>
              <LinkContainer className="sidebar-item" to="/task/inbox">
                <ul className="fa-ul">
                  <li>
                    <h4>
                      <FontAwesomeIcon icon={faInbox} listItem />
                      Inbox
                    </h4>
                  </li>
                </ul>
              </LinkContainer>

              <h3 className="sidebar-header">Zones</h3>
              <div className="sidebar-item">
                <LinkContainer to="/task/home">
                  <ul className="fa-ul">
                    <li>
                      <h4>
                        <FontAwesomeIcon icon={faHome} listItem />
                        Home
                      </h4>
                    </li>
                  </ul>
                </LinkContainer>
              </div>
              <LinkContainer className="sidebar-item" to="/task/work">
                <ul className="fa-ul">
                  <li>
                    <h4>
                      <FontAwesomeIcon icon={faBriefcase} listItem />
                      Work
                    </h4>
                  </li>
                </ul>
              </LinkContainer>

              <h3 className="sidebar-header">Tags</h3>
              <Button id="add-task">
                <h3>
                  <FontAwesomeIcon icon={faPlus} />
                </h3>
              </Button>
            </Container>
          </aside>
          <section id="task-section">
            <TaskList {...this.props} viewableTasks={this.checkForTasks()} />
          </section>
        </div>
      </>
    );
  }
}
