import React from "react";
import "./AdminControl.css";
import AdminControlImage from "../../../../image/adminControl.jpg";
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
        <li>conrtol panal</li>
        <li>DashBoard</li>
        <li>Setting</li>
        <li>logout</li>
      </ul>
    </div>
  );
};

export default AdminControl;
