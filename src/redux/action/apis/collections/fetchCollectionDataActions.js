import { fetchMyCollectionConstants } from "../../Constants/apisConstants";
import axios from "axios";
import { BACKEND_URL } from "config";

export const fetchingCollectionData = (address) => {
  return async (dispatch) => {
    dispatch({
      type: fetchMyCollectionConstants.FETCH_MYCOLLECTION_DATA_REQUEST,
    });

    try {
      return axios
        .get(`${BACKEND_URL}my-collections?owner=${address}`)
        .then((collectionInfo) => {
          if (collectionInfo.data) {
            dispatch({
              type: fetchMyCollectionConstants.FETCH_MYCOLLECTION_DATA_SUCCESS,
              payload: { data: collectionInfo.data },
            });
            //   return collectionInfo.data;
          } else {
            dispatch({
              type: fetchMyCollectionConstants.FETCH_MYCOLLECTION_DATA_FAILURE,
              payload: { data: [], error: "something went wrong" },
            });
            // return [];
          }
        });
    } catch (error) {
      console.log("[fetchUserProfile] error => ", error);
      dispatch({
        type: fetchMyCollectionConstants.FETCH_MYCOLLECTION_DATA_FAILURE,
        payload: { data: [], error: error },
      });
      //   return [];
    }
  };
};
