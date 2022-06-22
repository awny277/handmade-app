import React, { useState } from "react";
import { BsStar, BsFillStarFill } from "react-icons/bs";
import "./SimillerProducts.css";
import { useNavigate } from "react-router-dom";
import "../Card/Card.css";
const SimillerProductCard = ({
  projectTitle,
  budget,
  projectCategType,
  projectSubCategType,
  id,
  imgUrl,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`cards productCards `}
      onClick={() => {
        navigate(`/ProductDetails/${id}`);
      }}
    >
      <div className="card-image">
        <img src={`${imgUrl}`} alt="test" />
      </div>
      <div className="card-content">
        <h4>{projectTitle}</h4>
        <div>
          <span>{projectCategType}</span>
          <span>{projectSubCategType}</span>
        </div>
        <div>
          {/* <div className="card-star">
            <BsFillStarFill />
            <BsFillStarFill />
            <BsFillStarFill />
            <BsFillStarFill />
            <BsStar />
          </div> */}
          <span className="card-price">{budget} EGP</span>
        </div>
      </div>
    </div>
  );
};

export default SimillerProductCard;
