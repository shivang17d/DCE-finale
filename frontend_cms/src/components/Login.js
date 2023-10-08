import React, { Component } from 'react'
import axios from 'axios';

import bcrypt from 'bcryptjs';
import '../styles/login.css'
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      count: 0
    };
    this.fetchdata = this.fetchdata.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  fetchdata() {
    axios.get(`${process.env.REACT_APP_URL}/logincontent/admin/firstlogin`)
      .then((response) => {
        this.setState({ count: response.data.count });
      })
      .catch((err) => {
        console.log(err);
      })
  }
  componentDidMount() {
    this.fetchdata();
  }
  handleUsername(event) {
    this.setState({ username: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const success = () => this.props.onLogin();
    const { username, password } = this.state;
    //const hashedPassword = await bcrypt.hash(password, 10);
    var body = {
      username: username,
      password: password
    };
    //to login
    if (this.state.count > 0) {
      axios.defaults.headers.common = {
        "Content-Type": 'application/x-www-form-urlencoded'
      }
      axios.post(`${process.env.REACT_APP_URL}/logincontent/admin/login`, body)
        .then(function (response) {
          localStorage.setItem('token', response.data.token);
          if (response.status === 200) {
            success();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      //to create new login
      const hashedPassword = await bcrypt.hash(password, 10);
      var body = {
        username: username,
        password: hashedPassword
      };
      axios.defaults.headers.common = {
        "Content-Type": 'application/x-www-form-urlencoded'
      }
      axios.post(`${process.env.REACT_APP_URL}/logincontent/admin/newLogin`, body)
        .then(function (response) {
          if (response.status === 200) {
            success();
            alert("new user is created")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <>
        <div className='Login'>
          <h2>Admin Portal</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.username} onChange={this.handleUsername} placeholder="Username" required />
            <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password" required />
            <input type="submit" value={this.state.count !== 0 ? "Submit" : "Create"} />
          </form>
        </div>
      </>
    )
  }
}
