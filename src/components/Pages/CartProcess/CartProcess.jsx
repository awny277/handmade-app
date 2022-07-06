import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./CartProcess.css";
import { FaHome, FaCreditCard } from "react-icons/fa";

const CartProcess = ({ TotalPrice }) => {
  const [firstname, setFristName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address_1, setAddress_1] = useState("");
  const [address_2, setAddress_2] = useState("");
  const [userData, setUserData] = useState([]);

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:5000/user_details").then((res) => {
  //     const result = res.data;
  //     setUserData(result);
  //   });
  // }, []);

  const SettingHandeller = (e) => {
    if (
      firstname.length === 0 ||
      lastname.length === 0 ||
      phone_number.length === 0 ||
      city.length === 0 ||
      state.length === 0 ||
      address_1.length === 0 ||
      address_2.length === 0
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
    } else {
      axios
        .post("http://127.0.0.1:5000/set_profile", {
          firstname,
          lastname,
          phone_number,
          city,
          state,
          address_1,
          address_2,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="main-header">
      <div className="container container-process">
        <h2>shopping address</h2>
        <div className="cart-process">
          <div className="cart-info">
            <h4>address</h4>
            <div className="update-address">
              <div className="address-details">
                <h4>Main address</h4>
                <p>addesss in details like 104ST line 4 debartment 04</p>
                <span>Phone number </span>
              </div>
              <button>Update</button>
            </div>
            <div className="cart-inputs">
              <div className="input-01">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFristName(e.target.value)}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className=" input-02">
                <input
                  type="number"
                  name=""
                  id=""
                  placeholder="Phone Number"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                />
              </div>

              <div className="input-01">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="State (Optinal)"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              <div className="input-04">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Address Line1: Street,Address,Company Name, C/O"
                  value={address_1}
                  onChange={(e) => setAddress_1(e.target.value)}
                />
              </div>

              <div className="input-04">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Address Line2: Apartment,Suite,Unit Building , Floor , Etc(optinal)"
                  value={address_2}
                  onChange={(e) => setAddress_2(e.target.value)}
                />
              </div>

              <button onClick={SettingHandeller}>Save</button>
            </div>
          </div>

          <div className="order-summary">
            <div className="summary">
              <h4>order summary</h4>
              <div className="order-price">
                <div className="subtotal summary01">
                  <p>subtotal</p>
                  <span>EGP{TotalPrice}</span>
                </div>
                <div className="delivery summary01">
                  <p>delivery</p>
                  <span>EGP5.00</span>
                </div>
                <div className="total summary01">
                  <p>order total</p>
                  <span>EGP{TotalPrice + 5}</span>
                </div>
              </div>
            </div>

            <div className="payment">
              <h4>payment methods</h4>
              <div className="input-06">
                <div className="cash">
                  <input
                    type="radio"
                    id="cash"
                    name="paying"
                    value="cash"
                  ></input>
                  <label for="cash"> cash on delivery</label>
                </div>
                <FaHome className="icon-01" />
              </div>

              <div className="input-06">
                <div className="credit">
                  <input
                    type="radio"
                    id="credit"
                    name="paying"
                    value="credit"
                  ></input>
                  <label for="credit"> credit / debit card</label>
                </div>
                <FaCreditCard className="icon-02" />
              </div>
            </div>
            <button>Payment Methods</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProcess;
