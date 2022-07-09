import React, { useEffect, useState } from "react";
import "./ControlPanal.css";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import ImagePath from "../../../../image/nodata.png";
import { FaShoppingBag, FaClock } from "react-icons/fa";
const ControlPanal = ({ getOffer }) => {
  const [result, setResult] = useState({});
  const [offers, setOffers] = useState([]);
  const [userInfoCard, setUserInfoCard] = useState("");
  const [filter, setFilter] = useState(false);
  useEffect(() => {
    const getDate = async () => {
      await axios
        .get(`https://6259ff6a43fda1299a146d28.mockapi.io/specialProdect/5`)
        .then((res) => {
          const product = res.data;
          setResult(product);
          setOffers(product.offer);
          setUserInfoCard(product.user);
        })
        .catch((err) => console.log(err));
    };
    getDate();
  }, []);
  const SelectOffer = () => {
    Swal.fire({
      icon: "success",
      title: "Offer Selected",
      text: "You Select The Best Offer",
    });
    setFilter(true);
  };
  return (
    <div className="main-header">
      <div className="container-process ">
        <div className="control-panel">
          <h4>offers</h4>

          {filter === false ? (
            offers.map((ele, idx) => {
              return (
                <div className="control-process" key={idx}>
                  <div className="control-01">
                    <img
                      src="https://manager.almadarisp.com/user/img/user.png"
                      alt=""
                    />
                    <p>{ele.userOffer}</p>
                    <span>
                      <FaShoppingBag /> Seller
                    </span>
                  </div>

                  <div className="control-02">
                    <p>Bird Nest</p>
                    <span>
                      <FaClock /> {moment(ele.time).fromNow()}
                    </span>
                  </div>

                  <div className="control-03">
                    <p>budget</p>
                    <span className="special-span">EGP{ele.OfferValue}</span>
                  </div>

                  <div className="control-04">
                    <p>days</p>
                    <span className="special-span">{ele.ExpectedTime}</span>
                  </div>

                  <div className="control-05">
                    <button onClick={SelectOffer}>accept &#10003;</button>
                    <button>cancel &#10005;</button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="ImageNodata">
              <h1>No Offers Yet!</h1>
              <div className="ImageDiv">
                <img src={ImagePath} alt="NoData" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlPanal;
