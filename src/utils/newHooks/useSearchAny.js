import React, { useCallback, useEffect, useState } from "react";

const useSearchAny = ({ isSearching, tokens, setSearched, searchQuery }) => {
  const [searchedNFT, setSearchedNFT] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searching = useCallback(() => {
    console.log("fetchCollection searchQuery called", tokens);
    if (isSearching) {
      if (tokens.length > 0) {
        var tempNFT = [];
        for (let i = 0; i < tokens.length; i++) {
          const element = tokens[i];
          console.log("element", element);
          if (
            element?.metadata?.name
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
          ) {
            tempNFT.push(element);
          }
        }
        setSearchedNFT(tempNFT);
        setSearched(false);
      } else {
        setSearchedNFT([]);
        setSearched(false);
      }
    }
  }, [isSearching, searchQuery]);
  useEffect(() => {
    searching();
  }, [searching, isSearching, searchQuery]);

  return { searchedNFT, searchLoading };
};

export default useSearchAny;
