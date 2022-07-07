import React, { useEffect, useState } from "react";
import "./Cart.css";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = ({ userInfo, CartProducts }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/get_cart").then((res) => {
      const result = JSON.parse(res.data);
      console.log(result);
      // setCartItems(result);
      // console.log(cartItems);
    });
  }, [cartItems]);
  return (
    <div className="main-Header">
      <div className=" container container-cart">
        <h2>shopping bag</h2>
        <div className="carts">
          <div className="cart-section">
            <h3>my shooping bag ({cartItems.length} items)</h3>
            {CartProducts.map((ele, idx) => {
              return (
                <div className="cart-details" key={idx}>
                  <div className="cart-sec01">
                    <div className="cart-img">
                      <img src={`${ele.img_path}`} alt="" />
                    </div>
                    <div className="cart-check">
                      <div className="check-01">
                        <p>{ele.title}</p>
                        <span>EGP{ele.price}</span>
                      </div>
                      <div className="cart-num">
                        <button type="">
                          <FaMinus className="icon-cartNum" />
                        </button>
                        <span>{ele.count}</span>
                        <button type="">
                          <FaPlus className="icon-cartNum" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="cart-more">
                    <button>
                      {" "}
                      <FaTrashAlt className="icon"></FaTrashAlt>
                    </button>
                    <button type="">Add More And Keep Saving</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="checkout">
            <div className="checkout-01">
              <h4>have a promo code?</h4>
              <div className="check-sec01">
                <div className="input-promo">
                  <input type="text" name="" placeholder="Promo Code" />
                  <button type="">APLLY</button>
                </div>
              </div>
            </div>

            <div className="checkout-02">
              <h4>order summary</h4>
              <div className="check-sec02">
                <div className="subtotal">
                  <p>subtotal</p>
                  <span>EGP858.00</span>
                </div>
                <button
                  type=""
                  onClick={() => {
                    navigate(`/cartProcess`);
                  }}
                >
                  CONTINUE TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
