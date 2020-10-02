import {
  LOAD_CART,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  CLEAR_CART,
} from '../actions/cart'

const cartReducer = (state = { items: {} }, action) => {
  switch (action.type) {
    case LOAD_CART: {
      return {
        ...state,
        items: action.cart,
      }
    }

    case ADD_CART_ITEM: {
      return {
        ...state,
        [action.item.id]: action.item,
      }
    }

    case REMOVE_CART_ITEM: {
      const nextState = { ...state }
      delete nextState.items[action.id]
      return nextState;
    }

    case CLEAR_CART: {
      const nextState = {};
      return nextState;
    }

    default: return state;
  }
}



export default cartReducer;