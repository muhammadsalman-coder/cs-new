import { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";

import { MORALIS_CHAIN_IDS, MORALIS_API_URI } from "config";
import { connectContract } from "utils/helpers/connectors";
import erc721Abi from "utils/abis/erc721";
import { fetchCollection } from "utils/helpers/apis/fetch-collection-data";
import { BACKEND_URL } from "config";

const useFetchCollectionTokens = ({ name, nftAddress }) => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCalled, setIsCalled] = useState(false);
  const { account, chainId } = useWeb3React();

  useEffect(() => {
    if (account) {
      setIsCalled(false);
    }
  }, [account, name]);

  const fetchTokens = useCallback(async () => {
    // console.log(
    //   "workingFetchCollection 1",
    //   process.env.REACT_APP_DEFAULT_CHAINID
    // );
    if (!isCalled) {
      setLoading(true);
      // console.log("workingFetchCollection 2", name);
      try {
        let tokens = [];
        const collection = await fetchCollection(name);
        // console.log("workingFetchCollection 3", name);
        // console.log("workingFetchCollection 4 collection", collection);
        if (collection) {
          collection.tokens = collection?.tokens.map((v, i) => {
            let altersss = { id: v.tokenId, address: v.tokenAddress };
            return altersss;
          });

          const res = await axios.post(
            `${BACKEND_URL}nfts-wrt-tokenaddr-and-id`,
            {
              nftToken: collection.tokens,
            }
          );
          if (res?.status === 200) {
            tokens = res?.data;
          }
          console.log("tokenId---13", res);
          // for (let tokens of collection.tokens) {
          //   console.log("tokenId---", tokens);

          // const { data } = await axios({
          //   method: "get",
          //   url: `${MORALIS_API_URI}nft/${nftAddress}/${tokenId}?chain=${
          //     MORALIS_CHAIN_IDS[
          //       chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
          //     ]
          //   }&format=decimal`,
          //   headers: {
          //     accept: "application/json",
          //     "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
          //   },
          // });
          // if (data.token_uri) {
          //   const contract = await connectContract(nftAddress, erc721Abi);
          //   const uri = await contract.methods.tokenURI(data.token_id).call();
          //   const result = await axios.get(uri);
          //   tokens = [
          //     ...tokens,
          //     { ...data, metadata: result.data, token_uri: uri },
          //   ];
          // }
          // }
          // console.log("workingFetchCollection 5 tokens", tokens);
          setTokens(tokens);
          tokens = [];
          setIsCalled(true);
        }
      } catch (error) {
        if (error.response) {
          console.log("[fetchTokens] if error => ", error.response);
        } else {
          console.log("[fetchTokens] else error => ", error);
        }
      }
      setLoading(false);
    }
  }, [name, nftAddress, chainId, isCalled]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return { loading, tokens };
};

export default useFetchCollectionTokens;

// import { useCallback, useEffect, useState } from "react";
// import { useWeb3React } from "@web3-react/core";
// import axios from "axios";

// import { MORALIS_CHAIN_IDS, MORALIS_API_URI } from "config";
// import { connectContract } from "utils/helpers/connectors";
// import erc721Abi from "utils/abis/erc721";
// import { useParams } from "react-router-dom";
// // import { fetchCollection } from "utils/helpers/apis/fetch-collection-data";
// import { fetchCollection } from "redux/action/apis/collections/fetchCollectionAction";
// import { useDispatch, useSelector } from "react-redux";
// const useFetchCollectionTokens = ({ name, nftAddress }) => {
//   const dispatch = useDispatch();
//   const [tokens, setTokens] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isCalled, setIsCalled] = useState(false);
//   const { account, chainId } = useWeb3React();
//   // const [random, setRandom] = useState();
//   // const { name, nftAddress } = useParams();
//   const collection = useSelector((state) => state.collectionInfo.collection);
//   useEffect(() => {
//     if (account) {
//       setIsCalled(true);
//     }
//   }, [account]);
//   console.log(
//     "-------fetchCollection 1sadasdsa--------",
//     collection,
//     "name",
//     name
//   );
//   useEffect(() => {
//     // console.log("fetchCollection 1", collection, "name", name);
//     setTokens([]);
//     dispatch(fetchCollection(name));
//   }, [name, nftAddress]);
//   // console.log("for collectioncollection in  redux", collection);
//   const fetchTokens = useCallback(async () => {
//     if (!isCalled) {
//       setLoading(true);
//       try {
//         // const collection = await fetchCollection(name);
//         console.log(
//           "for collection in collection redux-1231231231231231311----->",
//           collection
//         );
//         if (collection?.tokens?.length > 0) {
//           setTokens([]);
//           let tokens = [];
//           console.log("for collection in collection redux------>", collection);
//           for (let tokenId of collection.tokens) {
//             // console.log("for useFetchCollectionTokens in lloop redux", tokenId);

//             const { data } = await axios({
//               method: "get",
//               url: `${MORALIS_API_URI}nft/${nftAddress}/${tokenId}?chain=${
//                 MORALIS_CHAIN_IDS[
//                   chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
//                 ]
//               }&format=decimal`,
//               headers: {
//                 accept: "application/json",
//                 "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
//               },
//             });
//             console.log("mycollectionsss----- data", data);
//             if (data?.token_uri) {
//               const contract = await connectContract(nftAddress, erc721Abi);
//               const uri = await contract.methods.tokenURI(data.token_id).call();
//               const result = await axios.get(uri);
//               console.log("mycollectionsss------ result", result);
//               tokens = [
//                 ...tokens,
//                 { ...data, metadata: result.data, token_uri: uri },
//               ];
//             }
//           }
//           console.log("tokenssss----------", tokens);
//           setTokens(tokens);
//           tokens = [];
//           setIsCalled(true);
//         }
//       } catch (error) {
//         console.log("[fetchTokens] error => ", error);
//       }
//       setLoading(false);
//     }
//   }, [name, collection]);

//   useEffect(() => {
//     fetchTokens();
//   }, [name, collection]);

//   const reload = () => {
//     fetchTokens();
//   };

//   return { loading, tokens, reload };
// };

// export default useFetchCollectionTokens;
