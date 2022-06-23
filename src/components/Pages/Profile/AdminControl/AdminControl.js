import React from "react";
import "./AdminControl.css";
import AdminControlImage from "../../../../image/adminControl.jpg";
import { NavLink } from "react-router-dom";
import { AiFillControl } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { GrUserSettings } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";

const AdminControl = () => {
  return (
    <div className="AdminControl">
      <div className="infromation">
        <div className="AdminControlImage">
          <img src={AdminControlImage} alt="AdminControlImage" />
        </div>
        <h3>abdelrahman</h3>
        <span>user</span>
      </div>
      <ul>
        <li>
          <NavLink to={"/profile/controlPanal"}>
            <AiFillControl /> control Panal
          </NavLink>
        </li>
        <li>
          <NavLink to={"/profile/dashBoard"}>
            <RiDashboardFill /> DashBoard
          </NavLink>
        </li>
        <li>
          <NavLink to={"/profile/setting"}>
            <GrUserSettings /> Setting
          </NavLink>
        </li>
        <li>
          <button className="btn">
            <FiLogOut /> logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminControl;
