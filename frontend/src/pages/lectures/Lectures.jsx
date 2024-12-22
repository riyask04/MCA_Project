import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main';
import toast from 'react-hot-toast';
import { UserData } from '../../context/UserContext';
import './Lectures.css';

const Lectures = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = UserData();

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const { data } = await axios.get(`${server}/api/course/${id}/lectures`, {
          headers: {
            token: localStorage.getItem('token'),
            
          },
        });
        console.log(data)
        setLectures(data.lectures);
      } catch (err) {
        toast.error(err.response.data.message || 'Failed to fetch lectures.');
      } finally {
        setLoading(false);
      }
    };
    fetchLectures();
  }, [id]);

  const handleAddLecture = () => {
    navigate(`/course/${id}/add-lecture`);
  };

  return (
    <div className="lectures-container">
      <div className="lectures-header">
        <h1>Lectures</h1>
        {user.role === 'admin' && (
          <button className="add-lecture-button" onClick={handleAddLecture}>
            Add Lecture
          </button>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : lectures.length > 0 ? (
        <div className="lecture-card-container">
          {lectures.map((lecture) => (
            <div key={lecture._id} className="lecture-card">
              <div className="lecture-card-content">
                <h2>{lecture.title}</h2>
                <p>{lecture.description}</p>
                <video src={`${server}/${lecture.video}`} controls></video>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No lectures available</p>
      )}
    </div>
  );
};

export default Lectures;
