import { combineReducers } from "redux";
import collectionReducer from "./apis/fetchCollectionDataReducer";
import fetchCollectionNamesReducer from "./apis/fetchCollectionNamesReducer";
import itemsReducer from "./Home/Popular/itemsReducer";
import fetchCollectionReducer from "./apis/fetchCollectionReducer";
import deleteCollectionReducer from "./apis/deleteCollectionReducer";

const rootReducer = combineReducers({
  items: itemsReducer,
  collection: collectionReducer,
  collectionNames: fetchCollectionNamesReducer,
  collectionInfo: fetchCollectionReducer,
  deleteCollection: deleteCollectionReducer,
});
export default rootReducer;
