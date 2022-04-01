import { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { artifacts } from "config";
import axios from "axios";

import { MORALIS_CHAIN_IDS, MORALIS_API_URI } from "config";
import { useContracts } from "utils/hooks/use-connectors";
import { BACKEND_URL } from "config";
const useFetchMyTokensByMongo = (address) => {
  const [myTokens, setMyTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCalled, setIsCalled] = useState(false);
  const { account, chainId } = useWeb3React();
  const { contracts } = useContracts();

  // useEffect(() => {
  //   if (account) {
  //     setIsCalled(false);
  //   }
  // }, [account]);

  //console.log(isCalled);
  console.log("useFetchMyTokensByMongo-address", address);
  const fetchTokens = useCallback(async () => {
    setMyTokens([]);
    // if (!isCalled) {
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
        let tokensId = [];
        let token_address;
        for (let item of data.result) {
          // console.log("tokenstokens in loop");
          if (
            item.owner_of &&
            address &&
            String(item.owner_of).toUpperCase() === address?.toUpperCase()
          ) {
            // let res = await axios.post(`${BACKEND_URL}single-nft`, {
            //   tokenId: item.token_id,
            //   tokenAddr: item.token_address,
            // });
            // if (res?.status == 200 && res?.data) {
            //   let nftObj = res.data;
            //   nftObj.price = null;
            //   nftObj.title = nftObj?.metadata?.name;
            //   nftObj.description = nftObj?.metadata?.description;
            //   nftObj.image = nftObj?.metadata?.imageUrl;
            //   nftObj.url = `/asset/${nftObj?.tokenAddr}/${nftObj?.tokenId}`;

            //   // console.log("rtokenstokenses", nftObj);
            //   tokens = await [...tokens, { ...nftObj }];
            // }
            token_address = item.token_address;
            let token_id = item.token_id;
            tokensId = await [...tokensId, token_id];
            // if (contracts.closedSeaNft) {
            //   console.log("tokenstokens in inner inner if");
            //   const uri = await contracts.closedSeaNft.methods
            //     .tokenURI(item.token_id)
            //     .call();
            //   const result = await axios.get(uri);
            //   console.log("tokenstokens result", result);
            //   tokens = await [
            //     ...tokens,
            //     { ...item, metadata: result.data, token_uri: uri },
            //   ];
            // }
          }
        }
        const res = await axios.post(`${BACKEND_URL}nfts-wrt-tokenaddr`, {
          tokenIds: tokensId,
          tokenAddr: token_address,
        });
        if (res.status == 200) {
          setMyTokens(res.data);
        }
        // console.log("tokensIdshanshaikh", res);

        // setMyTokens(tokens);
        setIsCalled(true);
      }
      setLoading(false);
    } catch (error) {
      setMyTokens([]);
      console.log("[fetchTokens] error => ", error);
      setLoading(false);
    }
    // }
  }, [address, account, chainId, isCalled, contracts]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens, address, contracts]);

  return { loading, myTokens };
};

export default useFetchMyTokensByMongo;
