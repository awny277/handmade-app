import React from "react";
import SlickSLider from "./../../../Layout/slickSlider/SlickSlider";
import { Container } from "react-bootstrap";
import pop1 from "../../../../image/mac3.jpg";
import pop2 from "../../../../image/mac4.jpg";
import pop3 from "../../../../image/mac5.jpg";
import pop4 from "../../../../image/mac6.jpg";
import pop5 from "../../../../image/mac7.jpg";
import pop6 from "../../../../image/mac8.jpg";
import Card from "./../../../Layout/Card/Card";
import Animation from "../../../Layout/Animation/Animation";

const PopularCategories = () => {
  return (
    <Container>
      <div className="newArrival text-center PopularCategories">
        <h2 className="newArrival-header">Popular Categories</h2>
        <p>Check out all the newly added products .</p>
        <div className="Featured">
          <Animation>
            <SlickSLider cat={true}>
              <Card type={"Categories"} imgUrl={pop1} />
              <Card type={"Categories"} imgUrl={pop2} />
              <Card type={"Categories"} imgUrl={pop3} />
              <Card type={"Categories"} imgUrl={pop4} />
              <Card type={"Categories"} imgUrl={pop5} />
              <Card type={"Categories"} imgUrl={pop6} />
            </SlickSLider>
          </Animation>
        </div>
      </div>
    </Container>
  );
};

export default PopularCategories;
