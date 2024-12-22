import { useEffect, useState } from "react";
import "./Dashboard.css";
import { server } from "../../main";

const Dashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedLectures, setCompletedLectures] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await fetch(`${server}/api/mycourses`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        console.log("Enrolled courses data:", data); // Debugging log
        if (response.ok && data.courses) {
          setEnrolledCourses(data.courses);
        } else {
          throw new Error(data.message || "Failed to fetch courses");
        }
      } catch (err) {
        console.log("Error fetching enrolled courses:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };    

    const fetchCompletedLectures = async () => {
      try {
        const response = await fetch(`${server}/api/user/completedLectures`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        console.log("Completed lectures data:", data); // Debugging log
        if (response.ok && data.completedLectures) {
          setCompletedLectures(data.completedLectures);
        } else {
          throw new Error(data.message || "Failed to fetch completed lectures");
        }
      } catch (err) {
        console.log("Error fetching completed lectures:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
    fetchCompletedLectures();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats">
        <h3>Enrolled Courses</h3>
        {enrolledCourses.length > 0 ? (
          <ul>
            {enrolledCourses.map((course) => (
              <li key={course._id}>
                <h4>{course.course_title}</h4>
                <p>{course.course_difficulty}</p>
                <p>Organization: {course.course_organization}</p>
                <p>Rating: {course.course_rating}</p>
                <p>Entrolled: {course.course_students_enrolled}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No enrolled courses.</p>
        )}

        <h3>Completed Lectures</h3>
        {Object.keys(completedLectures).length > 0 ? (
          <ul>
            {Object.keys(completedLectures).map((courseId) => (
              <li key={courseId}>
                <h4>Course ID: {courseId}</h4>
                <p>Lectures Completed: {completedLectures[courseId]}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No completed lectures.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
