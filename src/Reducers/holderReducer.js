import {
  GET_HOLDER,
  GET_HOLDER_PENDING,
  GET_HOLDER_ERROR,
  CLEAR_HOLDER,
} from "../Actions/types";

const INIT_STATE = {
  data: {},
  success: false,
  pending: false,
  error: null,
};

const holderReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_HOLDER:
      return {
        data: action.payload,
        success: true,
        pending: false,
        error: null,
      };
    case GET_HOLDER_PENDING:
      return {
        data: state.data,
        success: false,
        pending: true,
        error: null,
      };
    case GET_HOLDER_ERROR:
      return {
        data: state.data,
        success: false,
        pending: false,
        error: action.payload,
      };
    case CLEAR_HOLDER:
      return {
        data: {},
        success: false,
        pending: false,
        error: null,
      };

    default:
      return state;
  }
};

export default holderReducer;
