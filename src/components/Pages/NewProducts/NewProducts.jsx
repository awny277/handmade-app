import React, { useState } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SimillerProductCard from "../../Layout/SimillerProductCard/SimillerProductCard";
import HeaderImage from "../../../image/slide2.jpg";
import "./NewProject.css";
const NewProducts = ({ newProdcuts }) => {
  const [search, setSearch] = useState("");
  const products = newProdcuts.filter((ele) =>
    ele.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ProductsPage">
      <div className="Header-Container">
        <img src={HeaderImage} alt="slider" />
        <div className="Header-Content">
          <h1 className="text-center">FIND YOUR PRODUCT</h1>
          <Container fluid>
            <Row className="searchInput">
              <Col xs={12} md={7}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Search For Product "
                  className="text-center"
                >
                  <Form.Control
                    type="search"
                    placeholder="Enter Product Name"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Find the best products for the best price.
                  </Form.Text>
                </FloatingLabel>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Container fluid>
        <div className="newProject-page">
          {/* <h1 className="text-center">here , you'll find all products </h1> */}
          {/* <Row className="searchInput">
            <Col xs={12} md={7}>
              <FloatingLabel
                controlId="floatingInput"
                label="Search For Product "
                className="text-center"
              >
                <Form.Control
                  type="search"
                  placeholder="Enter Product Name"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Find the best products for the best price.
                </Form.Text>
              </FloatingLabel>
            </Col>
          </Row> */}
          <Row>
            <Col md={2}>
              <div></div>
            </Col>
            <Col md={10}>
              <Row>
                {products.map((ele, idx) => {
                  return (
                    <Col md={3} sm={6} key={idx}>
                      <SimillerProductCard
                        projectTitle={ele.title}
                        budget={ele.price}
                        projectCategType={ele.category}
                        id={ele.id}
                        imgUrl={ele.img_path}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default NewProducts;
