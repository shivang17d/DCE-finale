import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Sidebar extends Component {
  render() {
    return (
        <>
            <div className="sidebar">
                <Link className='sidebar-link' to='/'>Home</Link>
                <Link className='sidebar-link' to='/AboutUs'>AboutUs</Link>
                <Link className='sidebar-link' to='/Products'>Products</Link>
                <Link className='sidebar-link' to='/Career'>Career</Link>
                <Link className='sidebar-link' to='/Clients'>Clients</Link>
                <Link className='sidebar-link' to='/ContactUs'>ContactUs</Link>
            </div>
        </>
    )
};
}

