import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { useContracts } from "./use-connectors";

const useListedNFTsByPage = ({ page = 0, size = 10 }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { contracts } = useContracts();
  const [outNft, setOutNft] = useState([]);

  const getingHomeNft = useCallback(async () => {
    // const res = await contracts.nftController;
    if (contracts.nftController) {
      //   const res = await contracts.nftController.methods
      //     .getAsksByPageDesc(page, size)
      //     .call();

      if (contracts.closedSeaNft) {
        const myItem = [
          {
            tokenId: "62",
            tokenAddr: "0xB2D4C7AfFa1B01fa33C82A8aC63075BD366df4b0",
            price: "100000000000000000000",
          },
          {
            tokenId: "40",
            tokenAddr: "0xB2D4C7AfFa1B01fa33C82A8aC63075BD366df4b0",
            price: "100000000000000000",
          },
          {
            tokenId: "69",
            tokenAddr: "0xB2D4C7AfFa1B01fa33C82A8aC63075BD366df4b0",
            price: "4000000000000000000",
          },
        ];
        let temp = [];
        for (let item of myItem) {
          let tItem = {
            tokenAddr: item.tokenAddr,
            tokenId: item.tokenId,
            price: item.price,
          };

          const uri = await contracts.closedSeaNft.methods
            .tokenURI(tItem.tokenId)
            .call();
          const result = await axios.get(uri);
          tItem = { ...tItem, metadata: result.data, tokenUri: uri };
          temp = [...temp, tItem];
        }
        setOutNft(temp);

        // console.log("my function call checking  contract.nftcontroller", temp);
      }
    }
  }, [contracts]);

  const getListedNfts = useCallback(async () => {
    if (contracts.nftController) {
      setLoading(true);
      if (page === 1) {
        setList([]);
      }
      try {
        const res = await contracts.nftController.methods
          .getAsksByPageDesc(page, size)
          .call();
        console.log("aj : ****  => ", res);
        let temp = [];
        for (let item of res) {
          let tItem = { tokenAddr: item[0], tokenId: item[1], price: item[2] };
          if (contracts.closedSeaNft) {
            const uri = await contracts.closedSeaNft.methods
              .tokenURI(tItem.tokenId)
              .call();

            // console.log("uri", uri);
            const result = await axios.get(uri);
            tItem = { ...tItem, metadata: result.data, tokenUri: uri };
            temp = [...temp, tItem];
          }
        }
        setList((prev) =>
          prev.length + temp.length < 3
            ? [...prev, ...temp, ...temp, ...temp]
            : [...prev, ...temp]
        );
      } catch (error) {
        console.log("[getListedNfts] error => ", error);
      }
      setLoading(false);
    }
  }, [contracts, page, size]);

  useEffect(() => {
    getingHomeNft();
  }, [getingHomeNft]);
  useEffect(() => {
    getListedNfts();
  }, [getListedNfts]);

  return { list, loading, outNft };
};

export default useListedNFTsByPage;
