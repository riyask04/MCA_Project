import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { server } from "../../main";
import CourseImage from "../../../public/CourseImage.webp"
import toast from "react-hot-toast";
import "./CourseCard.css";
import { UserData } from "../../context/UserContext";
import PropTypes from "prop-types";

const CourseCard = ({ course }) => {
  const [loading, setLoading] = useState(false);
  const { user } = UserData(); // Get the current user
  const navigate = useNavigate(); // Initialize useNavigate

  const enrollHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/enroll`, { courseId: course._id }, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.message || "Failed to enroll in the course.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    if (user.role === 'admin' || user.role === 'user') {
      navigate(`/course/${course._id}/lectures`);
    } else {
      enrollHandler();
    }
  };

  return (
    <div className="course-card" onClick={handleCardClick}>
      <img src={CourseImage} alt="" className="course-image" />
      <div className="course-content">
        <h3>{course.course_title}</h3>
        <p>Organization - {course.course_organization}</p>
        <p>Rating - {course.course_rating}</p>
        <p>Enrolled - {course.course_students_enrolled}</p>
        {user.role !== 'admin' && (
          <button className="common-btn" onClick={enrollHandler} disabled={loading}>
            {loading ? "Enrolling..." : "Enroll Now"}
          </button>
        )}
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourseCard;
