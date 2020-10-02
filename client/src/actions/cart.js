const CART_KEY = 'whim/cart';
export const LOAD_CART = 'LOAD_CART';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
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

const clearCartAction = () => ({
  type: CLEAR_CART,
});

export const loadCart = () => async dispatch => {
  let cart = window.localStorage.getItem(CART_KEY);
  if (cart) {
    cart = JSON.parse(cart);
  } else {
    cart = {};
  }
  dispatch(loadCartAction(cart));
};

export const addCartItem = (item) => async (dispatch) => {
  let cart;
  if (window.localStorage.getItem(CART_KEY)){
    cart = JSON.parse(window.localStorage.getItem(CART_KEY))
  } else {
    cart = {};
  }

  cart[item.id] = item;
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  dispatch(addCartItemAction(item));
  dispatch(loadCart());
}

export const removeCartItem = (id) => async (dispatch) => {
  const cart = JSON.parse(window.localStorage.getItem(CART_KEY));
  delete cart[id];
  
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  dispatch(removeCartItemAction(id));
  dispatch(loadCart());
}

export const clearCart = () => dispatch => {
  window.localStorage.removeItem(CART_KEY);
  dispatch(clearCartAction());
  dispatch(loadCart());
}