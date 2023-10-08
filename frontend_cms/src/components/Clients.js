import React, { Component } from 'react'
import axios from 'axios';
export default class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      city: '',
      imgurl: '',
      lat: '',
      lon: '',
      clientlist: [],
      value: '',
      companyType: 'Select'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
    this.deleteAllClient = this.deleteAllClient.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.changeImgurl = this.changeImgurl.bind(this);
    this.changeLat = this.changeLat.bind(this);
    this.changeLon = this.changeLon.bind(this);
    this.changeOpt = this.changeOpt.bind(this);
  }
  changeName(event) {
    this.setState({ name: event.target.value });
  }
  changeCity(event) {
    this.setState({ city: event.target.value });
  }
  changeImgurl(event) {
    this.setState({ imgurl: event.target.value });
  }
  changeLat(event) {
    this.setState({ lat: event.target.value });
  }
  changeLon(event) {
    this.setState({ lon: event.target.value });
  }
  changeOpt(event) {
    console.log('type changed')
    this.setState({ companyType: event.target.value });
    console.log(event.target.value)
    console.log(this.state.companyType);
  }
  fetchData() {
    axios.get(`${process.env.REACT_APP_URL}/clientscontent/allclients`)
      .then((response) => {
        if (response.data.length >= 0) {
          this.setState({ clientlist: response.data });
          this.setState({ value: 'true' });
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleSubmit(event) {
    var body = {
      name: this.state.name,
      city: this.state.city,
      imgurl: this.state.imgurl,
      lat: this.state.lat,
      lon: this.state.lon,
      companyType: this.state.companyType
    };
    console.log(body);
    axios.defaults.headers.common = {
      "Content-Type": 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem('token')}`

    }
    const fetchData = () => this.fetchData();
    axios.post(`${process.env.REACT_APP_URL}/clientscontent/admin/addclient`, body)
      .then(function (response) {
        console.log(response.status);
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
    event.preventDefault();
    this.setState({
      name: '',
      city: '',
      imgurl: '',
      lat: '',
      lon: '',
      companyType: 'Select'
    });
  }
  componentDidMount() {
    this.fetchData();
  }
  deleteClient(event, id) {
    event.preventDefault();
    const fetchData = () => this.fetchData();
    axios.delete(`${process.env.REACT_APP_URL}/clientscontent/admin/removeclient/${id}`, {
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
  deleteAllClient(event) {
    event.preventDefault()
    const fetchData = () => this.fetchData();
    axios.delete(`${process.env.REACT_APP_URL}/clientscontent/admin/removeclients`, {
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
          <h2>Client</h2>
          <br />
          <form onSubmit={this.handleSubmit}>
            <label>Name :- <input type="text" name="name" id="" value={this.state.name} onChange={this.changeName} /></label>
            <br />
            <label>City :- <input type="text" name="city" id="" value={this.state.city} onChange={this.changeCity} /></label>
            <br />
            <label>Imgurl :- <input type="text" name="imgurl" id="" value={this.state.imgurl} onChange={this.changeImgurl} /></label>
            <br />
            <label>Latitude :- <input type="text" name="lat" id="" value={this.state.lat} onChange={this.changeLat} /></label>
            <br />
            <label>Longitude :- <input type="text" name="lon" id="" value={this.state.lon} onChange={this.changeLon} /></label>
            <br />
            <div className='dropdown'>
              <label for="company_type">Company type</label>
              <select name="type" id="company_type" value={this.state.companyType} onChange={this.changeOpt}>
                <option value="">Select</option>
                <option value="Food_Processing">Food Prorcessing</option>
                <option value="Brewery">Brewery</option>
                <option value="Beverages">Beverages</option>
                <option value="Dairy">Dairy</option>
              </select>
            </div>
            <br />
            <input type="submit" value="Submit" className="btn btn-success" />
          </form>
          <br />
          <input className="btn btn-success" type="button" value="Delete all" onClick={(event) => this.deleteAllClient(event)} disabled={!this.state.value} />
          <br />
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Number</th>
                <th scope="col">Name</th>
                <th scope="col">City</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.clientlist.map((ele, idx) => {
                return (
                  <>
                    <tr key={ele._id}>
                      <td>{idx + 1}</td>
                      <td>{ele.name}</td>
                      <td>{ele.city}</td>
                      <td><input className="btn btn-success" type="button" value="Delete" onClick={(event) => this.deleteClient(event, ele._id)} /></td>
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