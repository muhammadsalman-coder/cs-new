import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import abi from "./config/abi.json";
import Web3 from "web3";
import { connectContract } from "utils/helpers/connectors";
const Collectibles = (userId) => {
  const web3 = new Web3("https://bsc-dataseed.binance.org/");
  const [contract, setContract] = useState({});
  const [uri, setUri] = useState([]);
  const [collectibles, setCollectibles] = useState([]);
  const mainnetAddress = "0xd17237f0B1eDb8109F7E0937165Fd58aDAd2Ca11";
  const [loadingCollectibles, setLoadingCollectibles] = useState(false);

  useEffect(async () => {
    await connectContract(mainnetAddress, abi).then((c) => {
      setContract(c);
    });
  }, []);

  const getingUri = useCallback(async () => {
    if (userId) {
      setLoadingCollectibles(true);

      // Refinedland Contract Instance Rinkeby
      // let contract = new web3.eth.Contract(abi,rinkebyAddress);

      // Refinedland Contract Instance Mainnet
      let contract = new web3.eth.Contract(abi, mainnetAddress);

      var myTokens = []; // where users owner tokens store

      ///@notice Ropsten testnet
      // Get User Owned Tokens
      let totalSupply = await contract.methods.totalSupply().call();

      var oldtoken = "";
      for (let i = 0; i < totalSupply; i++) {
        // 0,1 = 0+1 = 1, 1+1 = 2

        let myToken = await contract.methods.ownerOf(i + 1).call();

        if (
          myToken.length > 0 &&
          myToken?.toLowerCase() != oldtoken?.toLowerCase()
        ) {
          myTokens.push(myToken); // push token If owner matches
        } else {
          setLoadingCollectibles(false);
        }

        oldtoken = myToken;
      }

      // Get User tokenUri's
      if (myTokens.length > 0) {
        let myURI = []; // where users owner uri's store
        for (let i = 0; i < myTokens.length; i++) {
          //i.e. myTokens = [1,2,3]. Loop run: 0,1,2, myTokens[0], myTokens[1],myTokens[2]

          let res = await contract.methods.tokenURI(myTokens[i]).call();
          myURI.push(res);
        }

        // let res = await contract.methods.tokenURI(1).call();

        //   setUri(myURI);
        if (myURI.length > 0) {
          let coll = [];
          myURI.map(async (v, i) => {
            const res = await axios.get(v);
            coll.push(res?.data);
          });
          setCollectibles(coll);
          setLoadingCollectibles(false);
        }
      } else console.log("no token current user own");
    }
  }, [contract, userId]);
  useEffect(() => {
    getingUri();
  }, [userId]);
  //   useEffect(() => {
  //     if (uri.length > 0) {
  //       var coll = [];
  //       uri.map((v, i) => {
  //         const res = axios.get(v);
  //         coll.push(res);
  //       });
  //       setCollectibles(coll);
  //     }
  //   }, []);

  return { collectibles, loadingCollectibles };
};

export default Collectibles;
