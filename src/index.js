import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers';
import { MoralisProvider } from "react-moralis";

import App from "./App";

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={process.env.REACT_APP_MORALIS_APP_ID} serverUrl={process.env.REACT_APP_SERVER_URL}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <HashRouter>
          <App />
        </HashRouter>
      </Web3ReactProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
