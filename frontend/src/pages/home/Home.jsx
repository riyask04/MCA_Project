import {useNavigate} from "react-router-dom"
import "./Home.css"
import hero from "./images/hero.png";
import animation from "./images/icon-animation.svg";
import business from "./images/icon-business.svg";
import crypto from "./images/icon-crypto.svg";
import design from "./images/icon-design.svg";
import photography from "./images/icon-photography.svg";
import Testimonials from "../../components/testimonials/Testimonials"

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="main">
      <div className="content-box">
      <h1>
      Maximize skill, Minimize budget
    </h1>
    <p>
      Our modern courses across a range of in-demand skills will give you the 
      knowledge you need to live the life you want.
    </p>
    <button id="btn-main" onClick={()=>navigate("/courses")}>
      Get Started
    </button>
      </div>
    <img src={hero}/>
    </div>

    <div id="check-out-card">
      <h2>
        Check out our most popular courses!
      </h2>
    </div>
    <div id="grid-section">
    <div className="service-card" id="animation-card">
      <img src={animation} alt="" className="service-icon"/>
      <h3>
        Animation
      </h3>
      <p>
        Learn the latest animation techniques to create stunning motion 
        design and captivate your audience.
      </p>
      <a href="#">Get Started</a>
    </div>

    <div className="service-card" id="design-card">
      <img src={design} alt="" className="service-icon"/>
      <h3>
        Design
      </h3>
      <p>
        Create beautiful, usable interfaces to help shape the future of 
        how the web looks.
      </p>
      <a href="#">Get Started</a>
    </div>

    <div className="service-card" id="photography-card">
      <img src={photography} alt="" className="service-icon"/>
      <h3>
        Photography
      </h3>
      <p>
        Explore critical fundamentals like lighting, composition, and focus 
        to capture exceptional photos.
      </p>
      <a href="#">Get Started</a>
    </div>

    <div className="service-card" id="crypto-card">
      <img src={crypto} alt="" className="service-icon"/>
      <h3>
        Crypto
      </h3>
      <p>
        All you need to know to get started investing in crypto. Go from beginner 
        to advanced with this 54 hour course.
      </p>
      <a href="#">Get Started</a>
    </div>

    <div className="service-card" id="business-card">
      <img src={business} alt="" className="service-icon"/>
      <h3>
        Business
      </h3>
      <p>
        A step-by-step playbook to help you start, scale, and sustain your business 
        without outside investment.
      </p>
      <a href="#">Get Started</a>
    </div>
  </div>
  <Testimonials/>
    </>
    
  )
}

export default Home
