import React from 'react';
import ModalReview from './ModalReview';
import '../../../../styles/modal.css';

const ModalFeedback = ({ productData }) => {
  if (!productData.top_reviews){
    return null
  }
  console.log("Reviews: ", productData.reviews);
  console.log("Top Reviews: ", productData.top_reviews);
  return (
    <div className="modal__feedback-wrapper">
      <div className="modal__feedback-header">
        <h2 className="modal__feedback-title">Customer Reviews</h2>
        <div className="modal__feedback-show-more">Show More</div>
      </div>
      {productData.top_reviews.map((review, idx) => <ModalReview key={idx} review={review}/>)}
    </div>
  );
}

export default ModalFeedback;