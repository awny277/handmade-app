import React from "react";
import AdminControlImage from "../../../../image/adminControl.jpg";
import { NavLink } from "react-router-dom";
import { AiFillControl } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { GrUserSettings } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import "./AdminControl.css";

const AdminControl = ({ userInfo }) => {
  return (
    <div className="AdminControl">
      <div className="infromation">
        <div className="AdminControlImage">
          <img src={AdminControlImage} alt="AdminControlImage" />
        </div>
        <h3>{window.localStorage.getItem("userName")}</h3>
        <span>{userInfo.type}</span>
      </div>
      <ul>
        <li>
          <NavLink to={"/profile/controlPanal"}>
            <AiFillControl className="controlIcon" /> control Panal
          </NavLink>
        </li>
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
          <button className="btn">
            <FiLogOut className="controlIcon" /> logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminControl;
