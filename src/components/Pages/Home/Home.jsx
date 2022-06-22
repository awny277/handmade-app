import React from "react";
import Landing from "./Landing/Landing";
import NewArrival from "./NewArrival/NewArrival";
import Discount from "./Discount/Discount";
import SpacialItems from "./SpacialItems/SpacialItems";
import PopularCategories from "./PopularCategories/PopularCategories";
import SpacialOrder from "./SpacialOrder/SpacialOrder";
import "./Home.css";
const Home = ({ userInfo }) => {
  return (
    <React.Fragment>
      <Landing userInfo={userInfo} />
      <NewArrival />
      <Discount />
      <SpacialItems />
      <SpacialOrder />
      <PopularCategories />
    </React.Fragment>
  );
};

export default Home;
