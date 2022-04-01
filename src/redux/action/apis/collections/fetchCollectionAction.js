import { fetchCollectionConstants } from "../../Constants/apisConstants";
import axios from "axios";
import { BACKEND_URL } from "config";
var abc = 0;
export const fetchCollection = (name) => {
  return async (dispatch) => {
    // console.log("fetchCollection dispatching name", name);
    dispatch({
      type: fetchCollectionConstants.FETCH_COLLECTION_REQUEST,
    });

    try {
      const res = await axios.get(`${BACKEND_URL}collection?name=${name}`);
      if (res.status == 200) {
        dispatch({
          type: fetchCollectionConstants.FETCH_COLLECTION_SUCCESS,
          payload: { data: res.data },
        });
      } else {
        dispatch({
          type: fetchCollectionConstants.FETCH_COLLECTION_FAILURE,
          payload: { data: [], error: "something went wrong" },
        });
      }
      // await axios
      //   .get(`${BACKEND_URL}collection?name=${name}`)
      //   .then(async (collectionInfo) => {
      //     console.log("collectionInfo", collectionInfo);
      //     if (collectionInfo?.data) {
      //       // console.log("collection name ", name);
      //       await dispatch({
      //         type: fetchCollectionConstants.FETCH_COLLECTION_SUCCESS,
      //         payload: { data: collectionInfo.data },
      //       });
      //       // return collectionInfo.data;
      //     } else {
      //       await dispatch({
      //         type: fetchCollectionConstants.FETCH_COLLECTION_FAILURE,
      //         payload: { data: [], error: "something went wrong" },
      //       });
      //       // return [];
      //     }
      //   });
    } catch (error) {
      console.log("[fetchCollectionNames] error => ", error);
      dispatch({
        type: fetchCollectionConstants.FETCH_COLLECTION_FAILURE,
        payload: { data: [], error: error.response.data },
      });
    }
  };
};
