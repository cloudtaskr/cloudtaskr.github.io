import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faHome,
  faBriefcase,
  faPlus,
  faCloud
} from "@fortawesome/free-solid-svg-icons";
// Project Components
// import Menu from "../Menu/Menu";

// Styling
import "./Task.css";
import { LinkContainer } from "react-router-bootstrap";

export default class Task extends Component {
  render() {
    return (
      <>
        {/* <Menu
          {...this.props}
          logOut={this.props.logOut}
          setUser={this.props.setUser}
        /> */}
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
              <h3 id="add-task">
                <FontAwesomeIcon icon={faPlus} />
              </h3>
            </Container>
          </aside>
          <section id="task-section">
            <Container>
              <h3>Task List</h3>
            </Container>
          </section>
        </div>
      </>
    );
  }
}
