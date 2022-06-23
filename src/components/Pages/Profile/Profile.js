import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes, Outlet } from "react-router-dom";
import AdminControl from "./AdminControl/AdminControl";

<<<<<<< HEAD
const Profile = () => {
=======
const Profile = ({ userInfo, sepialOrder, setSpecialOrder }) => {
>>>>>>> a8a6042c169b4cbb9d9cdfa6a4131b8a323043db
  return (
    <Container fluid>
      <Row className="justify-content-around">
        <Col xl={3}>
          <AdminControl />
        </Col>
        <Col xl={8}>
          <Outlet />
          {/* <Routes>
            <Route path="/profile/test" element={<TesrPage />} />
          <Route
              path="/profile/dashBoard"
              element={
                <DashBoard
                  userInfo={userInfo}
                  sepialOrder={sepialOrder}
                  setSpecialOrder={(data) => setSpecialOrder(data)}
                />
              }
            /> 
          </Routes> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
