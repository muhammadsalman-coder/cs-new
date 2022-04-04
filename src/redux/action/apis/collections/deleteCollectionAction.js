import { deleteCollectionConstants } from "../../Constants/apisConstants";
import axios from "axios";
import { BACKEND_URL } from "config";

export const deleteCollection = (data) => {
  //   console.log("fetch collection name aciton redux call", name);

  return async (dispatch) => {
    dispatch({
      type: deleteCollectionConstants.DELETE_COLLECTION_REQUEST,
    });

    try {
      const result = await axios({
        url: `${BACKEND_URL}collection`,
        method: "DELETE",
        data,
      });
      if (result.status === 200) {
        return dispatch({
          type: deleteCollectionConstants.DELETE_COLLECTION_SUCCESS,
        });
      }
      return dispatch({
        type: deleteCollectionConstants.DELETE_COLLECTION_FAILURE,
      });
      //   return false;
    } catch (error) {
      dispatch({
        type: deleteCollectionConstants.DELETE_COLLECTION_FAILURE,
      });
    }
  };
};
