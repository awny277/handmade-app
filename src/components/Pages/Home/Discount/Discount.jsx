import React from "react";
import Animation from "../../../Layout/Animation/Animation";
const Discount = () => {
  return (
    <div className="spacial-section Home-discount text-center">
      <div className=" content">
        <Animation>
          <h2>Discount for all orders over $100</h2>
          <h3>We're at 71% of our goal!</h3>
          <p>That’s $56,715.00 USD pledged of our $79,600.00 USD target!</p>
          <a href="/"> view more</a>
        </Animation>
      </div>
    </div>
  );
};

export default Discount;
