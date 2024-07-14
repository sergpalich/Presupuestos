import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";

const HeaderBanner = () => {
  let [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="wrapper">
      <div className="bannerTop">
        
      </div>
      <FaCartPlus onClick={()=>setCartOpen(cartOpen =!cartOpen)}  className={`shop-cart-icon ${cartOpen && `active`}`}/>
      {cartOpen && (
          <div className="cart-content"></div>
        )}
      
    </div>
  
  );
};

export default HeaderBanner;
