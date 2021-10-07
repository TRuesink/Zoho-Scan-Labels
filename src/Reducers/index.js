import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import batchReducer from "./batchReducer";
import holderReducer from "./holderReducer";
import vialReducer from "./vialReducer";

const reducers = combineReducers({
  batch: batchReducer,
  holder: holderReducer,
  vials: vialReducer,
  form: formReducer,
});

export default reducers;
