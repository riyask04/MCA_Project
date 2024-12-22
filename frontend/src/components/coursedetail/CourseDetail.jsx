import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../main";
import { UserData } from "../../context/UserContext";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const {user, setUser } = UserData();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`${server}/api/course/${id}`);
        setCourse(data.course);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await axios.post(
        `${server}/api/user/enroll`,
        { courseId: course._id },
        { headers: { token: localStorage.getItem("token") } }
      );
      // Fetch updated user data or handle state update
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: { token: localStorage.getItem("token") },
      });
      setUser(data.user);
      alert("Successfully enrolled in the course!");
    } catch (err) {
      console.log(err);
      alert("Failed to enroll in the course.");
    }
  };

  return (
    <div className="course-detail">
      <h2>{course.title}</h2>
      <img src={`${server}/${course.image}`} alt="" className="course-image" />
      <p>Instructor: {course.createdBy}</p>
      <p>Duration: {course.duration}</p>
      <p>Price: {course.price}</p>
      <p>Description: {course.description}</p>
      <button className="common-btn" onClick={handleEnroll}>
        Enroll Now
      </button>
    </div>
  );
};

export default CourseDetail;
