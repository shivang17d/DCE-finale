import React, { Component } from 'react'
import axios from 'axios';
export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      imgurl: '',
      url: '',
      productlist: [],
      value: '',
      file: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.deleteAllProduct = this.deleteAllProduct.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeImgurl = this.changeImgurl.bind(this);
    this.changeUrl = this.changeUrl.bind(this);
    this.changeFile = this.changeFile.bind(this);
  };
  changeTitle(event) {
    this.setState({ title: event.target.value })
  }
  changeDescription(event) {
    this.setState({ description: event.target.value })
  }
  changeImgurl(event) {
    this.setState({ imgurl: event.target.value })
  }
  changeUrl(event) {
    this.setState({ url: event.target.value })
  }
  changeFile(event) {
    const selectedFile = event.target.files[0];
    this.setState({ file: selectedFile }, () => {
      console.log('File state updated:', this.state.file);
      alert('File has been uploaded Successfully!')
    });
  }
  fetchData() {
    axios.get(`${process.env.REACT_APP_URL}/productscontent/allproducts`)
      .then((response) => {
        if (response.data.length >= 0) {
          this.setState({ productlist: response.data });
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
      description: this.state.description,
      imgurl: this.state.imgurl,
      url: this.state.url
    };
    axios.defaults.headers.common = {
      "Content-Type": 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    const fetchData = () => this.fetchData();
    const file = this.state.file;
    var id;
    axios.post(`${process.env.REACT_APP_URL}/productscontent/admin/createproduct`, body)
      .then(function (response) {
        console.log(response.status);
        id = response.data._id;
        alert('Submitted successfully!');
        const formData = new FormData();
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop();
        formData.append('file', file, id + '.' + fileExtension);
        return axios.post(`${process.env.REACT_APP_URL}/productscontent/upload`, formData)
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
      description: '',
      imgurl: '',
      url: '',
      file: null
    });
  }
  componentDidMount() {
    this.fetchData();
  }
  deleteProduct(event, id) {
    event.preventDefault();
    const fetchData = () => this.fetchData();
    axios.delete(`${process.env.REACT_APP_URL}/productscontent/admin/removeproduct/${id}`, {
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
  deleteAllProduct(event) {
    event.preventDefault();
    const fetchData = () => this.fetchData();
    axios.delete(`${process.env.REACT_APP_URL}/productscontent/admin/removeproducts`, {
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
          <h2>Product</h2>
          <form onSubmit={this.handleSubmit}>
            <label>Title :- <input type="text" name="title" id="" value={this.state.title} onChange={this.changeTitle} /></label>
            <br />
            <label>Description :- <input type="text" name="description" id="" value={this.state.description} onChange={this.changeDescription} /></label>
            <br />
            <label htmlFor="">Upload an image :- <input type="file" onChange={this.changeFile} /></label>
            <h2 style={{ paddingBottom: "10px" }}>OR</h2>
            <label>ImageURL :- <input type="text" name="imgurl" id="" value={this.state.imgurl} onChange={this.changeImgurl} /></label>
            <br />
            <label>URL :- <input type="text" name="url" id="" value={this.state.url} onChange={this.changeUrl} /></label>
            <input type="submit" value="Submit" className="btn btn-success" />
          </form>
          <br />
          <input className="btn btn-success" type="button" value="Delete all" onClick={(event) => this.deleteAllProduct(event)} disabled={!this.state.value} />
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
              {this.state.productlist.map((ele, idx) => {
                return (
                  <>
                    <tr key={ele._id}>
                      <td>{idx + 1}</td>
                      <td>{ele.title}</td>
                      <td><input className="btn btn-success" type="button" value="Delete" onClick={(event) => this.deleteProduct(event, ele._id)} /></td>
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