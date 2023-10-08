import React, { Component } from 'react'
import axios from 'axios';
export default class Aboutus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      timelinelist: [],
      file: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.deleteAboutus = this.deleteAboutus.bind(this);
    this.deleteAllAboutus = this.deleteAllAboutus.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeFile = this.changeFile.bind(this);
  };
  changeTitle(event) {
    this.setState({ title: event.target.value })
  }
  changeFile(event) {
    const selectedFile = event.target.files[0];
    this.setState({ file: selectedFile }, () => {
      console.log('File state updated:', this.state.file);
      alert('File has been uploaded Successfully!')
    });
  }
  fetchData() {
    axios.get(`${process.env.REACT_APP_URL}/aboutuscontent/allaboutus`)
      .then((response) => {
        if (response.data.length >= 0) {
          this.setState({ timelinelist: response.data });
          this.setState({ value: 'true' })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleSubmit(event) {
    var body = {
      title: this.state.title,
    };
    axios.defaults.headers.common = {
      "Content-Type": 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    const fetchData = () => this.fetchData();
    const file = this.state.file;
    var id;
    axios.post(`${process.env.REACT_APP_URL}/aboutuscontent/admin/createaboutus`, body)
      .then(function (response) {
        console.log(response.status);
        id = response.data._id;
        alert('Submitted successfully!');
        const formData = new FormData();
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop();
        formData.append('file', file, id + '.' + fileExtension);
        return axios.post(`${process.env.REACT_APP_URL}/aboutuscontent/upload`, formData)
      }).then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    event.preventDefault();
    fetchData();
    this.setState({
      title: '',
      file: null
    });
  }
  componentDidMount() {
    this.fetchData();
  }
  deleteAboutus(event, id) {
    event.preventDefault();
    const fetchData = () => this.fetchData();
    axios.delete(`${process.env.REACT_APP_URL}/aboutuscontent/admin/removeaboutus/${id}`, {
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
  deleteAllAboutus(event) {
    event.preventDefault();
    const fetchData = () => this.fetchData();
    axios.delete(`${process.env.REACT_APP_URL}/aboutuscontent/admin/removeaboutuss`, {
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
          <h2>Timeline</h2>
          <form onSubmit={this.handleSubmit}>
            <label>Title :- <input type="text" name="title" id="" value={this.state.title} onChange={this.changeTitle} /></label>
            <br />
            <label htmlFor="">Upload an image :- <input type="file" onChange={this.changeFile} /></label>
            <input type="submit" value="Submit" className="btn btn-success" />
          </form>
          <br />
          <input className="btn btn-success" type="button" value="Delete all" onClick={(event) => this.deleteAllAboutus(event)} disabled={!this.state.value} />
          <br />
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Number</th>
                <th scope="col">Title</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.timelinelist.map((ele, idx) => {
                return (
                  <>
                    <tr key={ele._id}>
                      <td>{idx + 1}</td>
                      <td>{ele.title}</td>
                      <td><input className="btn btn-success" type="button" value="Delete" onClick={(event) => this.deleteAboutus(event, ele._id)} /></td>
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