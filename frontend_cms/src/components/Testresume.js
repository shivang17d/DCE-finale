import React, { Component } from 'react';
import axios from 'axios';

export default class Testresume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfUrl: '',
      file: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);
    axios.post(`${process.env.REACT_APP_URL}/careeercontent/upload`, formData, {
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_URL}/careercontent/download/sameercv3.pdf`, { responseType: 'blob' })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        this.setState({ pdfUrl: url });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { pdfUrl } = this.state;
    return (
      <>
        <iframe src={pdfUrl} width="100%" height="500px" title="PDF Viewer" />
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>
            Choose a PDF file:
            <input type="file" onChange={this.handleChange} />
          </label>
          <br />
          <button type="submit">Upload</button>
        </form>
      </>
    );
  }
}