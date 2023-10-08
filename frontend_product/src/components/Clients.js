import React, { Component } from 'react'
import '../styles/Clients.css'
import ClientPageHeader from './Map/ClientPageHeader'
import MyMap from './Map/MyMap'
export default class Clients extends Component {
  componentDidMount() {
    
    window.scrollTo(0, 0);
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
      dot.addEventListener('click', function() {
        currentSlide = i;
        showSlide(currentSlide);
      });
    });
  
    setInterval(nextSlide, 3000);


  }
  render() {
    return (
      <>
      <ClientPageHeader />
      <div class="slideshow uni-up-margin">
  <div class="slide s1-abt active"></div>
  <div class="slide s2-abt"></div>
  <div class="slide s3-abt"></div>
  <div class="slide s4-abt"></div>
</div>
<div className='blue-abt-overlay'>
  <div className='principal-abt'> <h1>Our Clients</h1></div>
</div>
<div class="dots">
  <span class="dot active"></span>
  <span class="dot"></span>
  <span class="dot"></span>
  <span class="dot"></span>
</div>
      <div id="map-content">
        <h1 className='title-clt container-clt'>
          Projects executed by <br/> DCE <br/> across Indian Subcontinent
        </h1>
        <p className='text-clt container-clt reveal-from-right'>
          Map below highlights the range of refrigeration projects executed by DCE
          by all over India as well as neighboring countries in various sectors
        </p>
        <p class="text-clt bold-clt container-clt reveal-from-left">
        Click on the below any<img className='map-icon-clients' src="https://cdn-icons-png.flaticon.com/512/5060/5060752.png" alt=""/>on Map to view the Location and Client we Served
      </p>
        <MyMap></MyMap>
      </div>

      </>
    )
  }
}
