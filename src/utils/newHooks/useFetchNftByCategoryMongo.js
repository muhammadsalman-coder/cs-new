import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BACKEND_URL } from "config";

const useFetchNftByCategoryMongo = ({
  category,
  page,
  size,
  isMarketPlace,
}) => {
  const [loadingCategoryNft, setLoadingCategoryNft] = useState(false);
  const [categoryNfts, setCategoryNfts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchingCategoringNfts = useCallback(async () => {
    try {
      setLoadingCategoryNft(true);
      const res = await axios.post(`${BACKEND_URL}nft-category-vise`, {
        category,
        page,
        size,
        isMarketPlace,
      });
      console.log("res nft data fetchingCategoringNfts", res.data);
      setCategoryNfts(res.data.nft);
      setTotalPages(res.data.totalPage);
      setLoadingCategoryNft(false);
    } catch (err) {
      if (err?.response) {
        setCategoryNfts();
        setLoadingCategoryNft(false);
        //   console.log("nfts error log", err.response.data);
      }
    }
    // } else {
    //   try {
    //     setLoadingCategoryNft(true);
    //     const res = await axios.post(`${BACKEND_URL}nft-category-vise`, {
    //       category,
    //       page,
    //       size,
    //     });
    //     console.log("res nft data", res.data);

    //     setCategoryNfts([...categoryNfts, ...res.data.nft]);
    //     setLoadingCategoryNft(false);
    //   } catch (err) {
    //     if (err?.response) {
    //       setCategoryNfts();
    //       setLoadingCategoryNft(false);
    //       //   console.log("nfts error log", err.response.data);
    //     }
    //   }
  }, [category, page]);

  useEffect(() => {
    fetchingCategoringNfts();
  }, [category, page]);

  return { loadingCategoryNft, categoryNfts, totalPages };
};

export default useFetchNftByCategoryMongo;
