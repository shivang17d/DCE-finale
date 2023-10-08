import React, { Component } from 'react'
import '../styles/Career.css'
import '../scripts/career_app'
import axios from 'axios'
export default class Career extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: process.env.REACT_APP_RECIPIENT,
      name: '',
      mobile: '',
      email: '',
      experience: '',
      path: '',
      subject: '',
      isAttachment: false,
      file: null,
      isValidMobile: false,
      isValidEmail: false
    }
    this.changeName = this.changeName.bind(this);
    this.changeMobile = this.changeMobile.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeExperience = this.changeExperience.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeFile = this.changeFile.bind(this);
  }
  changeName(event) {
    this.setState({ name: event.target.value })
  }
  changeMobile(event) {
    this.setState({ mobile: event.target.value }, this.validatePhoneNumber)
  }
  changeEmail(event) {
    this.setState({ email: event.target.value }, this.validateEmail)
  }
  changeExperience(event) {
    this.setState({ experience: event.target.value })
  }
  changeFile(event) {
    this.setState({ isAttachment: true });
    const selectedFile = event.target.files[0];
    this.setState({ file: selectedFile }, () => {
      console.log('File state updated:', this.state.file);
      alert('File has been uploaded Successfully!')
    });
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
      experience: this.state.experience,
      message: this.state.experience,
      subject: 'From: ' + this.state.email + ' Applicant.',
      isAttachment: this.state.isAttachment
    };
    const file = this.state.file;
    var id;
    axios.post(`${process.env.REACT_APP_URL}/careercontent/apply`, body)
      .then(function (response) {
        id = response.data._id;
        alert('Submitted successfully!');
        const formData = new FormData();
        formData.append('file', file, id + '.pdf');
        return axios.post(`${process.env.REACT_APP_URL}/careercontent/upload`, formData, {
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // }
        })
      }).then((response) => {
        console.log(response);
        const filename = id + '.pdf'
        body.filename = filename;
        return axios.post(`${process.env.REACT_APP_URL}/emailcontent/sendemail`, body)
      }).then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((error) => {
        console.error(error);
      });
    event.preventDefault();
    this.setState({
      recipient: process.env.REACT_APP_RECIPIENT,
      name: '',
      mobile: '',
      email: '',
      experience: '',
      path: '',
      subject: '',
      isAttachment: false,
      file: null,
      isValidMobile: false,
      isValidEmail: false
    })


  }

  componentDidMount() {
    this.slider();
  }
  componentDidUpdate(prevProps, prevState) {
    // Check if the component's props or state have changed
    if (this.props.someProp !== prevProps.someProp || this.state.someState !== prevState.someState) {
      // Scroll to the top of the component
      window.scrollTo(0, 0);
    }
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
    return (
      <>
        <div className='Career'>

          <section className="uni-up-margin">
            <div class="slideshow">
              <div class="slide s1-career active"></div>
              <div class="slide s2-career"></div>
              <div class="slide s3-career"></div>
              <div class="slide s4-career"></div>
            </div>
            <div className='blue-abt-overlay'>
              <div className='principal-abt'> <h1>Career</h1></div>
            </div>
            <div class="dots">
              <span class="dot active"></span>
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </section>

          <section id="form_main-career">
            <div className="form_title-career reveal">
              <h1>You Think You are up for the </h1>
              <h1 className="blue-career">Job Opportunity</h1>
              <h1>Fill up the Form so we can</h1>
              <h1 className="blue-career">Hire You</h1>
            </div>
            <div className="form-career reveal">
              <form className="form1-career">
                <h2>Hiring Form</h2>
                <p className="p-career reveal-from-right" type="Name:"><input className='input-career' type="text" placeholder="Write your name here.."
                  required value={this.state.name} onChange={this.changeName} /></p>
                <p className="p-career reveal-from-left" type="Email:"><input className='input-career' type="email"
                  placeholder="Let us know how to contact you back.." required value={this.state.email} onChange={this.changeEmail} />
                  {this.state.isValidEmail ? <span style={{ color: 'green' }}>Valid email address</span> : null}
                </p>
                <p className="p-career reveal-from-right" type="Message:"><input className='input-career' type="text" placeholder="Tell about Yourself"
                  required value={this.state.experience} onChange={this.changeExperience} /></p>
                <p className="p-career reveal-from-left" type="Phone number"><input className='input-career' type="tel" placeholder="Phone number"
                  required value={this.state.mobile} onChange={this.changeMobile} pattern="[2-9]\d{2}-\d{3}-\d{4}" title="Please enter a valid phone number" />
                  {this.state.isValidMobile ? <span style={{ color: 'green' }}>Valid phone number</span> : null}
                </p>

                <button className="button-career submitbtn-career reveal-from-right" onClick={this.handleSubmit} disabled={!(this.state.isValidEmail && this.state.isValidMobile && this.state.isAttachment)}>Submit</button>
                <input style={{ display: "none" }} className="" id="file" type="file" onChange={this.changeFile} />
                <label className="button-career reveal-from-left" htmlFor="file">Upload Resume</label>
                <br />
                <div className="div-career reveal_absolute">
                  <span className="span-career fa fa-phone reveal_absolute"></span><a
                    style={{ color: "white", textDecoration: "none", listStyle: "none" }} href="tel:020 - 24262436"> 020 -
                    24262436</a>
                  <span className="span-career fa fa-envelope-o reveal_absolute"></span> <a
                    style={{ color: "white", textDecoration: "none", listStyle: "none" }} href="mailto:info@dceref.com">info@dceref.com</a>
                </div>
              </form>
            </div>
          </section>








          <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
          <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>





          <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
          <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </div>
      </>
    )
  }
}
