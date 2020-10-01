import React, { useState, useEffect, useRef } from 'react';
import ModalDetailsOption from './ModalDetailsOption';
import ModalBuyButton from './ModalBuyButton';
import '../styles/modal.css';




const ModalDetailsOptions = ({ options, handleModalExit }) => {
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
  }, [selections]);

  useEffect(() => {
    if (selections['color'] !== null && selections['size'] !== null){
      validateSelection();
    }
  }, [selections]);

  const colorList = () => {
    const list = [];
    for(let i = 0; i < options.length; i++){
      if (!list.includes(options[i].color) && options[i].color !== ''){
        list.push(options[i].color);
      }
    }
    return list;
  };

  const sizeList = () => {
    const list = [];
    for (let i = 0; i < options.length; i++) {
      if (!list.includes(options[i].size)) {
        list.push(options[i].size);
      }
    }
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
    // localStorage.setItem('cart')
    handleModalExit();
  };


  return (
    <div className="modal__selections-wrapper" ref={node}>
      {sizeExists ?
        <div className="modal__selection size-list">
          <div className={buyReady === true || buyReady === null || buyReady === 'color' ? "modal__selection-label" : "modal__selection-label label-error"}>Size:</div>
          <div className={buyReady === true || buyReady === null || buyReady === 'color' ? "modal__selection-button-container" : "modal__selection-button-container container-error"} >
            <div className="modal__selection-button-text">
              <button className="modal__selection-button" onClick={() => handleSizeButtonClick()}>{size}</button>
            </div>
            <div className="modal__selection-arrow">icon</div>
          </div>
          <div className={sizeShow ? "modal__selections" : "modal__selections hide-selections"}>
            {sizeList().map((option, idx) => <ModalDetailsOption key={idx} option={option} handleSelection={handleSizeSelection}/>)}
          </div>
        </div>
        : null
      }
      {colorExists ? 
        <div className="modal__selection">
          <div className={buyReady === true || buyReady === null || buyReady === 'size' ? "modal__selection-label" : "modal__selection-label label-error"}>Color:</div>
          <div className={buyReady === true || buyReady === null || buyReady === 'size' ? "modal__selection-button-container" : "modal__selection-button-container container-error"}>
            <div className="modal__selection-button-text">
              <button className="modal__selection-button" onClick={() => handleColorButtonClick()}>{color}</button>
            </div>
            <div className="modal__selection-arrow">icon</div>
          </div>
          <div className={colorShow ? "modal__selections" : "modal__selections hide-selections"}>
            {colorList().map((option, idx) => <ModalDetailsOption key={idx} option={option} handleSelection={handleColorSelection}/>)}
          </div>
        </div>
        : null
      }
      <ModalBuyButton colorError={colorError} buyReady={buyReady} handleBuyCheck={handleBuyCheck} handleBuyCheckout={handleBuyCheckout}/>
      {`${selections.size} ${selections.color} ${colorError}`}
    </div>
  );
}

export default ModalDetailsOptions;