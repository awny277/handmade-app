import React from "react";
import SellerDashBoard from "./SellerDashBoard/SellerDashBoard";
import UserdashBoard from "./UserdashBoard/UserdashBoard";
import "./DashBoard.css";

const DashBoard = ({ sepialOrder, setSpecialOrder, userInfo }) => {
  return (
    <React.Fragment>
      {window.localStorage.getItem("type") === "seller" ? (
        <SellerDashBoard
          sepialOrder={sepialOrder}
          setSpecialOrder={setSpecialOrder}
          userInfo={userInfo}
        />
      ) : (
        <UserdashBoard
          sepialOrder={sepialOrder}
          setSpecialOrder={setSpecialOrder}
          userInfo={userInfo}
        />
      )}
    </React.Fragment>
  );
};

export default DashBoard;
