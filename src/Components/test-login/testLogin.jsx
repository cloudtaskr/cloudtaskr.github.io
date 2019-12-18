import React, { Component } from 'react'
import Axios from 'axios';
import baseURL from "../../services/base"

export default class TestLogin extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    // let email: this.state.email = this.state.email: this.state.email;
    // let password = this.state.password;
    let user = {
      email: this.state.email,
      password: this.state.password,
    }
    console.log("inside testlogin",user)

    Axios.post(`${baseURL}/api/login`, user, {withCredentials: true})
    .then( response => {
      console.log("response from login post",response.data)
      this.setState({
        email: "",
        password: "",
      })
      this.props.setUser(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  handleChange = (event) => {  
    // console.log(event.target.name, event.target.value)
    this.setState({[event.target.name]: event.target.value});
    // console.log("in state: ", this.state.username, this.state.password)
  }

  render() {
    // console.log("testingSignup.js", this.props.user)
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input type="text" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Signup" />
        </form>
      </div>
    )
  }
}
