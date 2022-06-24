import React from "react";
import "./ControlPanal.css";
import { FaShoppingBag ,FaClock } from "react-icons/fa";
const ControlPanal = () => {
  return (
    <div className="main-header">
      <div className="container-process ">
        <div className="control-panel">
          <h4>offers</h4>          
          <div className="control-process">

            <div className="control-01">
              <img src="https://manager.almadarisp.com/user/img/user.png" alt="" />
              <p>designer name</p>
              <span><FaShoppingBag /> specialization</span>
            </div>


            <div className="control-02">
              <p>project name</p>
              <span><FaClock /> 0 min ago</span>
            </div>


            <div className="control-03">
              <p>budget</p>
              <span className="special-span">EGP830</span>
            </div>


            <div className="control-04">
              <p>days</p>
              <span className="special-span">4</span>
            </div>


            <div className="control-05">
              <button>accept &#10003;</button>
              <button>cancel &#10005;</button>
            </div>


          </div>

          <div className="control-process">

<div className="control-01">
  <img src="https://manager.almadarisp.com/user/img/user.png" alt="" />
  <p>designer name</p>
  <span><FaShoppingBag /> specialization</span>
</div>


<div className="control-02">
  <p>project name</p>
  <span><FaClock /> 0 min ago</span>
</div>


<div className="control-03">
  <p>budget</p>
  <span className="special-span">EGP830</span>
</div>


<div className="control-04">
  <p>days</p>
  <span className="special-span">4</span>
</div>


<div className="control-05">
  <button>accept &#10003;</button>
  <button>cancel &#10005;</button>
</div>


</div>

<div className="control-process">

<div className="control-01">
  <img src="https://manager.almadarisp.com/user/img/user.png" alt="" />
  <p>designer name</p>
  <span><FaShoppingBag /> specialization</span>
</div>


<div className="control-02">
  <p>project name</p>
  <span><FaClock /> 0 min ago</span>
</div>


<div className="control-03">
  <p>budget</p>
  <span className="special-span">EGP830</span>
</div>


<div className="control-04">
  <p>days</p>
  <span className="special-span">4</span>
</div>


<div className="control-05">
  <button>accept &#10003;</button>
  <button>cancel &#10005;</button>
</div>


</div>
        </div>
      </div>
    </div>
  )
};

export default ControlPanal;
