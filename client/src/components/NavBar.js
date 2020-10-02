import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import '../styles/navBar.css';
import { useDispatch } from 'react-redux'
import * as AuthActions from '../actions/authentication';

function NavBar({ panelType }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const profilePicUrl = useSelector((state) => state.authentication.user.pic_url);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(AuthActions.logout());
    history.push('/')
  }

  return (
    <div className="navbar">
      <div className="navbar__logo-wrapper">
        <Link to="/"><img className="navbar__logo" src="https://whim-bucket.s3-us-west-1.amazonaws.com/whim-assets/whim-logo.svg" alt="" /></Link>
      </div>
      { panelType === 'feed' ? 
        <div className="navbar__options">
          <div className="navbar__profile-wrapper">
            <button className="navbar__logout" onClick={handleSubmit}>
              <img
                src={profilePicUrl}
                alt={""}
                className={`smooth-image-profile image-${imageLoaded ? 'visible' : 'hidden'
                  }`}
                onLoad={() => setImageLoaded(true)}
              />
            </button>
          </div>
        </div>
      : null
      }
    </div>
  );
}
export default NavBar;
