import React, { Component } from 'react'
import axios from 'axios'
export default class Appmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfUrl: '',
    }
    this.openPdf = this.openPdf.bind(this);
  };
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_URL}/careercontent/download/${this.props.id}.pdf`, { responseType: 'blob' })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        this.setState({ pdfUrl: url });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  openPdf(event) {
    window.open(this.state.pdfUrl, '_blank');
  }
  render() {
    return (
      <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${this.props.id}`}>
          Open
        </button>

        <div className="modal fade" id={this.props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Applicant</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body" style={{ color: 'black' }}>
                <h3>
                  Name :-{this.props.name}
                </h3>
                <h3>
                  Email :-{this.props.email}
                </h3>
                <h3>
                  Mobile :-{this.props.mobile}
                </h3>
                <h3>
                  Experience :-{this.props.experience}
                </h3>
                <button type="button" className="btn btn-secondary" onClick={this.openPdf}>Resume</button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
