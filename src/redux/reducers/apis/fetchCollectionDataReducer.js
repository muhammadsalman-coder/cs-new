import { fetchMyCollectionConstants } from "redux/action/Constants/apisConstants";

const initialState = {
  myCollection: [],
  loading: false,
  error: null,
};
export default (state = initialState, action) => {
  // console.log("actionspayload ", action.payload);
  switch (action.type) {
    case fetchMyCollectionConstants.FETCH_MYCOLLECTION_DATA_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case fetchMyCollectionConstants.FETCH_MYCOLLECTION_DATA_SUCCESS:
      state = {
        ...state,
        myCollection: action.payload.data,
        loading: false,
      };
      break;
    case fetchMyCollectionConstants.FETCH_MYCOLLECTION_DATA_FAILURE:
      state = {
        ...state,
        myCollection: action.payload.data,
        error: action.payload.error,
        loading: false,
      };
      break;
    // default:
    //   return state;
  }
  return state;
};
