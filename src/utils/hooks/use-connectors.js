import { useCallback, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import Web3 from "web3";

// import { ChainContext } from 'contexts/ChainContext';
import { RPC_URLS, connectionErrorHandler } from "../helpers/connectors";
import CONNECTOR_NAMES from "../constants/connectorNames";
import ClosedSeaNFTABI from "utils/abis/closedSeaNFT";
import ClosedSeaTokenABI from "utils/abis/closedSeaToken";
import NftControllerABI from "utils/abis/nftController";
import EthPriceChainlinkABI from "utils/abis/ethPriceChainlink";
import { artifacts } from "config";

// import test details (BSC Testnet)
// import { NFTAbi, NFTAddress, TokenAddress, TokenAbi } from "./data.js";

const useEagerConnect = (
  chainId = parseInt(process.env.REACT_APP_DEFAULT_CHAINID),
  connectorName = CONNECTOR_NAMES.injected
) => {
  // process.env.REACT_APP_DEFAULT_CHAINID
  // parseInt(97)
  const { activate, deactivate } = useWeb3React();

  const connectors = useConnectors(chainId);

  const login = useCallback(() => {
    activate(connectors[connectorName], async (error) => {
      if (error) {
        connectionErrorHandler(
          error,
          activate,
          connectors[connectorName],
          chainId
        );
      }
    });
    localStorage.setItem("chainId", chainId);
    localStorage.setItem("connectorName", connectorName);
  }, [activate, connectors, chainId, connectorName]);

  const logout = () => {
    deactivate();
    if (window.localStorage.getItem("walletconnect")) {
      connectors[CONNECTOR_NAMES.walletConnect].close();
      connectors[CONNECTOR_NAMES.walletConnect].walletConnectProvider = null;
    }
    localStorage.removeItem("chainId");
    localStorage.removeItem("connectorName");
  };

  return {
    login,
    logout,
  };
};

export const useConnectors = (chainId) => {
  const POLLING_INTERVAL = 12000;

  const injected = new InjectedConnector({ supportedChainIds: [chainId] });

  const walletConnect = new WalletConnectConnector({
    rpc: {
      1: { 1: RPC_URLS[1], 56: RPC_URLS[56], 137: RPC_URLS[137] },
    },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
  });

  const connectors = {
    [CONNECTOR_NAMES.injected]: injected,
    [CONNECTOR_NAMES.walletConnect]: walletConnect,
  };

  return connectors;
};

const useContracts = () => {
  // console.log("use Contracts Call shan sahikh");
  const [contracts, setContracts] = useState({});
  const [web3, setWeb3] = useState();

  const { chainId } = useWeb3React();
  // console.log("chainId in useContracts", chainId);

  const connectContracts = useCallback(async () => {
    const { ethereum } = window;
    // console.log("etherum=====> ", ethereum); // comment by muhammad salman for fix on load wallet connection bug

    try {
      await ethereum?.enable();
    } catch (error) {
      console.log("[useContracts] error => ", error);
    }
    const web3Provider = new Web3(ethereum);
    console.log("web3Provider: ", web3Provider);
    // web3Provider.setProvider(RPC_URLS[chainId || process.env.REACT_APP_DEFAULT_CHAINID]);
    if (!ethereum?.chainId || !chainId) {
      web3Provider.setProvider(
        RPC_URLS[chainId || process.env.REACT_APP_DEFAULT_CHAINID]
      );
    }

    ///@notice Mainnet(BSC) IMPLEMENTATION start
    const closedSeaNft = new web3Provider.eth.Contract(
      ClosedSeaNFTABI,
      artifacts.closedSeaNft[
        chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
      ]
    );
    const closedSeaToken = new web3Provider.eth.Contract(
      ClosedSeaTokenABI,
      artifacts.seaToken[
        chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
      ]
    );
    ///@notice Mainnet(BSC) IMPLEMENTATION end

    ///@notice TEST IMPLEMENTATION start
    // const closedSeaNft = new web3Provider.eth.Contract(NFTAbi, NFTAddress); // test nft
    // console.log("closedSeaNft", closedSeaNft);
    // const closedSeaToken = new web3Provider.eth.Contract(TokenAbi, TokenAddress); // test token
    // console.log("closedSeaToken", closedSeaToken);
    ///@notice TEST IMPLEMENTATION end

    const nftController = new web3Provider.eth.Contract(
      NftControllerABI,
      artifacts.nftController[
        chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
      ]
    );
    const ethPriceChainlink = new web3Provider.eth.Contract(
      EthPriceChainlinkABI,
      artifacts.ethPriceChainlink[
        chainId || parseInt(process.env.REACT_APP_DEFAULT_CHAINID)
      ]
    );

    ///@notice TEST IMPLEMENTATION start
    // const closedSeaNft = new web3Provider.eth.Contract(NFTAbi, NFTAddress); // test nft
    // console.log("closedSeaNft", closedSeaNft);
    // const closedSeaToken = new web3Provider.eth.Contract(TokenAbi, TokenAddress); // test token
    // console.log("closedSeaToken", closedSeaToken);
    ///@notice TEST IMPLEMENTATION end

    setWeb3(web3Provider);
    setContracts({
      closedSeaNft,
      closedSeaToken,
      nftController,
      ethPriceChainlink,
    });
  }, [chainId]);

  useEffect(() => {
    connectContracts();
  }, [connectContracts]);

  useEffect(() => {
    if (!chainId) {
      connectContracts();
    } else {
      setContracts({});
      setWeb3(null);
    }
  }, [chainId, connectContracts]);

  return { contracts, web3 };
};

export { useEagerConnect, useContracts };
