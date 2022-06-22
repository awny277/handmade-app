import React, { useState } from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SimillerProductCard from "../../Layout/SimillerProductCard/SimillerProductCard";
import "./NewProject.css";
const NewProducts = ({ newProdcuts }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const products = newProdcuts.filter((ele) =>
    ele.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container fluid>
      <div className="newProject-page">
        <h1 className="text-center">here , you'll find all products </h1>
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
        <Row>
          {products.map((ele, idx) => {
            return (
              <Col md={3} key={idx}>
                <SimillerProductCard
                  projectTitle={ele.title}
                  budget={ele.price}
                  projectCategType={ele.category}
                  // projectSubCategType={ele.projectSubCategType}
                  id={ele.id}
                  imgUrl={ele.img_path}
                  // SelectImagePc={ele.SelectImagePc}
                />
                {/* <div className="newProject-page-Contet m-2" key={idx}>
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
                  <p>Description: {ele.projectDetails}</p>
                  <button
                    className="btn"
                    onClick={() => {
                      navigate(`/ProductDetails/${ele.id}`);
                    }}
                  >
                    view
                  </button>
                </div> */}
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
};

export default NewProducts;
