import _ from "lodash";
import {
  GET_VIALS,
  GET_VIALS_PENDING,
  GET_VIALS_ERROR,
  UPDATE_VIAL,
} from "../Actions/types";

const INIT_STATE = {
  data: {},
  success: false,
  pending: false,
  error: null,
};

const vialReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_VIALS:
      return {
        data: { ...state.data, ..._.mapKeys(action.payload, "ID") },
        success: true,
        pending: false,
        error: null,
      };
    case GET_VIALS_PENDING:
      return {
        data: state.data,
        success: false,
        pending: true,
        error: null,
      };
    case GET_VIALS_ERROR:
      return {
        data: state.data,
        success: false,
        pending: false,
        error: action.payload,
      };
    case UPDATE_VIAL:
      return {
        data: { ...state.data, [action.payload.ID]: action.payload },
        success: true,
        pending: false,
        error: null,
      };

    default:
      return state;
  }
};

export default vialReducer;
