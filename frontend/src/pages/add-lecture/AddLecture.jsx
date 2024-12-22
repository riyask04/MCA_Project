import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import "./AddLecture.css";

const AddLecture = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddLecture = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video); // Ensure this matches with backend

    try {
      const { data } = await axios.post(`${server}/api/course/${id}/lecture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
          token: localStorage.getItem("token"),
        },
      });

      if (data.message === "Lecture Added Successfully") { // Check the message key
        toast.success("Lecture added successfully!");
        navigate(`/course/${id}/lectures`);
      } else {
        toast.error(data.message || "Error adding lecture.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding lecture.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-lecture">
      <h2>Add Lecture</h2>
      <form onSubmit={handleAddLecture}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setVideo(e.target.files[0])}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Lecture"}
        </button>
      </form>
    </div>
  );
};

export default AddLecture;
