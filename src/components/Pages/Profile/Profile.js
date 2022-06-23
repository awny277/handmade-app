import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AdminControl from "./AdminControl/AdminControl";

const Profile = () => {
  return (
    <Container fluid>
      <Row>
        <Col xl={3}>
          <AdminControl />
        </Col>
        <Col>asdasd</Col>
      </Row>
    </Container>
  );
};

export default Profile;
