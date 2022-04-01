import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BACKEND_URL } from "config";
const useFetchNftCountByCategoryMongo = ({ category }) => {
  const [categoryNftCount, setCategoryNftCount] = useState(0);

  const getingCountNft = useCallback(async () => {
    const res = await axios.post(`${BACKEND_URL}count-nft-category-vise`, {
      category,
    });
    // console.log("useFetchNftCountByCategoryMongo res", res);
    setCategoryNftCount(res.data);
  }, [category]);

  useEffect(() => {
    getingCountNft();
  }, [category]);
  //   console.log("categoryNftCount in function", categoryNftCount);
  return { categoryNftCount };
};

export default useFetchNftCountByCategoryMongo;
