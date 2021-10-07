import {
  GET_BATCH,
  GET_BATCH_PENDING,
  GET_BATCH_ERROR,
  GET_VIALS_PENDING,
  GET_VIALS_ERROR,
  GET_VIALS,
  GET_HOLDER_PENDING,
  GET_HOLDER,
  GET_HOLDER_ERROR,
  UPDATE_VIAL,
  CLEAR_HOLDER,
} from "./types";
import {
  getZohoQueryParams,
  getZohoRecord,
  getZohoRecords,
  updateZohoRecord,
} from "../Services/zohoService";
import { reset } from "redux-form";

// ---------------------- GET BATCH ACTION -------------------------------
export const getBatch = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_BATCH_PENDING });
      const queryParams = await getZohoQueryParams();
      console.log(queryParams);
      if (!queryParams.batchID) {
        dispatch({ type: GET_BATCH, payload: "no batch" });
      } else {
        dispatch({ type: GET_BATCH, payload: queryParams.batchID });
      }
    } catch (error) {
      dispatch({ type: GET_BATCH_ERROR, payload: error.message || error });
    }
  };
};

export const getVialHolder = (holderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_HOLDER_PENDING });
      const holder = await getZohoRecord("Vial_Holder_Report", holderId);
      dispatch({ type: GET_HOLDER, payload: holder });
    } catch (error) {
      dispatch({ type: GET_HOLDER_ERROR, payload: error.message || error });
    }
  };
};

export const getBatchVials = (batchId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_VIALS_PENDING });
      const records = await getZohoRecords(
        "Vial_Report",
        `Batch == ${batchId}`
      );
      dispatch({ type: GET_VIALS, payload: records });
    } catch (error) {
      dispatch({ type: GET_VIALS_ERROR, payload: error.message || error });
    }
  };
};

export const getHolderVials = (holderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_VIALS_PENDING });
      const records = await getZohoRecords(
        "Vial_Report",
        `Vial_Holder == ${holderId}`
      );
      dispatch({ type: GET_VIALS, payload: records });
    } catch (error) {
      dispatch({ type: GET_VIALS_ERROR, payload: error.message || error });
    }
  };
};

export const updateVial = (vialId, holderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_VIALS_PENDING });
      const vial = await updateZohoRecord("Vial_Report", vialId, {
        Vial_Holder: holderId,
      });
      console.log(vial);
      dispatch({ type: UPDATE_VIAL, payload: vial });
    } catch (error) {
      dispatch({ type: GET_VIALS_ERROR, payload: error.message || error });
    }
  };
};

export const clearHolder = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_HOLDER });
    dispatch(reset("holderForm"));
  };
};
