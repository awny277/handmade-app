import React, { useState } from "react";
import SlickSLider from "./../../../Layout/slickSlider/SlickSlider";
import Card from "./../../../Layout/Card/Card";
import { Container } from "react-bootstrap";
import special1 from "../../../../image/special1.jpg";
import special2 from "../../../../image/special2.jpg";
import special3 from "../../../../image/special3.jpg";
import new1 from "../../../../image/new1.jpg";
import new2 from "../../../../image/new2.jpg";
import new3 from "../../../../image/new3.jpg";
import pop1 from "../../../../image/mac3.jpg";
import pop2 from "../../../../image/mac4.jpg";
import pop3 from "../../../../image/mac5.jpg";
import pop4 from "../../../../image/mac6.jpg";
import pop5 from "../../../../image/mac7.jpg";
import pop6 from "../../../../image/mac8.jpg";
import mac1 from "../../../../image/mac1.jpg";
import mac2 from "../../../../image/mac2.jpg";
import mac3 from "../../../../image/mac3.jpg";
import Animation from "../../../Layout/Animation/Animation";

const NewArrival = () => {
  const [featured, setFeatured] = useState(true);
  const [latest, setLatest] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);

  const FeaturedHandeler = () => {
    setFeatured(true);
    setLatest(false);
    setBestSeller(false);
  };

  const LatestHandlere = () => {
    setLatest(true);
    setFeatured(false);
    setBestSeller(false);
  };

  const BestSellerHandler = () => {
    setBestSeller(true);
    setLatest(false);
    setFeatured(false);
  };

  return (
    <Container>
      <div className="newArrival text-center ">
        <h2 className="newArrival-header">new arrival</h2>
        <p>Check out all the newly added products .</p>
        <div className="newArrival-Buttons">
          <button
            className={`btn button ${featured ? "active" : ""}`}
            onClick={FeaturedHandeler}
          >
            featured
          </button>
          <button
            className={`btn button ${latest ? "active" : ""}`}
            onClick={LatestHandlere}
          >
            latest
          </button>
          <button
            className={`btn button ${bestSeller ? "active" : ""}`}
            onClick={BestSellerHandler}
          >
            best sellers
          </button>
        </div>
        {featured && (
          <div className="Featured">
            {/* <Animation> */}
            <SlickSLider>
              <Card imgUrl={new1} deiscount={300} />
              <Card imgUrl={new2} deiscount={300} />
              <Card imgUrl={new3} deiscount={300} />
              <Card imgUrl={special1} />
              <Card imgUrl={special2} />
              <Card imgUrl={special3} />
            </SlickSLider>
            {/* </Animation> */}
          </div>
        )}
        {latest && (
          <div className="latest">
            {/* <Animation> */}
            <SlickSLider>
              <Card imgUrl={pop1} />
              <Card imgUrl={pop2} />
              <Card imgUrl={pop3} />
              <Card imgUrl={pop4} />
              <Card imgUrl={pop5} />
              <Card imgUrl={pop6} />
            </SlickSLider>
            {/* </Animation> */}
          </div>
        )}
        {bestSeller && (
          <div className="bestSeller">
            {/* <Animation> */}
            <SlickSLider>
              <Card imgUrl={mac1} />
              <Card imgUrl={mac2} />
              <Card imgUrl={mac3} />
              <Card imgUrl={pop6} />
              <Card imgUrl={pop5} />
              <Card imgUrl={pop4} />
            </SlickSLider>
            {/* </Animation> */}
          </div>
        )}
      </div>
    </Container>
  );
};

export default NewArrival;
