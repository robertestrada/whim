import React from 'react';
// import moment from 'moment';
import '../../../../styles/modal.css';

const ModalReview = ({ review }) => {

  return (
    <div className="modal__review-container">
      <div className="modal__review-profile-wrapper">
        <img alt="Sharon" src={review.user_details.pic_url} className="modal__review-profile-image" />
      </div>
      <div className="modal__review-comment-container">
        <div className="modal__review-comment-header">
          <div className="modal__review-user-name">{review.user_details.first_name}</div>
          <div className="modal__review-stars-wrapper">
            <svg viewBox="0 0 14 13" className="modal__review-star" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.142 11.886c-.55.28-.91.027-.806-.567l.642-3.617L.26 5.14c-.445-.42-.307-.83.308-.917l3.754-.528L6.002.405c.275-.54.72-.54.996 0l1.679 3.29 3.754.528c.615.087.754.497.307.917l-2.716 2.562.642 3.617c.105.594-.256.847-.806.567L6.5 10.178l-3.358 1.708z" fill="#2fb7ec"></path>
            </svg>
          </div>
        </div>
        <div className="modal__review-comment-subheader">
          <span className={`modal__review-comment-flag flag-icon flag-icon-${review.user_details.country.toLowerCase()}`}></span>
            {`Joined ${review.user_details.joined}`}
            <div className="modal__review-comment-divider">·</div>
          <div className="modal__review-comment-number">{review.user_details.review_amount}</div>
            reviews
            {/* <div className="Reviews__DividerDot-sc-15po7if-11 hMFYky">·</div> */}
          {/* <div className="Reviews__ReviewStatusNumber-sc-15po7if-12 iNrTDd">3</div>
            uploads */}
        </div>
        <div className="modal__review-comment">
          {review.comment}
        </div>
        <div className="modal__review-comment-time">about a day ago</div>
      </div>
    </div>
  );
}

export default ModalReview;