import React, { Component } from 'react'

export default class Conmodal extends Component {
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
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body" style={{ color: 'black' }}>
                <h3>
                  Name:- {this.props.name}
                </h3>
                <h3>
                  Mobile:- {this.props.mobile}
                </h3>
                <h3>
                  Email:- {this.props.email}
                </h3>
                <h3>
                  Message:- {this.props.message}
                </h3>
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
