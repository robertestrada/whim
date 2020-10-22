import { baseUrl } from '../config';
export const LOAD_CART = 'LOAD_CART';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';


const loadCartAction = cart => ({
  type: LOAD_CART,
  cart,
});

const addCartItemAction = item => ({
  type: ADD_CART_ITEM,
  item,
});

const removeCartItemAction = id => ({
  type: REMOVE_CART_ITEM,
  id,
});

const updateCartQuantityAction = item => ({
  type: UPDATE_CART_QUANTITY,
  item,
});

const clearCartAction = () => ({
  type: CLEAR_CART,
});

export const loadCart = (userId) => async dispatch => {
  console.log("LOAD CART");
  const result = await fetch(`${baseUrl}/all/${userId}`);
  if (result.ok) {
    const resultJSON = await result.json();
    console.log("LOAD resultJSON:", resultJSON);
    dispatch(loadCartAction(resultJSON));
  }
};

export const addCartItem = (userId, productId, optionId, merchantId) => async dispatch => {
  const result = await fetch(`${baseUrl}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productId, optionId, merchantId }),
  });
  if (result.ok) {
    const resultJSON = await result.json();
    console.log("ADD resultJSON:", resultJSON);
    dispatch(addCartItemAction(resultJSON));
    dispatch(loadCart());
  }
}

export const removeCartItem = (orderId) => async dispatch => {
  const result = await fetch(`${baseUrl}/remove/${orderId}`);
  if (result.ok) {
    dispatch(removeCartItemAction(orderId));
    dispatch(loadCart());
  }
}

export const updateCartQuantity = (orderId, quantity) => async dispatch => {
  const result = await fetch(`${baseUrl}/update/${orderId}/${quantity}`);
  if (result.ok) {
    const resultJSON = await result.json();
    dispatch(updateCartQuantityAction(resultJSON));
    dispatch(loadCart());
  }
}

export const clearCart = () => dispatch => {
  dispatch(clearCartAction());
  dispatch(loadCart());
}