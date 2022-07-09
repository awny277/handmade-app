import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AddOfferPage.css";
import { FaShoppingBag, FaClock, FaMapPin } from "react-icons/fa";
import Swal from "sweetalert2";
import moment from "moment";

const SpecialProductDetailsPage = ({ getAllOffers }) => {
  const [result, setResult] = useState({});
  const params = useParams();
  const [sendBudget, setSendBudget] = useState("");
  const [sendDelivarDays, setSendDelivarDays] = useState("");
  const [sendOfferDetails, setSendOfferDetails] = useState("");
  const [offers, setOffers] = useState([]);
  const [userInfoCard, setUserInfoCard] = useState("");

  const id = params.id;
  useEffect(() => {
    const getDate = async () => {
      await axios
        .get(`https://6259ff6a43fda1299a146d28.mockapi.io/specialProdect/${id}`)
        .then((res) => {
          const product = res.data;
          setResult(product);
          setOffers(product.offer);
          setUserInfoCard(product.user);
        })
        .catch((err) => console.log(err));
    };
    getDate();
  }, [id]);

  const Reset = () => {
    setSendBudget("");
    setSendDelivarDays("");
    setSendOfferDetails("");
  };

  const formSubmit = (e) => {
    const validateAcountOffer = offers.filter(
      (ele) => ele.accountUserOffer === window.localStorage.getItem("email")
    );
    console.log(validateAcountOffer.length);
    if (localStorage.getItem("isOline") === "false") {
      e.preventDefault();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "You must log in.",
      });
    } else if (
      sendBudget.length === 0 ||
      sendDelivarDays.length === 0 ||
      sendOfferDetails.length === 0
    ) {
      e.preventDefault();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "All fields must be completed.",
      });
    } else if (validateAcountOffer.length >= 1) {
      e.preventDefault();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "error",
        title: "you just add offer",
      });
    } else {
      const data = [
        {
          id: new Date(),
          time: new Date(),
          ExpectedTime: sendDelivarDays,
          OfferValue: sendBudget,
          OfferDetails: sendOfferDetails,
          userOffer: window.localStorage.getItem("userName"),
          accountUserOffer: window.localStorage.getItem("email"),
        },
      ];
      const offer = result.offer.concat(data);
      axios
        .put(
          `https://6259ff6a43fda1299a146d28.mockapi.io/specialProdect/${id}`,
          { offer }
        )
        .then(() => {
          setOffers(offer);
          getAllOffers(offer);
        });
      Reset();
    }
  };
  return (
    <div className="header">
      <div className="container-sec">
        <div className="main-address">
          <h1>{result.projectTitle}</h1>
        </div>
      </div>

      <div className="main-sections">
        <div className="section-details">
          <div className="offer-details">
            <div className="offer-sections">
              <div className="sec01 sec">
                <h5>project details</h5>
                <hr />
                <p>{result.projectDetails}</p>
              </div>
              <div className="sec02 sec">
                <h5>add your offer</h5>
                <hr />
                <form>
                  <div className="inputs">
                    <div className="inp01">
                      <label htmlFor="">expected time</label>
                      <br />
                      <input
                        type="number"
                        id="fname"
                        value={sendDelivarDays}
                        onChange={(e) => setSendDelivarDays(e.target.value)}
                      />
                    </div>
                    {/* <span className="span01">days</span> */}

                    <div className="inp01">
                      <label htmlFor="">offer value</label>
                      <br />
                      <input
                        type="number"
                        id="fname"
                        value={sendBudget}
                        onChange={(e) => setSendBudget(e.target.value)}
                      />
                    </div>
                    {/* <span className="span02">&#36;</span> */}
                  </div>

                  <label htmlFor="">offer details</label>
                  <br />
                  <textarea
                    name=""
                    id=""
                    cols="83"
                    rows="8"
                    value={sendOfferDetails}
                    onChange={(e) => setSendOfferDetails(e.target.value)}
                  ></textarea>
                  <br />

                  <button>
                    <FaMapPin /> add items..
                  </button>

                  <div className="add-offer">
                    <div className="lists">
                      <ul>
                        <li>do not use external means of communication</li>
                        <li>
                          do not put external links , take care of{" "}
                          <span>your gallery</span> instead
                        </li>
                        <li>
                          {" "}
                          <span>
                            read here how to add a special offer to any project
                          </span>{" "}
                        </li>
                      </ul>
                    </div>
                    <div className="add-btn"></div>
                  </div>
                </form>
                <button onClick={formSubmit} id="offer-btn">
                  add offer
                </button>
              </div>
              {offers.length > 0 && (
                <div className="sec03 sec">
                  <h5>offers made</h5>
                  <hr />
                  {offers.map((ele, idx) => {
                    return (
                      <div className="offer-desc" key={idx}>
                        <div className="offer-detail">
                          <div className="img">
                            <img
                              src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png"
                              alt=""
                            />
                          </div>
                          <div className="design-detail">
                            <h5>{ele.userOffer}</h5>
                            <div className="design-icons">
                              <div className="icon01">
                                <FaShoppingBag /> specialization
                              </div>
                              <div className="icon02">
                                <FaClock /> {moment(ele.time).fromNow()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p>{ele.OfferDetails}</p>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="cards00">
            <div className="card01">
              <h5>project card</h5>
              <hr />
              <div className="detailss">
                <div className="details01">
                  <p>date of publication</p>
                  <p>budget</p>
                  <p>execution time </p>
                  <p>number of offers</p>
                </div>
                <div className="details02">
                  <p> {moment(result.time).fromNow()}</p>
                  <p>{result.budget} EGP</p>
                  <p> {result.delivarDays} day</p>
                  <p>{offers.length}</p>
                </div>
              </div>
              <hr />
              <div className="owner-section">
                <h4>the owner</h4>
                <div className="owner-desc">
                  <div className="img">
                    <img
                      src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_960_720.png"
                      alt=""
                    />
                  </div>
                  <div className="owner-details">
                    <h5>{userInfoCard.userName}</h5>
                    <p>
                      {" "}
                      <FaShoppingBag /> specialization{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProductDetailsPage;
