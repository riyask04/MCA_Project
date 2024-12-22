import aboutImg from "../about/about.png"
import { Link } from "react-router-dom";
import "./About.css"
const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <h2>About Us</h2>
        <p>
        LearnLynx is a cutting-edge e-learning platform that offers a wide range of courses covering various subjects, from science to technology. Our mission is to provide students with the best education and resources available to help them achieve their personal and professional goals.
        </p>
        <Link className="enroll-btn" to={"/login"} style={
          {
            textDecoration:"none"
          }
        }>Enroll</Link>
      </div>
      <img src={aboutImg} alt="" />
    </div>
  )
}

export default About
