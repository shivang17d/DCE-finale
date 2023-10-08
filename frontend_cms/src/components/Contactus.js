import React, { Component } from 'react'
import axios from 'axios';
import Conmodal from './Conmodal';
import moment from 'moment';
import 'moment-timezone';
export default class Contactus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      address: '',
      email: '',
      contactlist: [],
      value: false,
      update: false,
      id: '',
      isValidMobile: false,
      isValidEmail: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.deleteContactus = this.deleteContactus.bind(this);
    this.deleteAllContact = this.deleteAllContact.bind(this);
    this.changeMobile = this.changeMobile.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
  }
  changeAddress(event) {
    this.setState({ address: event.target.value });
  }
  changeMobile(event) {
    this.setState({ mobile: event.target.value }, this.validatePhoneNumber);
  }
  changeEmail(event) {
    this.setState({ email: event.target.value }, this.validateEmail);
  }
  validatePhoneNumber = () => {
    const pattern = /^[0-9]{10}$/; // Example pattern: XXX-XXX-XXXX
    const isValid = pattern.test(this.state.mobile);
    this.setState({ isValidMobile: isValid });
  };
  validateEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Matches email format
    const isValid = pattern.test(this.state.email);
    this.setState({ isValidEmail: isValid });
  };
  fetchData() {
    axios.get(`${process.env.REACT_APP_URL}/contactuscontent/getcontactdetails`)
      .then((response) => {
        if (response.data.length >= 0) {
          this.setState({
            mobile: response.data[0].mobile,
            address: response.data[0].address,
            email: response.data[0].email,
            update: true,
            id: response.data[0]._id,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get(`${process.env.REACT_APP_URL}/contactuscontent/getcontacts`)
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({ contactlist: response.data });
          this.setState({ value: 'true' });
        }
        console.log(this.state.contactlist)
      })
      .catch((error) => {
        console.log(error);
      });

  }
  handleSubmit(event) {
    var body = {
      mobile: this.state.mobile,
      address: this.state.address,
      email: this.state.email,
    };
    axios.defaults.headers.common = {
      "Content-Type": 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    const fetchData = () => this.fetchData();
    axios.post(`${process.env.REACT_APP_URL}/contactuscontent/admin/addcontactdetails`, body)
      .then(function (response) {
        console.log(response.status);
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
    this.fetchData();
    event.preventDefault();
    this.setState({
      mobile: '',
      address: '',
      email: '',
      isValidEmail: false,
      isValidMobile: false
    });
  }
  componentDidMount() {
    this.fetchData();
  }
  deleteContactus(event, id) {
    event.preventDefault();
    const fetchData = () => this.fetchData();
    axios.delete(`${process.env.REACT_APP_URL}/contactuscontent/admin/removecontactus/${id}`, {
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
  deleteAllContact(event) {
    event.preventDefault();
    const fetchData = () => this.fetchData();
    axios.delete(`${process.env.REACT_APP_URL}/contactuscontent/admin/removecontacts`, {
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
  updateContact(event) {
    event.preventDefault();
    var id = this.state.id;
    var body = {
      mobile: this.state.mobile,
      email: this.state.email,
      address: this.state.address,
    }
    axios.defaults.headers.common = {
      "Content-Type": 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    const fetchData = () => this.fetchData();
    axios.put(`${process.env.REACT_APP_URL}/contactuscontent/admin/updatecontact/${id}`, body)
      .then((result) => {
        console.log('success');
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render() {
    return (
      <>
        <div className='Page'>
          <h2>Mobile number  :- {this.state.mobile}</h2>
          <h2>Address :- {this.state.address}</h2>
          <h2>Email :- {this.state.email}</h2>
          <br />
          <form onSubmit={this.handleSubmit}>
            <label>Mobile :- <input type="text" name="mobile" id="" value={this.state.mobile} onChange={this.changeMobile} />
              {this.state.isValidMobile ? <span style={{ color: 'green' }}>Valid phone number</span> : null}
            </label>
            <br />
            <label>Address :- <input type="text" name="address" id="" value={this.state.address} onChange={this.changeAddress} /></label>
            <br />
            <label>Email :- <input type="email" name="email" id="" value={this.state.email} onChange={this.changeEmail} />
              {this.state.isValidEmail ? <span style={{ color: 'green' }}>Valid email address</span> : null}
            </label>
            <br />
            {!this.state.update ? <input type="submit" value="submit" className="btn btn-success" disabled={!(this.state.isValidEmail && this.state.isValidMobile)} />
              : <input className="btn btn-success" type="button" value="Update" onClick={(event) => this.updateContact(event)} disabled={!(this.state.isValidEmail && this.state.isValidMobile)} />}
          </form>
          <br />
          <input className="btn btn-success" type="button" value="Delete all" onClick={(event) => this.deleteAllContact(event)} disabled={!this.state.value} />
          <br />
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Number</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Email</th>
                <th scope="col">Open</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.contactlist.reverse().map((ele, idx) => {
                const currentDateTime = moment(ele.createdAt).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
                return (
                  <>
                    <tr key={ele._id} >
                      <td>{idx + 1}</td>
                      <td>{ele.name}</td>
                      <td>{currentDateTime}</td>
                      <td>{ele.email}</td>
                      <td><Conmodal id={ele._id} name={ele.name} mobile={ele.mobile} email={ele.email} message={ele.message} /></td>
                      <td><input className="btn btn-success" type="button" value="Delete" onClick={(event) => this.deleteContactus(event, ele._id)} /></td>
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