import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import moment from "moment";
import "./specialProductPage.css";

// IoIosAdd
const SpecialProductPage = (props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="newProject-page">
        <h1 className="text-center">here , you'll find all special orders </h1>
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
      </div>
    </Container>
  );
};

export default SpecialProductPage;