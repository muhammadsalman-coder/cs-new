import { deleteCollectionConstants } from "redux/action/Constants/apisConstants";

const initialState = {
  deleteCollection: false,
  loading: false,
};
export default (state = initialState, action) => {
  // console.log("actionspayload ", action.payload);
  switch (action.type) {
    case deleteCollectionConstants.DELETE_COLLECTION_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case deleteCollectionConstants.DELETE_COLLECTION_SUCCESS:
      state = {
        ...state,
        deleteCollection: true,
        loading: false,
      };
      break;
    case deleteCollectionConstants.DELETE_COLLECTION_FAILURE:
      state = {
        ...state,
        deleteCollection: true,
        loading: false,
      };
      break;
    // default:
    //   return state;
  }
  return state;
};
