import React from "react";
import "./Setting.css";
const Setting = () => {
  return (
    <div className="main-header">
      <div className=" container-process">
  
        <div className="cart-process1 ">
          
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
        </div>
      </div>
    </div>
    );
  };

export default Setting;
