import React from "react";
import "./CartProcess.css";
import { FaHome, FaCreditCard } from "react-icons/fa";

const CartProcess = () => {
 
  return (
  <div className="main-header">
    <div className="container container-process">
      <h2>shopping address</h2>


      <div className="cart-process">
        
        <div className="cart-info">
          <h4>address</h4>
          <div className="cart-inputs">

            <div className="input-01">
              <input type="text" name="" id="" placeholder="First Name" />
              <input type="text" name="" id="" placeholder="Last Name" />
            </div>

            <div className="input-02">
              <div></div>
              <input type="tel" name="" id="" placeholder="Phone Number" />
            </div>

            <div className="input-01">
              <input type="text" name="" id="" placeholder="City" />
              <input type="text" name="" id="" placeholder="State (Optinal)" />
            </div>

            <div className="input-04">
              <input type="text" name="" id=""  placeholder="Address Line1: Street,Address,Company Name, C/O"/>
            </div>

            <div className="input-04">
              <input type="text" name="" id=""  placeholder="Address Line2: Apartment,Suite,Unit Building , Floor , Etc(optinal)"/>
            </div>
            
            <div className="input-05">
            <input type="checkbox" name="" id="checked" />
            <label htmlFor="checked">  Make Default</label>
            </div>

            <button>Save</button>

          </div>
        </div>





        <div className="order-summary">


          <div className="summary">
            <h4>order summary</h4>
            <div className="order-price">

              <div className="subtotal summary01">
                <p>subtotal</p>
                <span>EGP858.00</span>
              </div>
              <div className="delivery summary01">
                <p>delivery</p>
                <span>EGP5.00</span>
              </div>
              <div className="total summary01">
                <p>order total</p>
                <span>EGP863.00</span>
              </div>
            </div>
          </div>

          <div className="payment">
            <h4>payment methods</h4>
            <div className="input-06">
            <div className="cash">
            <input type="radio" id="cash" name="paying" value="cash"  >
            </input>
            <label for="cash"> cash on delivery</label>
            </div>
            <FaHome className="icon-01" />
            </div>

            <div className="input-06">
              <div className="credit">
            <input type="radio" id="credit" name="paying" value="credit"  >
            </input>
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
