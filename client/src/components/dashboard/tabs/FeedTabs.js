import React from 'react';
import '../../../styles/feed.css';


const FeedTabs = ({ pageData, handleTabChange, setCatShow, handleCategoryClick }) => {
  return (
      <div className="feed__tabs">
        <div className="feed__top-features">Top Features</div>
        <button className={pageData.tab === "popular" ? "pressed" : ""} onClick={() => handleTabChange("popular")}>
          <svg className="feed__sidebar-icon" viewBox="0 0 17 17">
            <path d="M11.044 5.588c6.307.633 6.326.672 1.577 5.064 1.375 6.405 1.283 6.482-4.126 3.126-5.408 3.356-5.482 3.28-4.107-3.126-4.767-4.392-4.73-4.43 1.559-5.064 2.548-6.117 2.567-6.117 5.097 0z" stroke="#C0952B" fill="#FFD560" fillRule="evenodd"></path>
          </svg>
          <div className="feed__sidebar-label">Popular</div>
        </button>
        <button className={pageData.tab === "express" ? "pressed" : ""} onClick={() => handleTabChange("express")}>
          <svg className="feed__sidebar-icon" viewBox="0 0 24 17" >
            <path d="M20.809 7.875c.482.284.822.836.891 1.503V10.6c0 .925-.748 1.677-1.65 1.677h-.673a3.188 3.188 0 0 1-2.891 1.863c-1.248 0-2.369-.754-2.89-1.863h-2.6a3.188 3.188 0 0 1-2.892 1.863c-1.248 0-2.368-.754-2.89-1.863h-.505c-.92 0-1.65-.769-1.65-1.677V9.378c0-.107.009-.212.028-.314a1.378 1.378 0 0 1-.937-1.305c0-.627.418-1.149 1-1.316H2.18A1.368 1.368 0 0 1 .825 5.071c0-.616.41-1.146.972-1.315H.653A1.368 1.368 0 0 1-.7 2.384c0-.75.606-1.372 1.353-1.372h2.67C3.606.039 4.287-.7 5.269-.7h8.63c.765 0 1.45.362 1.887.97a.794.794 0 0 1 .067.095l.06.061.924 2.98 1.638.14c1.283 0 2.334 1.082 2.334 2.38v1.949zm-6.154-6.78l.005.007.009.01a.506.506 0 0 1-.017-.025l.002.006v.001zm.014.018l.064.077a.62.62 0 0 1-.064-.077zM8.044 11.366c.297 0 .563-.274.578-.614 0-.35-.256-.613-.578-.613-.309 0-.577.28-.577.613 0 .338.273.614.577.614zm8.382 0c.322 0 .577-.263.577-.614 0-.338-.272-.613-.577-.613-.309 0-.577.28-.577.613 0 .338.272.614.577.614z" fill="#FBBA7B" translate="translate(1.6 6)" stroke="#BC7633" strokeWidth="1.4"></path>
            <circle fill="#FBBA7B" cx="7.98" cy="10.5" r="2.1"></circle>
            <circle fill="#FBBA7B" cx="16.38" cy="10.5" r="2.1"></circle>
          </svg>
          <div className="feed__sidebar-label">Express</div>
        </button>
      <button onMouseEnter={() => setCatShow(true)} onMouseLeave={() => setCatShow(false)} onClick={() => handleCategoryClick()}>
          <svg className="feed__sidebar-icon" viewBox="0 0 24 24">
            <g id="Icons/Main/ic_grid_24" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Group-14-Copy">
                <rect id="Rectangle-4" x="0" y="0" width="24" height="24"></rect>
                <g id="Group" transform="translate(2.000000, 2.000000)" fill="#79D6FA" stroke="#006BA0" strokeWidth="1.4">
                  <rect id="Rectangle-5" x="0.7" y="0.7" width="7.6" height="7.6" rx="1.4"></rect>
                  <rect id="Rectangle-5-Copy-2" x="11.7" y="0.7" width="7.6" height="7.6" rx="1.4"></rect>
                  <rect id="Rectangle-5-Copy-3" x="11.7" y="11.7" width="7.6" height="7.6" rx="1.4"></rect>
                  <rect id="Rectangle-5-Copy-4" x="0.7" y="11.7" width="7.6" height="7.6" rx="1.4"></rect>
                </g>
              </g>
            </g>
          </svg>
          <div className="feed__sidebar-label">Categories</div>
        </button>
      </div>
  );
}

export default FeedTabs;
