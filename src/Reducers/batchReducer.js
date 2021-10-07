import {
  GET_BATCH,
  GET_BATCH_PENDING,
  GET_BATCH_ERROR,
} from "../Actions/types";

const INIT_STATE = {
  id: null,
  success: false,
  pending: false,
  error: null,
};

const batchReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BATCH:
      return {
        id: action.payload,
        success: true,
        pending: false,
        error: null,
      };
    case GET_BATCH_PENDING:
      return {
        id: state.id,
        success: false,
        pending: true,
        error: null,
      };
    case GET_BATCH_ERROR:
      return {
        id: state.id,
        success: false,
        pending: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default batchReducer;
