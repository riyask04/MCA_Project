import { useEffect, useState } from "react";
import CourseCard from "../../components/coursecard/CourseCard";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import "./Courses.css";
import { server } from "../../main";

const Courses = () => {
  const { courses } = CourseData();
  const { user } = UserData();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch(`${server}/api/course/mycourses`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        console.log(data)
        console.log("Enrolled courses data:", data);
        setEnrolledCourses(data.courses || []);
      } catch (err) {
        console.log("Error fetching enrolled courses:", err);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  useEffect(() => {
    console.log("All courses:", courses);
    console.log("Enrolled courses:", enrolledCourses);
    const enrolledCourseIds = enrolledCourses.map(course => course._id);
    const filtered = courses.filter(course => !enrolledCourseIds.includes(course._id));
    console.log("Filtered courses:", filtered);
    setFilteredCourses(filtered);
  }, [courses, enrolledCourses]);

  return (
    <div className="courses">
      <h2>Popular Courses</h2>
      <div className="course-container">
        {filteredCourses && filteredCourses.length > 0 ? (
          filteredCourses.map(e => (
            <CourseCard key={e._id} course={e} />
          ))
        ) : (
          <p>No Courses yet!!</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
