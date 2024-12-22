import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import "./Account.css";
import PropTypes from "prop-types";
import Dashboard from "./Dashboard";

const Account = ({ user }) => {
  const [showDashboard, setShowDashboard] = useState(false);
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <div>
      {user && (
        <div className="profile">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p>
              Name - <strong>{user.name}</strong>
            </p>

            <p>
              Email - <strong>{user.email}</strong>
            </p>

            <div className="buttons">
              <button
                className="common-btn" style={{ backgroundColor: "white", color: "black" }}
                onClick={() => setShowDashboard(!showDashboard)}
              >
                {showDashboard ? "Hide Dashboard" : "Dashboard"}
              </button>
              <button
                className="common-btn"
                onClick={logoutHandler}
                style={{ backgroundColor: "red" }}
              >
                Logout
              </button>
            </div>
          </div>

          {showDashboard && <Dashboard/>}
        </div>
      )}
    </div>
  );
};

Account.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};


export default Account;
