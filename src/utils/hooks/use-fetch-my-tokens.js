import { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { artifacts } from "config";
import axios from "axios";

import { MORALIS_CHAIN_IDS, MORALIS_API_URI } from "config";
import { useContracts } from "utils/hooks/use-connectors";

const useFetchMyTokens = (address) => {
  const [myTokens, setMyTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCalled, setIsCalled] = useState(false);
  const { account, chainId } = useWeb3React();
  const { contracts } = useContracts();

  useEffect(() => {
    if (account) {
      setIsCalled(false);
    }
  }, [account]);

  //console.log(isCalled);
  const fetchTokens = useCallback(async () => {
    if (!isCalled) {
      const nftAddress =
        artifacts.closedSeaNft[
          chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
        ];
      // console.log("NFTTS ADDRESS: ", nftAddress);
      try {
        setLoading(true);
        const { data } = await axios({
          method: "get",
          url: `${MORALIS_API_URI}nft/${nftAddress}/owners?chain=${
            MORALIS_CHAIN_IDS[
              chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
            ]
          }&format=decimal`,
          headers: {
            accept: "application/json",
            "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
          },
        });

        let tokens = [];
        // console.log("datadatadata", data);
        if (data.result) {
          for (let item of data.result) {
            console.log("tokenstokens in loop");
            if (
              item.owner_of &&
              address &&
              String(item.owner_of).toUpperCase() === address?.toUpperCase()
            ) {
              console.log("tokenstokens in upper if");
              if (contracts.closedSeaNft) {
                console.log("tokenstokens in inner inner if");
                const uri = await contracts.closedSeaNft.methods
                  .tokenURI(item.token_id)
                  .call();
                const result = await axios.get(uri);
                console.log("tokenstokens result", result);
                tokens = await [
                  ...tokens,
                  { ...item, metadata: result.data, token_uri: uri },
                ];
              }
            }
          }

          setMyTokens(tokens);
          setIsCalled(true);
        }
        setLoading(false);
      } catch (error) {
        console.log("[fetchTokens] error => ", error);
      }
    }
  }, [account, chainId, isCalled, contracts]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return { loading, myTokens };
};

export default useFetchMyTokens;
