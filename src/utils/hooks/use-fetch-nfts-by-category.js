import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";

import { useContracts } from "./use-connectors";
import { getTokenOwnerInfo } from "./use-token-owner";
import { BACKEND_URL } from "config";

const useFetchNftsByCategory = ({ category, page = 1, size = 100 }) => {
  const [nfts2, setNfts] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const { contracts } = useContracts();
  const { chainId } = useWeb3React();

  const getNftsByCategory = useCallback(async () => {
    if (contracts.nftController) {
      setLoading(true);
      try {
        const result = await contracts.nftController.methods
          .getAsksByCategoryAndPageDesc(category, page, size)
          .call();
        // console.log("resultshan", result);
        // console.log("resultshan --", category);
        let temp = [];
        for (let item of result) {
          let tItem = { tokenAddr: item[0], tokenId: item[1], price: item[2] };
          if (contracts.closedSeaNft) {
            var uri = await contracts.closedSeaNft.methods
              .tokenURI(tItem.tokenId)
              .call();
            var res = await axios.get(uri);
            console.log("fetchingmytokens tItem", tItem);
            console.log("fetchingmytokens uri", uri);
            console.log("fetchingmytokens res", res);
            res.data.imageUrl = res?.data?.imageUrl
              ? res.data.imageUrl.replace(
                  "https://gateway.pinata.cloud",
                  "https://closedsea.mypinata.cloud"
                )
              : res.data.imageUrl;

            // const ownerInfo = await getTokenOwnerInfo({
            //   chainId,
            //   address: item[0],
            //   tokenId: item[1],
            // });
            // const userInfo = await axios.get(
            //   `${BACKEND_URL}profile?address=${ownerInfo.owner_of}`
            // );
            // const bids = await contracts.nftController.methods
            //   .getBids(tItem.tokenAddr, tItem.tokenId)
            //   .call();
            // let highestBid = bids[0];
            // for (let i = 1; i < bids.length; i++) {
            //   if (bids[i][1] > highestBid[1]) {
            //     highestBid = bids[i];
            //   }
            // }'https://gateway.pinata.cloud','https://closedsea.mypinata.cloud')
            uri = uri.replace(
              "https://gateway.pinata.cloud",
              "https://closedsea.mypinata.cloud"
            );
            tItem = {
              ...tItem,
              metadata: res.data,
              tokenUri: uri,
              categoryText: category,
              // owner_addr: ownerInfo.owner_of,
            };
            // const res2323 = await axios.post(`${BACKEND_URL}nft-collector`, {
            //   ...tItem,
            //   tokenAddr: tItem.tokenAddr,
            //   tokenId: tItem.tokenId,
            //   price: tItem.price,
            //   tokenUri: tItem.uri,
            //   isOnSell: true,
            // });
            // console.log("fetchingmytokens restItem2", res2323);

            // "tokenAddr":"0xB2D4C7AfFa1B01fa33C82A8aC63075BD366df4b0",
            // "tokenId": "62",
            // "isOnSell": false,
            // "price": "100000000000000000000",
            // "ownerOf": "0xB2D4C7AfFa1B01fa33C82",
            // "metadata":{
            // "imageUrl":"https://gateway.pinata.cloud/ipfs/QmZ5eTtGHm7SZogXg618vN8Y6McVDoJUsjobxE1aud7ZK9",
            // "name": "GENESIS Refined Apes Collection",
            // "description": "GENESIS Refined Apes Collection",
            // "externalLink": "http://www.rabp.io"
            // },
            // "selectedCat":"Football",
            // "tokenUri":"https://gateway.pinata.cloud/ipfs/QmaAKgbs11MruYcgYqZZuGzfwK226omxQvLKvYFzWyTmqy"
            // if (userInfo.data) {
            //   tItem = {
            //     ...tItem,
            //     avatar: userInfo.data.avatar,
            //   };
            // }
            // if (highestBid) {
            //   tItem = {
            //     ...tItem,
            //     highestBid: highestBid,
            //   };
            // }
          }

          temp = [...temp, { ...tItem }];
        }
        if (page <= 1) {
          setNfts(temp);
        } else {
          setNfts((prev) => {
            return [...prev, ...temp];
          });
        }
        setCurrentPage(page);
      } catch (error) {
        console.log("[getNftsByCategory] error => ", error);
      }
      setLoading(false);
    }
  }, [contracts, category, page, size]);

  useEffect(() => {
    getNftsByCategory();
  }, [getNftsByCategory]);
  const reloadComp = () => {
    getNftsByCategory();
  };
  return {
    loading,
    nfts2,
    currentPage,
    reloadComp,
  };
};

export default useFetchNftsByCategory;
