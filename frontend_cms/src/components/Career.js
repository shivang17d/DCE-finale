import React, { Component } from 'react'
import axios from 'axios';
import Appmodal from './Appmodal';
import moment from 'moment';
import 'moment-timezone';
import '../styles/home.css'
export default class Career extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mobile: '',
      email: '',
      experience: '',
      applicantlist: [],
      valueapp: ''
    };
    this.fetchData = this.fetchData.bind(this);
    this.deleteApplicant = this.deleteApplicant.bind(this);
    this.deleteAllApplicant = this.deleteAllApplicant.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeMobile = this.changeMobile.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeExperience = this.changeExperience.bind(this);
  }
  changeName(event) {
    this.setState({ name: event.target.value });
  }
  changeMobile(event) {
    this.setState({ mobile: event.target.value });
  }
  changeEmail(event) {
    this.setState({ email: event.target.value });
  }
  changeExperience(event) {
    this.setState({ experience: event.target.value });
  }
  fetchData() {
    axios.get(`${process.env.REACT_APP_URL}/careercontent/applicants`)
      .then((response) => {
        if (response.data.length >= 0) {
          this.setState({ applicantlist: response.data });
          this.setState({ valueapp: 'true' });
          console.log(this.state.applicantlist);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }
  componentDidMount() {
    this.fetchData();
  }
  deleteApplicant(event, id) {
    event.preventDefault();
    const fetchData = () => this.fetchData();
    axios.delete(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/careercontent/admin/removeapplicant/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        // handle success
        console.log(response);
        fetchData();
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }
  deleteAllApplicant(event) {
    event.preventDefault();
    const fetchData = () => this.fetchData();
    axios.delete(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}/careercontent/admin/removeapplicants`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        // handle success
        console.log(response);
        fetchData();
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }
  render() {
    return (
      <>
        <div className='Page'>
          <br />

          <h2>Applicants</h2>
          <input className="btn btn-success" type="button" value="Delete all" onClick={(event) => this.deleteAllApplicant(event)} disabled={!this.state.valueapp} />
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Number</th>
                <th scope="col">Name</th>
                <th scope="col">Mobile</th>
                <th scope="col">Date</th>
                <th scope="col">Open</th>
                <th scope='col'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.applicantlist.reverse().map((ele, idx) => {
                const currentDateTime = moment(ele.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
                return (
                  <>
                    <tr key={ele._id}>
                      <td>{idx + 1}</td>
                      <td>{ele.name}</td>
                      <td>{ele.mobile}</td>
                      <td>{currentDateTime}</td>
                      <td><Appmodal id={ele._id} name={ele.name} mobile={ele.mobile} email={ele.email} experience={ele.experience} /></td>
                      <td><input className="btn btn-success" type="button" value="Delete" onClick={(event) => this.deleteApplicant(event, ele._id)} /></td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    )
  };
}