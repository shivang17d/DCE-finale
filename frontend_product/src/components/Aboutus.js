import React, { Component } from 'react'
import '../styles/Aboutus.css'
import '../scripts/about_app'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default class Aboutus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timelines: [],
      timeline: {}
    };
    this.getImage = this.getImage.bind(this);
  }
  getImage() {
    const ele = this.state.timelines[this.state.timelines.length - 1];
    console.log(ele);

    // Check if 'ele' is defined before proceeding
    if (!ele) {
      console.error('No elements in timelines array.');
      return;
    }

    axios
      .get(`${process.env.REACT_APP_URL}/aboutuscontent/download/${ele._id}`, { responseType: 'blob' })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        this.setState({ timeline: { ele, url } });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    // Call your specific function here
    axios.get(`${process.env.REACT_APP_URL}/aboutuscontent/allaboutus`)
      .then((response) => {
        if (response.data.length >= 0) {
          this.setState({ timelines: response.data }, () => {
            return this.getImage();
          });
        }

      })
      .catch((error) => {
        console.log(error);
      });
    this.slider();
    const componentElement = document.getElementById('AboutUs_1');
    componentElement.scrollTo(0, 0);

  }

  componentDidUpdate(prevProps, prevState) {
    // Check if the component's props or state have changed

    const componentElement = document.getElementById('AboutUs_1');
    componentElement.scrollTo(0, 0);

  }
  slider() {
    // Your specific function logic here
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

    return (
      <>
        <div className='Aboutus' id='AboutUs_1'>
          <section className="uni-up-margin">

            <div className="slideshow">
              <div className="slide s1-abt active"></div>
              <div className="slide s2-abt"></div>
              <div className="slide s3-abt"></div>
              <div className="slide s4-abt"></div>
            </div>
            <div className='blue-abt-overlay'>
              <div className='principal-abt'> <h1>About Us</h1></div>
            </div>
            <div className="dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>

          </section>
          <div className="were-delivering-only-exceptio-parent">
            <div className="were-delivering-only-container">
              <p className="were-delivering-only title-abt "><span style={{ color: "black" }}> DCE REFRIGERATION Pvt Ltd </span> </p>
              <p className="title-abt"> is Delivering Only
                Exceptional</p>
              <p className="title-abt reveal"><span style={{ color: "black" }}>Quality Work</span></p>


            </div>
            <div className="flex-grid-2-abt">
              <div className="img-1-abt reveal-from-left">
                <img src={require('../images/abt-1.png')} alt="" />
              </div>
              <div className="content-1-abt reveal-from-right text">
                Founded in the Year 1995 by the name of Deep Cool Engineers,
                Later registered as DCE Refrigeration Pvt Ltd in the year of 1997
                DCE Refrigeration Pvt Ltd, has been providing Services in the field
                of Industrial Refrigeration; using Ammonia as Natural Refrigerant;
                in Dairy, Brewery, Beverages, Food Processing, with customs and
                innovative solution for over 25 Years.
                In past 25 Years we have gained credibility and customer’s trust.


              </div>
            </div>

            <div className='text reveal-from-left'>
              DCE Refrigeration Pvt Ltd, has been providing Services in the field of <span className='bold-dark-abt'> Industrial Refrigeration, using Ammonia as Natural Refrigerant in Dairy, Brewery, Beverages, Food Processing, with customs and innovative solution for over 25 Years.</span><br />
              In Past 25 Years we have gained credibility and customer’s trust. We are able build and retain large faithful customer base. We are committed to meet and exceed customers expectation by providing Quality Services, Components, innovative and energy efficient solutions. We understand every plant, business and customer has unique requirement. We strive to design a tailor-made solution to every distinct need.<br />
              Under able guidance of <span className='bold-dark-abt'>Mr. Sanjay Ethape – Managing Director</span> and his experienced team we undertake Design, Engineering, Planning, erection and Commissioning of Ammonia Refrigeration Plants. Also we undertake revamp Upgradation of existing plants with new technical advances to enhance the capacity and efficiency.
              We have executed over <span className='bold-dark-abt'> 300+ Projects in India and neighbouring countries </span> like Nepal, Bangladesh and Sri Lanka. You can find the list of the Customers on this site <Link className="clients-section-underline-abt" to="/Clients">Clients Section</Link><br />
              As per the International Agreement encouraging the use of alternative environmental – friendly refrigerants, Ammonia becomes more attractive alternative. GLOBAL WARMING POTENTIAL and OZONE DEPLETION POTENTIAL are both ZERO for Ammonia.<br />

            </div>
          </div>

          <hr className="margin" />

          <h1 className="abt-title-home title-home reveal">Our Success Story</h1>
          <div className='container-timeline-img-abt' id='style-5'>
            <img className='timeline-img-abt' src={this.state.timeline.url} alt="not found"></img>
          </div>


          <hr className="margin" />

          <h1 className="abt-title-home title-home reveal">Our Speciality</h1>
          <div className="abt-overflow-hid">
            <div className="home-mega-grid-2 abt-mega-grid-2 reveal">
              <div className="abt-slider-home home-slider-col2 reveal-from-right">
                <div className="home_slider">
                  <div className="content_1-home"></div>
                </div>
              </div>

              <hr className="abt-line-home" />

              <div className="text home-title-col1 reveal-from-left">


                <br />
                <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 593.png")} className="info-image-abt" alt="" />
                  Ammonia, composed of hydrogen and nitrogen, belongs to a class of refrigerants considered natural refrigerants. Ammonia is environmental-friendly and with zero environmental impact.</p>
                <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 594.png")} className="info-image-abt" alt="" />
                  Industrial refrigeration systems employing Ammonia as refrigerant require some special planning to help mitigate the potential health and safety hazards. The biggest risk that may occur is an ammonia leak, which is both a health and safety hazard. The most common health concerns with ammonia are skin burns and difficulty in breathing.</p>
                <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 595.png")} className="info-image-abt" alt="" />
                  The odor threshold for anhydrous ammonia is 5 to 50 parts per million (ppm) and the maximum recommended exposure is 50 ppm over an 8-hour shift.
                </p>
                <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 596.png")} className="info-image-abt" alt="" />
                  With trusted Expert like DCE Refrigeration Pvt Ltd, customer is assured of Safeties in the plant, precautionary measure in the design stages itself. Training to operators and manger cadre is imparted prior to commissioning of the plant and safety regulations stringently explained and followed.</p>
              </div>


            </div>

          </div>



          <hr className="margin" />

          <div className='servicesWeProvide container-abt'>
            <h1 style={{ marginBottom: "1rem" }} className='title-abt'>Services We Provide</h1>
            <div className='text'>

              <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 593.png")} className="info-image-abt" alt="" />
                DEALS IN KIRLOSKAR PNEUMATIC COMPANY LIMITED-RECIPROCATING COMPRESSORS/ SCREW COMPRESSOR SKIDS.</p>
              <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 594.png")} className="info-image-abt" alt="" />
                DEALS IN HOWDEN/JOHNSON CONTROLS/FRICK/YORK SCREW COMPRESSOR SKIDS.</p>
              <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 595.png")} className="info-image-abt" alt="" />
                DEALS IN ALFA-LAVAL PHE(PLATE HEAT EXCHANGERS).
              </p>
              <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 596.png")} className="info-image-abt" alt="" />
                DESIGN OF VARIOUS REFRIGERATION SYSTEM AS PER CUSTOMER NEEDS, PROVIDE TAILOR MADE SOLUTIONS BY
                UNDERSTANDING THE APPLICATIONS.</p>

              <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 05.png")} className="info-image-abt" alt="" />
                SUPPLY, ERECTION & COMMISSIONING OF REFRIGERATION SYSTEMS FOR CHILLED WATER/GLYCOL APPLICATION,
                AMMONIA PUMP FEED SYSTEM, COLD ROOMS, AHU, PROCESS COOLING AS REQUIREMENTS.</p>
              <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 06.png")} className="info-image-abt" alt="" />
                PROVIDE AFTER SALES SUPPORT.</p>
              <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 07.png")} className="info-image-abt" alt="" />
                CONSULTANCY FOR REFRIGERATION PLANT DESIGN.
              </p>
              <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 08.png")} className="info-image-abt" alt="" />
                CARRY OUT AUDITS TO ENSURE EFFICIENCY OF THE SYSTEMS AS DESIGN AND PROVIDE SOLUTIONS FOR ENERGY
                SAVINGS.</p>

              <p className='reveal-from-right'> </p>
              <p className='reveal-from-right'></p>
              <p className='reveal-from-right'></p>
              <p className='reveal-from-right'> </p>
              <p className='reveal-from-right'></p>
              <p className='reveal-from-right'></p>
              <p className='reveal-from-right'></p>
              <p className='reveal-from-right'></p>
            </div>

          </div>

          <hr className="margin" />





          <div className="were-delivering-only-exceptio-parent reveal">
            <div className="were-delivering-only-container">
              <p className="were-delivering-only m1rem title-abt reveal-from-left">Our <span className="blue-abt">Vision</span></p>
            </div>
            <div className="flex-grid-2-abt wrap-reverse">
              <div className="content-1-abt m1right reveal-from-left text">
                <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 593.png")} className="info-image-abt" alt="" />
                  Achieve a paramount position in the field of Industrial Refrigeration as a supplier of Environment friendly refrigeration products and services.</p>
                <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 594.png")} className="info-image-abt" alt="" />
                  Continuous development of refrigeration systems to help reduce energy footprints by incorporating latest technologies and components.</p>
              </div>
              <div className="img-1-abt reveal-from-right">
                <img src={require("../images/abt-2.png")} alt="" />
              </div>
            </div>
          </div>




          <hr className="margin" />


          <div className="were-delivering-only-exceptio-parent reveal">
            <div className="were-delivering-only-container">
              <p className="were-delivering-only m1rem title-abt reveal-from-left">Our <span className="blue-abt">Mission</span></p>
            </div>
            <div className="flex-grid-2-abt ">
              <div className="img-1-abt reveal-from-left">
                <img src={require("../images/abt-3.png")} alt="" />
              </div>
              <div className="content-1-abt reveal-from-right text">
                <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 593.png")} className="info-image-abt" alt="" />
                  To optimize customer’s energy consumption through advanced refrigeration systems.</p>
                <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 594.png")} className="info-image-abt" alt="" />
                  Through continuous improvements provide best environment friendly refrigeration products & services</p>
                <p className="text flex-info-2-abt reveal-from-right"><img src={require("../images/Group 595.png")} className="info-image-abt" alt="" />
                  Keep pace with latest trends & technologies in Industrial refrigeration.</p>
                <div></div>
              </div>
            </div>
          </div>


          .






          <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
          <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </div>
      </>
    )
  }
}
