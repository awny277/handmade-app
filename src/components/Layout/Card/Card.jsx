import React from "react";
import { BsStar, BsFillStarFill } from "react-icons/bs";
import "./Card.css";
const Card = ({ imgUrl, deiscount, type }) => {
  return (
    <div className={`cards ${type === "Categories" ? "Categories" : null} `}>
      <div className="card-image">
        <img src={imgUrl} alt="test" />
      </div>
      <div className="card-content">
        <h4>Wooden Horse for Table</h4>
        {type === "Categories" ? (
          <a href="/">shop now</a>
        ) : (
          <div>
            <div className="card-star">
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
              <BsStar />
            </div>
            <span className="card-price">$4500</span>
            <del className="card-discount">{deiscount}</del>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
