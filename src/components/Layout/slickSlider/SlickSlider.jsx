import React from "react";
import Slider from "react-slick";
import "./SlickSlider.css";

import { BsArrowRightCircle, BsArrowLeftCircleFill } from "react-icons/bs";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="Slick-Arrow right-Arrow" onClick={onClick}>
      <BsArrowRightCircle />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="Slick-Arrow left-Arrow" onClick={onClick}>
      <BsArrowLeftCircleFill />
    </div>
  );
}
const SlickSLider = (props) => {
  var settings = {
    infinite: true,
    slidesToShow: props.cat ? 3 : 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          speed: 1500,
          autoplaySpeed: 2000,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
          autoplay: true,
          speed: 1500,
          autoplaySpeed: 2000,
          cssEase: "linear",
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          speed: 1500,
          autoplaySpeed: 1000,
          cssEase: "linear",
        },
      },
    ],
  };
  return <Slider {...settings}>{props.children}</Slider>;
};

export default SlickSLider;
