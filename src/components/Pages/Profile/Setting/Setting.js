import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Setting.css";

const Setting = ({ userInfo }) => {
  const [firstname, setFristName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address_1, setAddress_1] = useState("");
  const [address_2, setAddress_2] = useState("");

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
      // fetch("http://127.0.0.1:5000/set_profile", {
      //   mode: "cors",

      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },

      //   body: JSON.stringify({
      //     firstname,
      //     lastname,
      //     phone_number,
      //     city,
      //     state,
      //     address_1,
      //     address_2,
      //   }),
      //   credentials: "include",
      // })
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
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
      <div className=" container-process">
        <div className="cart-process1 ">
          <div className="cart-info">
            <h4>address</h4>
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
                {/* <div></div> */}
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

              {/* <div className="input-05">
                <input type="checkbox" name="" id="checked" />
                <label htmlFor="checked"> Make Default</label>
              </div> */}

              <button onClick={SettingHandeller}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
