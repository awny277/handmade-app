import React from "react";
import AdminControlImage from "../../../../image/adminControl.jpg";
import { NavLink } from "react-router-dom";
import { AiFillControl } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { GrUserSettings } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminControl.css";

const AdminControl = () => {
  const navigate = useNavigate();
  const logoutHandeller = () => {
    axios
      .get("http://127.0.0.1:5000/logout")
      .then((res) => console.log(res))
      .then(() => {
        window.localStorage.setItem("password", "");
        window.localStorage.setItem("userName", "");
        window.localStorage.setItem("email", "");
        window.localStorage.setItem("type", "");
        window.localStorage.setItem("isOline", "false");
        window.localStorage.setItem("Profilepdated", "false");
        window.location.reload(false);
      });
    navigate("/");
  };
  return (
    <div className="AdminControl">
      <div className="infromation">
        <div className="AdminControlImage">
          <img src={AdminControlImage} alt="AdminControlImage" />
        </div>
        <h3>{window.localStorage.getItem("userName")}</h3>
        <span>{window.localStorage.getItem("type")}</span>
      </div>
      <ul>
        {window.localStorage.getItem("type") === "user" && (
          <li>
            <NavLink to={"/profile/controlPanal"}>
              <AiFillControl className="controlIcon" /> control Panal
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to={"/profile/dashBoard"}>
            <RiDashboardFill className="controlIcon" /> DashBoard
          </NavLink>
        </li>
        <li>
          <NavLink to={"/profile/setting"}>
            <GrUserSettings className="controlIcon" /> Setting
          </NavLink>
        </li>
        <li>
          <button className="btn" onClick={logoutHandeller}>
            <FiLogOut className="controlIcon" /> logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminControl;
