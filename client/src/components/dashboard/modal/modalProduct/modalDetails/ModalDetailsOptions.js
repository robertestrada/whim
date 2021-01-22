import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, moreCartQuantity } from '../../../../../actions/cart';
import ModalDetailsOption from './ModalDetailsOption';
import ModalBuyButton from './ModalBuyButton';
import '../../../../../styles/modal.css';


const ModalDetailsOptions = ({ productImgUrl, productId, options, handleModalExit }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => Object.values(state.cart.items));
  const userId = useSelector((state) => state.authentication.user.id);
  const [size, setSize] = useState('Select Size');
  const [color, setColor] = useState('Select Color');
  const [sizeExists, setSizeExists] = useState(false);
  const [colorExists, setColorExists] = useState(false);
  const [selections, setSelections] = useState({ 'color': null, 'size': null });
  const [sizeShow, setSizeShow] = useState(false);
  const [colorShow, setColorShow] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [buyReady, setBuyReady] = useState(null);
  const node = useRef();

  const handleClick = e => {
    if (node.current.contains(e.target)){
      return;
    }
    setSizeShow(false);
    setColorShow(false);
  }
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, []);

  useEffect(() =>{
    const selectionTypes = () => {
      options.forEach((option) => {
        if (option['color'] && !colorExists) setColorExists(true);
        if (option['size'] && !sizeExists) setSizeExists(true);
      });
    }
    selectionTypes();
  }, [sizeExists, colorExists, options]);

  useEffect(() => {
    handleSelectionCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections]);

  useEffect(() => {
    if (selections['color'] !== null && selections['size'] !== null){
      validateSelection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selections]);

  const colorList = () => {
    const list = [];
    const seen = {};
    for(let i = 0; i < options.length; i++){
      if (!seen[options[i].color_order] && options[i].color !== ''){
        seen[options[i].color_order] = true;
        list.push({ color_order: options[i].color_order, color: options[i].color });
      }
    }
    list.sort((a, b) => (a.color_order > b.color_order) ? 1 : -1);
    return list;
  };

  const sizeList = () => {
    const list = [];
    const seen = {};
    for (let i = 0; i < options.length; i++) {
      if (!seen[options[i].size_order] && options[i].size !== '') {
        seen[options[i].size_order] = true;
        list.push({ size_order: options[i].size_order, size: options[i].size });
      }
    }
    list.sort((a, b) => (a.size_order > b.size_order) ? 1 : -1);
    return list;
  };

  const validateSelection = () => {
    for (let i = 0; i < options.length; i++) {
      if (options[i]['color'] === selections['color'] && options[i]['size'] === selections['size']) {
        setColorError(false);
        return;
      }
    }
    setBuyReady(null);
    setColorError('Sold Out');
  };

  const handleColorSelection = (option) => {
    setColor(option);
    setSelections({ ...selections, 'color': option });
    setColorShow(false);
  };

  const handleSizeSelection = (option) => {
    setSize(option);
    setSelections({ ...selections, 'size': option });
    setSizeShow(false);
  };

  const handleColorButtonClick = () => {
    if (colorShow){
      setColorShow(false);
    } else {
      setSizeShow(false);
      setColorShow(true);
    }
  };

  const handleSizeButtonClick = () => {
    if (sizeShow) {
      setSizeShow(false);
    } else {
      setColorShow(false);
      setSizeShow(true);
    }
  };

  const handleBuyCheck = () => {
    if (sizeExists && colorExists && buyReady === null){
      if (selections['color'] === null && selections['size'] === null){
        setBuyReady('both');
      } else if (selections['color'] === null) {
        setBuyReady('color');
      } else if (selections['size'] === null) {
        setBuyReady('size');
      }
    } else if (sizeExists && buyReady === null){
      if (selections['size'] === null) {
        setBuyReady('size');
      }
    } else if (colorExists && buyReady === null){
      if (selections['color'] === null) {
        setBuyReady('color');
      }
    }
  };

  const handleSelectionCheck = () => {
    if (sizeExists && colorExists) {
      if (selections['size'] !== null && buyReady === 'both'){
        setBuyReady('color');
        return;
      } else if (selections['color'] !== null && buyReady === 'both') {
        setBuyReady('size');
        return;
      }
      if (selections['size'] !== null && selections['color'] !== null){
        setBuyReady(true);
        return;
      }
    } else if (sizeExists) {
      if (selections['size'] !== null) {
        setBuyReady(true);
      }
    } else if (colorExists) {
      if (selections['color'] !== null) {
        setBuyReady(true);
      }
    }
  };

  const handleBuyCheckout = () => {
    let optionId;
    if (selections['size'] && selections['color'] !== null){
      optionId = options.filter(option => option.size === selections['size'] && option.color === selections['color'])[0].id;
    } else if (selections['size'] !== null) {
      optionId = options.filter(option => option.size === selections['size'])[0].id;
    } else if (selections['color'] !== null) {
      optionId = options.filter(option => option.color === selections['color'])[0].id;
    }

    const cartOrder = cartItems.filter(order => order.option_id === optionId);
    if(cartOrder.length === 0){
      dispatch(addCartItem(userId, productId, optionId, productImgUrl));
    } else {
      const quantity = cartOrder[0].quantity + 1;
      dispatch(moreCartQuantity(cartOrder[0].id, quantity));
    }
    handleModalExit();
  };


  return (
    <div className="modal__selections-wrapper" ref={node}>
      {sizeExists ?
        <div className="modal__selection size-list" onClick={() => handleSizeButtonClick()}>
          <div className={buyReady === true || buyReady === null || buyReady === 'color' ? "modal__selection-label" : "modal__selection-label label-error"}>Size:</div>
          <div className={buyReady === true || buyReady === null || buyReady === 'color' ? "modal__selection-button-container" : "modal__selection-button-container container-error"} >
            <div className="modal__selection-button-text">
              <button className={size === 'Select Size' ? "modal__selection-button no-choice" : "modal__selection-button"}>{size}</button>
            </div>
            <div className="modal__selection-arrow">
              <svg className={sizeShow ? "modal__selection-arrow-svg arrow-flip" : "modal__selection-arrow-svg"} viewBox="0 0 8 5">
                <g fill="none" fillRule="evenodd">
                  <path d="M-4-6h16v16H-4z"></path>
                  <path d="M1 0a1.003 1.003 0 0 0-.71 1.71l3 3c.18.18.43.29.71.29.28 0 .53-.11.71-.29l3-3A1.003 1.003 0 0 0 7 0H1z" fill="#48636f"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className={sizeShow ? "modal__selections" : "modal__selections hide-selections"}>
            {sizeList().map((option, idx) => <ModalDetailsOption key={idx} option={option.size} handleSelection={handleSizeSelection}/>)}
          </div>
        </div>
        : null
      }
      {colorExists ? 
        <div className="modal__selection" onClick={() => handleColorButtonClick()}>
          <div className={buyReady === true || buyReady === null || buyReady === 'size' ? "modal__selection-label" : "modal__selection-label label-error"}>Color:</div>
          <div className={buyReady === true || buyReady === null || buyReady === 'size' ? "modal__selection-button-container" : "modal__selection-button-container container-error"}>
            <div className="modal__selection-button-text">
              <button className={color === 'Select Color' ? "modal__selection-button no-choice" : "modal__selection-button"}>{color}</button>
            </div>
            <div className="modal__selection-arrow">
              <svg className={colorShow ? "modal__selection-arrow-svg arrow-flip" : "modal__selection-arrow-svg"} viewBox="0 0 8 5">
                <g fill="none" fillRule="evenodd">
                  <path d="M-4-6h16v16H-4z"></path>
                  <path d="M1 0a1.003 1.003 0 0 0-.71 1.71l3 3c.18.18.43.29.71.29.28 0 .53-.11.71-.29l3-3A1.003 1.003 0 0 0 7 0H1z" fill="#48636f"></path>
                </g>
              </svg>
            </div>
          </div>
          <div className={colorShow ? "modal__selections" : "modal__selections hide-selections"}>
            {colorList().map((option, idx) => <ModalDetailsOption key={idx} option={option.color} handleSelection={handleColorSelection}/>)}
          </div>
        </div>
        : null
      }
      <ModalBuyButton colorError={colorError} buyReady={buyReady} handleBuyCheck={handleBuyCheck} handleBuyCheckout={handleBuyCheckout}/>
    </div>
  );
}

export default ModalDetailsOptions;