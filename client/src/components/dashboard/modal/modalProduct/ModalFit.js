import React from 'react';
import '../../../../styles/modal.css';


const ModalFit = ({ fitData: {tooSmall, justRight, tooLarge} }) => {
  console.log("tooSmall: ", tooSmall, "justRight: ", justRight, "tooLarge: ", tooLarge);

  const fitRatingsTotal = tooSmall + justRight + tooLarge;
  const tooSmallPercent = `${(tooSmall / fitRatingsTotal) * 100}%`
  const justRightPercent = `${(justRight / fitRatingsTotal) * 100}%`
  const tooLargePercent = `${(tooLarge / fitRatingsTotal) * 100}%`

  return (
    <div className="modal__fit-container">
      <div className="modal__fit-bar-container container-too-small">
        <div className="modal__fit-bar-name">Too Small</div>
        <div className="modal__fit-bar-background">
          <div style={{ width: tooSmallPercent }}  className="modal__fit-bar"></div>
        </div>
      </div>
      <div className="modal__fit-bar-container">
        <div className="modal__fit-bar-name">Just Right</div>
        <div className="modal__fit-bar-background">
          <div style={{ width: justRightPercent }}  className="modal__fit-bar"></div>
        </div>
      </div>
      <div className="modal__fit-bar-container">
        <div className="modal__fit-bar-name">Too Large</div>
        <div className="modal__fit-bar-background">
          <div style={{ width: tooLargePercent }}  className="modal__fit-bar"></div>
        </div>
      </div>
      <div className="modal__fit-total-ratings">{`Based on ${fitRatingsTotal} Rating${fitRatingsTotal > 0 ? 's' : null}`}</div>
    </div>
  );
}

export default ModalFit;