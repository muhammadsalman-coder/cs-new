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
      console.log("c---->", c);
    });
  }, []);

  const getingUri = useCallback(async () => {
    setLoadingCollectibles(true);
    // Refinedland Contract Instance Rinkeby
    // let contract = new web3.eth.Contract(abi,rinkebyAddress);
    // console.log("contract: ",contract);

    // Refinedland Contract Instance Mainnet
    let contract = new web3.eth.Contract(abi, mainnetAddress);

    let myTokens = []; // where users owner tokens store

    ///@notice Ropsten testnet
    // Get User Owned Tokens
    let totalSupply = await contract.methods.totalSupply().call();
    //console.log("totalSupply: ", totalSupply);
    for (let i = 0; i < totalSupply; i++) {
      // 0,1 = 0+1 = 1, 1+1 = 2
      let myToken = await contract.methods.ownerOf(i + 1).call();
      if (myToken == userId) {
        myTokens.push(i + 1); // push token If owner matches
      } else {
        setLoadingCollectibles(false);
      }
      //console.log(myToken);
    }

    // Get User tokenUri's
    if (myTokens.length > 0) {
      let myURI = []; // where users owner uri's store
      for (let i = 0; i < myTokens.length; i++) {
        //i.e. myTokens = [1,2,3]. Loop run: 0,1,2, myTokens[0], myTokens[1],myTokens[2]
        // console.log(i+1);
        let res = await contract.methods.tokenURI(myTokens[i]).call();
        myURI.push(res);
      }
      console.log("myURI: ", myURI);

      // let res = await contract.methods.tokenURI(1).call();
      // console.log("res: ", res);
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
  }, [contract]);
  useEffect(async () => {
    await getingUri();
  }, []);
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
