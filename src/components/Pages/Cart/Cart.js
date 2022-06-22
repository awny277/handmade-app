import React from "react";
import "./Cart.css";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = ({ userInfo, cartItem }) => {
  const navigate = useNavigate();

  return (
    <div className="main-Header">
      <div className=" container container-cart">
        <h2>shopping bag</h2>
        <div className="carts">
          <div className="cart-section">
            <h3>my shooping bag (2 items)</h3>

            <div className="cart-details">
              <div className="cart-sec01">
                <div className="cart-img">
                  <img
                    src="https://www.shekodog.com/wp-content/uploads/2019/02/Ocean-Spirit.jpg"
                    alt=""
                  />
                </div>

                <div className="cart-check">
                  <div className="check-01">
                    <p>ticog bag ocean spirit</p>
                    <span>EGP329.00</span>
                  </div>
                  <div className="cart-num">
                    <button type="">
                      <FaMinus className="icon-cartNum" />
                    </button>
                    <span>1</span>
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

            <div className="cart-details">
              <div className="cart-sec01">
                <div className="cart-img">
                  <img
                    src="https://www.shekodog.com/wp-content/uploads/2019/02/Ocean-Spirit.jpg"
                    alt=""
                  />
                </div>

                <div className="cart-check">
                  <div className="check-01">
                    <p>ticog bag ocean spirit</p>
                    <span>EGP329.00</span>
                  </div>
                  <div className="cart-num">
                    <button type="">
                      <FaMinus className="icon-cartNum" />
                    </button>
                    <span>1</span>
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
          </div>

          <div className="checkout">
            <div className="checkout-01">
              <h4>have a promo code?</h4>
              <div className="check-sec01">
                <div className="input-promo">
                  <input
                    type="text"
                    name=""
                    value=""
                    placeholder="Promo Code"
                  />
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
