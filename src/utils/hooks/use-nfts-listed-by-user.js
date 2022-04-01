import { useCallback, useEffect, useState } from "react";
import { useContracts } from "./use-connectors";

const useNftsListedByUser = ({ account }) => {
  const [userNfts, setUserNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { contracts } = useContracts();
  // console.log("root geting contract ->", contracts);
  // console.log("root geting userNfts ->", userNfts);
  // console.log("root geting account ->", account);

  const getUserNfts = useCallback(async () => {
    // console.log("contract in usecallback ->", contracts);
    if (contracts.nftController && account) {
      try {
        setLoading(true);
        let nfts = await contracts.nftController.methods
          .getAsksByUser(account)
          .call();
        console.log("nfts------>>>", nfts);

        nfts = nfts.map(([tokenAddr, tokenId, price, withEther]) => ({
          price,
          tokenAddr,
          tokenId,
          withEther,
        }));
        // console.log("NFTS LISTED BY USER 2: UZAIR", nfts);
        setUserNfts(nfts || []);
        setLoading(false);
      } catch (error) {
        console.log("[getUserNfts] error => ", error);
        setLoading(false);
      }

      console.log("userNfts", userNfts);
    }
  }, [contracts, account]);

  useEffect(() => {
    getUserNfts();
  }, [getUserNfts]);

  const reload = async () => {
    await getUserNfts();
  };

  return { userNfts, reload, loading };
};

export default useNftsListedByUser;
