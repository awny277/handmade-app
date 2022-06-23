import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AdminControl from "./AdminControl/AdminControl";

const Profile = ({ userInfo, sepialOrder, setSpecialOrder }) => {
  return (
    <Container fluid>
      <Row className="justify-content-around">
        <Col xl={3}>
          <AdminControl />
        </Col>
        <Col xl={8}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
