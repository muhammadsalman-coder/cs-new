import { fetchCollectionConstants } from "redux/action/Constants/apisConstants";

const initialState = {
  collection: [],
  loading: false,
  error: null,
};
export default (state = initialState, action) => {
  // console.log("actionspayload ", action.payload);
  switch (action.type) {
    case fetchCollectionConstants.FETCH_COLLECTION_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case fetchCollectionConstants.FETCH_COLLECTION_SUCCESS:
      state = {
        ...state,
        collection: action.payload.data,
        loading: false,
      };
      break;
    case fetchCollectionConstants.FETCH_COLLECTION_FAILURE:
      state = {
        ...state,
        collection: action.payload.data,
        error: action.payload.error,
        loading: false,
      };
      break;
    // default:
    //   return state;
  }
  return state;
};
