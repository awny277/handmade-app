import React from "react";
import "./Footer.css";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaHome,
  FaPhoneAlt,
} from "react-icons/fa";
import { GrMail } from "react-icons/gr";
const Footer = () => {
  return (
    <div className=" Footer">
      <Container className="text-center">
        <Row>
          <Col>
            <div className="categories Footer-contacts">
              <h3>Handmade store</h3>
              <p>
                <FaHome /> 184 main rd e,st elmahalla
              </p>
              <p>
                <GrMail /> <a href="/">contact@handmade.com</a>
              </p>
              <p>
                <FaPhoneAlt /> +123 456 7891
              </p>
              <div className="sec-contacts">
                <a href="/">
                  <FaFacebookF />
                </a>
                <a href="/">
                  <FaTwitter />
                </a>
                <a href="/">
                  <FaInstagram />
                </a>
                <a href="/">
                  <FaLinkedinIn />
                </a>
                <a href="/">
                  <FaGithub />
                </a>
              </div>
            </div>
          </Col>
          <Col>
            <div className="categories Footer-categories">
              <h3>Categories</h3>
              <a href="/"> test</a>
              <a href="/"> test</a>
              <a href="/"> test</a>
              <a href="/"> test</a>
              <a href="/"> test</a>
              <a href="/"> test</a>
            </div>
          </Col>
          <Col>
            <div className="categories Footer-information">
              <h3>Information</h3>
              <a href="/"> About us</a>
              <a href="/"> Contact</a>
              <a href="/"> Terms &amp; Conditions</a>
              <a href="/"> Returns &amp; Exchanges</a>
              <a href="/"> Shipping &amp; Delivery</a>
              <a href="/"> Privacy Policy</a>
            </div>
          </Col>
          <Col>
            <div className="categories Footer-links">
              <h3>Useful Links</h3>
              <a href="/"> Store Location </a>
              <a href="/"> Latest News</a>
              <a href="/"> My Account</a>
              <a href="/"> Size Guide</a>
              <a href="/"> FAQs 2</a>
              <a href="/"> FAQs</a>
            </div>
          </Col>
          <Col>
            <div className="categories Footer-news">
              <h3>Newsletter Signup</h3>
              <p>
                subscribe to our newsletter and get 10% off your first purchase
              </p>
              <div className="buttonIn">
                <input type="text" id="enter" />
                <button id="sub">subscribe</button>
              </div>
              <a href="/"> FAQs</a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
