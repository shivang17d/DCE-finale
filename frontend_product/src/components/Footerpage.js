import React, { Component } from 'react'
import '../styles/footerpage.css'
import {Link} from 'react-router-dom'
export default class FooterPage extends Component {
  render() {
    return (
      <>
      <div className='Footerpage'>
      <footer>
        <div className="waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
            <div className="wave" id="wave4"></div>
        </div>
        <ul className="social_icon">
            <li><a href="https://www.linkedin.com/company/dce-refrigeration-pvt-ltd/"><ion-icon name="logo-linkedin"></ion-icon></a></li>
            <li><a href="mailto:info@dceref.com"><ion-icon name="mail-unread-outline"></ion-icon></a></li>
            <li><a href="https://www.google.com/maps/place/DCE+Refrigeration+Pvt+Ltd+-+Workshop/@18.3657346,73.8698141,14.81z/data=!4m14!1m7!3m6!1s0x3bc2edc8f8a77acb:0x8b6236fe1388532c!2sDCE+Refrigeration+Pvt+Ltd+-+Workshop!8m2!3d18.3715631!4d73.8574613!16s%2Fg%2F11g4ffxwrh!3m5!1s0x3bc2edc8f8a77acb:0x8b6236fe1388532c!8m2!3d18.3715631!4d73.8574613!16s%2Fg%2F11g4ffxwrh?hl=en"><ion-icon name="location-outline"></ion-icon></a></li>
        </ul>

        <ul className="menu">
            <li><Link className='sidebar-link' to='/'>Home</Link></li>
            <li><Link className='sidebar-link' to='/AboutUs'>AboutUs</Link></li>
            <li><Link className='sidebar-link' to='/Products'>Products</Link></li>
            <li><Link className='sidebar-link' to='/Career'>Career</Link></li>
            <li><Link className='sidebar-link' to='/Clients'>Clients</Link></li>
            <li><Link className='sidebar-link' to='/ContactUs'>ContactUs</Link></li>
        </ul>

        <p>Designed and Developed by Syncubic Solutions</p>
    </footer>

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
      </div>
      </>
    )
  }
}
