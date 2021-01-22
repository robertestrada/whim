import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SideCart from './SideCart';
import SideReferral from './SideReferral';
import '../../../styles/sideCart.css';


const SideBanner = ({ setPanelType }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cartItems = useSelector(state => Object.values(state.cart.items));
  useEffect(() => { }, [cartItems]);

  return (
    <div className="sidecart__wrapper">
      {cartItems.length > 0 
        ? <SideCart 
            setPanelType={setPanelType}
            cartItems={cartItems} 
            imageLoaded={imageLoaded} 
            setImageLoaded={setImageLoaded}/> 
        : <SideReferral/>}
    </div>
  );
}

export default SideBanner;