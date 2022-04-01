import { fetchCollectionNamesConstants } from "redux/action/Constants/apisConstants";
import axios from "axios";
import { BACKEND_URL } from "config";

export const fetchCollectionNames = () => {
  return async (dispatch) => {
    dispatch({
      type: fetchCollectionNamesConstants.FETCH_COLLECTION_NAMES_REQUEST,
    });
    try {
      return axios
        .get(`${BACKEND_URL}collection-names`)
        .then((collectionInfo) => {
          if (collectionInfo.data) {
            dispatch({
              type: fetchCollectionNamesConstants.FETCH_COLLECTION_NAMES_SUCCESS,
              payload: { data: collectionInfo.data },
            });
            // return collectionInfo.data;
          } else {
            dispatch({
              type: fetchCollectionNamesConstants.FETCH_COLLECTION_NAMES_FAILURE,
              payload: { data: [], error: "something went wrong" },
            });
            // return [];
          }
        });
    } catch (error) {
      console.log("[fetchCollectionNames] error => ", error);

      dispatch({
        type: fetchCollectionNamesConstants.FETCH_COLLECTION_NAMES_FAILURE,
        payload: { data: [], error: error },
      });
      // return [];
    }
  };
};
