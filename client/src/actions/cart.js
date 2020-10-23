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

export const loadCart = () => async dispatch => {
  const userId = JSON.parse(window.localStorage.getItem('CURRENT_USER')).id;
  const result = await fetch(`${baseUrl}/order/load/${userId}`);
  if (result.ok) {
    const resultJSON = await result.json();
    dispatch(loadCartAction(resultJSON.data));
  }
};

export const addCartItem = (userId, productId, optionId, productImgUrl) => async dispatch => {
  const result = await fetch(`${baseUrl}/order/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, productId, optionId, productImgUrl }),
  });
  if (result.ok) {
    const resultJSON = await result.json();
    dispatch(addCartItemAction(resultJSON.data));
  }
  dispatch(loadCart());
}

export const removeCartItem = orderId => async dispatch => {
  const result = await fetch(`${baseUrl}/order/remove/${orderId}`);
  if (result.ok) {
    dispatch(removeCartItemAction(orderId));
  }
  dispatch(loadCart());
}

export const updateCartQuantity = (orderId, quantity) => async dispatch => {
  const result = await fetch(`${baseUrl}/order/update/${orderId}/${quantity}`);
  if (result.ok) {
    const resultJSON = await result.json();
    dispatch(updateCartQuantityAction(resultJSON.data));
  }
  dispatch(loadCart());
}

export const clearCart = () => async dispatch => {
  const userId = JSON.parse(window.localStorage.getItem('CURRENT_USER')).id;
  const result = await fetch(`${baseUrl}/order/complete/${userId}`);
  if (result.ok) {
    dispatch(clearCartAction());
  }
  dispatch(loadCart());
}