import axios from "axios";

import { BACKEND_URL } from "config";

const fetchViewAndLike = async ({ tokenAddr, tokenId }) => {
  console.log(
    "fetchViewAndLike function calling shan tokenAddr",
    tokenAddr,
    "tokenId",
    tokenId
  );
  try {
    return await axios
      .get(
        `${BACKEND_URL}view-and-like?tokenAddr=${tokenAddr}&tokenId=${tokenId}`
      )
      .then((info) => {
        if (info.data) {
          return info.data;
        } else {
          return null;
        }
      });
  } catch (error) {
    console.log("[fetchViewAndLike] error => ", error);
  }
};

const addView = async ({
  tokenAddr,
  tokenId,
  address,
  views = 0,
  likes = 0,
}) => {
  try {
    const result = await axios({
      method: "POST",
      url: `${BACKEND_URL}view-and-like`,
      data: {
        tokenAddr,
        tokenId,
        address,
        views,
        likes,
      },
    });
    if (result.status === 200) {
      return true;
    }
  } catch (error) {
    console.log("[addView] error => ", error);
  }
  return false;
};

const updateLikeInfo = async (data) => {
  try {
    const result = await axios({
      method: "POST",
      url: `${BACKEND_URL}view-and-like`,
      data,
    });
    if (result.status === 200) {
      return result;
    }
  } catch (error) {
    // console.log("[addView] error => ", error);
    throw new Error(error.response.data.message);
  }
  return false;
};
export { fetchViewAndLike, addView, updateLikeInfo };
