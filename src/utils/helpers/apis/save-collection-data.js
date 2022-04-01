import axios from "axios";

import { BACKEND_URL } from "config";

const postCollectionData = async (data) => {
  try {
    console.log("dataata", data);
    const result = await axios({
      url: `${BACKEND_URL}collection/v2`,
      method: "post",
      data,
    });
    if (result.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    // console.log("ammar error ->",error);
    return false;
  }
};

const putCollectionData = async (data) => {
  try {
    const result = await axios({
      url: `${BACKEND_URL}collection`,
      method: "put",
      data,
    });
    if (result.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const insertTokenToCollection = async (data) => {
  try {
    const result = await axios({
      url: `${BACKEND_URL}insert-token-to-collection`,
      method: "put",
      data,
    });
    if (result.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export { postCollectionData, putCollectionData, insertTokenToCollection };
