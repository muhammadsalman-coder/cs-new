import axios from "axios";
import { BACKEND_URL } from "config";
import React, { useState, useEffect, useCallback } from "react";

const useFetchSearchedNft = ({ query, setSearched, searched, page, size }) => {
  const [searchedNft, setSearchedNft] = useState([]);
  const [searchedLoadingNft, setSearchedLoadingNft] = useState(false);
  const [searchedNftPage, setSearchedNftPage] = useState(0);

  const searchingNFT = useCallback(async () => {
    if (searched) {
      setSearchedLoadingNft(true);
      try {
        const res = await axios.post(`${BACKEND_URL}search-nft`, {
          name: query,
          page,
          size,
        });
        console.log("searchingNFT res", res);
        setSearchedNft(res.data.nft);
        setSearchedNftPage(res.data.totalPage);
        setSearchedLoadingNft(false);
      } catch (err) {
        if (err?.response) {
          console.log("[searchingNFT] err->", err.response);
        } else {
          console.log("[searchingNFT] err->", err);
        }
        setSearchedNft([]);
        setSearchedLoadingNft(false);
      }
    }
  }, [searched, query, page]);

  useEffect(() => {
    searchingNFT();
  }, [searched, query, page]);

  return { searchedNft, searchedLoadingNft, searchedNftPage };
};

export default useFetchSearchedNft;
