import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Sidebar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout(event){
        event.preventDefault();
        const success =() => this.props.onLogout();
        success();
    }
  render() {
    
    return (
        <>
            <div className="sidebar">
                <Link className='sidebar-link' to='/'>Home</Link>
                <Link className='sidebar-link' to='/aboutus'>Aboutus</Link>
                <Link className='sidebar-link' to='/career'>Career</Link>
                <Link className='sidebar-link' to='/contactus'>Contact us</Link>
                <Link className='sidebar-link' to='/clients'>Clients</Link>
                <Link className='sidebar-link' to='/products'>Products</Link>
                <Link className='sidebar-link' onClick={this.handleLogout}>Logout</Link>
            </div>
        </>
    )
};
}