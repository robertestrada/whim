import React from 'react';
import ModalReview from './ModalReview';
import ModalFit from './ModalFit';
import '../../../../styles/modal.css';

const ModalFeedback = ({ productData }) => {
  if (!productData.top_reviews){
    return null
  }

  const fitData = {
                    "tooSmall": productData.amt_too_small, 
                    "justRight": productData.amt_just_right,
                    "tooLarge": productData.amt_too_large,
                  };

  return (
    <div className="modal__feedback-wrapper">
      <div className="modal__feedback-header">
        <h2 className="modal__feedback-title">Customer Reviews</h2>
        <div className="modal__feedback-show-more">Show More</div>
      </div>
      { Object.values(fitData).some(fit => fit)
        ? <ModalFit fitData={fitData}/> 
        : null
      }
      {productData.top_reviews.map((review, idx) => <ModalReview key={idx} review={review}/>)}
    </div>
  );
}

export default ModalFeedback;