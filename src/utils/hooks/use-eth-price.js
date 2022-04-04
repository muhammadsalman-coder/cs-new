import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";

import { useContracts } from "utils/hooks/use-connectors";
import Web3 from "web3";

const useEthPrice = () => {
  const [price, setPrice] = useState(0);
  const { contracts } = useContracts();

  // Real
  //  const getEthPrice = useCallback(async () => {
  //   if (contracts.ethPriceChainlink) {
  //     const p = await contracts.ethPriceChainlink.methods.latestAnswer().call();
  //     console.log("PRICE***: ", p)
  //     const decimal = await contracts.ethPriceChainlink.methods
  //       .decimals()
  //       .call();
  //     setPrice(new BigNumber(p).div(new BigNumber(10).pow(decimal)).toNumber());
  //   }
  // }, [contracts]);

  // 1-Feb Implementations start
  /* const chainLinkAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "getLatestPrice",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const address = "0x7bCE7dd6823D95fEdD82270AB8c1d6e0E3679092";
  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(chainLinkAbi,address);
  console.log("contract: ", contract);
  const getEthPrice = useCallback(async () => {
    // let contract = new Web3.eth.Contract()
    if (contract) {
      const p = await contract.methods.getLatestPrice().call();
      console.log("PRICE***: ", p)
      const decimal = 8;
      let pric = (new BigNumber(p).div(new BigNumber(10).pow(decimal)).toNumber());
      console.log("Price: ",pric)
      setPrice(pric)
    }
  }, [contracts]);
  */
  const getEthPrice = useCallback(async () => {
    if (contracts.ethPriceChainlink) {
      const p = await contracts.ethPriceChainlink.methods.getLatestPrice().call();
      console.log("PRICE***: ", p)
      const decimal = 8;
      setPrice(new BigNumber(p).div(new BigNumber(10).pow(decimal)).toNumber());
    }
  }, [contracts]);
  // 1-Feb Implementations end

  
  useEffect(() => {
    getEthPrice();
  }, [getEthPrice]);

  return price;
};

export default useEthPrice;
