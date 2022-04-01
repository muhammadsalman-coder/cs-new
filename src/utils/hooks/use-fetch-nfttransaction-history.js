import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";

import { MORALIS_CHAIN_IDS, MORALIS_API_URI } from "config";
import { connectContract } from "utils/helpers/connectors";
import erc721Abi from "utils/abis/erc721";

const useFetchNftTransactionHistory = ({ address, tokenId, chainId }) => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loadingTransactionHistory, setLoadingTransactionHistory] =
    useState(false);
  const fetchingHistoryNft = useCallback(async () => {
    setLoadingTransactionHistory(true);
    try {
      const res = await axios({
        method: "get",
        url: `${MORALIS_API_URI}nft/${address}/${tokenId}/transfers?chain=${
          MORALIS_CHAIN_IDS[
            chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
          ]
        }&format=decimal`,
        headers: {
          accept: "application/json",
          "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
        },
      });
      // console.log("fetchNftTransactionHistory", res.data.result);
      // if (res.status == 200) {
      //   return res.data.result;
      // }
      // block_timestamp
      res.data.result.sort(function (a, b) {
        var keyA = new Date(a.block_timestamp),
          keyB = new Date(b.block_timestamp);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      setTransactionHistory(res.data.result);
      setLoadingTransactionHistory(false);
    } catch (error) {
      console.log("[useFetchNftTransactionHistory] error => ", error);
      setLoadingTransactionHistory(false);
    }
  }, [address, tokenId]);

  useEffect(() => {
    fetchingHistoryNft();
  }, [address, tokenId]);

  return { transactionHistory, loadingTransactionHistory };
};

export default useFetchNftTransactionHistory;
