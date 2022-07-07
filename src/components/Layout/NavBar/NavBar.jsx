import React from "react";
import {
  Container,
  Nav,
  Navbar,
  Offcanvas,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import UserRegister from "./../../Layout/UserRegister/UserRegister";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../image/logo1.png";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaOpencart } from "react-icons/fa";
import "./NavBar.css";
const NavBar = ({ userInfo, TotalLenght }) => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={"/"} data-rr-ui-event-key="#home" className="nav-link">
              Home
            </NavLink>
            <NavLink to={"/NewProducts"} className="nav-link">
              Products
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav nav-order3">
          <Nav className="me-auto">
            <NavLink to={"/specialProductPage"} className="nav-link">
              Special order
            </NavLink>

            {window.localStorage.getItem("isOline") === "true" && (
              <NavLink to={"/cart"} className="nav-link cartLink">
                <FaOpencart className="cartIcon" />
                <span>{TotalLenght}</span>
              </NavLink>
            )}

            {window.localStorage.getItem("isOline") === "true" ? (
              <DropdownButton
                id="dropdown-basic-button"
                title={<BsFillPersonLinesFill className="UserIcon" />}
              >
                <Dropdown.Item
                  onClick={() => {
                    navigate(`/profile/dashBoard`);
                  }}
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <UserRegister />
              </DropdownButton>
            ) : (
              <UserRegister />
            )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              {userInfo.userName ? (
                userInfo.userName
              ) : (
                <img src={logo} alt="logo" />
              )}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavLink
                to={"/"}
                data-rr-ui-event-key="#home"
                className="nav-link"
              >
                Home
              </NavLink>
              <NavLink to={"/NewProducts"} className="nav-link">
                Products
              </NavLink>
              <NavLink to={"/specialProductPage"} className="nav-link">
                Special order
              </NavLink>
              <NavLink to={"/admin"} className="nav-link">
                DashBoard
              </NavLink>
            </Nav>
            {userInfo.userName && <UserRegister />}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
