import React, { Component } from 'react'
import '../styles/Homepage.css'
import '../scripts/home_app'
import Slider from 'react-slick'
import { useSpring, animated } from 'react-spring'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectdone: '',
            yearsofexperience: '',
        }
    }

    componentDidMount() {
        // const token = localStorage.getItem('token');

        axios.get(`${process.env.REACT_APP_URL}/homecontent/homedata`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                if (response.data.length > 0) {
                    this.setState({
                        yearsofexperience: response.data[0].yearsofexperience,
                        projectdone: response.data[0].projectdone,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        // Check if the component's props or state have changed
        const componentElement = document.getElementById('Home_1');
        if (componentElement) {
            componentElement.scrollTo(0, 0);
        }
    }

    render() {

        function Number({ n }) {
            const { number } = useSpring({
                from: { number: 0 },
                number: n,
                delay: 500,
                config: { mass: 1, tension: 20, friction: 20 }
            })

            return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
        }

        var settings = {

            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1500,
            responsive: [{
                breakpoint: 850,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }]
        }
        return (
            <>
                <div className='Homepage' id='Home_1'>
                    <section id="home">
                        <div className="home-mega-grid-2">
                            <div className="home-title-col1">
                                <p className="home-title">Industrial <span className="blue-home">Refrigeration</span> System Done At Its Finest at
                                </p>
                                <p className="home-title blue-home">DCE Refrigeration Pvt Ltd.</p>
                                <div className="btns-2-home">
                                    <a href="/#clients-slider" className="home-page-btns explore-btn">Explore</a>
                                    <Link to="/Contactus" className="home-page-btns contact-btn-home">Contact Us</Link>
                                </div>
                                <div className="sm-grid-3-home">
                                    <div className="project-stats stat">
                                        <img src={require("../images/half_circle.png")} alt="not found" className="half-circle-overlay-home" />
                                        <div className="number ctr" data-target="300"> <Number n={parseInt(this.state.projectdone)} /> <span className='plus-abs-projects' >+</span> </div>
                                        <p className="sm-text-home">Projects Done</p>
                                    </div>
                                    <div className="exp-stat stat">
                                        <img src={require("../images/half_circle.png")} alt="not found" className="half-circle-overlay-home" />
                                        <div className="number ctr" data-target="25"><Number n={parseInt(this.state.yearsofexperience)} /><span className='plus-abs-yrs' >+</span></div>
                                        <p className="sm-text-home">Years of Experience</p>
                                    </div>
                                </div>
                            </div>
                            <div className="home-slider-col2">
                                <img src={require("../images/upper_half_home.png")} alt="not found" className="upper-half-circle-home" />
                                <img src={require("../images/lower_half_home.png")} alt="not found" className="lower-half-circle-home" />
                                <div className="home_slider">
                                    <div className="content_1-home">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>




                    <section id="clients-slider">
                        <div className="container-home reveal">
                            <h1 className="title-home">Our Clients</h1>
                            <div className="container_1-home">

                                <div className="testiSlide">
                                    <Slider {...settings}>
                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/cl1.png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/cl2.png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/cl3.png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/cl4.png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/cl5.png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/cl6.png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/cl7.png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/cl8.png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/cl9.png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>



                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img className="" src={require("../images/c10_new.png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img className="" src={require("../images/c11 (1).png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img className="" src={require("../images/c13.png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img className="" src={require("../images/pepsi2.png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img className="" src={require("../images/c14.png")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>
                                    </Slider>
                                </div>


                            </div>
                        </div>
                    </section>



                    <section id="why choose us" className="">
                        <div className="mega-grid-2-home">
                            <div className="min-grid-2-home cl1_main-home">
                                <div className="col1-home reveal-from-left">
                                    <p className="text-home"><span style={{ fontSize: "17px", fontWeight: "bold" }}>Welcome to DCE Refrigeration Pvt Ltd.</span>  <br />We provide
                                        specialized services in the field of Industrial Refrigeration.
                                        <br /> Design, Manufacturing, supplying & commissioning our own
                                        refrigeration systems is part of our services.
                                    </p>
                                    <div style={{ marginTop: "1rem" }}><a href="/#company-msg" className="btn-home">Explore</a></div>
                                </div>
                                <hr />
                                <div className="col2-home reveal-from-left">
                                    <div className="slider-home">
                                        <div className="content_1-home">
                                        </div>
                                    </div>
                                    <img className="overlay_home_slider" src={require("../images/overlay_behind_homepage_slider.png")} alt="not found" />
                                </div>
                            </div>

                            <div className="min-grid-2-home cl2_main-home">
                                <div className="col1-home col1_title-home reveal-from-right">
                                    Why Choose us for Industrial Refrigeration System
                                </div>
                                <div>
                                    <hr />
                                </div>
                                <div className="col2-info-home reveal">
                                    <p className="text-home flex-info-2 reveal-from-right"><img src={require("../images/Group 593.png")} className="info-image"
                                        alt="not found" />
                                        We excel in Understanding: <br />
                                        Our team patiently listen to customer requirement and understand customer product, Plant requirements, available resources, existing plant, future requirements.
                                        .</p>
                                    <p className="text-home flex-info-2 reveal-from-right"><img src={require("../images/Group 594.png")} className="info-image"
                                        alt="not found" />
                                        We excel in design:<br />
                                        According to customer requirement we design and present the plant set up to customer with due consideration in updated technology.
                                    </p>
                                    <p className="text-home flex-info-2 reveal-from-right"><img src={require("../images/Group 595.png")} className="info-image"
                                        alt="not found" />
                                        We excel in execution:<br />
                                        Timely execution and commissioning of Projects has always been our approach.
                                    </p>
                                    <p className="text-home flex-info-2 reveal-from-right"><img src={require("../images/Group 596.png")} className="info-image"
                                        alt="not found" />
                                        We excel in training:<br />
                                        Training plant operators and executive is a key word for zero breakdowns and minimal maintenance. We impart training before we hand over the plant to customer.

                                    </p>
                                </div>
                            </div>
                        </div>

                    </section>



                    <section id="company-msg">
                        <div className="slider1 reveal">
                            <div className="content1">
                                <div className="container-home overflow-hidden">
                                    <h1 className="title-home reveal-from-right">Quote of the Decade</h1>
                                    <p className="text-home reveal-from-left">"It is our Collective and Individual responsibility to preserve and tend to the world in which we all live "<br /> - Dalai Lama
                                    </p>
                                    <img src={require("../images/msg_colon_start.png")} className="colon_start" alt="not found" />
                                    <img src={require("../images/msg_colon_end.png")} className="colon_end" alt="not found" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <h1 className="abt-title-home title-home reveal">What We Do?</h1>
                    <div className="abt-overflow-hid">
                        <div className="home-mega-grid-2 reveal">
                            <div className="abt-slider-home home-slider-col2 reveal-from-right">
                                <div className="home_slider">
                                    <div className="content_1-home"></div>
                                </div>
                            </div>

                            <hr className="abt-line-home" />

                            <div className="text home-title-col1 reveal-from-left">
                                <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 593.png")} className="info-image-abt" alt="" />
                                    Engineering of Refrigeration Plant and Optimization of Plant Performance.</p>
                                <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 594.png")} className="info-image-abt" alt="" />
                                    Annual Maintenance for Low Temperature Refrigeration Plants</p>
                                <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 595.png")} className="info-image-abt" alt="" />
                                    Design, Supply, Installation and Commissioning of Refrigeration Plants for Dairies, Breweries, Beverages, Food Processing.</p>
                                <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 596.png")} className="info-image-abt" alt="" />
                                    Authorised Dealer for Alfa Laval (India) Ltd, for their Semi Welded / Brazed Plate Heat Exchangers.</p>
                            </div>


                        </div>

                    </div>





                    <section id="clients-slider" style={{ marginTop: "2rem" }}>
                        <div className="container-home reveal">
                            <h1 className="title-home">Industries Served</h1>
                            <div className="container_1-home">
                                <div className="testiSlide">
                                    <Slider {...settings}>
                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/serve_dce_1_pharma.jpg")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/serve_dce_2_beverages.jpg")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/serve_dce_3_coldstorage.jpg")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/serve_dce_4_brewery.jpg")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>

                                        <div>
                                            <figure className="testimonial">
                                                <blockquote>
                                                    <img src={require("../images/serve_dce_5_dairy.jpg")} alt="not found" srcSet="" />
                                                </blockquote>
                                            </figure>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </section>





                    <section id="About us">
                        <h1 className="abt-title-home title-home reveal">About Us</h1>
                        <div className="abt-overflow-hid">
                            <div className="abt-mega-grid-2 home-mega-grid-2 reveal">
                                <div className="abt-text home-title-col1 reveal-from-left"><span
                                    className="bold reveal-from-right"> M/s DCE
                                    Refrigeration Pvt. Ltd.</span> was started in 1997 for providing
                                    specialized services in the field of Industrial refrigeration. We are engaged in manufacturing,
                                    Supply,
                                    Erection & Commissioning of Tailor Made Refrigeration Systems to suit customer requirements for
                                    sectors
                                    such as Dairies, Breweries, Cold Storages, Confectionaries, food & beverages & many more.
                                    <br />
                                    Our projects are known for good engineering practices, fine quality fabrication work and timely
                                    service
                                    support. We have attained a reputed position in market for ammonia refrigeration solutions due to a
                                    well
                                    experienced team of professionals led by our directors,
                                    <span className="reveal-from-right bold">Mr.Sanjay Ethape</span>
                                    <span className="reveal-from-right bold">Mr.Sandeep Saste</span>
                                    <span className="reveal-from-right bold">Mr.Swapnil Ethape</span>
                                    <span className="reveal-from-right bold">Mr.Yuvraj Lonkar</span>
                                    <div style={{ marginTop: "1rem" }}><Link className="read-more-btn-home" to="/AboutUs">Read
                                        More</Link></div>
                                </div>
                                <hr className="abt-line-home" />
                                <div className="abt-slider-home home-slider-col2 reveal-from-right">
                                    <div className="home_slider">
                                        <div className="content_1-home"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            </>
        )
    }
}
