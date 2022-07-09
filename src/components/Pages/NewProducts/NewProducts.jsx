import React, { useEffect, useRef, useState } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SimillerProductCard from "../../Layout/SimillerProductCard/SimillerProductCard";
import HeaderImage from "../../../image/slide2.jpg";
import "./NewProject.css";
const NewProducts = ({ newProdcuts }) => {
  const All = useRef(null);
  const [search, setSearch] = useState("");
  const products = newProdcuts.filter((ele) =>
    ele.title.toLowerCase().includes(search.toLowerCase())
  );
  const [Filtering, setFiltering] = useState([]);

  const FilterDate = (e) => {
    const { name, value } = e.target;
    if (value !== "All") {
      const data = products.filter((ele) => ele.category === value);
      return setFiltering(data);
    } else {
      return setFiltering(products);
    }
  };
  const filterData = Filtering.filter((ele) =>
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
          <Row>
            <Col md={3}>
              <div className="filter-section">
                <h5> filter by material :</h5>
                <div className="input-section">
                  <input
                    ref={All}
                    type="radio"
                    name="type"
                    value="All"
                    id="All"
                    onChange={(e) => FilterDate(e)}
                  />
                  <label htmlFor="All">All</label>
                </div>
                <div className="input-section">
                  <input
                    ref={All}
                    type="radio"
                    name="type"
                    value="baskets"
                    id="baskets"
                    onChange={(e) => FilterDate(e)}
                  />
                  <label htmlFor="baskets">baskets</label>
                </div>
                <div className="input-section">
                  <input
                    ref={All}
                    type="radio"
                    name="type"
                    value="mats-rugs"
                    id="mats-rugs"
                    onChange={(e) => FilterDate(e)}
                  />
                  <label htmlFor="mats-rugs">mats-rugs</label>
                </div>
                <div className="input-section">
                  <input
                    ref={All}
                    type="radio"
                    name="type"
                    value="cushions"
                    id="cushions"
                    onChange={(e) => FilterDate(e)}
                  />
                  <label htmlFor="cushions">cushions</label>
                </div>
                <div className="input-section">
                  <input
                    ref={All}
                    type="radio"
                    name="type"
                    value="banquettes-ottomans-pouffes"
                    id="banquettes-ottomans-pouffes"
                    onChange={(e) => FilterDate(e)}
                  />
                  <label htmlFor="banquettes-ottomans-pouffes">
                    banquettes-ottomans-pouffes
                  </label>
                </div>
                <div className="input-section">
                  <input
                    ref={All}
                    type="radio"
                    name="type"
                    value="chairs"
                    id="chairs"
                    onChange={(e) => FilterDate(e)}
                  />
                  <label htmlFor="chairs">chairs</label>
                </div>
                <div className="input-section">
                  <input
                    ref={All}
                    type="radio"
                    name="type"
                    value="bags-clutches"
                    id="bags-clutches"
                    onChange={(e) => FilterDate(e)}
                  />
                  <label htmlFor="bags-clutches">bags-clutches</label>
                </div>
              </div>
            </Col>
            <Col md={9}>
              <Row>
                {Filtering.length === 0
                  ? products.map((ele, idx) => {
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
                    })
                  : filterData.map((ele, idx) => {
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
