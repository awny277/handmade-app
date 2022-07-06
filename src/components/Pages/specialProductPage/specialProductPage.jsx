import React, { useEffect, useState } from "react";
import axios from "axios";

import { Col, Container, Row, FloatingLabel, Form } from "react-bootstrap";
import HeaderImage from "../../../image/slide2.jpg";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import moment from "moment";
import "./specialProductPage.css";

// IoIosAdd
const SpecialProductPage = (props) => {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  useEffect(() => {
    // /special_orders"
    axios.get("http://127.0.0.1:5000//special_orders").then((res) => {
      const Final = res.data;
      setResult(Final);
    });
  }, []);
  return (
    <div>
      <div className="Header-Container">
        <img src={HeaderImage} alt="slider" />
        <div className="Header-Content">
          <h1 className="text-center">
            here , you'll find all special orders{" "}
          </h1>
        </div>
      </div>
      <Container>
        <div className="newProject-page">
          <Row>
            {props.sepialOrder.map((ele, idx) => {
              return (
                <Col md={6} key={idx}>
                  <div className="newProject-page-Contet m-2" key={idx}>
                    <h3>{ele.projectTitle}</h3>
                    <div className="CategTypetype">
                      <h4>
                        type: <span>{ele.projectCategType}</span>
                      </h4>
                      {ele.projectSubCategType !== "" && (
                        <h5>
                          subtype: <span>{ele.projectSubCategType}</span>
                        </h5>
                      )}
                    </div>
                    <span>budget: {ele.budget}</span>
                    <span>DelivarDays: {ele.delivarDays}</span>
                    <span>{moment(ele.time).fromNow()}</span>
                    <p>Description: {ele.projectDetails}</p>
                    <button
                      className="btn"
                      onClick={() => {
                        navigate(`/specialProductDetailsPage/${ele.id}`);
                      }}
                    >
                      add your offer <IoIosAdd />
                    </button>
                  </div>
                </Col>
              );
            })}
          </Row>
          <Row>
            {result.map((ele, idx) => {
              return (
                <Col md={6} key={idx}>
                  <div className="newProject-page-Contet m-2" key={idx}>
                    <h3>{ele.title}</h3>
                    <div className="CategTypetype">
                      <h4>
                        type: <span>{ele.category}</span>
                      </h4>
                      {ele.category !== "" && (
                        <h5>
                          subtype: <span>{ele.sub_category}</span>
                        </h5>
                      )}
                    </div>
                    <span>budget: {ele.expected_budget}</span>
                    <span>DelivarDays: {ele.est_delivery_time}</span>
                    {/* <span>{moment(ele.time).fromNow()}</span> */}
                    <p>Description: {ele.description}</p>
                    <button
                      className="btn"
                      onClick={() => {
                        navigate(`/specialProductDetailsPage/${ele.id}`);
                      }}
                    >
                      add your offer <IoIosAdd />
                    </button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SpecialProductPage;
