import React from 'react';
import moment from 'moment';
import '../../../../styles/modal.css';

const ModalFeedback = ({ productData }) => {
  console.log("Reviews: ", productData.reviews);
  console.log("Top Reviews: ", productData.top_reviews);
  return (
    <div className="modal__feedback-wrapper">
      <div className="modal__feedback-header">
        <div className="modal__feedback-title">Customer Reviews</div>
        <div className="modal__feedback-detail">Show More</div>
      </div>
      <div className="Reviews__Review-sc-15po7if-3 kQyWqB">
        <div className="Reviews__ProfileImageLink-sc-15po7if-15 cVGjsI">
          <img alt="Sharon" src="https://graph.facebook.com/664801697672571/picture?width=50&amp;height=50" className="ProfilePicture__ProfileImage-sc-19kphna-0 dAIwiG"/>
        </div>
        <div className="Reviews__CommentContainer-sc-15po7if-4 ktCfUk">
          <div className="Reviews__ReviewHeader-sc-15po7if-2 eYSPOv">
            <div className="Reviews__ReviewName-sc-15po7if-5 gUIURw">Sharon</div>
            <div className="RatingStar__RatingStarsWrapper-sc-8rbfwx-0 dXAPTv">
              <svg viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.142 11.886c-.55.28-.91.027-.806-.567l.642-3.617L.26 5.14c-.445-.42-.307-.83.308-.917l3.754-.528L6.002.405c.275-.54.72-.54.996 0l1.679 3.29 3.754.528c.615.087.754.497.307.917l-2.716 2.562.642 3.617c.105.594-.256.847-.806.567L6.5 10.178l-3.358 1.708z" fill="#2fb7ec"></path>
              </svg>
            </div>
          </div>
          <div className="Reviews__ReviewStatus-sc-15po7if-10 CQPKW">
            <div>USER FLAG</div>
            Joined 2020
            <div className="Reviews__DividerDot-sc-15po7if-11 hMFYky">·</div>
            <div className="Reviews__ReviewStatusNumber-sc-15po7if-12 iNrTDd">33</div>
            reviews
            <div className="Reviews__DividerDot-sc-15po7if-11 hMFYky">·</div>
            <div className="Reviews__ReviewStatusNumber-sc-15po7if-12 iNrTDd">3</div>
            uploads
          </div>
          <div className="Reviews__ReviewComment-sc-15po7if-6 ewsqYD">
            Love them. Keeps our cords organized and in one spot.
          </div>
          <div className="Reviews__ReviewDate-sc-15po7if-7 bYwSGh">about a day ago</div>
        </div>
      </div >
    </div>
  );
}

export default ModalFeedback;