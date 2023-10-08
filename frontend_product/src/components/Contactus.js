import React, { Component } from 'react'
import '../styles/Contactus.css'
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import '../scripts/contactus_app'
import axios from 'axios';
import { Link } from 'react-router-dom'
export default class Contactus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipient: process.env.REACT_APP_RECIPIENT,
            name: '',
            email: '',
            mobile: '',
            message: '',
            path: '',
            mobiled: '',
            addressd: '',
            emaild: '',
            isAttachment: false,
            isValidMobile: false,
            isValidEmail: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
        //this.changeFrom = this.changeFrom.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeMobile = this.changeMobile.bind(this);
        //this.changeRecipient = this.changeRecipient.bind(this);
    };

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_URL}/contactuscontent/getcontactdetails`)
            .then((response) => {
                if (response.data.length >= 0) {
                    this.setState({
                        mobiled: response.data[0].mobile,
                        addressd: response.data[0].address,
                        emaild: response.data[0].email,
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    componentDidUpdate(prevProps, prevState) {
        // Check if the component's props or state have changed
        if (this.props.someProp !== prevProps.someProp || this.state.someState !== prevState.someState) {
            // Scroll to the top of the component
            window.scrollTo(0, 0);
        }
    }
    changeMessage(event) {
        this.setState({ message: event.target.value })
    }
    changeName(event) {
        this.setState({ name: event.target.value })
    }
    changeEmail(event) {
        this.setState({ email: event.target.value }, this.validateEmail)
    }
    changeMobile(event) {
        this.setState({ mobile: event.target.value }, this.validatePhoneNumber)
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
    handleSubmit(event) {
        var body = {
            recipient: process.env.REACT_APP_RECIPIENT,
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            subject: 'From: ' + this.state.email + ' Inquiry.',
            message: 'Name: ' + this.state.name + '\n' + 'Mobile: ' + this.state.mobile + '\n' + 'Email ID: ' + this.state.email + '\n' + 'Message: ' + this.state.message,
            path: '',
            isAttachment: false,
        };

        axios.defaults.headers.common = {
            "Content-Type": 'application/x-www-form-urlencoded'
        }
        axios.post(`${process.env.REACT_APP_URL}/contactuscontent/addcontact`, body)
            .then(function (response) {
                alert('Submitted successfully!');
            })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_URL}/emailcontent/sendemail`, body)
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();
        this.setState({
            recipient: process.env.REACT_APP_RECIPIENT,
            name: '',
            email: '',
            mobile: '',
            message: '',
            path: '',
            isAttachment: false,
        });
    }

    componentDidMount() {

        this.slider();
    }

    slider() {

        console.log('Component loaded!');
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', function () {
                currentSlide = i;
                showSlide(currentSlide);
            });
        });

        setInterval(nextSlide, 3000);


    }


    render() {
        defineElement(lottie.loadAnimation);
        return (
            <>
                <div className='Contactus'>
                    {/* <!-- ------------------------------------------slider-------------------------------------------------- --> */}
                    <div className="Contact Us uni-top-margin">

                        {/* <!--Slider Start--> */}
                        <div class="slideshow">
                            <div class="slide s1-contact active"></div>
                            <div class="slide s2-contact"></div>
                            <div class="slide s3-contact"></div>
                            <div class="slide s4-contact"></div>
                        </div>
                        <div className='blue-abt-overlay'>
                            <div className='principal-abt'> <h1>Contact Us</h1></div>
                        </div>
                        <div class="dots">
                            <span class="dot active"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                        {/* <!-- ------------------------------------------slider end-------------------------------------------------- --> */}
                        {/* <!----------------------------------Contact Cards Start---------------------------------------------------> */}


                        <section className="services time section" id="time">

                            <div className="container-contact" style={{ overflowX: "hidden" }}>
                                <div className="cards-contact">

                                    <div className="card-wrap-contact">
                                        <div className="card-contact" data-card="Office">
                                            <div className="card-content-contact ">
                                                <h3 className="title-sm-contact">Office</h3>

                                                <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                                                <lord-icon src="https://cdn.lordicon.com/cigflfol.json" trigger="loop" delay="2000"
                                                    style={{ width: "100px", height: "100px" }}>
                                                </lord-icon>

                                                <p className="text-contact">{this.state.addressd}</p>
                                                <a href="#Map_n_contact_form" className="btn-contact small-contact">Explore</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-wrap-contact">
                                        <div className="card-contact reveal" data-card="Job">
                                            <div className="card-content-contact">
                                                <h3 className="title-sm-contact">Career</h3>

                                                <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                                                <lord-icon src="https://cdn.lordicon.com/oezixobx.json" trigger="loop" delay="2000"
                                                    style={{ width: "100px", height: "100px" }}>
                                                </lord-icon>

                                                <p className="text-contact">Want to explore Job opportuities in our Company</p>
                                                <Link to="/career" className="btn-contact small-contact">Explore</Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-wrap-contact">
                                        <div className="card-contact reveal-from-right" data-card="Call">
                                            <div className="card-content-contact">
                                                <h3 className="title-sm-contact">Call</h3>

                                                <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                                                <lord-icon src="https://cdn.lordicon.com/tftaqjwp.json" trigger="loop" delay="2000"
                                                    style={{ width: "100px", height: "100px" }}>
                                                </lord-icon>

                                                <p className="text-contact">{this.state.mobiled}</p>
                                                <a href="tel:020 - 24262436" className="btn-contact small-contact">Call</a>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="card-wrap-contact">
                                        <div className="card-contact reveal-from-left" data-card="Work">
                                            <div className="card-content-contact">
                                                <h3 className="title-sm-contact">Workshop</h3>

                                                <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                                                <lord-icon src="https://cdn.lordicon.com/hkkhwztk.json" trigger="loop" delay="2000"
                                                    colors="primary:#19223a" style={{ width: "100px", height: "100px" }}>
                                                </lord-icon>

                                                <p className="text-contact">Gat No 48, Shed No 7 Shindewadi Taluka, Bhor Dist.
                                                    Pune, Maharashtra 412205.
                                                </p>
                                                <a href="https://www.google.com/maps/place/DCE+Refrigeration+Pvt+Ltd+-+Workshop/@18.3657346,73.8698141,14.81z/data=!4m14!1m7!3m6!1s0x3bc2edc8f8a77acb:0x8b6236fe1388532c!2sDCE+Refrigeration+Pvt+Ltd+-+Workshop!8m2!3d18.3715631!4d73.8574613!16s%2Fg%2F11g4ffxwrh!3m5!1s0x3bc2edc8f8a77acb:0x8b6236fe1388532c!8m2!3d18.3715631!4d73.8574613!16s%2Fg%2F11g4ffxwrh?hl=en"
                                                    className="btn-contact small-contact">Location</a>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="card-wrap-contact">
                                        <div className="card-contact reveal" data-card="Email">
                                            <div className="card-content-contact">

                                                <h3 className="title-sm-contact">E-mail</h3>

                                                <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                                                <lord-icon src="https://cdn.lordicon.com/ehfubvwr.json" trigger="loop" delay="2000"
                                                    style={{ width: "100px", height: "100px" }}>
                                                </lord-icon>



                                                <p className="text-contact">{this.state.emaild}</p>

                                                <a href="mailto:info@dceref.com" className="btn-contact small-contact">Mail</a>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="card-wrap-contact reveal-from-right">
                                        <div className="card-contact" data-card="ln">
                                            <div className="card-content">

                                                <h3 className="title-sm-contact">linkedIn</h3>

                                                <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                                                <lord-icon src="https://cdn.lordicon.com/hpivxauj.json" trigger="loop" delay="2000"
                                                    style={{ width: "100px", height: "100px" }}>
                                                </lord-icon>

                                                <p className="text-contact">Dce Refrigeration Pvt Ltd. <br /></p>

                                                <a href="https://www.linkedin.com/company/dce-refrigeration-pvt-ltd/"
                                                    className="btn-contact small-contact">Follow</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* <!----------------------------------Contact Cards end---------------------------------------------------> */}





                        {/* <!----------------------------------Map and contact form Start---------------------------------------------------> */}
                        <div id="Map_n_contact_form" className="container-contact contact-form-contact" style={{ backgroundColor: "aliceblue", padding: "2rem" }}>
                            <div className="mega-grid-2-contact">
                                <div id="" className="map-contact reveal-from-left">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15137.106591797348!2d73.85391667617438!3d18.47112394900338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ea9cc2134d0f%3A0x97e1fbc5dff15a3d!2sDCE%20Refrigeration%20Private%20Limited!5e0!3m2!1sen!2sin!4v1680182129798!5m2!1sen!2sin"
                                        width="550" height="450" style={{ border: "2px solid rgb(124, 140, 233)" }}
                                        loading="lazy">
                                    </iframe>
                                </div>
                                <div className="form">
                                    <form className="form1" id="contact_form">
                                        <h2>Contact Form</h2>
                                        <p className="p reveal-from-right" type="Name:"><input type="text"
                                            placeholder="Write your name here.." name='name' required value={this.state.name} onChange={this.changeName} /></p>
                                        <p className="p reveal-from-left" type="Email:"><input type="email"
                                            placeholder="Let us know how to contact you back.." name='email' required value={this.state.email} onChange={this.changeEmail} />
                                            {this.state.isValidEmail ? <span style={{ color: 'green' }}>Valid email address</span> : null}
                                        </p>
                                        <p className="p reveal-from-left" type="Phone number"><input type="tel" placeholder="Phone number" name='mobile'
                                            required value={this.state.mobile} onChange={this.changeMobile} />
                                            {this.state.isValidMobile ? <span style={{ color: 'green' }}>Valid phone number</span> : null}
                                        </p>
                                        <p className="p meg-from-client reveal-from-right" type="Message:"><input type="text" placeholder=""
                                            style={{
                                                height: "5rem",
                                                border: "1px #737393 solid"
                                            }} name='message' required value={this.state.message} onChange={this.changeMessage} /></p>


                                        <button className="submitbtn reveal-from-right" onClick={this.handleSubmit} disabled={!(this.state.isValidEmail && this.state.isValidMobile)}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* <!----------------------------------Map and contact form Start---------------------------------------------------> */}









                        {/* <!----------------------------------Footer Start------------------------------------------------------------------> */}

                    </div>
                </div>
            </>
        )
    }
}
