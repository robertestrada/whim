import {
  SET_TOKEN,
  SET_USER,
  REMOVE_AUTH,
  VAL_ERRORS,
  REMOVE_VAL_ERRORS,
  TOGGLE_SHOW_SURVEY,
} from '../actions/authentication';

const authReducer = (state = {}, action) => {
  let nextState = {...state}
  switch (action.type) {

    case SET_USER: {
      nextState= {...nextState, user: action.user}
      return nextState;
    }

    case SET_TOKEN: {
      nextState= {...nextState, token: action.token}
      return nextState;
    }

    case REMOVE_AUTH: {
      nextState = {};
      return nextState;
    }

    case VAL_ERRORS: {
      nextState = {...nextState, valErrors: action.valErrors}
      return nextState;
    }

    case REMOVE_VAL_ERRORS: {
      nextState = { ...nextState, valErrors: { 'msg': null } }
      return nextState;
    }

    case TOGGLE_SHOW_SURVEY: {
      nextState = { ...nextState, showSurvey: !nextState.showSurvey }
      return nextState;
    }

    default: return state;
  }
}

export default authReducer;
