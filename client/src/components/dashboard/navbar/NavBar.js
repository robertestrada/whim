import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import '../../../styles/navBar.css';
import Search from './Search';
import ProfileDropdown from './ProfileDropdown';

const NavBar = ({ handleTabChange, setTagTerm, setSubmittedSearchFilters, 
                  setPageData, setViewSwitch, setAllowSearch, searchTerm, 
                  setSearchTerm, panelType, setPanelType, lastSearchTerm, setLastSearchTerm 
                }) => {

  const profilePicUrl = useSelector((state) => state.authentication.user.pic_url);
  const cartItems = useSelector(state => Object.values(state.cart.items));
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showProfileDrop, setShowProfileDrop] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    document.body.addEventListener("mouseover", e => {
      if (ref.current){
        if (ref.current.contains(e.target)) {
          setShowProfileDrop(true);
        } else if (!ref.current.contains(e.target)) {
          setShowProfileDrop(false)
        }
      }
    });
  }, [])

  const handleProfileReveal = async (e) => {
    e.preventDefault();
    if (showProfileDrop){
      setShowProfileDrop(false);
    } else {
      setShowProfileDrop(true);
    }
  };

  const handleCartClick = () => {
    setPanelType('cart');
  };


  return (
    <div className="navbar">
      <div className="navbar__logo-wrapper" onClick={() => handleTabChange('popular')}>
        <img className="navbar__logo" src="https://whim-bucket.s3-us-west-1.amazonaws.com/whim-assets/whim-logo.svg" alt="" />
      </div>
      <div className={panelType === 'feed' ? "navbar__options" : "navbar__options navbar-hidden"}>
        <Search setTagTerm={setTagTerm} 
          setSubmittedSearchFilters={setSubmittedSearchFilters} 
          setPageData={setPageData} 
          setViewSwitch={setViewSwitch} 
          setAllowSearch={setAllowSearch} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          lastSearchTerm={lastSearchTerm} 
          setLastSearchTerm={setLastSearchTerm}
        />
        <div className="navbar__profile-wrapper"onClick={handleProfileReveal} ref={ref}>
          <div className="navbar__profile">
            <img
              src={profilePicUrl}
              alt={""}
              className={`smooth-image-profile image-${imageLoaded ? 'visible' : 'hidden'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          { showProfileDrop 
            ? <ProfileDropdown setPanelType={setPanelType} setShowProfileDrop={setShowProfileDrop}/> 
            : null 
          }
        </div>
        <div className="navbar__cart-wrapper" onClick={handleCartClick}>
          <svg className="navbar__cart-svg" viewBox="0 0 21 17" >
            <g fill="none" fillRule="evenodd">
              <g transform="translate(.56 .52)" fill="#192a32">
                <ellipse cx="14.753" cy="14.813" rx="1.366" ry="1.285"></ellipse>
                <ellipse cx="6.674" cy="14.813" rx="1.366" ry="1.285"></ellipse>
                <path d="M1.113 1.873h-.28a.832.832 0 0 1 0-1.665h2.83a1 1 0 0 1 .779.373l1.41 1.752a1 1 0 0 0 .779.373h12.106a1 1 0 0 1 .978 1.207l-1.365 6.422a1 1 0 0 1-.854.784L5.797 12.587a1 1 0 0 1-1.09-.736L2.508 3.583 2.03 2.476a1 1 0 0 0-.917-.603z"></path>
              </g>
              <path d="M0-2h21v21H0z"></path>
            </g>
          </svg>
          {cartItems.length > 0 ? <span className="navbar__cart-count">{cartItems.length}</span> : null}
        </div>
      </div>
    </div>
  );
}
export default NavBar;
