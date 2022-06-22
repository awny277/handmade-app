import React, { useEffect } from "react";
import Aos from "aos";
const Animation = (props) => {
  useEffect(() => {
    Aos.init({ duration: 900 });
  });
  return (
    <div
      data-aos="zoom-in-down"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      {props.children}
    </div>
  );
};

export default Animation;
