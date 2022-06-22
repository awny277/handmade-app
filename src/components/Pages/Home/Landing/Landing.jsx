import React from "react";
import { Carousel } from "react-bootstrap";
import slide1 from "../../../../image/slider1.jpg";
import slide2 from "../../../../image/slide2.jpg";
import UserRegister from "../../../Layout/UserRegister/UserRegister";
const Landing = ({ userInfo }) => {
  return (
    <Carousel variant="dark" touch={true}>
      <Carousel.Item>
        <img className="d-block w-100" src={slide1} alt="First slide" />
        <Carousel.Caption>
          <h5>best handmade store</h5>
          <p>
            great idea to design your life, your house or your office with
            handmade items
          </p>
          {window.localStorage.getItem("isOline") === "true" ? (
            <button className="caption-btn">shop now</button>
          ) : (
            <UserRegister />
          )}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slide2} alt="Second slide" />
        <Carousel.Caption>
          <h5>best handmade store</h5>
          <p>
            great idea to design your life, your house or your office with
            handmade items
          </p>
          {window.localStorage.getItem("isOline") === "true" ? (
            <button className="caption-btn">shop now</button>
          ) : (
            <UserRegister />
          )}
        </Carousel.Caption>
      </Carousel.Item>
      {/* <Carousel.Item>
        <img className="d-block w-100" src={land1} alt="Third slide" />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
};

export default Landing;
