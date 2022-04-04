import { fetchCollectionConstants } from "../../Constants/apisConstants";
import axios from "axios";
import { BACKEND_URL } from "config";
var abc = 0;
export const fetchCollection = (name) => {
  console.log("fetch collection name aciton redux call", name);

  return async (dispatch) => {
    dispatch({
      type: fetchCollectionConstants.FETCH_COLLECTION_REQUEST,
    });

    try {
      return axios
        .get(`${BACKEND_URL}collection?name=${name}`)
        .then((collectionInfo) => {
          if (collectionInfo.data) {
            dispatch({
              type: fetchCollectionConstants.FETCH_COLLECTION_SUCCESS,
              payload: { data: collectionInfo.data },
            });
            // return collectionInfo.data;
          } else {
            dispatch({
              type: fetchCollectionConstants.FETCH_COLLECTION_FAILURE,
              payload: { data: [], error: "something went wrong" },
            });
            // return [];
          }
        });
    } catch (error) {
      console.log("[fetchCollectionNames] error => ", error);
      dispatch({
        type: fetchCollectionConstants.FETCH_COLLECTION_FAILURE,
        payload: { data: [], error: error },
      });
    }
  };
};
