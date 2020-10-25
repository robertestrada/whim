import {
  LOAD_CART,
  ADD_CART_ITEM,
  UPDATE_CART_NOTIFIED,
  MORE_CART_QUANTITY,
  UPDATE_CART_QUANTITY,
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

    case UPDATE_CART_NOTIFIED: {
      return {
        ...state,
        [action.item.id]: action.item,
      }
    }

    case MORE_CART_QUANTITY: {
      return {
        ...state,
        [action.item.id]: action.item,
      }
    }

    case UPDATE_CART_QUANTITY: {
      return {
        ...state,
        [action.item.id]: action.item,
      }
    }

    case REMOVE_CART_ITEM: {
      const newState = { ...state }
      delete newState.items[action.id]
      return newState;
    }

    case CLEAR_CART: {
      return {
        ...state,
        items: {},
      }
    }

    default: return state;
  }
}



export default cartReducer;