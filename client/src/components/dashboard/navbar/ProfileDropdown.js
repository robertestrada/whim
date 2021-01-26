import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../../styles/profileDropdown.css';
import * as AuthActions from '../../../actions/authentication';

const ProfileDropdown = ({ setPanelType }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.authentication.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(AuthActions.logout());
    history.push('/')
  };

  const handleCartClick = () => {
    setPanelType('cart');
  };


  return (
    <div className="profile-dropdown__container">
      <div className="profile-dropdown__HeaderDropdownArrowUpWrapper">
        <div className="profile-dropdown__DropdownArrowUpWrapper">
          <div className="profile-dropdown__dropdown-arrow-up"></div>
        </div>
      </div>
      <div className="profile-dropdown__profile-link-container">
        {/* <img 
          alt={user.first_name} 
          src={user.pic_url} 
          style="margin: 0px 8px 0px 0px;" 
          className="ProfilePicture__ProfileImage-sc-19kphna-0 cMNWX"
        /> */}
        <div className="profile-dropdown__profile-info-container">
          <div className="profile-dropdown__name">{user.first_name}</div>
          View Profile
        </div>
        <svg viewBox="0 0 6 10" className="profile-dropdown__ProfileArrow-sc-9fj3k2-9 juMHDo">
          <g fill="none" fillRule="evenodd">
            <path d="M-5 13V-3h16v16z"></path>
            <path d="M0 8.75C0 9.438.54 10 1.2 10c.336 0 .636-.138.852-.362l3.6-3.75C5.868 5.663 6 5.35 6 5s-.132-.662-.348-.887l-3.6-3.75A1.172 1.172 0 001.2 0C.54 0 0 .563 0 1.25v7.5z" fill="#192A32"></path>
          </g>
        </svg>
      </div>
      <div className="profile-dropdown__DropdownLink-sc-9fj3k2-6-Component ikTzlf">
        {/* <svg viewBox="0 0 21 19" style="width: 21px; height: 18px; color: rgb(25, 42, 50); margin: 0px 16px 0px 0px;">
          <path d="M15.25 0C18.496 0 21 2.51 21 5.781c0 1.046-.26 2.053-.772 3.068-.677 1.341-1.751 2.663-3.544 4.477-.611.619-4.287 4.176-5.472 5.376-.1879198.190548-.4443764.2978205-.712.2978205-.2676236 0-.52408017-.1072725-.712-.2978205-1.185-1.2-4.86-4.757-5.472-5.376C2.523 11.512 1.45 10.19.772 8.849.261 7.834 0 6.827 0 5.78 0 2.511 2.504 0 5.75 0c1.831 0 3.606.88 4.75 2.251C11.643.88 13.417 0 15.25 0z" fill="#192a32" fillRule="nonzero"></path>
        </svg> */}
        Wishlist
      </div>
      <div className="profile-dropdown__DropdownLink-sc-9fj3k2-6-Component ikTzlf" onClick={handleCartClick}>
        {/* <svg viewBox="0 0 21 17" xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 17px; margin: 12px 16px 12px 0px;">
          <g fill="none" fillRule="evenodd">
            <g transform="translate(.56 .52)" fill="#192a32">
              <ellipse cx="14.753" cy="14.813" rx="1.366" ry="1.285"></ellipse>
              <ellipse cx="6.674" cy="14.813" rx="1.366" ry="1.285"></ellipse>
              <path d="M1.113 1.873h-.28a.832.832 0 0 1 0-1.665h2.83a1 1 0 0 1 .779.373l1.41 1.752a1 1 0 0 0 .779.373h12.106a1 1 0 0 1 .978 1.207l-1.365 6.422a1 1 0 0 1-.854.784L5.797 12.587a1 1 0 0 1-1.09-.736L2.508 3.583 2.03 2.476a1 1 0 0 0-.917-.603z"></path>
            </g>
            <path d="M0-2h21v21H0z"></path>
          </g>
        </svg> */}
        Shopping Cart
      </div>
      <div className="profile-dropdown__DropdownLink-sc-9fj3k2-6 eaTYMB">
        {/* <svg viewBox="0 0 14 16" style="width: 18px; height: 20px; margin: 12px 16px 12px 0px;">
          <g fill="none" fillRule="evenodd">
            <path d="M11.4827124 11.7438317H2.49423745v-1.4992743h8.98847495v1.4992743zm0-2.99854864H2.49423745V7.24600875h8.98847495v1.49927431zm0-2.99854863H2.49423745V4.24746011h8.98847495v1.49927432zM.24711873 15.4920175l1.12355936-1.1244557 1.12355936 1.1244557 1.12355937-1.1244557 1.12355936 1.1244557 1.12355937-1.1244557 1.12355936 1.1244557 1.12355939-1.1244557 1.1235593 1.1244557 1.1235594-1.1244557 1.1235594 1.1244557 1.1235593-1.1244557 1.1235594 1.1244557V.49927432l-1.1235594 1.12445574L11.4827124.49927432 10.359153 1.62373006 9.2355936.49927432 8.1120343 1.62373006 6.98847491.49927432 5.86491555 1.62373006 4.74135618.49927432 3.61779682 1.62373006 2.49423745.49927432 1.37067809 1.62373006.24711873.49927432V15.4920175z" fill="#192a32"></path>
            <path d="M-2-1h17.9769498v17.9912918H-2z"></path>
          </g>
        </svg> */}
        Order History
      </div>
      <div className="profile-dropdown__SectionBreak-sc-9fj3k2-12 ZVPEs"/>
      <div className="profile-dropdown__DropdownLink-sc-9fj3k2-6-Component bXxOGr">
        Hire the Developer
      </div>
      <div className="profile-dropdown__DropdownLink-sc-9fj3k2-6 kTXA-DV" onClick={handleSubmit}>
        Logout
      </div>
    </div>
  );
}
export default ProfileDropdown;
