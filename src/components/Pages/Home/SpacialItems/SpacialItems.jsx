import React from "react";
import SlickSLider from "./../../../Layout/slickSlider/SlickSlider";
import Card from "./../../../Layout/Card/Card";
import { Container } from "react-bootstrap";
import special1 from "../../../../image/special1.jpg";
import special2 from "../../../../image/special2.jpg";
import special3 from "../../../../image/special3.jpg";
import mac1 from "../../../../image/mac1.jpg";
import mac2 from "../../../../image/mac2.jpg";
import mac3 from "../../../../image/mac3.jpg";
import Animation from "../../../Layout/Animation/Animation";

const SpacialItems = () => {
  return (
    <Container>
      <div className="SpacialItems text-center">
        <h2 className="SpacialItems-header">Spacial products</h2>
        <p>Check out all the newly added products .</p>
        <div className="SpacialItems">
          <Animation>
            <SlickSLider>
              <Card imgUrl={mac1} />
              <Card imgUrl={mac2} />
              <Card imgUrl={mac3} />
              <Card imgUrl={special1} deiscount={300} />
              <Card imgUrl={special2} deiscount={300} />
              <Card imgUrl={special3} deiscount={300} />
            </SlickSLider>
          </Animation>
        </div>
      </div>
    </Container>
  );
};

export default SpacialItems;
