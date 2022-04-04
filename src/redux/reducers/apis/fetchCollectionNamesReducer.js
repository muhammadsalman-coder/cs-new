import { fetchCollectionNamesConstants } from "redux/action/Constants/apisConstants";

const initialState = {
  collectionNames: [],
  loading: false,
  error: null,
};
export default (state = initialState, action) => {
  // console.log("actionspayload ", action.payload);
  switch (action.type) {
    case fetchCollectionNamesConstants.FETCH_COLLECTION_NAMES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case fetchCollectionNamesConstants.FETCH_COLLECTION_NAMES_SUCCESS:
      state = {
        ...state,
        collectionNames: action.payload.data,
        loading: false,
      };
      break;
    case fetchCollectionNamesConstants.FETCH_COLLECTION_NAMES_FAILURE:
      state = {
        ...state,
        collectionNames: action.payload.data,
        error: action.payload.error,
        loading: false,
      };
      break;
    // default:
    //   return state;
  }
  return state;
};
