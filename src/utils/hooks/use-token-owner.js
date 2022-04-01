import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";

import { MORALIS_CHAIN_IDS, MORALIS_API_URI } from "config";
import { connectContract } from "utils/helpers/connectors";
import erc721Abi from "utils/abis/erc721";
import { PINATA_BASE_URL_FREE } from "config";
import { PINATA_BASE_URL_GATEWAY } from "config";

const getTokenOwnerInfo = async ({ chainId, address, tokenId }) => {
  console.log(
    "getTokenOwnerInfo111---",
    address,
    "---",
    tokenId,
    "chainId",
    chainId
  );
  try {
    const { data } = await axios({
      method: "get",
      url: `${MORALIS_API_URI}nft/${address}/${tokenId}/owners?chain=${
        MORALIS_CHAIN_IDS[
          chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
        ]
      }&format=decimal`,
      headers: {
        accept: "application/json",
        "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
      },
    });
    console.log("getTokenOwnerInfo", data);
    return data.result[0];
  } catch (error) {
    console.log(
      "REACT_APP_MORALIS_API_KEY",
      process.env.REACT_APP_MORALIS_API_KEY
    );
    console.log("[getTokenOwnerInfo] error => ", error);
  }
};

const useTokenOwner = ({ address, tokenId }) => {
  const [tokenInfo, setTokenInfo] = useState([]);
  const { chainId } = useWeb3React();
  console.log(
    "useTokenOwne2r----",
    address,
    "---",
    tokenId,
    "--chainId--",
    chainId
  );
  const fetchInfo = useCallback(async () => {
    let info = await getTokenOwnerInfo({ chainId, address, tokenId });
    console.log("setTokenInfo--1--", info);
    if (info) {
      if (!info?.metadata) {
        try {
          const contract = await connectContract(address, erc721Abi);
          let uri = await contract.methods.tokenURI(info.token_id).call();
          uri = uri.replace(PINATA_BASE_URL_FREE, PINATA_BASE_URL_GATEWAY);
          console.log("metadatametadata1231", uri);

          const metadata = await axios.get(uri);
          metadata.data.imageUrl = metadata?.data?.image
            ? metadata.data.image
            : metadata.data.imageUrl;
          metadata.data.imageUrl = metadata?.data?.imageUrl?.replace(
            PINATA_BASE_URL_FREE,
            PINATA_BASE_URL_GATEWAY
          );
          console.log("metadatametadata12312", metadata);
          if (metadata.data) {
            info = { ...info, metadata: JSON.stringify(metadata.data) };

            info.tokenId = info?.token_id;
            info.tokenURI = info?.token_uri;
          }
        } catch (error) {
          console.log("[fetchInfo] fetch metadata error => ", error);
        }
      }
      console.log("setTokenInfo--2--", info);
      setTokenInfo(info);
    }
  }, [chainId, address, tokenId]);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  const reload = () => {
    fetchInfo();
  };

  return { reload, tokenInfo };
};

export default useTokenOwner;

export { getTokenOwnerInfo };
